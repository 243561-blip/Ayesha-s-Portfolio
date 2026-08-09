import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  currentSection: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ currentSection }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to CSS canvas background', e);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = THREE.Scene ? new THREE.Scene() : new (THREE as any).Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 25);

    // Mouse target tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xF27D26, 3, 100);
    goldLight.position.set(15, 15, 10);
    scene.add(goldLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 2.5, 100);
    tealLight.position.set(-15, -10, 10);
    scene.add(tealLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 20, 20);
    scene.add(dirLight);

    // --- 1. Floating Particles Field ---
    const particleCount = window.innerWidth < 768 ? 200 : 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 60;
      particlePos[i + 1] = (Math.random() - 0.5) * 60;
      particlePos[i + 2] = (Math.random() - 0.5) * 50;

      particleSpeeds[i] = (Math.random() - 0.5) * 0.005;
      particleSpeeds[i + 1] = (Math.random() - 0.5) * 0.005;
      particleSpeeds[i + 2] = (Math.random() - 0.5) * 0.005;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xF27D26,
      size: 0.2,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 2. Central Developer Core (Hero Object) ---
    const coreGroup = new THREE.Group();

    // Outer wireframe dodecahedron
    const outerGeo = new THREE.DodecahedronGeometry(3.5, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xF27D26,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Inner glowing octahedron
    const innerGeo = new THREE.OctahedronGeometry(2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Concentric orbital rings
    const ringGeo1 = new THREE.TorusGeometry(4.8, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xF27D26, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(5.6, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    coreGroup.position.set(0, 0, 0);
    scene.add(coreGroup);

    // --- 3. Floating Network Nodes & Lines ---
    const nodeGroup = new THREE.Group();
    const nodeCount = 20;
    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 });

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeGroup.add(nodeMesh);
      nodes.push(nodeMesh);
    }

    // Connect nearby nodes with lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.15
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 15) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    nodeGroup.add(linesMesh);
    scene.add(nodeGroup);

    // --- 4. Floating 3D Code Cubes around background ---
    const cubeGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4,
      metalness: 0.6,
      wireframe: false
    });

    for (let i = 0; i < 12; i++) {
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      cubeGroup.add(cube);
    }
    scene.add(cubeGroup);

    // --- Animation & Render Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate Hero Core
      outerMesh.rotation.x = elapsedTime * 0.15;
      outerMesh.rotation.y = elapsedTime * 0.2;
      innerMesh.rotation.x = -elapsedTime * 0.25;
      innerMesh.rotation.y = -elapsedTime * 0.3;
      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.z = -elapsedTime * 0.15;

      // React Hero Core to mouse
      coreGroup.rotation.y = mouse.x * 0.4;
      coreGroup.rotation.x = -mouse.y * 0.4;

      // Animate particles
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + i) * 0.003;
        positions[i] += Math.cos(elapsedTime + i) * 0.002;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Animate background nodes & cubes
      nodeGroup.rotation.y = elapsedTime * 0.02 + mouse.x * 0.1;
      cubeGroup.rotation.x = elapsedTime * 0.03 + mouse.y * 0.1;

      // Camera position shifts according to section & cursor
      let targetCamX = mouse.x * 3;
      let targetCamY = mouse.y * 3;
      let targetCamZ = 25;

      // Section-specific camera offsets
      const section = (window as any).__CURRENT_SECTION__ || 'home';
      if (section === 'about') {
        targetCamX += 5;
        targetCamY += -2;
        targetCamZ = 28;
      } else if (section === 'projects') {
        targetCamX += -5;
        targetCamY += 3;
        targetCamZ = 30;
      } else if (section === 'experience') {
        targetCamX += 3;
        targetCamY += -4;
        targetCamZ = 26;
      } else if (section === 'contact') {
        targetCamX += 0;
        targetCamY += -5;
        targetCamZ = 22;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.03;
      camera.position.y += (targetCamY - camera.position.y) * 0.03;
      camera.position.z += (targetCamZ - camera.position.z) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 50%, #121215 0%, #050505 100%)' }}
    >
      {/* CSS grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)',
          transformOrigin: 'top center'
        }}
      />
    </div>
  );
};
