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
          <Link to="/cliente">
            <Button variant="light" className="home-btn">Reservar ahora</Button>
          </Link>
        </Container>
      </div>
    </div>
  );
}

export default Home;
