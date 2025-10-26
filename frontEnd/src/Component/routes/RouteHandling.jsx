import React from 'react'
import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Login from '../LoginRegister/Login'
import Registar from '../LoginRegister/Registar'
import LandPage from '../landpage/LandPage'

import Dash from '../Dashboards/admin/Dash'
import DashboardU from '../Dashboards/supervisors/landing/Dashboard'
import Dashboard from '../Dashboards/Students/DashboardStd'
import ProtectedRoutes from './ProtectedRoutes'
import MyDetails from '../Dashboards/Students/MyDetails'
import Error from './Error'

const RouteHandling = () => {
 const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  return (
   <Routes>
           (!token){
            <>
            < Route  path='/login'  element={<Login/>} />
             <Route  path='/signup'  element={<Registar />} />
             <Route  path='/'  element={<LandPage />} />
             <Route path='*' element={<Error/>} />
            </>
           }
          
            <Route  path='/student'  element={
              <ProtectedRoutes allowedRoles={["STUDENT"]}> 
              <Dashboard />
              </ProtectedRoutes>
            } />

              <Route  path='/admin'  element={
                <ProtectedRoutes allowedRoles={["ADMIN"]} >
                  <Dash />
                </ProtectedRoutes>
              } />

               <Route  path='/supervisor'  element={
                <ProtectedRoutes allowedRoles={["SUPERVISER"]}>
                     <DashboardU />
                </ProtectedRoutes>
                } />

   </Routes>

  )
}

export default RouteHandling
