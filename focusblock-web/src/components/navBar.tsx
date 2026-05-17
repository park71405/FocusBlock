import styles from "./navBar.module.css";

export default function navBar({ title }: { title: string }) {
  return (
    <div>
      <div><h1 className={styles.navBarTitle}>{title}</h1></div>
    </div>
  );
}