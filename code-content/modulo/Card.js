import styles from "./Card.module.css";
import clsx from "clsx";

function Card({ children, className, ...delegated }) {
  return (
    <div className={clsx(styles.wrapper, className)} {...delegated}>
      {children}
    </div>
  );
}

export default Card;
