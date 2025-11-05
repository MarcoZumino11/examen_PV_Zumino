import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/tema.css";

function NavigationBar() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    const logueado = localStorage.getItem("usuarioLogueado") === "true";
    if (user && logueado) {
      setUsuarioActivo(user);
    } else {
      setUsuarioActivo(null);
    }
  }, [location]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("usuarioActivo");
    navigate("/");
  };

  return (
    <Navbar className="navbar" expand="lg">
      <div className="navbar-content">
        <div className="navbar-left">
          <img src="/logoOriginal.png" alt="Logo" className="navbar-logo" />
          <Nav.Link as={Link} to="/" className="navbar-title">Uber Viajes</Nav.Link>
          <Nav className="navbar-links-left">
            <Nav.Link as={Link} to="/cliente">Cliente</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>
        </div>
        <Nav className="navbar-links-right">
          {usuarioActivo ? (
            <>
              <span className="usuario-info">👤 {usuarioActivo.nombre} ({usuarioActivo.rol})</span>
              <Nav.Link onClick={cerrarSesion}>Cerrar Sesión</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
              <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
            </>
          )}
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
