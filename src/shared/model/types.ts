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
  macaronConfig: MacaronVisualConfig;
}

export interface CameraConfig {
  position: PositionT;
  fov?: number;
  near?: number;
  far?: number;
}

export interface EnvironmentConfig {
  map: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" | Partial<EnvironmentProps> | null | undefined;
  intensity: number | undefined;
}

export interface LightConfig {
  position: PositionT;
  intensity: number;
}

export interface MacaronVisualConfig {
  colors: {
    Top: string;    // например "#FFD700"
    Bottom: string; // "#B19CD9"
    Center: string; // "#F0E6FF"
  };
  position: [number, number, number]
  speed: number;
}

export type PositionT = number | Vector3 | [x: number, y: number, z: number] | readonly [x: number, y: number, z: number] | Readonly<Vector3> | undefined;

export interface CartItem extends Card {
  quantity: number;
}

export interface CreateOrderDto {
  fullName: string;
  phone: string;
  deliveryMethod: 'courier' | 'post';
  deliveryAddress: string;
  postalCode?: string;
  paymentMethod: 'card' | 'sbp';
  items: { productId: number; quantity: number }[];
}

export interface Order {
  id: number;
  fullName: string;
  phone: string;
  deliveryMethod: 'courier' | 'post';
  deliveryAddress: string;
  postalCode?: string;
  paymentMethod: 'card' | 'sbp';
  items: {
    id: number,
    orderId: number,
    productId: number,
    quantity: number,
    price: string,
    product: Card
  }[];
  createdAt: string;
  status: 'PENDING' | 'ASSEMBLED';
  issuedAt?: string;
}