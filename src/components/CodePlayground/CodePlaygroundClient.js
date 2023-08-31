"use client";
import React from "react";
import styles from "./CodePlaygroundClient.module.css";
//import dynamic from "next/dynamic";
//const { Sandpack } = dynamic(() => import("@codesandbox/sandpack-react"));
import { Sandpack } from "@codesandbox/sandpack-react";
import { Maximize } from "react-feather";
import clsx from "clsx";

function CodePlaygroundClient({ customSetup, files }) {
  const [showFullScreen, setShowFullScreen] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(
          styles.innerWrapper,
          showFullScreen && styles.fullScreen
        )}
      >
        <header className={styles.playgroundHeader}>
          <span className={styles.title}>Code Playground</span>
          <button
            className={styles.maxBtn}
            onClick={() => setShowFullScreen(!showFullScreen)}
          >
            <Maximize />
          </button>
        </header>
        <Sandpack
          theme="dark"
          template="react"
          customSetup={customSetup}
          files={files}
          className={styles.playground}
        />
      </div>
    </div>
  );
}

export default CodePlaygroundClient;
