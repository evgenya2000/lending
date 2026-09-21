'use client';

import { Suspense, useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MODEL_PATH = '/macaron_conf1_draco.glb';

useGLTF.setDecoderPath('/draco/');
useGLTF.preload(MODEL_PATH);

const DEFAULT_COLORS = {
  Top: '#ff6b6b',
  Bottom: '#fbc490',
  Center: '#ffffff',
};

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return object.type === 'Mesh';
}

function isColorableMaterial(material: THREE.Material): material is (THREE.MeshStandardMaterial | THREE.MeshPhongMaterial) {
  return 'color' in material && 'map' in material;
}

interface LoadedMacaronProps {
  position: [number, number, number];
  speed: number;
  topColor: string;
  bottomColor: string;
  centerColor: string;
}

function LoadedMacaron({
  position,
  speed,
  topColor,
  bottomColor,
  centerColor,
}: LoadedMacaronProps) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const coloredScene = useMemo(() => {
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (isMesh(child)) {
        const partName = child.name;
        if (partName === 'Top' || partName === 'Bottom' || partName === 'Center') {
          const material = child.material;

          const processMaterial = (mat: THREE.Material) => {
            if (isColorableMaterial(mat)) {
              const newMat = mat.clone();
              newMat.map = null;
              newMat.needsUpdate = true;
              newMat.color.set(
                partName === 'Top' ? topColor :
                partName === 'Bottom' ? bottomColor :
                centerColor
              );
              return newMat;
            }
            return mat;
          };

          if (Array.isArray(material)) {
            child.material = material.map(processMaterial);
          } else {
            child.material = processMaterial(material);
          }
        }
      }
    });

    return cloned;
  }, [scene, topColor, bottomColor, centerColor]);

  useEffect(() => {
    return () => {
      coloredScene.traverse((child) => {
        if (isMesh(child)) {
          const material = child.material;
          if (Array.isArray(material)) {
            material.forEach((mat) => mat.dispose());
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

  return <primitive ref={ref} object={coloredScene} position={position} scale={1.8} />;
}

export function Macaron({
  position,
  speed = 0.5,
  colors = DEFAULT_COLORS,
  visible = false,
}: {
  position: [number, number, number];
  speed?: number;
  colors?: Partial<typeof DEFAULT_COLORS>;
  visible?: boolean;
}) {
  const topColor = colors?.Top ?? DEFAULT_COLORS.Top;
  const bottomColor = colors?.Bottom ?? DEFAULT_COLORS.Bottom;
  const centerColor = colors?.Center ?? DEFAULT_COLORS.Center;

  // useGLTF вызывается только внутри Suspense-компонента LoadedMacaron,
  // чтобы не пытаться загружать файл, когда карточка не видна
  if (!visible) return null;

  return (
    <Suspense fallback={null}>
      <LoadedMacaron
        position={position}
        speed={speed}
        topColor={topColor}
        bottomColor={bottomColor}
        centerColor={centerColor}
      />
    </Suspense>
  );
}