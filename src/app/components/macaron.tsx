'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Цвета для каждой части (можно вынести в пропсы, если нужно)
const DEFAULT_COLORS = {
  Top: '#ff6b6b',    // красновато-розовый
  Bottom: '#fbc490',  // кремовый
  Center: '#ffffff',  // белый
};

export function Macaron({
  position,
  speed = 0.5,
  colors = DEFAULT_COLORS, // опционально: можно передать свои цвета
}: {
  position: [number, number, number];
  speed?: number;
  colors?: Partial<typeof DEFAULT_COLORS>;
}) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('./macaron.glb');

  // Объединяем переданные цвета с дефолтными
  const finalColors = { ...DEFAULT_COLORS, ...colors };

  const coloredScene = useMemo(() => {
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const partName = child.name;

        // Проверяем, есть ли цвет для этой части
        if (partName === 'Top' || partName === 'Bottom' || partName === 'Center') {
          // Клонируем материал, чтобы не влиять на другие экземпляры
          const newMaterial = child.material.clone();

          // Убираем текстуру, если нужен сплошной цвет
          if (newMaterial.map) {
            newMaterial.map = null;
          }

          // Применяем цвет
          newMaterial.color.set(finalColors[partName]);
          child.material = newMaterial;
        }
      }
    });

    return cloned;
  }, [scene, finalColors]);

  // Очистка памяти при размонтировании
  useEffect(() => {
    return () => {
      coloredScene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.dispose();
        }
      });
    };
  }, [coloredScene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.1;
    }
  });

  return <primitive ref={ref} object={coloredScene} position={position} />;
}