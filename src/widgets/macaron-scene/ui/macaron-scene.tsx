"use client";

import { OrbitControls, PerspectiveCamera, Stage, View } from "@react-three/drei";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Macaron } from "@/entities/macaron/ui/macaron";
import { MacaronSceneConfig } from "@/shared/model/types";

export const MacaronScene = ({
  config,
  id,
  track,
}: {
  config: MacaronSceneConfig;
  id: string;
  track: RefObject<HTMLElement>;
}) => {
  const { camera: cameraConfig, environment, light, macaronConfig } = config;
  const controlsRef = useRef<any>(null);
  const [trackReady, setTrackReady] = useState(false);

  // Ждём, когда ref-элемент появится в DOM, чтобы корректно подключить OrbitControls
  useEffect(() => {
    if (track.current) {
      setTrackReady(true);
    }
  }, [track]);

  // Настраиваем touch-action после монтирования контролов
  useEffect(() => {
    if (trackReady && controlsRef.current && track.current) {
      const controls = controlsRef.current;
      if (controls.domElement) {
        controls.domElement.style.touchAction = 'pan-y';
      }
    }
  }, [trackReady, track]);

  return (
    <View key={id} track={track}>
      <PerspectiveCamera
        makeDefault
        fov={cameraConfig?.fov ?? 45}
        near={cameraConfig?.near ?? 0.1}
        far={cameraConfig?.far ?? 1000}
        position={cameraConfig?.position ?? [0, 0, 5]}
      />

      <Stage
        environment={environment?.map || null}
        intensity={environment?.intensity}
        shadows={false}
      >
        <ambientLight intensity={4} />
        <pointLight position={light.position} intensity={light.intensity} />
        <Macaron
          colors={macaronConfig.colors}
          position={macaronConfig.position}
          speed={macaronConfig.speed}
        />
      </Stage>

      {trackReady && track.current && (
        <OrbitControls
          ref={controlsRef}
          makeDefault
          domElement={track.current}
          enableZoom={false}
          enablePan={false}
        />
      )}
    </View>
  );
};