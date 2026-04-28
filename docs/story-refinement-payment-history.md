# HU – Registro consolidado de transacciones financieras

## Historia de usuario

**Como** viajero,
**Quiero** acceder a un registro consolidado y sincronizado de todas mis transacciones financieras, tanto desde la aplicación móvil como desde el portal web,
**Para** consultar de forma transparente el monto, método, fecha y estado de mis pagos en la moneda local configurada.

## Contexto de negocio

TravelHub opera en 6 países (Colombia, Perú, Ecuador, México, Chile, Argentina) y soporta múltiples métodos de pago (tarjeta crédito/débito, billetera digital, transferencia bancaria). Actualmente, la información de pago en las pantallas del viajero está incompleta — la web muestra datos hardcodeados ("VISA ···· 4242") y la mobile no muestra ningún dato del método de pago. El viajero necesita ver datos reales y consistentes en ambas plataformas.

## Precondiciones

- El viajero ha iniciado sesión en la app móvil o el portal web.
- Existe al menos una reserva con un pago asociado.
- El viajero ha navegado al detalle de la reserva.

## Criterios de aceptación

**CA1 — Datos reales del pago en detalle de reserva (Web)**

- **Dado que** el viajero está en el detalle de una reserva con pago asociado,
- **Cuando** la página se carga,
- **Entonces** la sección de historial de pago muestra: monto formateado en la moneda local, marca de tarjeta y últimos 4 dígitos (ej. "Visa ···· 4821"), fecha de procesamiento, y estado del pago (badge: "Aprobado", "Procesando" o "Rechazado") — obtenidos del backend, sin datos hardcodeados.

**CA2 — Datos reales del pago en detalle de reserva (Mobile)**

- **Dado que** el viajero está en la pantalla de detalle de reserva en la app móvil,
- **Cuando** la pantalla se carga,
- **Entonces** se muestra una sección de pago con: método de pago (marca + últimos 4 dígitos o label del proveedor), monto, fecha de transacción, y estado.

**CA3 — Consistencia entre plataformas**

- **Dado que** un viajero tiene una reserva con pago aprobado,
- **Cuando** consulta el detalle desde la app móvil y luego desde el portal web (o viceversa),
- **Entonces** ambas plataformas muestran la misma información de pago sin discrepancias.

**CA4 — Moneda local configurada**

- **Dado que** el viajero tiene configurada una moneda de visualización,
- **Cuando** ve los montos de pago,
- **Entonces** se muestran formateados con el símbolo y separadores correspondientes a la moneda configurada.

**CA5 — Múltiples métodos de pago**

- **Dado que** los pagos pueden realizarse con tarjeta crédito, tarjeta débito, billetera digital o transferencia bancaria,
- **Cuando** el viajero consulta el historial de un pago realizado por cualquier método,
- **Entonces** el sistema muestra el label descriptivo del método (ej. "Visa ···· 4821", "PayPal - carlos@email.com", "Transferencia - Bancolombia").

**CA6 — Estados de pago**

- **Dado que** un pago puede estar en estado `processing`, `approved` o `declined`,
- **Cuando** el viajero ve la transacción,
- **Entonces** se muestra un badge/chip con el estado correspondiente: "Procesando" (amarillo), "Aprobado" (verde), o "Rechazado" (rojo).

**CA7 — Pago no disponible**

- **Dado que** una reserva puede no tener un pago asociado aún,
- **Cuando** el viajero ve el detalle,
- **Entonces** la sección de pago no se muestra o indica que el pago está pendiente.

## Diseño de referencia

### Web — Detalle de reserva

La sección "Historial de pagos" en la columna derecha muestra una fila por cada transacción con: ícono de estado (check verde, reloj amarillo, o X roja), label descriptivo del método de pago, fecha formateada, y monto. Actualmente esta sección existe en el prototipo pero renderiza datos hardcodeados.

### Mobile — Detalle de reserva

Se agrega una sección "Método de pago" debajo del resumen de precios, con una fila mostrando: ícono del método, label descriptivo, fecha, y badge de estado. Actualmente esta sección no existe en mobile.

### Pantalla de confirmación

La web ya muestra el label real del método de pago en la barra lateral de confirmación. La mobile muestra solo el monto. Ambas deben mostrar método + label, monto, y estado.
