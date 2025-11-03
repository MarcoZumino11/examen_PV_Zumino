import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { calcularCosto } from '../services/costos';
import { vehiculos } from '../data/vehiculos';

function ClientePanel() {
  const [tipoVehiculo, setTipoVehiculo] = useState('X');
  const [tipoViaje, setTipoViaje] = useState('corta');
  const [mostrar, setMostrar] = useState(false);

  const costo = calcularCosto(tipoVehiculo, tipoViaje);
  const conductor = vehiculos.find(v => v.tipo === tipoVehiculo)?.conductor;

  return (
    <Container>
      <h2>Reserva de Viaje</h2>
      <Form>
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

      {mostrar && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Resumen del Viaje</Card.Title>
            <Card.Text>Conductor: {conductor.nombre} ({conductor.experiencia})</Card.Text>
            <Card.Text>Costo: ${costo}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default ClientePanel;
