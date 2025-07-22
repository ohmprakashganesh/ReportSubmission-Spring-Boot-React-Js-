import React from 'react'
import {BrowserRouter, Route, Routes}from 'react-router-dom'
import Login from '../../Component/LoginRegister/Login'
import Registar from '../../Component/LoginRegister/Registar'
import LandPage from '../../Component/landpage/LandPage'
import DashboardStd from '../../Component/Dashboards/Students/DashboardStd'
import SupervisorDashboard from '../../Component/Dashboards/supervisors/Main'

import Dash from '../../Component/Dashboards/admin/Dash'
import DashboardU from '../../Component/Dashboards/supervisors/Dashboard'
import Dashboard from '../../Component/Dashboards/Students/DashboardStd'

const RouteHandling = () => {
  return (
   <Routes>
    <Route  path='/login'  element={<Login/>} />
        <Route  path='/signup'  element={<Registar />} />
            <Route  path='/'  element={<LandPage />} />
            <Route  path='/student'  element={<Dashboard />} />
            {/* <Route  path='/dashboardSup'  element={<SupervisorDashboard />} /> */}
            {/* <Route  path='/admin'  element={<Admin />} />  */}
              {/* <Route  path='/adminu'  element={<AdminU />} /> */}
              <Route  path='/admin'  element={<Dash />} />
               <Route  path='/supervisor'  element={<DashboardU />} />






   </Routes>

  )
}

export default RouteHandling
