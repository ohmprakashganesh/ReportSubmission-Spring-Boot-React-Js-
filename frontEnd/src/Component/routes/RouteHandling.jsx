import React from 'react'
import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Login from '../LoginRegister/Login'
import Registar from '../LoginRegister/Registar'
import LandPage from '../landpage/LandPage'

import Dash from '../Dashboards/admin/Dash'
import DashboardU from '../Dashboards/supervisors/landing/Dashboard'
import Dashboard from '../Dashboards/Students/DashboardStd'
import ProtectedRoutes from './ProtectedRoutes'

const RouteHandling = () => {
  return (
   <Routes>
    <Route  path='/login'  element={<Login/>} />
        <Route  path='/signup'  element={<Registar />} />
            <Route  path='/'  element={<LandPage />} />


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
