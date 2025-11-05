import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password && user.activo) {
      localStorage.setItem("usuarioLogueado", "true");
      localStorage.setItem("usuarioActivo", JSON.stringify(user));
      user.rol === 'admin' ? navigate('/admin') : navigate('/cliente');
    } else {
      alert('Credenciales inválidas o usuario inactivo');
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="mt-3">Ingresar</Button>
      </Form>
    </Container>
  );
}

export default Login;
