import React, { useState } from "react";
import { showLoading, hideLoading } from "../../redux/rootSlice";
import { message } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
    const [user, setUser] = useState({
        userName: "",
        password: "",
    })

    const dispatch= useDispatch();

    const login = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/portfolio/admin-login`, user);
            
            dispatch(hideLoading());

            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", JSON.stringify(response.data));
                window.location.href = "/admin";
            }
            else {
                message.error(response.data.message);
            }

        } catch (error) {
                message.error(error.message);
                dispatch(hideLoading());
        }
    }



    return (
        <div className="flex justify-center items-center h-screen bg-primary">
            <div className="flex flex-col gap-5 w-96 p-5 shadow border border-gray-500 bg-slate-300">
                <h1 className="text-2xl">Portfolio -Admin Login</h1>
                <hr />
                <input type="text" value={user.userName}
                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                    placeholder="User Name">

                </input>
                <input type="password" value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })
                    } placeholder="Password">

                </input>

                <button className="bg-primary text-white p-2" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;