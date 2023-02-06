import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, PresentationControls, Environment, ContactShadows, Html, useFBX } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import About from "./About";
import Project from "./Project";
import Contact from "./Contact";
import Skill from "./Skill";

const menuItem = [
    {
        label: "About Me",
        content: <About/>
    },
    {
        label: "Project",
        content: <Project/>
    }
    ,
    {
        label: "Skill",
        content: <Skill/>
    },
    {
        label: "Contact",
        content: <Contact/>
    }
]


const Bot = () => {
    const fbx = useFBX('/assets/Spaceship.fbx')
    return <primitive object={fbx} scale={0.2} rotation={[2.2, -0.3, 0]} />;
};

const CustomMenu = (props) => {
    const ref = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
        ref.current.rotation.y = Math.sin(t / 4) / 8
        ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    })
    const menuClicked = (item) => {
        props.setMenu(item);

        setTimeout(() => {
            props.setTime(true);
        }, 600)
    }
   

    return (
        <group ref={ref} {...props} dispose={null}>
            {menuItem.map((item, key) =>
                <>
                    <mesh>
                        <Html wrapperClass key={key} scale={0.7} rotation={[Math.PI / 2, 0, 0]} position={[1.88, 0, (key + -2) * -0.5]} transform>
                            <div className="group relative cursor-pointer flex items-center justify-center h-[22px] text-menu w-[97px] text-center text-sm hover:text-white"
                                onClick={()=>menuClicked(item)}>
                                <div className="absolute z-[-1] h-full bg-menu w-0 right-0 block transform group-hover:animate-cover"></div>
                                {item.label}
                            </div>
                        </Html>
                    </mesh>
                    <mesh scale={[1.7, 0.1, 0.4]} position={[1.88, 0.06, (key + -2) * -0.5]}>
                        <boxBufferGeometry />
                        <meshStandardMaterial color="#6600cc" />
                    </mesh>
                </>
            )}
            <Bot />
            <EffectComposer>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={100} />
            </EffectComposer>
        </group>
    )
}


const InteractiveMenu = () => {

    const [getMenu,setMenu]=useState(null);
    const [isTime,setTime]=useState(null);
    const closePage = () => {
        setMenu(null);
        setTime(false);
        window.scrollTo(0, 0);
    }


    
    return (
      <>
        <div className={`mt-20 h-[65vh] md:mt-0 md:w-full md:h-full transition-opacity duration-500 opacity-0 ${!getMenu && 'opacity-100'}`}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 70 }}>
                <PerspectiveCamera makeDefault fov={70} position={[0, 0, 5]} focusDistance={[0, 0]} />
                <ambientLight color="#ff0a65" intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 6, Math.PI / 6]}>
                    {!getMenu && <CustomMenu rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={1} setMenu={setMenu} setTime={setTime} />}
                </PresentationControls>
                <ContactShadows position={[0, -1.4, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />
            </Canvas>
        </div>

        {getMenu && 
                <div className='absolute w-full min-h-full bg-gradient top-0 z-20 flex justify-center'>
                    <div className={`p-10 mt-8 md:mt-0 md:max-w-[80%] md:p-20 transition-opacity duration-1000 opacity-0 ${isTime && 'delay-300 opacity-100'}`}>
                        {getMenu.content}
                        <div className='fixed group top-[10px] right-[10px] md:top-[50px] md:right-[50px] w-[80px] h-[80px] cursor-pointer flex justify-center items-center text-menuText hover:text-white' onClick={() => closePage()} >
                            <div className="absolute h-full bg-menu w-0 right-0 block transform group-hover:animate-cover"></div>
                            <p className='absolute  text-menu font-normal text-[30px] hover:text-white'>Back</p>
                        </div>
                    </div>
                </div>}
                <div className={`absolute block w-full bg-border z-20 transition-all duration-500 ease-in ${getMenu ? 'bottom-0 h-full' : 'h-0'}  ${isTime && 'delay-[unset] top-0 h-0'}`}></div>

      </>
    );
}

export default InteractiveMenu;