import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import './InteractiveModel.css';

function AnimatedSphere({ mouse }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle base rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;

      // Respond to mouse
      if (mouse.current) {
        meshRef.current.rotation.x += mouse.current.y * 0.3;
        meshRef.current.rotation.y += mouse.current.x * 0.3;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} scale={2.2}>
        {/* Connecting lines */}
        <mesh>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial color="#EE6C4D" wireframe={true} transparent opacity={0.3} />
        </mesh>
        {/* Nodes (Dots) */}
        <points>
          <icosahedronGeometry args={[1, 3]} />
          <pointsMaterial color="#F6DC43" size={0.03} sizeAttenuation={true} transparent opacity={0.9} />
        </points>
      </group>
    </Float>
  );
}

function SecondaryOrb() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.6}>
      <octahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial
        color="#F6DC43"
        roughness={0.2}
        metalness={0.9}
        distort={0.3}
        speed={2}
        wireframe
      />
    </mesh>
  );
}

export default function InteractiveModel({ className = '' }) {
  const mouse = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  return (
    <div
      className={`interactive-model ${className}`}
      onMouseMove={handleMouseMove}
      data-cursor="EXPLORE"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#F6DC43" />
          <AnimatedSphere mouse={mouse} />
          <SecondaryOrb />
          <Environment preset="studio" />
        </Suspense>
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
}
