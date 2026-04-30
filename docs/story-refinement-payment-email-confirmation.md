# HU – Confirmación de pago por email

## Historia de usuario

**Como** viajero, cuando mi pago sea procesado exitosamente (después de que el sistema procese la transacción en background),
**Quiero** recibir una confirmación inmediata del pago por email,
**Para** tener evidencia de la transacción completada.

## Contexto de negocio

TravelHub procesa pagos de forma asíncrona: el viajero inicia el pago desde la app móvil o el portal web, el sistema lo procesa vía una cola de mensajes (SQS), y el resultado (aprobado/rechazado) se refleja en la pantalla de confirmación. Actualmente:

- La pantalla de confirmación web muestra el texto "Hemos enviado la confirmación a tu correo electrónico" — pero **no se envía ningún email realmente**.
- El servicio de notificaciones (`notification_service`) ya consume eventos de SQS y envía **push notifications** a dispositivos registrados vía Expo Push, pero no tiene integración con email.
- El flujo de eventos existe: el `payment_service` publica `payment_confirmed` a SNS → el `booking_service` consume y crea la reserva → publica `booking_status_updated` a SNS → el `notification_service` consume y envía push. El email debe integrarse en este mismo flujo.
- La pantalla de éxito en mobile no menciona email.

## Precondiciones

- El viajero ha completado el flujo de pago desde la app móvil o el portal web.
- El pago ha sido procesado exitosamente por el sistema (estado `approved`).
- El viajero tiene un email asociado a su cuenta.

## Criterios de aceptación

**CA1 — Envío de email al aprobar pago**

- **Dado que** el sistema ha procesado un pago exitosamente y el estado es `approved`,
- **Cuando** el evento de confirmación llega al servicio de notificaciones,
- **Entonces** se envía un email al correo del viajero con: código de reserva, nombre del hotel, fechas de estadía, número de huéspedes, monto total pagado, método de pago utilizado, y fecha de la transacción.

**CA2 — Contenido del email**

- **Dado que** el viajero recibe el email de confirmación,
- **Cuando** lo abre,
- **Entonces** contiene: un encabezado con el logo/nombre de TravelHub, un resumen claro de la reserva (hotel, fechas, habitación, huéspedes), el desglose de pago (subtotal, impuestos, total), el método de pago (ej. "Visa ···· 4821"), el código de reserva destacado, y un pie con información de contacto/soporte.

**CA3 — Email no enviado si el pago es rechazado**

- **Dado que** el sistema ha procesado un pago y el estado es `declined`,
- **Cuando** el evento llega al servicio de notificaciones,
- **Entonces** no se envía email de confirmación de pago (opcionalmente se puede enviar un email de notificación de pago fallido).

**CA4 — Idempotencia**

- **Dado que** un evento de pago aprobado puede ser procesado más de una vez (reintentos de SQS),
- **Cuando** el servicio de notificaciones recibe un evento duplicado,
- **Entonces** no se envía un segundo email (verificar en el historial de notificaciones si ya se envió para ese `paymentId`).

**CA5 — Registro del envío**

- **Dado que** se envía (o intenta enviar) un email,
- **Cuando** el proceso completa,
- **Entonces** se registra en la tabla `notification_history` con el tipo `email_payment_confirmation`, el estado de entrega, y el error si falló.

**CA6 — Retroalimentación en la UI**

- **Dado que** el viajero está en la pantalla de confirmación post-pago,
- **Cuando** la pantalla se muestra,
- **Entonces** indica que se ha enviado un email de confirmación al correo registrado — y este mensaje debe corresponder con un email real enviado.

## Diseño de referencia

### Email

Formato HTML responsive con: banner superior con logo TravelHub, sección de resumen de reserva (hotel, habitación, fechas, huéspedes), sección de resumen de pago (desglose, método, total), código de reserva destacado, y footer con links de soporte. El diseño debe ser consistente con la identidad visual de la plataforma.

### Pantalla de confirmación (Web)

Ya muestra el texto "Hemos enviado la confirmación a tu correo electrónico" — debe mantenerse, pero ahora respaldado por el envío real del email.

### Pantalla de éxito (Mobile)

Agregar un texto indicando que se envió email de confirmación al correo del usuario.
