# PFG1 – Backlog (Board 37)

**Source:** [Jira backlog](https://projecto-final-1-grupo-11-uniandes.atlassian.net/jira/software/projects/PFG1/boards/37/backlog)  
**Project:** Proyecto Final Grupo 11 – TravelHub  
**Total issues:** 42

---

## Epics

### PFG1-6 – EPICA 1 - Gestión de reservas (Movil)

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-6](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-6) |

---

### PFG1-7 – EPICA 2 - Motor de Búsqueda y Disponibilidad Real (Movil)

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-7](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-7) |

---

### PFG1-8 – EPICA 3 - Gestión Administrativa de Hoteles (Web)

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-8](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-8) |

---

### PFG1-9 – EPICA 4 - Gestión de pagos (Web)

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-9](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-9) |

---

### PFG1-1 – Epic 1

| Field | Value |
|-------|--------|
| **Status** | In Progress |
| **Assignee** | Andrés Peña |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-1](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-1) |

**Description**

[Placeholder] description for Epic 1

---

## Stories

### PFG1-10 – ARQUITECTURA - Realizar pago de reserva

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Andrés Romero |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-10](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-10) |

**Description**

**Como** viajero cuando realice el pago de una reserva, **dado que** el proveedor de pagos está operativo quiero que la transacción se procese de forma segura y sin bloquear el sistema de reservas, **esto debe suceder** en menos de 3 segundos.

#### Atributos de calidad

Rendimiento

Resiliencia

### Criterios de aceptación

El 95% de las transacciones se procesan en menos de 3 segundos

El sistema de reservas permanece disponible durante el pago

No se generan bloqueos en base de datos por operaciones de pago

### Escenario relacionado

Rendimiento

### Implicaciones arquitectónicas

Procesamiento asíncrono de pagos

Uso de colas de mensajes para desacoplar reservas y pagos

Timeouts y circuit breakers

---

### PFG1-11 – ARQUITECTURA  - Confirmar Reserva

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Andrés Romero |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-11](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-11) |

**Description**

**Como** viajero cuando confirme una reserva desde el carrito de compra **dado que** hay disponibilidad de la habitación seleccionada quiero que la reserva se cree correctamente sin conflictos con otros usuarios, **esto debe sucede**r en menos de 1.5 segundos.

### Atributos de calidad

Rendimiento

Resiliencia

### Criterios de aceptación

Reserva creada en menos de 1.5 segundos en el 95% de los casos

No se presentan reservas duplicadas  
Se bloquea la habitación temporalmente durante la transacción

Manejo correcto de concurrencia

### Escenario relacionado

Rendimiento

### Implicaciones arquitectónicas

Control de concurrencia 

Transacciones distribuidas o Saga Pattern

Base de datos con consistencia fuerte para reservas

---

### PFG1-12 – ARQUITECTURA - Ver resultado de alojamientos

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Ronald Andres Carrascal Carreazo |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-12](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-12) |

**Description**

**Como** viajero, **cuando** consulte el detalle de una propiedad, **dado que** existen múltiples servicios involucrados  
**quiero** ver la información completa de habitaciones y precios, **esto debe suceder** en menos de 500 ms.

### Atributos de calidad

Rendimiento

### Criterios de aceptación

Agregación de datos < 500 ms

No más de 2 llamadas síncronas críticas

Caché de información estática

### Implicaciones arquitectónicas

API Gateway

Caché de propiedades

Llamadas paralelas a microservicios

---

### PFG1-13 – ARQUITECTURA - Buscar Hospedaje

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Ronald Andres Carrascal Carreazo |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-13](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-13) |

**Description**

Como viajero cuando realice una búsqueda de hospedaje dado que los sistemas PMS de los hoteles están disponibles quiero ver únicamente habitaciones con disponibilidad real actualizada, esto debe suceder en menos de 800 milisegundos por consulta.

### Atributos de calidad

Rendimiento

Interoperabilidad

### Criterios de aceptación

Sincronización de inventario en tiempo casi real

Consultas respondidas < 200 ms  
No se muestran habitaciones no disponibles

Manejo de latencias externas

### Escenario relacionado

Rendimiento

### Implicaciones arquitectónicas

Caché de disponibilidad con TTL corto

