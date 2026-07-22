"use client";
import React, { createRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import styles from "./container-lending.module.css";
import { MacaronScene } from "@/widgets/macaron-scene/ui/macaron-scene";

export const ContainerLending = ({ cards }: any) => {
  const refsArray: React.RefObject<HTMLElement>[] = useMemo(
    () =>
      Array.from({ length: cards?.length ?? 0 }, () =>
        createRef<HTMLElement>() as React.RefObject<HTMLElement>
      ),
    [cards?.length]
  );

  if (!cards?.length) return <p>Ничего не найдено</p>;

  return (
  <>
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {cards.map((card: any, index: number) => (
        <MacaronScene key={card.id} config={card.macaronConfig} id={card.id} track={refsArray[index]} />
      ))}
    </Canvas>

    <div className={styles.grid}>
      {cards.map((card: any, index: number) => (
        <div key={card.id} className={styles["card-wrapper"]}>
          <div
            className={styles["wrapper-3d"]}
            ref={refsArray[index] as React.RefObject<HTMLDivElement>}
            style={{ position: "relative" }}
          />
          <div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={() => alert(`Куплен ${card.title}`)}>
              Купить
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
);
};