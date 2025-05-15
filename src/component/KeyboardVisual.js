import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const KeyboardVisual = ({ onKeyPress = () => {}, keyColors = {} }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const keyboardRef = useRef(null);
  const rendererRef = useRef(null);
  const keysRef = useRef({});
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Store canvas reference for cleanup
    const canvas = canvasRef.current;
    
    // Setup mouse tracking
    const handleMouseMove = (event) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: true,
      alpha: true 
    });
    rendererRef.current = renderer;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create keyboard
    const keyboardGroup = new THREE.Group();
    keyboardRef.current = keyboardGroup;
    
    // Base plate
    const baseGeometry = new THREE.BoxGeometry(3, 0.1, 1.2);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    keyboardGroup.add(base);
    
    // Create key grid
    const keys = {};
    keysRef.current = keys;
    
    // Default key material
    const defaultKeyMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    
    // Key layout - rows and columns
    const keyLayout = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
    ];
    
    // Create keys
    for (let row = 0; row < keyLayout.length; row++) {
      for (let col = 0; col < keyLayout[row].length; col++) {
        const keyChar = keyLayout[row][col];
        const keyGeometry = new THREE.BoxGeometry(0.25, 0.08, 0.25);
        
        // Use custom color from props or default
        const keyColor = keyColors[keyChar] || 0x888888;
        const keyMaterial = new THREE.MeshStandardMaterial({ 
          color: keyColor,
          emissive: keyColor,
          emissiveIntensity: 0.2
        });
        
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        
        // Position keys in grid
        key.position.x = -1.25 + (col * 0.28);
        key.position.y = 0.09;
        key.position.z = -0.5 + (row * 0.28);
        
        key.userData = { 
          keyChar,
          originalY: key.position.y,
          originalEmissiveIntensity: 0.2
        };
        
        keyboardGroup.add(key);
        keys[keyChar] = key;
      }
    }
    
    // Add space bar
    const spaceGeometry = new THREE.BoxGeometry(1.8, 0.08, 0.25);
    const spaceMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const spaceBar = new THREE.Mesh(spaceGeometry, spaceMaterial);
    spaceBar.position.set(0, 0.09, 0.5);
    spaceBar.userData = { 
      keyChar: 'SPACE',
      originalY: spaceBar.position.y
    };
    keyboardGroup.add(spaceBar);
    keys['SPACE'] = spaceBar;
    
    // Add keyboard to scene
    keyboardGroup.rotation.y = -10; // Adjust angle as needed

    scene.add(keyboardGroup);
    
    // Setup raycaster for interactive keys
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvas || !renderer) return;
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Handle mouse clicks on keys
    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      const keyObjects = Object.values(keys);
      const intersects = raycaster.intersectObjects(keyObjects);
      
      if (intersects.length > 0) {
        const clickedKey = intersects[0].object;
        const keyChar = clickedKey.userData.keyChar;
        
        // Animate key press
        clickedKey.position.y -= 0.05;
        clickedKey.material.emissiveIntensity = 0.8;
        
        // Reset key position after animation
        setTimeout(() => {
          clickedKey.position.y = clickedKey.userData.originalY;
          clickedKey.material.emissiveIntensity = clickedKey.userData.originalEmissiveIntensity || 0.2;
          
          // Notify parent component about key press
          onKeyPress(keyChar);
        }, 150);
      }
    };
    
    canvas.addEventListener('click', handleClick);
    
    // Animation loop
    const clock = new THREE.Clock();
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Make keyboard follow mouse slightly
      if (keyboardRef.current && mousePositionRef.current) {
        const targetX = (mousePositionRef.current.x / window.innerWidth) * 2 - 1;
        const targetY = -((mousePositionRef.current.y / window.innerHeight) * 2 - 1);
        
        const maxRotationX = 1.0; // More tilt up/down
        const maxRotationY = 1.2; // More tilt left/right

        keyboardRef.current.rotation.x = THREE.MathUtils.clamp(targetY * 1.0, -maxRotationX, maxRotationX);
        keyboardRef.current.rotation.y = THREE.MathUtils.clamp(targetX * 1.6, -maxRotationY, maxRotationY);


        
        // Add gentle floating animation
        const time = clock.getElapsedTime();
        keyboardRef.current.position.y = Math.sin(time * 0.8) * 0.05;
      }
      
      // Update hovering effect on keys
      if (keyboardRef.current) {
        raycaster.setFromCamera(
          new THREE.Vector2(
            (mousePositionRef.current.x / window.innerWidth) * 2 - 1,
            -((mousePositionRef.current.y / window.innerHeight) * 2 - 1)
          ),
          camera
        );
        
        const keyObjects = Object.values(keys);
        const intersects = raycaster.intersectObjects(keyObjects);
        
        // Reset all keys
        keyObjects.forEach(key => {
          if (!key.userData.isPressed) {
            key.material.emissiveIntensity = key.userData.originalEmissiveIntensity || 0.2;
          }
        });
        
        // Highlight hovered key
        if (intersects.length > 0) {
          const hoveredKey = intersects[0].object;
          if (!hoveredKey.userData.isPressed) {
            hoveredKey.material.emissiveIntensity = 0.6;
          }
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Dispose of Three.js resources
      Object.values(keys).forEach(key => {
        key.geometry.dispose();
        key.material.dispose();
      });
      
      base.geometry.dispose();
      base.material.dispose();
      
      renderer.dispose();
    };
  }, [keyColors, onKeyPress]);
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ 
        background: 'transparent',
        touchAction: 'none'
      }}
    />
  );
};

export default KeyboardVisual;