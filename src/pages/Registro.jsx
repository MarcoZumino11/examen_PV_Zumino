import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(usuario.email, JSON.stringify({ ...usuario, activo: true }));
    alert('Usuario registrado correctamente');

    //Restablecer el formulario
    setUsuario({
      nombre: '',
      email: '',
      password: '',
      rol: 'cliente'
    });
  };

  return (
    <Container>
      <h2>Registro de Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            required
            value={usuario.nombre}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            required
            value={usuario.password}
            onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rol</Form.Label>
          <Form.Select
            value={usuario.rol}
            onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="mt-3">Registrarse</Button>
      </Form>
    </Container>
  );
}

export default Registro;
