import type { Locator, Page } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;

  // Main content
  readonly title: Locator;
  readonly subtitle: Locator;

  // Booking code card
  readonly bookingCodeLabel: Locator;

  // Email notice
  readonly emailNotice: Locator;

  // Action buttons
  readonly viewReservationsButton: Locator;
  readonly downloadReceiptButton: Locator;

  // Sidebar
  readonly sidebarTitle: Locator;
  readonly checkInLabel: Locator;
  readonly checkOutLabel: Locator;
  readonly guestsLabel: Locator;

  // Payment summary
  readonly paymentSuccessPill: Locator;

  // Next steps
  readonly nextStepsTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('¡Reserva confirmada!');
    this.subtitle = page.getByText('Tu reserva ha sido procesada exitosamente');

    this.bookingCodeLabel = page.getByText('Numero de reserva');

    this.emailNotice = page.getByText('Confirmacion enviada');

    this.viewReservationsButton = page.getByRole('link', { name: 'Ver mis reservas' });
    this.downloadReceiptButton = page.getByRole('link', { name: 'Descargar comprobante' });

    this.sidebarTitle = page.getByText('Detalle de tu reserva');
    this.checkInLabel = page.getByText('Llegada');
    this.checkOutLabel = page.getByText('Salida');
    this.guestsLabel = page.getByText('Huespedes');

    this.paymentSuccessPill = page.getByText('Pago exitoso');

    this.nextStepsTitle = page.getByText('Proximos pasos');
  }

  /** Wait for the booking code to appear (BK-XXXXXXXX) */
  async waitForBookingCode(timeout = 60000) {
    await this.page.locator('text=/BK-\\d+/').waitFor({ state: 'visible', timeout });
  }

  /** Extract the booking code text */
  async getBookingCode(): Promise<string> {
    const el = this.page.locator('text=/BK-\\d+/');
    const text = (await el.textContent()) ?? '';
    return text.trim();
  }

  /** Check if the booking code is still loading */
  async isBookingCodeLoading(): Promise<boolean> {
    return this.page.getByText('Generando...').isVisible();
  }

  /** Get the payment amount text from sidebar */
  async getPaymentAmount(): Promise<string> {
    // The amount is the largest styled text near "Pago exitoso"
    const amountEl = this.page.locator('text=/\\$\\s*[\\d.,]+|COP\\s*[\\d.,]+/').first();
    return (await amountEl.textContent()) ?? '';
  }
}
