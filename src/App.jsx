import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom' // <--- IMPORTANTE: useLocation aquí

// IMPORTACIONES DE PÁGINAS
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments.jsx'
import RegistroPaciente from './pages/RegistroPaciente'
import DashboardPaciente from './pages/DashboardPaciente'

// IMPORTACIONES DE COMPONENTES
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  const location = useLocation(); 

  // Rutas donde NO queremos ver el Navbar ni Footer (Pantalla completa)
  const hideLayout = location.pathname === '/dashboard-paciente' || location.pathname === '/registro-paciente';

  return (
    // Si es dashboard, quitamos el margen global. Si no, usamos el margen normal.
    <div className={hideLayout ? '' : 'mx-4 sm:mx-[10%]'}>
      
      {/* Navbar solo si NO estamos en dashboard/registro */}
      {!hideLayout && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:specialty' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointments />} />
        
        {/* RUTAS NUEVAS */}
        <Route path='/registro-paciente' element={<RegistroPaciente />} />
        <Route path='/dashboard-paciente' element={<DashboardPaciente />} />
      </Routes>

      {/* Footer solo si NO estamos en dashboard/registro */}
      {!hideLayout && <Footer />}

    </div>
  )
}

export default App