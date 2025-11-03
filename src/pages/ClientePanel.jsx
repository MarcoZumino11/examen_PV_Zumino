import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { calcularCosto } from '../services/costos';
import { vehiculos } from '../data/vehiculos';

function ClientePanel() {
  const [tipoVehiculo, setTipoVehiculo] = useState('X');
  const [tipoViaje, setTipoViaje] = useState('corta');
  const [mostrar, setMostrar] = useState(false);

  const costo = calcularCosto(tipoVehiculo, tipoViaje);
  const conductor = vehiculos.find(v => v.tipo === tipoVehiculo)?.conductor;

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
        <Button className="mt-3" onClick={() => setMostrar(true)}>Calcular</Button>
      </Form>

      {mostrar && conductor && (
  <div className="resumen-viaje mt-4">
    <h4 className="resumen-titulo">🧾 Resumen del Viaje</h4>
    <hr />
    <p><strong>Conductor:</strong> {conductor.nombre} <span className="experiencia">– Experiencia: {conductor.experiencia} años</span></p>
    <p><strong>Costo:</strong> <span className="costo">${formatearCosto(costo)}</span></p>
  </div>
)}

    </Container>
  );
}

export default ClientePanel;

