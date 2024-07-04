import React from 'react';

function Footer(){
    return(
        <div className='py-10'>
            <div className='h-[1px] w-full bg-gray-700'></div>

            <div className='flex flex-col justify-center items-center mt-10 opacity-60'>
                <h1 className='text-white'>Designed and Developed By</h1>
                <h1 className='text-tertiary'>Uday Singh</h1>

            </div>

        </div>
    )
}

export default Footer;