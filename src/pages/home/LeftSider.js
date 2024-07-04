import React from "react";

function LeftSider(){
    return(
        <div className="fixed left-0 bottom-0 px-5 sm:static">
            
            <div className="flex flex-col items-center">

                <div className="flex flex-col gap-3 sm:flex-row">
                <a href="mailto:raoudaysingh2125@gmail.com"><i class="ri-mail-line text-gray-400 "></i></a>
                <a href="/"><i class="ri-instagram-line text-gray-400 "></i></a>
                <a href="https://www.linkedin.com/in/uday-singh-programming"><i class="ri-linkedin-box-line text-gray-400"></i></a>
                <a href="https://github.com/Uday-Singhh"><i class="ri-github-fill text-gray-400 "></i></a>
                
                
                
                </div>

                <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>

            </div>

        </div>
    )
}

export default LeftSider;