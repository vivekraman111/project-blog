import React from "react";

function Heading({ id, level, children }) {
  const Tag = `h${level}`;
  return <Tag id={id}>{children}</Tag>;
}

export default Heading;
