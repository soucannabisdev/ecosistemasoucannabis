import { BrowserRouter as Router, Route, Routes,Navigate, Link} from 'react-router-dom'
import LoginForm from './components/pages/loginForm'
import Index from './components/pages/index'
import Contact from './components/pages/first-contact'
import Menu from './components/pages/elements/menu'
import AssociateSignup from './components/pages/associate-signup'
import Sidebar from './components/pages/elements/sidebar'
import Signup from './components/pages/signup'


function App() {  

  return (
    <Router>
      <Menu />
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/index" element={<Index />} />
        <Route path="/solicitacao-contato" element={<Contact />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/cadastro-associado" element={<AssociateSignup />} />
      </Routes>
    </Router>
  )
}

export default App;
