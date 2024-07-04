import  React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./About"
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
import { useSelector } from 'react-redux';




function Home(){

   const { portfolioData} = useSelector((state)=>state.root);

    return(
       <div >
         <Header/>
         {portfolioData?
            <div  className="bg-primary px-40 sm:px-5">
            <Intro/>
            <About/>
            <Experience/>
            <Projects/>
            <Education/>
            <Contact/>
            <Footer/>
            <LeftSider/>
         </div>  
         : null
         }
         
         
       </div>
    )
}
export default Home;