import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>404 Not Found</h2>
      <p>This page does not exist. Please check and try again.</p>
    </div>
  );
}
