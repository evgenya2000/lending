"use client";
import { Stage, View } from "@react-three/drei";
import { Macaron } from "@/entities/macaron/ui/macaron";
import { RefObject } from "react";

export const MacaronScene = ({ config, id, track }: { config: any, id: string, track: RefObject<HTMLElement> }) => {
  const { camera, environment, light, macaronConfig } = config;

  return (
    <View key={id} track={track}>
      <Stage
        environment={environment?.map || null}
        intensity={environment?.intensity}
      >
        <ambientLight intensity={4} />
        <pointLight position={light.position} intensity={light.intensity} />
        <Macaron
          colors={macaronConfig.colors}
          position={macaronConfig.position}
          speed={macaronConfig.speed}
        />
      </Stage>
    </View>
  );
};