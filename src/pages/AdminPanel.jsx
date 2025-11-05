import { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', password: '', rol: 'cliente' });
  const [nuevoVehiculo, setNuevoVehiculo] = useState({ tipo: 'X', conductor: '', activo: true });
  const [experiencia, setExperiencia] = useState('');

  useEffect(() => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario || usuario.rol !== "admin" || !usuario.activo) {
    alert("Acceso denegado. Solo administradores.");
    navigate("/");
    return;
  }
  cargarDatos();
}, []);

const cargarDatos = () => {
  const listaUsuarios = [];
  for (let key in localStorage) {
    if (key.includes("@")) {
      const user = JSON.parse(localStorage.getItem(key));
      if (user?.rol) listaUsuarios.push(user);
    }
  }
  setUsuarios(listaUsuarios);

  const listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
  setVehiculos(listaVehiculos);
  
};
  const agregarUsuario = () => {
    localStorage.setItem(nuevoUsuario.email, JSON.stringify({ ...nuevoUsuario, activo: true }));
    alert('Usuario agregado');
    cargarDatos();
  };

  const agregarVehiculo = () => {
    const vehiculoConExperiencia = { ...nuevoVehiculo, experiencia };
    const actualizados = [...vehiculos, vehiculoConExperiencia];
    localStorage.setItem('vehiculos', JSON.stringify(actualizados));
    alert('Vehículo agregado');
    cargarDatos();
  };

  const eliminarUsuario = (email) => {
    const user = JSON.parse(localStorage.getItem(email));
    localStorage.setItem(email, JSON.stringify({ ...user, activo: false }));
    alert('Usuario desactivado');
    cargarDatos();
  };

  const activarUsuario = (email) => {
    const user = JSON.parse(localStorage.getItem(email));
    if (user) {
      localStorage.setItem(email, JSON.stringify({ ...user, activo: true }));
      alert('Usuario reactivado');
      cargarDatos();
    }
  };

  const eliminarVehiculo = (index) => {
    const actualizados = [...vehiculos];
    actualizados[index].activo = false;
    localStorage.setItem('vehiculos', JSON.stringify(actualizados));
    alert('Vehículo desactivado');
    cargarDatos();
  };

  const activarVehiculo = (index) => {
    const actualizados = [...vehiculos];
    actualizados[index].activo = true;
    localStorage.setItem('vehiculos', JSON.stringify(actualizados));
    alert('Vehículo reactivado');
    cargarDatos();
  };

  return (
    <div className="admin-container">
      <h2>Panel Administrador</h2>

      <h4>Agregar Usuario</h4>
      <Form>
        <Form.Control placeholder="Nombre" onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
        <Form.Control placeholder="Email" onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
        <Form.Control placeholder="Contraseña" onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
        <Form.Select onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </Form.Select>
        <Button className="mt-2" onClick={agregarUsuario}>Agregar</Button>
      </Form>

      <h4 className="mt-4">Agregar Vehículo</h4>
      <Form>
        <Form.Select onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, tipo: e.target.value })}>
          <option value="X">X</option>
          <option value="Luxe">Luxe</option>
          <option value="Premium">Premium</option>
        </Form.Select>
        <Form.Control placeholder="Conductor" onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, conductor: e.target.value })} />
        <Form.Control
          type="number"
          min="0"
          placeholder="Experiencia (años)"
          onChange={(e) => setExperiencia(e.target.value)}
          className="mt-2"
        />
        <Button className="mt-2" onClick={agregarVehiculo}>Agregar</Button>
      </Form>

      <h4 className="mt-4">Usuarios Registrados</h4>
      <Table striped bordered className="table">
        <thead>
          <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Activo</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.email}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.activo ? 'Sí' : 'No'}</td>
              <td>
                {u.activo ? (
                  <Button variant="danger" onClick={() => eliminarUsuario(u.email)}>Eliminar</Button>
                ) : (
                  <Button variant="success" onClick={() => activarUsuario(u.email)}>Activar</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mt-4">Vehículos</h4>
      <Table striped bordered className="table">
        <thead>
          <tr><th>Tipo</th><th>Conductor</th><th>Experiencia</th><th>Activo</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {vehiculos.map((v, i) => (
            <tr key={i}>
              <td>{v.tipo}</td>
              <td>{v.conductor}</td>
              <td>{v.experiencia || '—'}</td>
              <td>{v.activo ? 'Sí' : 'No'}</td>
              <td>
                {v.activo ? (
                  <Button variant="danger" onClick={() => eliminarVehiculo(i)}>Eliminar</Button>
                ) : (
                  <Button variant="success" onClick={() => activarVehiculo(i)}>Activar</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminPanel;
