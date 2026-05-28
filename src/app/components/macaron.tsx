'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Компонент одного макарона
export function Macaron({ color, position, speed = 0.5 }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('./macaron.glb');
  // Применяем цвет к материалам
  const coloredScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh && child.material.name === 'body') {
        child.material = child.material.clone();
        child.material.color.set(color);
      }
    });
    return clone;
  }, [scene, color]);

  useEffect(() => () => coloredScene.traverse((o) => o.isMesh && o.material.dispose()), []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      // Плавное покачивание по высоте
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.1;
    }
  });

  return <primitive ref={ref} object={coloredScene} position={position} />;
}