"use client"

import { MacaronScene } from "@/widgets/macaron-scene/ui/macaron-scene";
import styles from "./container-lending.module.css";

export const ContainerLending = ({cards}:any) => {
    return(
        <div className={styles.grid}> 
      {cards && cards?.length > 0 ? (
        cards.map((card: any) => (
          <div
            className={styles["card-wrapper"]} 
            id={card.id}
            key={card.id}
          >
            <MacaronScene />
          </div>
        ))
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
    );
}