Sincronización por eventos con PMS

APIs estandarizadas

Circuit breakers para integracion con servicios no disponibles externos

---

### PFG1-14 – ARQUITECTURA - Usuarios simultaneos

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Fabrizio Cucina |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-14](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-14) |

**Description**

**Como** sistema, **cuando** aumente significativamente la cantidad de usuarios realizando búsquedas simultáneas, **dado que** se presenta temporada alta ,**quiero** escalar automáticamente las instancias del servicio de búsqueda, **esto debe suceder** sin afectar los tiempos de respuesta.

### Atributos de calidad

Escalabilidad

Rendimiento

### Criterios de aceptación

Escalado automático por CPU/requests

Tiempos de respuesta dentro de SLA

No errores por sobrecarga

### Implicaciones arquitectónicas

Kubernetes

Servicios stateless

Balanceador de carga

---

### PFG1-15 – ARQUITECTURA  - HUA3.2 - Generar reporte de reserva

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Fabrizio Cucina |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-15](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-15) |

**Description**

**Como** hotel partner, **cuando** genere un reporte mensual de ingresos, **dado que** la plataforma tiene la información consolidada, **quiero** obtener el reporte para descarga , **esto debe suceder** en menos de 3 segundos.

### Atributos de calidad

Rendimiento

Escalabilidad

### Criterios de aceptación

Reporte generado en < 3 segundos  
Datos completos del período seleccionado

Escenario relacionado

Rendimiento bajo grandes volúmenes de datos

### Implicaciones arquitectónicas

Procesos batch nocturnos

---

### PFG1-16 – ARQUITECTURA - HUA4.1 - Pago seguro por medio de proveedor

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Andrés Peña |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-16](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-16) |

**Description**

**Como** viajero, **cuando** realice el pago de una reserva en la plataforma, **dado que** el sistema de pagos opera normalmente ,**quiero** que mi transacción sea procesada de forma segura , **esto debe suceder** en menos de 3 segundos.

### Atributos de calidad

Rendimiento

Seguridad

### Criterios de aceptación

Autenticación fuerte

Cifrado completo de datos

Confirmación inmediata del pago

### Implicaciones arquitectónicas

Tokenización de tarjetas

Validaciones antifraude

---

### PFG1-18 – HU3.1 – Iniciar sesión en el portal administrativo

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Highest |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-18](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-18) |

**Description**

Como administrador de hotel  
Quiero iniciar sesión en el portal administrativo  
Para acceder a la gestión de mi hotel.

---

### PFG1-19 – HU3.2 – Ver listado de reservas del hotel

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Highest |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-19](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-19) |

**Description**

Como administrador de hotel  
Quiero ver el listado de reservas de mi hotel  
Para conocer la ocupación actual.

---

### PFG1-20 – HU3.4 – Confirmar o rechazar una reserva

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | Andrés Peña |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-20](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-20) |

**Description**

Como administrador de hotel  
Quiero confirmar o rechazar una reserva  
Para aceptar la ocupación del alojamiento.

---

### PFG1-22 – HU3.3 – Ver detalle de una reserva

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-22](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-22) |

**Description**

Como administrador de hotel  
Quiero ver el detalle de una reserva  
Para revisar fechas y datos del huésped.

---

### PFG1-23 – HU3.6 – Crear una tarifa

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Highest |
| **Assignee** | Andrés Peña |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-23](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-23) |

**Description**

Como administrador de hotel  
Quiero crear una tarifa para una habitación  
Para definir el precio base por noche.

---

### PFG1-24 – HU3.7 – Editar una tarifa

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | Fabrizio Cucina |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-24](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-24) |

**Description**

Como administrador de hotel  
Quiero editar una tarifa existente  
Para actualizar el precio base.

---

### PFG1-25 – HU3.11 – Consultar reporte de ingresos mensual

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-25](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-25) |

**Description**

Como administrador de hotel  
Quiero consultar un reporte de ingresos por mes  
Para analizar el desempeño financiero.

---

### PFG1-26 – HU3.8 – Crear descuento sobre una tarifa

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | — |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-26](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-26) |

**Description**

Como administrador de hotel  
Quiero crear un descuento asociado a una tarifa  
Para ofrecer promociones temporales.

---

