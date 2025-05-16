import React, { useState } from 'react';
import About from './About';
import Project from './Project';
import Contact from './Contact';
import Skill from './Skill';
import ModelsGallery from './ModelGallery';

const menuItem = [
  {
    label: 'About Me',
    content: <About />,
  },
  {
    label: 'ModelsGallery',
    content: <ModelsGallery />,
  },
  {
    label: 'Project',
    content: <Project />,
  },
  {
    label: 'Skill',
    content: <Skill />,
  },
  {
    label: 'Contact',
    content: <Contact />,
  },
];

const InteractiveMenu1 = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const closePage = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setActiveMenu(null);
      window.scrollTo(0, 0);
    }, 500); // Match this timeout with your fadeout duration
  };

  const menuClicked = (item) => {
    setActiveMenu(item);
    // Small delay to ensure the new page container is rendered before fading in content
    setTimeout(() => {
      setIsContentVisible(true);
    }, 300);
  };

  return (
    <>
      {/* Main menu */}
      <div className={`mt-20 h-[65vh] md:mt-0 md:w-full md:h-full transition-opacity duration-500 ${!activeMenu ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {menuItem.map((item, key) => (
              <div
                key={key}
                className="group relative cursor-pointer flex items-center justify-center h-[22px] text-menu w-[97px] text-center text-sm hover:text-white"
                onClick={() => menuClicked(item)}
              >
                <div className="absolute z-[-1] h-full bg-menu w-0 right-0 block transform group-hover:animate-cover"></div>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content page */}
      {activeMenu && (
        <div className="absolute w-full min-h-full bg-gradient top-0 z-20 flex justify-center">
          <div className={`p-10 mt-8 md:mt-0 md:max-w-[80%] md:p-20 transition-opacity duration-1000 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
            {activeMenu.content}
            <div
              className="fixed group top-[10px] right-[10px] md:top-[50px] md:right-[50px] w-[80px] h-[80px] cursor-pointer flex justify-center items-center text-menuText hover:text-white"
              onClick={() => closePage()}
            >
              <div className="absolute h-full bg-menu w-0 right-0 block transform group-hover:animate-cover"></div>
              <p className="absolute text-menu font-normal text-[30px] hover:text-white">Back</p>
            </div>
          </div>
        </div>
      )}
      <div className={`absolute block w-full bg-border z-10 transition-all duration-500 ease-in ${activeMenu ? 'bottom-0 h-full' : 'h-0'} ${isContentVisible && 'delay-[unset] top-0 h-0'}`}></div>
    </>
  );
};

export default InteractiveMenu1;