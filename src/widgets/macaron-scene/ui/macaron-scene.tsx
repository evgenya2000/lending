"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { sceneSetup } from "../config/scene.setup";
import { Macaron } from "@/entities/macaron/ui/macaron";
import "./macaron-scene.module.css"

export const MacaronScene = () => {
  const { camera, environment, light, macaronConfig } = sceneSetup;

  return (
    <Canvas camera={camera}>
      <Stage environment={environment.map} intensity={environment.intensity}>
        <pointLight position={light.position} intensity={light.intensity} />
        <Macaron
          colors={macaronConfig.colors}
          position={macaronConfig.position}
          speed={macaronConfig.speed}
        />
      </Stage>
      <OrbitControls />
    </Canvas>
  );
};