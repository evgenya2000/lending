'use client';

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

export const ConteinerCanvas = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true }}
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
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
};