import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/tema.css";

function NavigationBar() {
  return (
    <Navbar className="navbar" expand="lg">
      <div className="navbar-content">
        <div className="navbar-left">
          <img src="/logoOriginal.png" alt="Logo" className="navbar-logo" />
          <span className="navbar-title">Uber Viajes</span>
          <Nav className="navbar-links-left">
            <Nav.Link as={Link} to="/cliente">Cliente</Nav.Link>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav>
        </div>
        <Nav className="navbar-links-right">
          <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
          <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default NavigationBar;
