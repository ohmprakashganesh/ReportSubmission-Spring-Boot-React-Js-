import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Welcome/Navbar'
import Welcome from './components/Welcome/Welcome'
import Dashboard from './components/Dashboard/Dashboard'
import LandPage from './Component/landpage/LandPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <LandPage />
    </>
  )
}

export default App
