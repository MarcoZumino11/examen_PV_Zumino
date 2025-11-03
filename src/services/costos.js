export function calcularCosto(tipoVehiculo, tipoViaje) {
  const base = {
    corta: 4000,
    media: 7000,
    larga: 20000
  };

  const multiplicador = {
    X: 1,
    Luxe: 1.1,
    Premium: 1.2
  };

  return base[tipoViaje] * multiplicador[tipoVehiculo];
}
