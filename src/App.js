import { BrowserRouter as Router, Route, Routes, Navigate, Link, useHistory} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import LoginForm from './components/pages/loginForm'
import Index from './components/pages/index'
import Contact from './components/pages/first-contact'
import Menu from './components/pages/elements/menu'
import AssociateSignup from './components/pages/associate-signup'
import Sidebar from './components/pages/elements/sidebar'
import Signup from './components/pages/signup'
import UploadComponent from './components/pages/documents-upload'
import Home from './components/pages/home'
import MedicalAppointment from './components/pages/medical-appointment'
import Prescription from './components/pages/prescription'
import User from './modules/User'

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

  }, []);


  return (
    <Router>
      {!user && (
        <div class="container vertical-center">
          <div class="text-center">
            <h1>Ecossistema SouCannabis</h1>
            <div class="mt-4">
              <Link to="/login" class="btn btn-primary mr-2">Login</Link>
              <Link to="/cadastro"  class="btn btn-secondary">Faça sua conta</Link>
            </div>
          </div>
          <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cadastro" element={<Signup />} />
          </Routes>
        </div>

      )}

      {user && (
        <div>
          <Menu />
          <div class="wrapper">
            <div class="sidebar">
              <Sidebar />
            </div>
            <div class="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solicitacao-contato" element={<Contact />} />
                <Route path="/cadastro-associado" element={<AssociateSignup />} />
                <Route path="/documentos" element={<UploadComponent />} />
                <Route path="/consulta" element={<MedicalAppointment />} />
                <Route path="/receita-medica" element={<Prescription />} />
              </Routes>
            </div>
          </div>
        </div>
      )}



    </Router>
  )
}

export default App;
