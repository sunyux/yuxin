import meme from '../img/Meme.jpg'
import Boba from '../img/Boba.jpg'
import media from '../img/media.jpg'
import portfolio from '../img/sunyux.jpg'
import stroke from '../img/Stroke_Victimm.jpg'

const images = [
    { image: meme, title: "Meme Generator Web Application", desc: "React, Docker and googlecloud" ,link:"https://meme-me3odwmlxq-uw.a.run.app/"},
    { image: media, title: "Social media website", desc: "HTML and CSS",link:"https://github.com/sunyux/stu-media" },
    { image: Boba, title: "UI design if boba search website", desc: "Figma", link:"https://www.figma.com/file/7aV9KXP25BUxDigoo92GMb/Home-page?node-id=0%3A1"},
    { image: portfolio, title: "Personal website", desc: "React, Three.js and Tailwind", link:"https://github.com/sunyux/Portfolio"},
    { image: stroke, title: "Stroke Victimm Classifiers", desc: "Machine Learning", link:"https://github.com/sunyux/Stroke-Victim-Classifiers/blob/main/Bayesian_for_Final_program.ipynb"},
]
const Project =() =>{
    return(
        <> <h1 className='drop-shadow-md text-menu md:text-[70px]'>My Work</h1>
        <h2 className='pt-2 text-menu'>Check out my previous work</h2>
        <div className="md:grid md:grid-cols-2 md:gap-4 mt-4">
            {images.map((item, key) =>
                <div className="mb-4 md:mb-0 rounded-[20px] border-2 border-cover relative overflow-hidden" key={key}>
                    <a href={item.link} target="_blank"><img src={item.image} alt={item.title}/></a>
                    <div className="absolute bottom-0 z-10 w-full h-[80px]">
                        <button onclick={item.link} target="_blank">lick Here</button>
                        <div className="absolute bg-black opacity-80 w-full h-full"></div>
                        <h2 className="top-2 left-4 relative  text-white font-bold">{item.title}</h2>
                        <p className="top-2 left-4 relative text-white">{item.desc}</p>
                    
                    </div>
                </div>
            )}
        </div>
        </>
    )

}

export default Project;