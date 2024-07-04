import { Modal, Form, message } from "antd";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function Experiences(){
    const dispatch=useDispatch()
    const {portfolioData} =useSelector((state)=>state.root);
    const {experience}=portfolioData;
    const [showAddEditModal, setshowAddEditModal]=useState(false);
    const [selectedItemForEdit, setselectedItemForEdit]=useState(null);
    const [type, settype]=useState("add");

    const onFinish=async(values)=>{
        try {
             
             dispatch(showLoading());
             let response;
             if(selectedItemForEdit)
                {
                    
                    response=await axios.post(`${process.env.BASE_URL}/api/portfolio/update-experience`,
                        {...values,
                        _id:selectedItemForEdit._id
                        }    
                    )

                }
                else{
                    response=await axios.post(`${process.env.BASE_URL}/api/portfolio/add-experience`,
                        values,    
                    )
                }
              
             dispatch(hideLoading());
             
             if(response.data.success)
                 {
                     message.success(response.data.message);
                     setshowAddEditModal(false);
                     setselectedItemForEdit(null);
                     dispatch(hideLoading());
                     dispatch(ReloadData(true));
                 }
                 else{
                     message.error(response.data.message);
                 }
         
        } catch (error) {
             dispatch(hideLoading())
             message.error(error.message);
         
        }
     }

     const onDelete=async(item)=>{
        try {
            dispatch(showLoading());
        const response=await axios.post(`${process.env.BASE_URL}/api/portfolio/delete-experience`,{_id: item._id})
        dispatch(hideLoading());
        if(response.data.success)
                 {
                     message.success(response.data.message);
                     dispatch(hideLoading());
                     dispatch(ReloadData(true));
                 }
                 else{
                     message.error(response.data.message);
                 }
            
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);

            
        }
     }

    return(
        <div>

            <div className="flex justify-end">
                <button className="bg-primary text-white px-5 py-2"
                onClick={()=>{
                    setselectedItemForEdit(null);
                    setshowAddEditModal(true);
                    settype("add");
                }}
                >Add Experience</button>
            </div>

            <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
            {experience.map((exp)=>(
                <div className="shadow border border-gray-400 p-5 flex flex-col">
                <h1 className="text-primary text-xl font-bold">{exp.period}</h1>
                <hr/>
                <h1>Company: {exp.company}</h1>
                <h1>Role: {exp.title}</h1>
                <h1>{exp.description}</h1>

                <div className="flex justify-end gap-5 mt-5">
                    <button className="bg-red-500 text-white px-5 py-2"
                    onClick={()=>{
                        onDelete(exp);
                    }}
                    
                    >Delete</button>
                    <button className="bg-primary text-white px-5 py-2"
                    onClick={()=>{setselectedItemForEdit(exp); 
                    setshowAddEditModal(true);
                     settype("edit")}}
                    >Edit</button>

                </div>

                </div>
            ))}

            </div>
            
            {
                (type === "add" || selectedItemForEdit) &&
                <Modal open={showAddEditModal}
                    footer={null}
                    onCancel={()=>{
                        setshowAddEditModal(false);
                        setselectedItemForEdit(null);

                        }}
                    title={selectedItemForEdit?"Edit Experience":"Add Experience"}
                    >

                <Form onFinish={onFinish}
                 layout="vertical"
                 initialValues={selectedItemForEdit || {}}>

                    <Form.Item name="period" label="Period">
                        <input placeholder="Period"/>
                    </Form.Item>
                    <Form.Item name="company" label="Company">
                        <input placeholder="Company"/>
                    </Form.Item>

                    <Form.Item name="title" label="Title">
                        <input placeholder="Title"/>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <input placeholder="Description"/>
                    </Form.Item>

                    <div className="flex justify-end">

                        <button className="border-primary text-primary px-5 py-2" type="button"  onClick={()=>{setshowAddEditModal(false);}}>
                            Cancel
                        </button>

                        <button className="bg-primary text-white px-5 py-2" type="submit">
                            {selectedItemForEdit?"Edit":"Add"}
                        </button>


                    </div>

                </Form>

                </Modal>
            }
            
        </div>
    )
}

export default Experiences;