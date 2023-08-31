import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "../../helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import CodePlayground from "@/components/CodePlayground/CodePlayground";
import Heading from "@/components/Heading/Heading";
// import DivisionGroupsDemo from "@/components/DivisionGroupsDemo/DivisionGroupsDemo";
import dynamic from "next/dynamic";
const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo/DivisionGroupsDemo")
);

import CircularColorsDemo from "@/components/CircularColorsDemo/CircularColorsDemo";

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

const markdownHeadingRegex = /^(#{1,6})\s(.+)/;

// this will fail if a heading is embedded in something else
// for e.g. heading embedded in a code block.

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  const headings = [];
  const blogPostLinesArr = blogPost.content.split("\n");
  let inCodeBlock = false;

  for (let i = 0; i < blogPostLinesArr.length; i++) {
    let line = blogPostLinesArr[i];
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) inCodeBlock = true;
      else inCodeBlock = false;
    }

    if (!inCodeBlock) {
      let match = markdownHeadingRegex.exec(line);
      if (match) {
        const id = crypto.randomUUID();
        const level = match[1].length;
        const text = match[2];
        headings.push({
          id,
          level,
          text,
        });
        blogPostLinesArr[
          i
        ] = `<Heading level="${level}" id="${id}">${text}</Heading>`;
      }
    }
  }

  blogPost.content = blogPostLinesArr.join("\n");

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
        headings={headings}
      />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
            CodePlayground,
            Heading,
          }}
        />
      </div>
    </article>
  );
}

function withMetadata(Component, metadata) {
  return function WithMetadataWrapper(props) {
    return <Component {...props} metadata={metadata} />;
  };
}

export default BlogPost;