### PFG1-27 – HU3.9 – Editar descuento

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | — |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-27](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-27) |

**Description**

Como administrador de hotel  
Quiero editar un descuento existente  
Para ajustar porcentaje o vigencia.

---

### PFG1-28 – HU3.10 – Eliminar descuento

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | — |
| **Created** | 2026-02-04 |
| **Link** | [PFG1-28](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-28) |

**Description**

Como administrador de hotel  
Quiero eliminar un descuento  
Para finalizar una promoción activa.

---

### PFG1-29 – Visualización de listado y detalle de reservas

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Highest |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-05 |
| **Link** | [PFG1-29](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-29) |

**Description**

Como viajero frecuente quiero poder ver el listado de mis reservas activas y sus detalles en la aplicación móvil, incluso si no tengo conexión a internet para poder consultar la dirección del hotel o mi número de confirmación cuando estoy viajando o sin datos móviles.

---

### PFG1-30 – Generación de Código QR para Check-in

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-05 |
| **Link** | [PFG1-30](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-30) |

**Description**

Como huésped que llega al hotel quiero generar un código QR único desde el detalle de mi reserva en la app para presentarlo en la recepción y agilizar mi proceso de registro sin tener que dictar mis datos o buscar papeles impresos.

---

### PFG1-31 – Cancelación de reserva

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-05 |
| **Link** | [PFG1-31](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-31) |

**Description**

Como usuario que necesita cambiar sus planes quiero poder cancelar una reserva activa directamente desde mi celular para liberar la habitación inmediatamente sin tener que llamar a servicio al cliente.

---

### PFG1-32 – Recepción de Notificaciones Push para cambios de estado

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | Andrés Romero |
| **Created** | 2026-02-05 |
| **Link** | [PFG1-32](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-32) |

**Description**

Como viajero ocupado, quiero recibir alertas en mi celular cuando mi reserva sea confirmada o sufra algún cambio, para estar seguro de que mi alojamiento está listo sin tener que abrir la aplicación o revisar mi correo constantemente.

---

### PFG1-33 – HU2.1 Listar hospedajes

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Highest |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-33](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-33) |

**Description**

**Como** viajero, **cuando** ingrese al motor de búsqueda, **quiero** buscar hospedajes por ciudad, fechas de entrada y salida y número de personas, **para** encontrar opciones que se ajusten a mi viaje.

---

### PFG1-34 – HU2.2 Ver detalle de alojamiento

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | High |
| **Assignee** | Fabrizio Cucina |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-34](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-34) |

**Description**

**Como** viajero, **cuando** seleccione un hospedaje o alojamiento , **quiero** ver el detalle del hospedaje, **para** poder tener información detallada para decidir mi reserva.

---

### PFG1-35 – HU2.3 Aplicar filtros en busqueda

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Low |
| **Assignee** | Ronald Andres Carrascal Carreazo |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-35](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-35) |

**Description**

**Como** viajero, **cuando** revise los resultados de búsqueda, **quiero** filtrar por precio, tipo de alojamiento, calificación y servicios , **para** encontrar opciones según mis preferencias.

---

### PFG1-36 – HU2.4 Ordenar Resultados

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Low |
| **Assignee** | Ronald Andres Carrascal Carreazo |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-36](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-36) |

**Description**

**Como** viajero, **cuando** vea los hospedajes disponibles, **quiero** ordenar los resultados por precio, popularidad o calificación, **para** comparar fácilmente las opciones.

---

### PFG1-37 – ARQUITECTURA - Falla temporal en servicio externo

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-37](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-37) |

**Description**

**Como** viajero, **cuando** un proveedor externo de inventario hotelero falle temporalmente, **dado que** existen múltiples proveedores conectados, **quiero** continuar viendo resultados de búsqueda, **esto debe suceder** utilizando información en caché o proveedores alternos.

### Atributos de calidad

Resiliencia

Interoperabilidad

Disponibilidad

### Criterios de aceptación

Uso automático de caché

Cambio a proveedor alterno

No interrupciones visibles

### Implicaciones arquitectónicas

Circuit breaker

Caché distribuida

Estrategia multi-proveedor

---

### PFG1-38 – ARQUITECTURA  - Servicio de disponibilidad sin responder

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-38](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-38) |

