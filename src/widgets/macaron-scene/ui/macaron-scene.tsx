"use client";
import { OrbitControls, PerspectiveCamera, Stage, View } from "@react-three/drei";
import { Macaron } from "@/entities/macaron/ui/macaron";
import { MacaronSceneConfig } from "@/shared/model/types";

export const MacaronScene = ({
  config,
  id,
  track,
}: {
  config: MacaronSceneConfig;
  id: string;
  track: React.RefObject<HTMLElement>;
}) => {
  const { camera: cameraConfig, environment, light, macaronConfig } = config;

  return (
    <View key={id} track={track}>
      {/* Камера внутри View, становится дефолтной для этого View */}
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

      {/* OrbitControls управляет камерой этого View и слушает события только внутри track */}
      {track.current && (
        <OrbitControls makeDefault domElement={track.current} enableZoom={false}/>
      )}
    </View>
  );
};