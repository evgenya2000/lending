import styles from "./header.module.css"

export function Header({
  title
}: {
  title: string
}) {
    return(
    <div className={styles.header}><h1>{title}</h1></div>);
}