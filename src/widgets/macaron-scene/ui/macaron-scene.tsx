"use client";

import { Environment, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
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
  const viewRef = useRef<any>(null);
  const [trackReady, setTrackReady] = useState(false);

  useLayoutEffect(() => {
    if (track.current) {
      setTrackReady(true);
    }
  }, [track]);

  useLayoutEffect(() => {
    if (trackReady && viewRef.current && track.current) {
      requestAnimationFrame(() => {
        viewRef.current?.update?.();
      });
    }
  }, [trackReady, track]);

  useLayoutEffect(() => {
    if (trackReady && controlsRef.current && track.current) {
      const controls = controlsRef.current;
      if (controls.domElement) {
        controls.domElement.style.touchAction = 'pan-y';
      }
    }
  }, [trackReady, track]);

  return (
    <View ref={viewRef} key={id} track={track}>
      <PerspectiveCamera
        makeDefault
        fov={cameraConfig?.fov ?? 45}
        near={cameraConfig?.near ?? 0.1}
        far={cameraConfig?.far ?? 1000}
        position={cameraConfig?.position ?? [0, 0, 5]}
      />

      <Macaron
        colors={macaronConfig.colors}
        position={macaronConfig.position}
        speed={macaronConfig.speed}
      />
      <Environment preset="studio" />

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