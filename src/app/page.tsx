"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Macaron } from "./components/macaron";

export default function Home() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Мягкий рассеянный свет, чтобы тени не были чёрными */}
        <ambientLight intensity={0.8} />

        {/* Основной направленный свет (как солнце) */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        {/* Заполняющий свет с противоположной стороны – подсветит тени */}
        <directionalLight position={[-5, 0, -5]} intensity={0.8} />

        {/* Лёгкий точечный свет спереди-сверху для бликов */}
        <pointLight position={[0, 3, 3]} intensity={1} />
        <Macaron key={1} colors={{ Top: '#d665ff', Bottom: '#d665ff', Center: '#fca5a5' }}  position={[0, 0, 0]} speed={0.8} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}