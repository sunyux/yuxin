import profile from '../img/Yuxin.jpg'
import cv from '../img/cv.png'

const About =() =>{
    return(
        <>
          <h1 className='drop-shadow-md text-menu md:text-[70px]'>About Me</h1>
            <h2 className='pt-2 text-menu'>Something little about me</h2>
            <div className="md:grid md:grid-cols-2 md:gap-4">
                <div>
                    
                    <p className='text-white pt-10'>As a senior student at Portland State University studying full-stack development, I have a diverse set of skills in the field, including web development, UI design, deep learning, and computer vision. My experience in full-stack development allows me to handle both the front-end and back-end aspects of web development, giving me a comprehensive understanding of the process. My expertise in deep learning and computer vision highlights my knowledge of cutting-edge technology, making me a valuable asset in the field of technology and software development. Additionally, my interest in VR and gaming development show my passion for new and emerging technologies, and could lead to exciting and innovative projects in the future.</p>
                    <h2 className='pt-4 text-menu'>Download my resume</h2>
                    <a href="../Resume" download="YuxinResume"><img className='inline ml-[10px] w-[40px] h-[40px] md:w-[60px] md:h-[60px]' src={cv} alt="Download resume" /></a>

                </div>
                <div className='relative flex justify-center'>
                    <img className='w-4/6 p-1 bg-border mt-10' src={profile} alt="Profile pic" />;
                </div>
            </div>
        </>
    )

}

export default About;