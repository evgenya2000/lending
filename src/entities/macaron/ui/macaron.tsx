'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const DEFAULT_COLORS = {
  Top: '#ff6b6b',
  Bottom: '#fbc490',
  Center: '#ffffff',
};

// Тайпгард для Object3D → Mesh
function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return object.type === 'Mesh';
}

// Тайпгард для материала, поддерживающего color и map
function isColorableMaterial(material: THREE.Material): material is (THREE.MeshStandardMaterial | THREE.MeshPhongMaterial) {
  return 'color' in material && 'map' in material;
}

export function Macaron({
  position,
  speed = 0.5,
  colors = DEFAULT_COLORS,
}: {
  position: [number, number, number];
  speed?: number;
  colors?: Partial<typeof DEFAULT_COLORS>;
}) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('./macaron_conf1.glb');

  const finalColors = { ...DEFAULT_COLORS, ...colors };

  const coloredScene = useMemo(() => {
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (isMesh(child)) {
        const partName = child.name;
        if (partName === 'Top' || partName === 'Bottom' || partName === 'Center') {
          const material = child.material;

          // Обрабатываем как одиночный материал, так и массив
          const processMaterial = (mat: THREE.Material) => {
            if (isColorableMaterial(mat)) {
              const newMat = mat.clone();
              newMat.map = null;
              newMat.needsUpdate = true;
              newMat.color.set(finalColors[partName as keyof typeof finalColors]);
              return newMat;
            }
            return mat; // если не подходит, оставляем как есть
          };

          if (Array.isArray(material)) {
            // Заменяем все материалы в массиве (или можно заменить только первый)
            child.material = material.map(processMaterial);
          } else {
            child.material = processMaterial(material);
          }
        }
      }
    });

    return cloned;
  }, [scene, finalColors]);

  useEffect(() => {
    return () => {
      coloredScene.traverse((child) => {
        if (isMesh(child)) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach(m => m.dispose());
          } else {
            material.dispose();
          }
        }
      });
    };
  }, [coloredScene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });

  return <primitive ref={ref} object={coloredScene} position={position} />;
}