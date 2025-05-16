import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

// ✅ Model component
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

// ✅ Gallery wrapper
const ModelsGallery = () => {
  return (
    <Canvas
      style={{ height: '100vh', width: '100vw', background: '#111' }}
      camera={{ position: [0, 2, 5], fov: 50 }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />

      {/* ✅ Load your model from public/models/Keyboard.glb */}
      <GLBModel modelPath="/\models/Keyboard.glb" position={[0, 0, 0]} scale={1.5} />
    </Canvas>
  );
};

export default ModelsGallery;
