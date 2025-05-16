import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

// ✅ Reusable component to load and render a GLB model
const GLBModel = ({ modelPath, position = [0, 0, 0], scale = 1 }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const gltf = useLoader(GLTFLoader, modelPath);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={position}
      scale={hovered ? scale * 1.2 : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

// ✅ Main 3D gallery component
const ModelsGallery = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      {/* Link Button */}
      <a
        href="https://sunyux.github.io/ModelsGallery/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1,
          padding: '10px 16px',
          background: '#ffffffcc',
          border: 'none',
          borderRadius: '8px',
          textDecoration: 'none',
          color: '#111',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        More 3D Models
      </a>

      <Canvas
        style={{ height: '100%', width: '100%', background: '#111' }}
        camera={{ position: [0, 2, 5], fov: 50 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />

        <Suspense fallback={null}>
          <GLBModel modelPath="models/Keyboard.glb" position={[0, 0, 0]} scale={1.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelsGallery;
