import React from "react";
import CodePlaygroundClient from "./CodePlaygroundClient";
import { loadPlaygroundCode } from "@/helpers/file-helpers";

async function CodePlayground({ dependencies, folder, showFiles }) {
  const customSetup = dependencies.reduce(
    (setup, dependency) => {
      setup.dependencies[dependency] = "latest";
      return setup;
    },
    { dependencies: {} }
  );

  const files = await loadPlaygroundCode(folder, showFiles);

  return <CodePlaygroundClient customSetup={customSetup} files={files} />;
}

export default CodePlayground;
