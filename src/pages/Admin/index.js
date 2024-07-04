import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Tabs } from 'antd';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { useSelector } from "react-redux";
import AdminExperiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminEducation from './AdminEducation';
import AdminContact from './AdminContact';
const { TabPane } = Tabs;


function Admin() {
    const { portfolioData } = useSelector((state) => state.root);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            window.location.href = "/admin-login";
        }

    }, [])

    return (
        <div>
            <Header />
            <div className='flex gap-10 items-centerpx-5 py-2 justify-between'>
                <div className='flex gap-10 items-center'>
                    <h1 className='text-3xl text-primary'>Portfolio Admin</h1>
                    <div className='w-60 h-[1px] bg-gray-500'></div>
                </div>
                <h1 className='underline text-primary text-xl cursor-pointer px-5'
                onClick={()=>{
                    localStorage.removeItem("token");
                    window.location.href="/admin-login";
                }}>
                    Log Out
                </h1>
            </div>
            {portfolioData &&
                <div className='p-2 mt-2'>
                    <Tabs defaultActiveKey='1' >

                        <TabPane tab="Intro" key='1'>
                            <AdminIntro />
                        </TabPane>

                        <TabPane tab="About" key='2'>
                            <AdminAbout />
                        </TabPane>

                        <TabPane tab="Experiences" key='3'>
                            <AdminExperiences />
                        </TabPane>

                        <TabPane tab="Projects" key='4'>
                            <AdminProjects />
                        </TabPane>

                        <TabPane tab="Education" key='5'>
                            <AdminEducation />
                        </TabPane>

                        <TabPane tab="Contact" key='6'>
                            <AdminContact />
                        </TabPane>





                    </Tabs>

                </div>

            }


        </div>

    )
}

export default Admin;