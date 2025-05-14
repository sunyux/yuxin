import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import About from './About';
import Project from './Project';
import Contact from './Contact';
import Skill from './Skill';

// Menu items array with key positions
const menuItems = [
  {
    label: 'About Me',
    content: <About />,
    keyPosition: { rowIndex: 0, keyIndex: 2 }, // Position on keyboard
    keyColor: '0x3b82f6', // Blue
  },
  {
    label: 'Project', 
    content: <Project />,
    keyPosition: { rowIndex: 0, keyIndex: 5 },
    keyColor: '0x8b5cf6', // Purple
  },
  {
    label: 'Skill',
    content: <Skill />,
    keyPosition: { rowIndex: 1, keyIndex: 3 },
    keyColor: '0x10b981', // Green
  },
  {
    label: 'Contact',
    content: <Contact />,
    keyPosition: { rowIndex: 1, keyIndex: 8 },
    keyColor: '0xef4444', // Red
  },
];

const KeyboardMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null);
  
  const mousePosition = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const keyboardRef = useRef(null);
  const rendererRef = useRef(null);
  const keysRef = useRef([]);
  const labelRefs = useRef([]);
  
  // Setup Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);
    
    // Create keyboard model
    const keyboardGroup = new THREE.Group();
    keyboardRef.current = keyboardGroup;
    
    // Base of keyboard
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 1.5);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.receiveShadow = true;
    base.castShadow = true;
    keyboardGroup.add(base);
    
    // Keys - common material for regular keys
    const keyMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    
    // Initialize key references array structure
    keysRef.current = [
      [], // row 1
      [], // row 2
      [], // row 3
    ];
    
    // Create text labels for keys
    labelRefs.current = [];
    
    // Keys - row 1
    for (let i = 0; i < 12; i++) {
      const keyGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
      
      // Check if this key is a menu key
      const menuItem = menuItems.find(item => 
        item.keyPosition.rowIndex === 0 && item.keyPosition.keyIndex === i
      );
      
      // Use menu color or default
      const material = menuItem 
        ? new THREE.MeshStandardMaterial({ 
            color: parseInt(menuItem.keyColor, 16),
            emissive: parseInt(menuItem.keyColor, 16),
            emissiveIntensity: 0.2
          })
        : keyMaterial.clone();
      
      const key = new THREE.Mesh(keyGeometry, material);
      key.position.set(-1.35 + i * 0.25, 0.15, -0.5);
      key.receiveShadow = true;
      key.castShadow = true;
      key.userData = { 
        isMenuKey: !!menuItem,
        menuIndex: menuItem ? menuItems.indexOf(menuItem) : null,
        rowIndex: 0,
        keyIndex: i
      };
      keyboardGroup.add(key);
      keysRef.current[0].push(key);
    }
    
    // Keys - row 2
    for (let i = 0; i < 12; i++) {
      const keyGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
      
      // Check if this key is a menu key
      const menuItem = menuItems.find(item => 
        item.keyPosition.rowIndex === 1 && item.keyPosition.keyIndex === i
      );
      
      // Use menu color or default
      const material = menuItem 
        ? new THREE.MeshStandardMaterial({ 
            color: parseInt(menuItem.keyColor, 16),
            emissive: parseInt(menuItem.keyColor, 16),
            emissiveIntensity: 0.2
          })
        : keyMaterial.clone();
      
      const key = new THREE.Mesh(keyGeometry, material);
      key.position.set(-1.30 + i * 0.25, 0.15, -0.2);
      key.receiveShadow = true;
      key.castShadow = true;
      key.userData = { 
        isMenuKey: !!menuItem,
        menuIndex: menuItem ? menuItems.indexOf(menuItem) : null,
        rowIndex: 1,
        keyIndex: i
      };
      keyboardGroup.add(key);
      keysRef.current[1].push(key);
    }
    
    // Keys - row 3
    for (let i = 0; i < 12; i++) {
      const keyGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
      
      // Check if this key is a menu key
      const menuItem = menuItems.find(item => 
        item.keyPosition.rowIndex === 2 && item.keyPosition.keyIndex === i
      );
      
      // Use menu color or default
      const material = menuItem 
        ? new THREE.MeshStandardMaterial({ 
            color: parseInt(menuItem.keyColor, 16),
            emissive: parseInt(menuItem.keyColor, 16),
            emissiveIntensity: 0.2
          })
        : keyMaterial.clone();
      
      const key = new THREE.Mesh(keyGeometry, material);
      key.position.set(-1.25 + i * 0.25, 0.15, 0.1);
      key.receiveShadow = true;
      key.castShadow = true;
      key.userData = { 
        isMenuKey: !!menuItem,
        menuIndex: menuItem ? menuItems.indexOf(menuItem) : null,
        rowIndex: 2,
        keyIndex: i
      };
      keyboardGroup.add(key);
      keysRef.current[2].push(key);
    }
    
    // Space bar
    const spaceGeometry = new THREE.BoxGeometry(2, 0.1, 0.3);
    const spaceMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const spaceBar = new THREE.Mesh(spaceGeometry, spaceMaterial);
    spaceBar.position.set(0, 0.15, 0.5);
    spaceBar.receiveShadow = true;
    spaceBar.castShadow = true;
    keyboardGroup.add(spaceBar);
    
    // Add keyboard to scene
    scene.add(keyboardGroup);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Setup raycaster for mouse interaction with keys
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Animation loop
    const clock = new THREE.Clock();
    
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (keyboardRef.current && mousePosition.current) {
        // Calculate target position based on mouse position
        const targetX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
        const targetY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;
        
        // Smooth interpolation to the target position
        keyboardRef.current.rotation.y = THREE.MathUtils.lerp(
          keyboardRef.current.rotation.y,
          targetX * 0.5,
          0.05
        );
        keyboardRef.current.rotation.x = THREE.MathUtils.lerp(
          keyboardRef.current.rotation.x,
          targetY * 0.2,
          0.05
        );
        
        // Add some floating motion
        const time = clock.getElapsedTime();
        keyboardRef.current.position.y = Math.sin(time * 0.5) * 0.1;
        
        // Check if mouse is near keyboard to show menu
        const distance = Math.sqrt(targetX * targetX + targetY * targetY);
        setMenuVisible(distance < 0.8); // Show menu when mouse is near the keyboard
        
        // Update mouse position for raycaster
        mouse.x = targetX;
        mouse.y = targetY;
        
        // Update raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Check for intersections
        const allKeys = [].concat(...keysRef.current);
        const intersects = raycaster.intersectObjects(allKeys);
        
        // Reset all non-menu keys
        allKeys.forEach(key => {
          if (!key.userData.isMenuKey) {
            key.material.emissiveIntensity = 0;
          }
        });
        
        // Handle key hover effects
        if (intersects.length > 0) {
          const intersectedKey = intersects[0].object;
          
          if (intersectedKey.userData.isMenuKey) {
            // Set hovered key for menu display
            setHoveredKey(intersectedKey.userData.menuIndex);
            
            // Make key glow more intensely
            intersectedKey.material.emissiveIntensity = 0.8;
          } else {
            // For non-menu keys, just add a subtle glow
            intersectedKey.material.emissive = new THREE.Color(0xffffff);
            intersectedKey.material.emissiveIntensity = 0.5;
            setHoveredKey(null);
          }
        } else {
          setHoveredKey(null);
        }
        
        // Pulse animation for menu keys
        menuItems.forEach((item, index) => {
          const row = item.keyPosition.rowIndex;
          const keyIndex = item.keyPosition.keyIndex;
          
          if (keysRef.current[row] && keysRef.current[row][keyIndex]) {
            const menuKey = keysRef.current[row][keyIndex];
            
            // Skip if this is the currently hovered key (which already has its own effect)
            if (hoveredKey === index) return;
            
            // Create subtle pulsing effect
            const pulseIntensity = 0.2 + Math.sin(time * 2 + index) * 0.1;
            menuKey.material.emissiveIntensity = pulseIntensity;
          }
        });
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [hoveredKey]);
  
  // Track mouse position and handle click interactions
  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    // Handle clicks for key selection
    const handleClick = (event) => {
      // Check if we're clicking on a menu label (2D HTML elements)
      const labelElements = document.querySelectorAll('.menu-label');
      let clickedOnLabel = false;
      
      labelElements.forEach((label) => {
        if (label.contains(event.target)) {
          // Find the index from the data attribute
          const menuIndex = parseInt(label.dataset.menuIndex);
          if (!isNaN(menuIndex) && menuIndex >= 0 && menuIndex < menuItems.length) {
            setActiveKey(menuIndex);
            selectMenuItem(menuItems[menuIndex]);
            clickedOnLabel = true;
          }
        }
      });
      
      // If not clicking on label, check if hovering over a 3D key
      if (!clickedOnLabel && hoveredKey !== null) {
        setActiveKey(hoveredKey);
        selectMenuItem(menuItems[hoveredKey]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [hoveredKey]);

  const selectMenuItem = (item) => {
    setActiveMenu(item);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const closePage = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveMenu(null);
      setActiveKey(null);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 600);
  };

  return (
    <>
      <div className={`flex flex-col md:flex-row h-screen transition-opacity duration-500 ${!activeMenu ? 'opacity-100' : 'opacity-0'}`}>
        {/* 3D Model Container */}
        <div className="h-full w-full">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
          />
          
          {/* Floating Menu Labels */}
          <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300 ${menuVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              {menuItems.map((item, index) => {
                // Calculate position based on the key's position
                const row = item.keyPosition.rowIndex;
                const keyIndex = item.keyPosition.keyIndex;
                
                // Rough position calculation - this would need to be adjusted based on actual key positions
                const topOffset = 30 + (row * 10);
                const leftOffset = 25 + (keyIndex * 6);
                
                return (
                  <div 
                    key={index}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto
                              cursor-pointer text-center transition-all duration-300 menu-label
                              ${hoveredKey === index ? 'scale-110 z-20' : 'scale-100 z-10'}`}
                    style={{
                      top: `${topOffset}%`,
                      left: `${leftOffset}%`,
                      color: item.keyColor.replace('0x', '#')
                    }}
                    data-menu-index={index}
                    onClick={() => {
                      setActiveKey(index);
                      selectMenuItem(item);
                    }}
                  >
                    <div className={`absolute top-0 left-0 w-full h-full rounded-lg opacity-20 ${hoveredKey === index ? 'opacity-40 animate-pulse' : ''}`} 
                         style={{backgroundColor: item.keyColor.replace('0x', '#')}}></div>
                    <span className={`relative z-10 font-bold text-lg md:text-xl ${hoveredKey === index ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content Page */}
      {activeMenu && (
        <div className="absolute w-full min-h-full top-0 z-20 flex justify-center"
             style={{backgroundColor: `${activeMenu.keyColor.replace('0x', '#')}30`}}>
          <div className={`p-10 mt-8 md:mt-0 md:max-w-4/5 md:p-20 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {activeMenu.content}
            <div
              className="fixed group top-2 right-2 md:top-12 md:right-12 w-20 h-20 cursor-pointer flex justify-center items-center"
              onClick={closePage}
              style={{color: activeMenu.keyColor.replace('0x', '#')}}
            >
              <div className="absolute h-full rounded-full w-0 right-0 block transform group-hover:w-full transition-all duration-300"
                   style={{backgroundColor: `${activeMenu.keyColor.replace('0x', '#')}30`}}></div>
              <p className="absolute text-lg font-normal hover:text-white z-10">Back</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Transition overlay */}
      <div className={`absolute block w-full z-20 transition-all duration-500 ease-in ${
        activeMenu && isTransitioning ? 'top-0 h-full' : 'h-0'
      }`} 
        style={{backgroundColor: activeMenu ? activeMenu.keyColor.replace('0x', '#') : 'transparent'}}></div>

      {/* Debug Panel - Remove in production */}
      {false && (
        <div className="fixed bottom-2 left-2 bg-black bg-opacity-70 text-white p-2 rounded text-sm">
          <div>Hovered Key: {hoveredKey !== null ? menuItems[hoveredKey].label : 'None'}</div>
          <div>Active Key: {activeKey !== null ? menuItems[activeKey].label : 'None'}</div>
          <div>Menu Visible: {menuVisible ? 'Yes' : 'No'}</div>
        </div>
      )}
    </>
  );
};

// Error Boundary for the 3D components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-white bg-red-500 p-4 rounded">Something went wrong with the 3D model.</div>;
    }
    return this.props.children;
  }
}

// Wrap the export with the error boundary
export default function SafeKeyboardMenu() {
  return (
    <ErrorBoundary>
      <KeyboardMenu />
    </ErrorBoundary>
  );
}