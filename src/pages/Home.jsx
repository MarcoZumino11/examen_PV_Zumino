import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <Container className="home-content">
          <h1 className="home-title">Uber Viajes</h1>
          <p className="home-subtitle">Tu viaje comienza aquí</p>
          <Link to="/registro">
            <Button variant="light" className="home-btn">Registrarse</Button>
          </Link>
        </Container>
      </div>
    </div>
  );
}

export default Home;
