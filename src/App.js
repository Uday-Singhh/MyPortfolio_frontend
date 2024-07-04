import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, setPortfolioData, showLoading, ReloadData } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';

export default function App() {
  const {loading, portfolioData,reloadData}=useSelector((state)=>state.root);
  const dispatch=useDispatch();

  
  const getPortfolioData=async()=>{
    try {
      dispatch(showLoading())
      const response=await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(setPortfolioData(response.data));
      dispatch(hideLoading());
      dispatch(ReloadData(false))
    } catch (error) {
      dispatch(hideLoading())
      
    }
  }

  useEffect(()=>{
    if(!portfolioData)
      {
        getPortfolioData();

      }
  },[portfolioData]);

  useEffect(()=>{
    if(reloadData)
      {
        getPortfolioData();

      }
  },[reloadData]);

 

  return (
    <BrowserRouter>
    {loading ? <Loader/> : null}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin-login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}