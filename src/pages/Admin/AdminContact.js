import React from 'react';
import { Form,Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../../redux/rootSlice'
import {message} from 'antd';
import axios from 'axios'

function AdminContact(){
    const dispatch=useDispatch()
    const {portfolioData} =useSelector((state)=>state.root);

    const onFinish=async(values)=>{
       try {
            console.log("before making api call")
            dispatch(showLoading());
            const response=await axios.post(`${process.env.BASE_URL}/api/portfolio/update-contact`,{
                ...values,
                _id:portfolioData.contacts._id,
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
            <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contacts}>
                <Form.Item name="name" label="Name">
                    <Input placeholder='Name'/>
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                    <Input placeholder='Gender'/>
                </Form.Item>
                <Form.Item name="age" label="Age">
                    <Input placeholder='Age'/>
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input placeholder='Email'/>
                </Form.Item>
                <Form.Item name="mobile" label="Mobile">
                    <Input placeholder='Mobile'/>
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input placeholder='Address'/>
                </Form.Item>
                
                
                
                <div className='flex w-full justify-end'>
                    <button className='px-10 py-2 bg-primary text-white ' type='Submit'>SAVE</button>

                </div>
            </Form>
        </div>
    )
}

export default AdminContact;