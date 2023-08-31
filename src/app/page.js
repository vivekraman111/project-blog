import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "../helpers/file-helpers";
import { BLOG_TITLE } from "../constants";
import Tags from "@/components/Tags";

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
};

async function Home({ searchParams }) {
  let blogPosts = await getBlogPostList();

  const tagSet = blogPosts.reduce((tags, post) => {
    return new Set([...tags, ...(post.tags || [])]);
  }, []);
  const tags = [...tagSet];

  if (searchParams.tag) {
    blogPosts = blogPosts.filter(
      (post) => post.tags && post.tags.includes(searchParams.tag)
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>{`${
        searchParams.tag
          ? `Content tagged "${searchParams.tag}"`
          : "Latest Content"
      }:`}</h1>
      {blogPosts.map((post) => (
        <BlogSummaryCard
          id={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
      <Tags tags={tags} selectedTag={searchParams.tag} />
    </div>
  );
}

export default Home;
