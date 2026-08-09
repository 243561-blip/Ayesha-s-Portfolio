import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  currentSection: string;
}

function FloatingParticles({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const gold = new THREE.Color('#F27D26');
    const teal = new THREE.Color('#14b8a6');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const rand = Math.random();
      const chosenColor = rand > 0.6 ? gold : rand > 0.3 ? teal : white;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DeveloperCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const mouse = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.5, 0.05);
    }
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.2;
      outerRef.current.rotation.x += delta * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.2;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Dodecahedron */}
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[3.2, 0]} />
        <meshStandardMaterial
          color="#F27D26"
          wireframe
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner Octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#14b8a6"
          wireframe
          transparent
          opacity={0.75}
          roughness={0.1}
        />
      </mesh>

      {/* Torus Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#F27D26" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[5.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null!);

  const cubes = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 30
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.8,
      rotSpeed: (Math.random() - 0.5) * 0.02
    }));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, idx) => (
        <mesh key={idx} position={c.pos} scale={c.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? "#141418" : "#1a1a22"}
            roughness={0.3}
            metalness={0.7}
            wireframe={idx % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ currentSection }: { currentSection: string }) {
  useFrame((state) => {
    const mouse = state.pointer;
    let targetX = mouse.x * 2.5;
    let targetY = mouse.y * 2.5;
    let targetZ = 22;

    if (currentSection === 'about') {
      targetX += 4;
      targetY += -2;
      targetZ = 25;
    } else if (currentSection === 'projects') {
      targetX += -4;
      targetY += 2;
      targetZ = 26;
    } else if (currentSection === 'experience') {
      targetX += 3;
      targetY += -3;
      targetZ = 24;
    } else if (currentSection === 'contact') {
      targetX += 0;
      targetY += -4;
      targetZ = 20;
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.03);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Canvas3D({ currentSection }: SceneProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[15, 15, 10]} color="#F27D26" intensity={2.5} />
        <pointLight position={[-15, -10, 10]} color="#14b8a6" intensity={2} />
        <directionalLight position={[0, 20, 20]} intensity={0.8} />

        <FloatingParticles />
        <DeveloperCore />
        <FloatingCubes />
        <CameraRig currentSection={currentSection} />
      </Canvas>
    </div>
  );
}
