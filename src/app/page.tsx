"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Macaron } from "./components/macaron";

export default function Home() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Stage environment="city" intensity={0.5}>
          <pointLight position={[0, 3, 3]} intensity={1} />
          <Macaron key={1} colors={{ Top: '#ff004c', Bottom: '#ff004c', Center: '#ffdada' }}  position={[0, 0, 0]} speed={0.8} />
        </Stage>
        <OrbitControls />
      </Canvas>
    </main>
  );
}