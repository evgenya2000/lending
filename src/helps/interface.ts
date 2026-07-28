import { EnvironmentProps } from "@react-three/drei";
import { Vector3 } from "three";

export interface FilterFormValues {
  priceFrom: string;
  priceTo: string;
  tastes: string[];
}

export interface AppliedFilters {
  priceFrom?: number;
  priceTo?: number;
  tastes?: string[];
}

export interface Card {
  id: number;
  title: string;
  description: string;
  price: number;
  tastes: string[];
  macaronConfig: MacaronSceneConfig;
}

export interface MacaronSceneConfig {
  camera: CameraConfig;
  environment: EnvironmentConfig;
  light: LightConfig;
  macaronConfig: MacaronVisualConfig; // вложенная конфигурация самого макарона
}

interface CameraConfig {
  position: PositionT;
  fov?: number;
  near?: number;
  far?: number;
}

interface EnvironmentConfig {
  map: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" | Partial<EnvironmentProps> | null | undefined; 
  intensity: number | undefined;
}

interface LightConfig {
  position: PositionT;
  intensity: number;
}

interface MacaronVisualConfig {
  colors: {
    Top: string;    // например "#FFD700"
    Bottom: string; // "#B19CD9"
    Center: string; // "#F0E6FF"
  };
  position: [number, number, number]
  speed: number;
}

type PositionT = number | Vector3 | [x: number, y: number, z: number] | readonly [x: number, y: number, z: number] | Readonly<Vector3> | undefined;