**Description**

**Como** sistema , **cuando** un microservicio de disponibilidad deje de responder , **dado que** la arquitectura es distribuida, **quiero** redirigir las solicitudes a instancias saludables, **esto debe suceder** sin impacto visible para el usuario.

### Atributos de calidad

Disponibilidad

Interoperabilidad

Resiliencia

### Criterios de aceptación

Failover automático

No más de 1 segundo de degradación

Sin errores visibles al usuario

### Implicaciones arquitectónicas

Load balancers

Health checks

Service mesh

---

### PFG1-39 – HU4.1 - Seleccionar método de pago

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-39](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-39) |

**Description**

Como viajero, cuando esté en el proceso de pago de una reserva, quiero seleccionar mi método de pago preferido (tarjeta de crédito, débito, billetera digital, transferencia bancaria), para poder completar la transacción según mi preferencia

---

### PFG1-40 – HU4.2 - Procesar pago con múltiples monedas

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-40](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-40) |

**Description**

Como viajero, cuando realice un pago en la plataforma, quiero que el sistema maneje automáticamente la conversión y procesamiento en mi moneda local (USD, ARS, CLP, PEN, COP, MXN), para poder pagar sin preocuparme por conversiones manuales.

---

### PFG1-41 – HU4.3 - Generar reembolso por cancelación

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-41](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-41) |

**Description**

Como viajero, cuando cancele una reserva que ya fue pagada, quiero que el reembolso del pago realizado se realice de forma automática, para recuperar mi dinero según la política de cancelación aplicable.

---

### PFG1-42 – HU4.4 - Monitorear y consultar transacciones de pago

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-42](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-42) |

**Description**

Como administrador del sistema, cuando necesite investigar problemas de pagos o reconciliación, quiero consultar y filtrar transacciones de pago por estado, método, proveedor, fecha y monto, para identificar y resolver problemas como falsas declinaciones o transacciones rechazadas sin motivo claro.

---

### PFG1-43 – HU4.5 - Ver historial de pagos

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Low |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-43](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-43) |

**Description**

Como viajero, cuando consulte mis reservas, quiero ver el historial de pagos asociados a cada reserva, incluyendo monto, método, fecha y estado, para tener un registro completo de mis transacciones.

---

### PFG1-44 – HU4.6 - Recibir confirmación de pago

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Low |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-44](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-44) |

**Description**

Como viajero, cuando mi pago sea procesado exitosamente (después de que el sistema procese la transacción en background), quiero recibir una confirmación inmediata del pago por email, para tener evidencia de la transacción completada.

---

### PFG1-45 – HU4.7 - Detectar y alertar sobre transacciones fraudulentas

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-06 |
| **Link** | [PFG1-45](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-45) |

**Description**

Como administrador del sistema, cuando el sistema detecte patrones sospechosos en transacciones usando reglas de detección (transacciones duplicadas, velocidad sospechosa, validación 3D Secure fallida), quiero recibir alertas en menos de 2 segundos, para prevenir pérdidas por fraude.

---

### PFG1-46 – HU4.8 - Procesar pago de forma segura

| Field | Value |
|-------|--------|
| **Status** | To Do |
| **Priority** | Medium |
| **Assignee** | — |
| **Created** | 2026-02-07 |
| **Link** | [PFG1-46](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-46) |

**Description**

Como viajero, cuando realice un pago en la plataforma, quiero que el sistema maneje los datos de mi método de pago  de forma segura para evitar fraude o robo de datos sensibles.

---

## Tasks

### PFG1-17 – Primera versión Estrategia de pruebas

| Field | Value |
|-------|--------|
| **Status** | Done |
| **Priority** | Medium |
| **Assignee** | Andrés Romero |
| **Created** | 2026-01-31 |
| **Link** | [PFG1-17](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-17) |

---

### PFG1-3 – Task 2

| Field | Value |
|-------|--------|
| **Status** | Done |
| **Assignee** | Andrés Peña |
| **Labels** | Critical |
| **Created** | 2026-01-30 |
| **Link** | [PFG1-3](https://projecto-final-1-grupo-11-uniandes.atlassian.net/browse/PFG1-3) |

**Description**

[Placeholder] description for Task 2

---
