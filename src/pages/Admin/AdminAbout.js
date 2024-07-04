import React from 'react';
import { Form,Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../../redux/rootSlice'
import {message} from 'antd';
import axios from 'axios'

function AdminAbout(){
    const dispatch=useDispatch()
    const {portfolioData} =useSelector((state)=>state.root);

    const onFinish=async(values)=>{
       try {
            const tempskills=values.skills.split(",");
            values.skills = tempskills;
            console.log("before making api call")
            dispatch(showLoading());
            const response=await axios.post("/api/portfolio/update-about",{
                ...values,
                _id:portfolioData.about._id,
            })
            dispatch(hideLoading());
            console.log("response is ",response);
            if(response.data.success)
                {
                    message.success(response.data.message);
                }
                else{
                    message.error(response.data.message);
                }
        
       } catch (error) {
            dispatch(hideLoading())
            message.error(error.message);
        
       }
    }
    return(
        <div>
            <Form onFinish={onFinish} layout='vertical' initialValues={{
                ...portfolioData.about,
                skills:portfolioData.about.skills.join(" , ")

                }}>
                <Form.Item name="lottieURL" label="Lottie URL">
                    <Input placeholder='Lottie URL'/>
                </Form.Item>
                <Form.Item name="description1" label="Description1">
                    <textarea placeholder='Description1'/>
                </Form.Item>
                <Form.Item name="description2" label="Description2">
                    <textarea placeholder='Description2'/>
                </Form.Item>
                <Form.Item name="skills" label="Skills">
                    <textarea placeholder='Skills'/>
                </Form.Item>
                <div className='flex w-full justify-end'>
                    <button className='px-10 py-2 bg-primary text-white ' type='Submit'>SAVE</button>

                </div>
            </Form>
        </div>
    )
}

export default AdminAbout;