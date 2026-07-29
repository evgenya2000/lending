import { JSX } from "react";
import styles from "./container-main.module.css"
export const ContainerMain = ({ left, right, allWidth }: { left?: JSX.Element; right?: JSX.Element; allWidth?: JSX.Element; }) => {
  return (
    <div>
      {!allWidth ?
        <main className={styles["wrapper-lending"]}>
          <div className={styles["left"]}>
            {left}
          </div>
          <div className={styles["right"]}>
            {right}
          </div>
        </main> :
        <main className={styles["wrapper-center"]}>
          {allWidth}
        </main>}
    </div>
  );
};