import { JSX } from "react";
import styles from "./container-main.module.css"
export const ContainerMain = ({ left, right }: { left: JSX.Element; right: JSX.Element }) => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["left"]}>
        {left}
      </div>
      <div className={styles["right"]}>
        {right}
      </div>
    </div>
  );
};