import './Skill.css';
import cv from '../img/cv.png'
const Skill =() =>{
    return(
    <> 
     <div style={{ display: "flex" }}>
        <div className="container" style={{ flexBasis: "calc(50% - 7.5px)", marginRight: "15px" }}>        
            <h1 className="title-text">Yuxin's Skill</h1>

            <div className="skill-box">
                <span className="title">Python</span>
                <div className="skill-bar">
                    <span className="skill-per html">
                        <span className="tooltip">95%</span>
                    </span>
                </div>
            </div>

            <div className="skill-box">
                <span className="title">C++</span>
                <div className="skill-bar">
                    <span className="skill-per Cplus">
                        <span className="tooltip">95%</span>
                    </span>
                </div>
            </div>


            <div className="skill-box">
                <span className="title">CSS</span>
                <div className="skill-bar">
                    <span className="skill-per css">
                        <span className="tooltip">90%</span>
                    </span>
                </div>
            </div>

            <div className="skill-box">
                <span className="title">HTML</span>
                <div className="skill-bar">
                    <span className="skill-per python">
                        <span className="tooltip">90%</span>
                    </span>
                </div>
            </div>

            <div className="skill-box">
                <span className="title">JavaScript</span>
                <div className="skill-bar">
                    <span className="skill-per javascript">
                        <span className="tooltip">80%</span>
                    </span>
                </div>
            </div>
       
    
            <div className="skill-box">
                <span className="title">SQL</span>
                <div className="skill-bar">
                    <span className="skill-per SQL">
                        <span className="tooltip">70%</span>
                    </span>
                </div>
            </div>
            <div className="skill-box">
                <span className="title">PHP</span>
                <div className="skill-bar">
                    <span className="skill-per php">
                        <span className="tooltip">60%</span>
                    </span>
                </div>
            </div>
        </div>
        <div className="container"  style={{ flexBasis: "calc(50% - 7.5px)" }}> 
            <h1 className="title-text">Yuxin's Tool</h1>

            <div className="skill-box">
                <span className="title">Pytorch</span>
                <div className="skill-bar">
                    <span className="skill-per html">
                        <span className="tooltip">95%</span>
                    </span>
                </div>
            </div>

            <div className="skill-box">
                <span className="title">Docker</span>
                <div className="skill-bar">
                    <span className="skill-per Cplus">
                        <span className="tooltip">95%</span>
                    </span>
                </div>
            </div>


            <div className="skill-box">
                <span className="title">React</span>
                <div className="skill-bar">
                    <span className="skill-per css">
                        <span className="tooltip">90%</span>
                    </span>
                </div>
            </div>

            <div className="skill-box">
                <span className="title">Linux</span>
                <div className="skill-bar">
                    <span className="skill-per python">
                        <span className="tooltip">90%</span>
                    </span>
                </div>
            </div>

            <div className="skill-box">
                <span className="title">Figma</span>
                <div className="skill-bar">
                    <span className="skill-per javascript">
                        <span className="tooltip">80%</span>
                    </span>
                </div>
            </div>
       
    
            <div className="skill-box">
                <span className="title">MongoDB</span>
                <div className="skill-bar">
                    <span className="skill-per SQL">
                        <span className="tooltip">70%</span>
                    </span>
                </div>
            </div>
            <div className="skill-box">
                <span className="title">Laravel</span>
                <div className="skill-bar">
                    <span className="skill-per php">
                        <span className="tooltip">60%</span>
                    </span>
                </div>
            </div>
        </div>

     </div>
     <div>
     <h2 className='pt-4 text-menu'>Download my resume</h2>
        <a href="../Resume" download="YuxinResume"><img className='inline ml-[40px] w-[40px] h-[40px] md:w-[40px] md:h-[40px]' src={cv} alt="Download resume" /></a>
     </div>


     

    </>
    )

}

export default Skill;