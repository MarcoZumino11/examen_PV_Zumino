import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import ClientePanel from './pages/ClientePanel';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/cliente" element={<ClientePanel />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
