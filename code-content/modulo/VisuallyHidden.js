import styles from "./VisuallyHidden.module.css";
import clsx from "clsx";
function VisuallyHidden({
  as: Element = "span",
  className,
  children,
  ...delegated
}) {
  return (
    <Element className={clsx(styles.wrapper, className)} {...delegated}>
      {children}
    </Element>
  );
}

export default VisuallyHidden;
