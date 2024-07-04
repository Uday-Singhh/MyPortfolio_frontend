import { Modal, Form, message } from "antd";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, showLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
    const dispatch = useDispatch()
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;

    const [showAddEditModal, setshowAddEditModal] = useState(false);
    const [selectedItemForEdit, setselectedItemForEdit] = useState(null);
    const [type, settype] = useState("add");

    const onFinish = async (values) => {
        try {
            const tempTechno = values.technologies?.split(",") || [];
            values.technologies = tempTechno;
            dispatch(showLoading());
            let response;
            if (selectedItemForEdit) {

                response = await axios.post(`${process.env.BASE_URL}/api/portfolio/update-project`,
                    {
                        ...values,
                        _id: selectedItemForEdit._id
                    }
                )

            }
            else {
                response = await axios.post(`${process.env.BASE_URL}/api/portfolio/add-project`,
                    values,
                )
            }

            dispatch(hideLoading());

            if (response.data.success) {
                message.success(response.data.message);
                setshowAddEditModal(false);
                setselectedItemForEdit(null);
                dispatch(hideLoading());
                dispatch(ReloadData(true));
            }
            else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(hideLoading())
            message.error(error.message);

        }
    }

    const onDelete = async (item) => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`${process.env.BASE_URL}/api/portfolio/delete-project`, { _id: item._id })
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(hideLoading());
                dispatch(ReloadData(true));
            }
            else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);


        }
    }

    return (
        <div>

            <div className="flex justify-end">
                <button className="bg-primary text-white px-5 py-2"
                    onClick={() => {
                        setselectedItemForEdit(null);
                        setshowAddEditModal(true);
                        settype("add");
                    }}
                >Add Project</button>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
                {projects.map((prj) => {



                    return (
                        <div className="shadow border border-gray-400 p-5 flex flex-col gap-5" key={prj.id}>
                            <h1 className="text-primary text-xl font-bold">{prj.title}</h1>
                            <hr />
                            {/* <lottie-player
                            className="h-60 w-80"
                                    src={prj.image} speed="1"
                                    autoplay direction="1" mode="normal"></lottie-player> */}

                            <img src={prj.image} alt="" className="h-60 w-80"></img>


                            <h1>Role: {prj.title}</h1>
                            <h1>{prj.description}</h1>

                            <div className='flex flex-wrap gap-3 mt-3'>
                                {
                                    prj.technologies.map((tech, index) => (
                                        <div className='border border-gray-500 py-1 px-3'>
                                            <h1 className='text-black'>{tech}</h1>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="flex justify-end gap-5 mt-5 ">
                                <button
                                    className="bg-red-500 text-white px-5 py-2"
                                    onClick={() => {
                                        onDelete(prj);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-primary text-white px-5 py-2"
                                    onClick={() => {
                                        setselectedItemForEdit(prj);
                                        setshowAddEditModal(true);
                                        settype("edit");
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                })}

            </div>

            {
                (type === "add" || selectedItemForEdit) &&
                <Modal open={showAddEditModal}
                    footer={null}
                    onCancel={() => {
                        setshowAddEditModal(false);
                        setselectedItemForEdit(null);

                    }}
                    title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
                >

                    <Form onFinish={onFinish}
                        layout="vertical"
                        initialValues={
                            {
                                ...selectedItemForEdit,
                                technologies: selectedItemForEdit?.technologies?.join(" , ")
                            }
                        }

                    >

                        <Form.Item name="title" label="Title">
                            <input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="image" label="Image">
                            <input placeholder="Image Lottie URL" />
                        </Form.Item>

                        <Form.Item name="description" label="Description">
                            <textarea placeholder="Description" />
                        </Form.Item>

                        <Form.Item name="link" label="Link">
                            <input placeholder="Link" />
                        </Form.Item>

                        <Form.Item name="technologies" label="Technologies">
                            <input placeholder="Technologies" />
                        </Form.Item>


                        <div className="flex justify-end">

                            <button className="border-primary text-primary px-5 py-2" type="button" onClick={() => { setshowAddEditModal(false); }}>
                                Cancel
                            </button>

                            <button className="bg-primary text-white px-5 py-2" type="submit">
                                {selectedItemForEdit ? "Edit" : "Add"}
                            </button>


                        </div>

                    </Form>

                </Modal>
            }

        </div>
    )
}

export default AdminProjects;