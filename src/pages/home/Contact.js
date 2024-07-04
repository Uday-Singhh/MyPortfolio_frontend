import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
 
    const {portfolioData} =useSelector((state)=>state.root);
    const {contacts} = portfolioData;

    return (
        <div>
            <SectionTitle title="Say Hello" />

            <div className="flex  items-center gap-10 justify-between sm:flex-col">

               

                <div className="h-[500px]">
                <lottie-player src="https://lottie.host/0b1b2c01-d6e8-44cb-a6dc-266d7836d579/0DzVCpSgP8.json" 
                background="##fff" speed="1"  autoplay direction="1" mode="normal"></lottie-player>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-tertiary">{'{'}</p>
                    {
                        Object.keys(contacts).map((key) => (
                            key!=="_id" &&
                            <p className="text-tertiary ml-5">
                                <span className="text-tertiary">{key} : </span>
                                <span className="text-tertiary">{ contacts[key]} </span>

                            </p>
                        ))
                    }
                    <p className="text-tertiary">{'}'}</p>
                </div>

            </div>
        </div>
    )
}

export default Contact;