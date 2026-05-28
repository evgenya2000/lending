"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { Macaron } from "./components/macaron";

export default function Home() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        
        {/* Пример 3D-объекта */}
        <Macaron key={1} color={"#f80057'"} position={[0, 0, 0]} speed={0.8} />

        {/* Дополнительные эффекты из @react-three/drei */}
        <Sparkles count={50} scale={5} color={"white"} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}