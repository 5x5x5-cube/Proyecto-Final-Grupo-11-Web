# PFG1-20 – HU3.4 – Confirmar o rechazar una reserva

## Historia de usuario

**Como** administrador de hotel,
**Quiero** confirmar o rechazar las reservas pendientes desde el detalle de reserva en el portal administrativo,
**Para** gestionar la ocupación de mi alojamiento y notificar oportunamente al viajero sobre el estado de su solicitud.

## Contexto de negocio

TravelHub opera en 6 países (Colombia, Perú, Ecuador, México, Chile, Argentina) conectando hoteles con viajeros. Cuando un viajero crea una reserva desde la app móvil o el portal web, esta queda en estado **"Pendiente de confirmación"** hasta que el administrador del hotel la revise y tome una decisión. Esta acción es crítica porque:
- Impacta directamente la experiencia del viajero (recibe notificación push de cambio de estado).
- Libera o bloquea inventario de habitaciones para otros viajeros.
- Alimenta los reportes de ingresos del hotel.

## Precondiciones

- El administrador ha iniciado sesión en el portal de hoteles.
- Existe al menos una reserva en estado "Pendiente" visible en el listado de reservas.
- El administrador ha navegado al detalle de la reserva.

## Criterios de aceptación

**CA1 — Confirmar reserva**
- **Dado que** el administrador está en el detalle de una reserva con estado "Pendiente",
- **Cuando** haga clic en el botón "Confirmar reserva",
- **Entonces** el sistema cambia el estado de la reserva a "Confirmada", muestra una notificación de éxito en el portal, y el viajero recibe notificación del cambio de estado.

**CA2 — Rechazar reserva**
- **Dado que** el administrador está en el detalle de una reserva con estado "Pendiente",
- **Cuando** haga clic en el botón "Rechazar",
- **Entonces** el sistema muestra un diálogo de confirmación (para evitar rechazos accidentales), y al confirmar, cambia el estado a "Rechazada", libera el inventario de la habitación, y notifica al viajero.

**CA3 — Acciones no disponibles para reservas ya procesadas**
- **Dado que** la reserva tiene estado "Confirmada", "Rechazada" o "Cancelada",
- **Cuando** el administrador vea el detalle,
- **Entonces** los botones de confirmar/rechazar no están disponibles (deshabilitados o no visibles).

**CA4 — Retroalimentación visual**
- **Dado que** el administrador confirma o rechaza,
- **Cuando** la acción se procesa,
- **Entonces** el estado visible se actualiza inmediatamente (badge/chip de estado) sin necesidad de recargar la página.

## Diseño de referencia

La pantalla de detalle de reserva muestra la información completa del huésped (nombre, país, contacto), las fechas de estadía, la habitación con sus amenidades, el resumen de pago con desglose, y la política de cancelación. En la parte superior se encuentran los botones de acción "Rechazar" (outlined, rojo) y "Confirmar reserva" (primary, filled) junto al código de reserva y el estado actual.

---

# PFG1-23 – HU3.6 – Crear una tarifa

## Historia de usuario

**Como** administrador de hotel,
**Quiero** crear nuevas tarifas asociadas a mis habitaciones desde el portal administrativo,
**Para** definir los precios base por noche según tipo de tarifa y vigencia, y que estos precios se reflejen en las búsquedas de los viajeros.

## Contexto de negocio

TravelHub permite a los hoteles configurar múltiples tarifas por habitación para manejar diferentes escenarios de pricing: tarifa estándar, fin de semana, temporada alta y promocional. Estas tarifas son el insumo principal para:
- El motor de búsqueda: los viajeros ven los precios al buscar hospedaje.
- Los filtros de precio: los viajeros filtran por rango de precio.
- Los reportes de ingresos: se calculan con base en las tarifas aplicadas.
- Los descuentos: se crean sobre una tarifa existente.

La plataforma opera con múltiples monedas (USD, ARS, CLP, PEN, COP, MXN) según el país del hotel.

## Precondiciones

- El administrador ha iniciado sesión en el portal de hoteles.
- El hotel tiene al menos una habitación registrada en el sistema.
- El administrador ha navegado a la sección "Tarifas" desde el dashboard.

## Criterios de aceptación

**CA1 — Acceso al formulario de creación**
- **Dado que** el administrador está en la sección de tarifas,
- **Cuando** haga clic en "Nueva tarifa",
- **Entonces** se abre el panel/formulario de creación con todos los campos vacíos.

**CA2 — Campos requeridos del formulario**
- **Dado que** el administrador está en el formulario de nueva tarifa,
- **Cuando** visualice el formulario,
- **Entonces** debe poder ingresar:
  - **Habitación** (selector/dropdown con las habitaciones del hotel)
  - **Tipo de tarifa** (Estándar, Fin de semana, Temporada alta, Promocional)
  - **Precio por noche** (valor numérico con moneda del hotel — e.g., COP)
  - **Vigencia** (fecha inicio y fecha fin)

**CA3 — Validaciones del formulario**
- **Dado que** el administrador intenta guardar la tarifa,
- **Cuando** algún campo requerido esté vacío o inválido,
- **Entonces** el sistema muestra mensajes de error inline indicando qué campos deben corregirse (e.g., "El precio debe ser mayor a 0", "La fecha fin debe ser posterior a la fecha inicio").

**CA4 — Guardado exitoso**
- **Dado que** el administrador completa todos los campos correctamente,
- **Cuando** haga clic en "Guardar",
- **Entonces** la tarifa se crea, aparece en el listado de tarifas, y se muestra una notificación de éxito.

**CA5 — Cancelar creación**
- **Dado que** el administrador está en el formulario de nueva tarifa,
- **Cuando** haga clic en "Cancelar",
- **Entonces** se cierra el formulario sin guardar cambios y vuelve al listado.

**CA6 — Tarifa visible en el listado**
- **Dado que** se creó la tarifa exitosamente,
- **Cuando** el administrador vuelva al listado de tarifas,
- **Entonces** la nueva tarifa aparece en la tabla con: habitación, tipo, precio/noche y vigencia.

## Diseño de referencia

La sección de tarifas usa un layout dividido: a la izquierda una tabla con las tarifas configuradas (habitación, tipo, precio/noche, vigencia, acciones) con barra de búsqueda, filtros por tipo y paginación; a la derecha un panel de creación/edición con el formulario (habitación, tipo de tarifa como grid de 4 opciones, precio con prefijo de moneda, y vigencia con fechas inicio/fin).
