import React from 'react'
import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Login from '../../Component/LoginRegister/Login'
import Registar from '../../Component/LoginRegister/Registar'
import LandPage from '../../Component/landpage/LandPage'
import DashboardStd from '../../Component/Dashboards/Students/DashboardStd'
import SupervisorDashboard from '../../Component/Dashboards/supervisors/Main'
import Admin from '../../Component/Dashboards/admin/Main'

const RouteHandling = () => {
  return (
   <Routes>
    <Route  path='/login'  element={<Login/>} />
        <Route  path='/signup'  element={<Registar />} />
            <Route  path='/'  element={<LandPage />} />
            <Route  path='/dashboardStd'  element={<DashboardStd />} />
            <Route  path='/dashboardSup'  element={<SupervisorDashboard />} />
            <Route  path='/admin'  element={<Admin />} />




   </Routes>

  )
}

export default RouteHandling
