import React from "react";
import Link from "next/link";
import clsx from "clsx";
import style from "./Tags.module.css";

function Tags({ tags, selectedTag }) {
  return (
    <div className={style.tagsSection}>
      <h2>Tags</h2>
      <div className={style.tagsContainer}>
        {tags.map((tag) => (
          <span
            key={tag}
            className={clsx(
              style.tagWrapper,
              tag === selectedTag && style.selectedTag
            )}
          >
            <Link
              href={{ pathname: "/", query: { tag } }}
              className={style.tag}
            >
              <span className={style.tagText}>{tag}</span>
            </Link>
          </span>
        ))}
      </div>
      {selectedTag && (
        <Link href={{ pathname: "/" }} className={style.home}>
          Show All
        </Link>
      )}
    </div>
  );
}

export default Tags;
