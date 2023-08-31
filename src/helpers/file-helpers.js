import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import React from "react";

import { notFound } from "next/navigation";

export const getBlogPostList = React.cache(async function () {
  const fileNames = await readDirectory("/content");
  //const fileNames = await readDirectory(path.join(process.cwd(), "content"));
  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);
    // const rawContent = await readFile(
    //   path.join(process.cwd(), "content", fileName)
    // );

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
});

export const loadBlogPost = React.cache(async function (slug) {
  let rawContent;
  try {
    rawContent = await readFile(`/content/${slug}.mdx`);
    // rawContent = await readFile(
    //   path.join(process.cwd(), "content", `${slug}.mdx`)
    // );
  } catch {
    notFound();
  }

  if (!rawContent) return;

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

export const loadPlaygroundCode = React.cache(async function (
  folder,
  showFiles
) {
  const fileNames = await readDirectory(`/code-content/${folder}`);
  // const fileNames = await readDirectory(
  //   path.join(process.cwd(), "code-content", folder)
  // );

  const codeFiles = {};

  for (let fileName of fileNames) {
    const code = await readFile(`/code-content/${folder}/${fileName}`);
    // const code = await readFile(
    //   path.join(process.cwd(), "code-content", folder, fileName)
    // );

    codeFiles[`/${fileName}`] = { code };
    if (showFiles && !showFiles?.includes(fileName)) {
      codeFiles[`/${fileName}`].hidden = true;
    }
  }

  return codeFiles;
});

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
