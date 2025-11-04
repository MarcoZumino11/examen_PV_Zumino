import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { calcularCosto } from '../services/costos';

function ClientePanel() {
  const [tipoVehiculo, setTipoVehiculo] = useState('X');
  const [tipoViaje, setTipoViaje] = useState('corta');
  const [mostrar, setMostrar] = useState(false);

  // Leer vehículos desde localStorage
  const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

  const costo = calcularCosto(tipoVehiculo, tipoViaje);
  const conductoresDisponibles = vehiculos.filter(v => v.tipo === tipoVehiculo && v.activo);
  const conductor = conductoresDisponibles.length > 0
    ? conductoresDisponibles[Math.floor(Math.random() * conductoresDisponibles.length)]
    : null;

  const isLoggedIn = localStorage.getItem("usuarioLogueado") === "true";

  function formatearCosto(valor) {
    return Math.round(valor).toLocaleString('es-AR');
  }

  return (
    <Container className="cliente-panel">
      <h2>Reserva de Viaje</h2>
      <Form className="formulario-viaje">
        <Form.Group>
          <Form.Label>Tipo de Vehículo</Form.Label>
          <Form.Select onChange={(e) => setTipoVehiculo(e.target.value)}>
            <option value="X">X</option>
            <option value="Luxe">Luxe</option>
            <option value="Premium">Premium</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo de Viaje</Form.Label>
          <Form.Select onChange={(e) => setTipoViaje(e.target.value)}>
            <option value="corta">Corta</option>
            <option value="media">Media</option>
            <option value="larga">Larga</option>
          </Form.Select>
        </Form.Group>

        <Button
          className="mt-3"
          onClick={() => setMostrar(true)}
          disabled={!isLoggedIn}
          variant={isLoggedIn ? "primary" : "secondary"}
        >
          Calcular
        </Button>

        {!isLoggedIn && (
          <p className="text-warning mt-2">
            Debes iniciar sesión para calcular el costo del viaje.
          </p>
        )}
      </Form>

      {/* 🔔 Alerta si no hay conductores disponibles */}
      {mostrar && conductoresDisponibles.length === 0 && (
        <p className="text-danger mt-4">
          No hay vehículos disponibles para el tipo seleccionado. Por favor, intenta con otro tipo.
        </p>
      )}

      {/* 🧾 Resumen del viaje */}
      {mostrar && conductor && (
        <div className="resumen-viaje mt-4">
          <h4 className="resumen-titulo">🧾 Resumen del Viaje</h4>
          <hr />
          <p><strong>Conductor:</strong> {conductor.conductor || conductor.nombre} <span className="experiencia">– Experiencia: {conductor.experiencia} años</span></p>
          <p><strong>Costo:</strong> <span className="costo">${formatearCosto(costo)}</span></p>
        </div>
      )}
    </Container>
  );
}

export default ClientePanel;
