import github from '../img/githublogo.png'
import linkedin from '../img/linkedinlogo.png'
import twitter from '../img/twitterlogo.png'
import ins from '../img/inslogo.png'
import gmail from '../img/gmaillogo.png'

const Contact =() =>{
    return(
        <>
        <h1 className='drop-shadow-md text-menu md:text-[70px]'>Get in Touch</h1>
            <h2 className='pt-2 text-white'>Thank you for visiting my personal page. You can reach me via email(sunyux411@gmail.com), or send me a message through my social media channels. I appreciate your interest in connecting with me and I will do my best to respond to your inquiry in a timely manner. I look forward to hearing from you soon!</h2>
            <div className="md:grid md:grid-cols-2 md:gap-4">
               
                <div className='relative flex justify-center flex-col'>
                    <div className='pl-[10px] pt-[10px] text-center'>
                        <a href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=sunyux411@gmail.com&tf=1"><img className='inline ml-[10px] w-[40px] h-[40px] md:w-[60px] md:h-[60px]' src={gmail} alt="Gmail Icon" /></a>
                        <a href="https://www.linkedin.com/in/yuxin-sun-psu/ " target="_blank"><img className='inline ml-[10px] w-[40px] h-[40px] md:w-[60px] md:h-[60px]' src={linkedin} alt="linkedin Icon" /></a>
                        <a href="https://github.com/sunyux" target="_blank"><img className='inline ml-[10px] w-[40px] h-[40px] md:w-[60px] md:h-[60px]' src={github} alt="github Icon" /></a>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Contact;