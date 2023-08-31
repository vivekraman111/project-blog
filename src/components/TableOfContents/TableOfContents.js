"use client";
import React from "react";
import style from "./TableOfContents.module.css";
import { ChevronUp, ChevronDown } from "react-feather";

function TableOfContents({ headings }) {
  const [showTOC, setShowTOC] = React.useState(false);

  return (
    <div className={style.wrapper}>
      <button className={style.tocBtn} onClick={() => setShowTOC(!showTOC)}>
        {showTOC ? <ChevronUp /> : <ChevronDown />}
        <span className={style.tocTxt}>Table of Contents</span>
      </button>
      {showTOC && (
        <ol className={style.toc}>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default TableOfContents;
