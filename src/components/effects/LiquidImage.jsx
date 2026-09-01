import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uIntensity;
  
  varying vec2 vUv;

  void main() {
    // Calculate aspect ratios for object-fit: cover behavior
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageRes.x / uImageRes.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageRes.y / uImageRes.x), 1.0)
    );
    
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec2 p = uv;
    vec2 m = uMouse;
    
    // distance from mouse to current pixel
    vec2 d = p - m;
    // Account for aspect ratio in distance calculation for perfectly round distortion
    d.x *= uResolution.x / uResolution.y;
    float dist = length(d);
    
    // Smooth falloff based on radius
    float radius = 0.35;
    float falloff = smoothstep(radius, 0.0, dist);
    
    // Liquid distortion direction
    vec2 dir = normalize(d + 0.0001);
    
    // warp amount
    float warp = falloff * uHover * uIntensity;
    
    // apply warp to UV
    vec2 warpedUv = p - dir * warp;
    
    // Chromatic aberration (RGB shift)
    float r = texture2D(uImage, warpedUv + dir * warp * 0.6).r;
    float g = texture2D(uImage, warpedUv).g;
    float b = texture2D(uImage, warpedUv - dir * warp * 0.6).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

function LiquidPlane({ imageSrc, intensity = 0.15 }) {
  const materialRef = useRef();
  const texture = useTexture(imageSrc);
  const { size, viewport } = useThree();
  
  // Use state to track mouse internally to smooth it
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetHover = useRef(0);

  const uniforms = useMemo(() => ({
    uImage: { value: texture },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uImageRes: { value: new THREE.Vector2(texture.image.width, texture.image.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uIntensity: { value: intensity }
  }), [texture, size, intensity]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uImageRes.value.set(texture.image.width, texture.image.height);
    }
  }, [size, texture]);

  useFrame((state) => {
    // We map state.pointer (-1 to 1) to (0 to 1) for the shader UV.
    targetMouse.current.set(
      state.pointer.x * 0.5 + 0.5,
      state.pointer.y * 0.5 + 0.5
    );

    // Lerp mouse
    currentMouse.current.lerp(targetMouse.current, 0.1);
    
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value, 
        targetHover.current, 
        0.1
      );
    }
  });

  const onPointerOver = () => { targetHover.current = 1; };
  const onPointerOut = () => { targetHover.current = 0; };

  return (
    <mesh 
      onPointerOver={onPointerOver} 
      onPointerOut={onPointerOut}
      onPointerMove={onPointerOver} 
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LiquidImage({ src, className = '', intensity = 0.15 }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '200px' });
  
  return (
    <div 
      ref={containerRef} 
      className={`liquid-image-container ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* 
        This base image appears instantly since it's preloaded. 
        The Canvas (WebGL) will seamlessly render over it once ready.
      */}
      <img 
        src={src} 
        alt="" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none'
        }} 
      />
      {isInView && (
        <Canvas 
          frameloop="always" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 1] }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 2]} 
        >
          <React.Suspense fallback={null}>
            <LiquidPlane imageSrc={src} intensity={intensity} />
          </React.Suspense>
        </Canvas>
      )}
    </div>
  );
}
