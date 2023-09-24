import { BrowserRouter as Router, Route, Routes, Navigate, Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import LoginForm from './components/pages/loginForm'
import ApproveAssociate from './components/pages/approveAssociate'
import Contact from './components/pages/first-contact'
import Menu from './components/pages/elements/menu'
import AssociateSignup from './components/pages/associate-signup'
import PatientSignup from './components/pages/patient-signup'
import Sidebar from './components/pages/elements/sidebar'
import Signup from './components/pages/signup'
import UploadComponent from './components/pages/documents-upload'
import Home from './components/pages/home'
import MedicalAppointment from './components/pages/medical-appointment'
import Prescription from './components/pages/prescription'
import PrescriptionAppointment from './components/pages/prescription-appointment'
import User from './modules/User'
import "./styles/general.css"


function App() {
  const [user, setUser] = useState(false);
  const [userCode, setUserCode] = useState(false);
  const [hiddenButtons, setHiddenButtons] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

    if (localStorage.getItem("user_code")) {
      setUserCode(localStorage.getItem("user_code"))
    } else {
      setHiddenButtons(false)
    } 

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, []);

  if (loading) {
    return (
      <div class="container vertical-center">
        <img src="logo.svg" width="5%" class="logo-load" />
        <p class="loading-text">carregando...</p>
      </div>
    );
  }

  return (
    <Router>
      {!user && (
        <div class="container vertical-center">
          <div class="text-center">
            <img src="logo.svg" width="50%" />
            <h1 class="title">Ecosistema SouCannabis</h1>
            <div class="row">
              <Link to="/login" class="btn btn-lg btn-primary btn-login" hidden={hiddenButtons}>Login</Link>
              <Link to="/cadastro" class="btn btn-lg btn-success" hidden={hiddenButtons}>Criar minha conta</Link>
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
                <Route path="/cadastro-paciente" element={<PatientSignup />} />
                <Route path="/documentos" element={<UploadComponent />} />
                <Route path="/consulta" element={<MedicalAppointment />} />
                <Route path="/receita-medica" element={<Prescription />} />
                <Route path="/receita-medica-agendamento" element={<PrescriptionAppointment />} />
                <Route path="/cadastro" element={<ApproveAssociate />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  )
}

export default App;
