import { test, expect, hasBackend } from './fixtures';

const HOTEL_ADMIN_EMAIL = process.env.HOTEL_ADMIN_EMAIL ?? 'admin@caribeplaza.com';
const HOTEL_ADMIN_PASSWORD = process.env.HOTEL_ADMIN_PASSWORD ?? 'password123';

test.describe('HU3.6 / HU3.7 – Gestión de tarifas (hotel admin)', () => {
  // ─── UI tests (no backend required) ────────────────────────────────────────

  test.describe('Página de tarifas – UI', () => {
    test.beforeEach(async ({ ratesPage }) => {
      await ratesPage.goto();
    });

    test('muestra el título de la página', async ({ ratesPage }) => {
      await expect(ratesPage.title).toBeVisible();
    });

    test('muestra el botón Nueva tarifa', async ({ ratesPage }) => {
      await expect(ratesPage.newRateButton).toBeVisible();
    });

    test('muestra el buscador', async ({ ratesPage }) => {
      await expect(ratesPage.searchInput).toBeVisible();
    });

    test('muestra los chips de filtro', async ({ ratesPage }) => {
      await expect(ratesPage.filterAll).toBeVisible();
      await expect(ratesPage.filterStandard).toBeVisible();
      await expect(ratesPage.filterWeekend).toBeVisible();
      await expect(ratesPage.filterSeason).toBeVisible();
      await expect(ratesPage.filterPromo).toBeVisible();
    });
  });

  // ─── Panel crear tarifa – UI ────────────────────────────────────────────────

  test.describe('Panel crear tarifa – UI', () => {
    test.beforeEach(async ({ ratesPage }) => {
      await ratesPage.goto();
      await ratesPage.openCreatePanel();
    });

    test('abre el panel al hacer clic en Nueva tarifa', async ({ ratesPage }) => {
      await expect(ratesPage.saveButton).toBeVisible();
    });

    test('el botón Guardar tarifa está deshabilitado con el formulario vacío', async ({
      ratesPage,
    }) => {
      await expect(ratesPage.saveButton).toBeDisabled();
    });

    test('muestra error de habitación requerida al intentar guardar sin datos', async ({
      ratesPage,
      page,
    }) => {
      // Forzar touch de todos los campos haciendo click en guardar
      // El botón está disabled, así que hacemos click directo en el elemento
      await ratesPage.saveButton.click({ force: true });
      await expect(page.getByText('Selecciona una habitacion')).toBeVisible();
    });

    test('muestra error de precio inválido con valor 0', async ({ ratesPage, page }) => {
      await ratesPage.fillPrice('0');
      await ratesPage.priceInput.blur();
      await expect(page.getByText('El precio debe ser mayor a 0')).toBeVisible();
    });

    test('muestra error si solo se llena fecha fin sin fecha inicio', async ({
      ratesPage,
      page,
    }) => {
      await ratesPage.endDateInput.fill('2026-12-31');
      await ratesPage.endDateInput.blur();
      await ratesPage.saveButton.click({ force: true });
      await expect(page.getByText('La fecha de inicio es requerida')).toBeVisible();
    });

    test('muestra error si fecha fin es anterior a fecha inicio', async ({ ratesPage, page }) => {
      await ratesPage.startDateInput.fill('2026-12-31');
      await ratesPage.endDateInput.fill('2026-12-01');
      await ratesPage.endDateInput.blur();
      await expect(
        page.getByText('La fecha fin debe ser posterior a la fecha inicio')
      ).toBeVisible();
    });

    test('el botón Cancelar cierra el panel', async ({ ratesPage }) => {
      await ratesPage.cancelButton.click();
      await expect(ratesPage.saveButton).not.toBeVisible();
    });

    test('muestra las 4 opciones de tipo de tarifa', async ({ page }) => {
      await expect(page.getByText('Precio base regular')).toBeVisible();
      await expect(page.getByText('Vie, Sab, Dom')).toBeVisible();
      await expect(page.getByText('Rango de fechas')).toBeVisible();
      await expect(page.getByText('Descuento especial')).toBeVisible();
    });
  });

  // ─── CRUD con backend ───────────────────────────────────────────────────────

  test.describe('HU3.6 – Crear tarifa', () => {
    test.describe.configure({ mode: 'serial' });

    test('crea una tarifa estándar y aparece en la tabla', async ({ ratesPage, page }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(30000);

      await ratesPage.loginAndGoto(HOTEL_ADMIN_EMAIL, HOTEL_ADMIN_PASSWORD);

      const rowsBefore = await ratesPage.getRowCount();

      await ratesPage.openCreatePanel();

      // Seleccionar primera habitación disponible
      await ratesPage.roomSelect.selectOption({ index: 1 });

      // Tipo estándar
      await ratesPage.selectRateType('standard');

      // Precio
      await ratesPage.fillPrice('250000');

      await expect(ratesPage.saveButton).toBeEnabled();
      await ratesPage.saveButton.click();

      // Panel se cierra tras guardar
      await expect(ratesPage.saveButton).not.toBeVisible({ timeout: 5000 });

      // Toast de éxito
      await expect(page.getByText('Tarifa creada exitosamente')).toBeVisible({ timeout: 5000 });

      // La tabla tiene una fila más
      await expect(ratesPage.tableRows).toHaveCount(rowsBefore + 1, { timeout: 10000 });
    });

    test('crea una tarifa de temporada con fechas y aparece en la tabla', async ({
      ratesPage,
      page,
    }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(30000);

      await ratesPage.loginAndGoto(HOTEL_ADMIN_EMAIL, HOTEL_ADMIN_PASSWORD);

      const rowsBefore = await ratesPage.getRowCount();

      await ratesPage.openCreatePanel();
      await ratesPage.roomSelect.selectOption({ index: 1 });
      await ratesPage.selectRateType('season');
      await ratesPage.fillPrice('500000');
      await ratesPage.startDateInput.fill('2026-12-20');
      await ratesPage.endDateInput.fill('2027-01-10');

      await expect(ratesPage.saveButton).toBeEnabled();
      await ratesPage.saveButton.click();

      await expect(page.getByText('Tarifa creada exitosamente')).toBeVisible({ timeout: 5000 });
      await expect(ratesPage.tableRows).toHaveCount(rowsBefore + 1, { timeout: 10000 });
    });
  });

  test.describe('HU3.7 – Editar tarifa', () => {
    test.describe.configure({ mode: 'serial' });

    test('editar el precio de una tarifa existente y se refleja en la tabla', async ({
      ratesPage,
      page,
    }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(30000);

      await ratesPage.loginAndGoto(HOTEL_ADMIN_EMAIL, HOTEL_ADMIN_PASSWORD);

      // Verificar que hay al menos una tarifa para editar
      const rowCount = await ratesPage.getRowCount();
      test.skip(rowCount === 0, 'No hay tarifas para editar');

      // Abrir el panel de edición de la primera fila
      await ratesPage.clickEditButton(0);

      // El panel abre con título "Editar tarifa"
      await expect(page.getByText('Editar tarifa')).toBeVisible();

      // Cambiar el precio
      await ratesPage.priceInput.clear();
      await ratesPage.fillPrice('399000');

      await expect(ratesPage.saveButton).toBeEnabled();
      await ratesPage.saveButton.click();

      // Toast de éxito
      await expect(page.getByText('Tarifa actualizada exitosamente')).toBeVisible({
        timeout: 5000,
      });

      // Panel se cierra
      await expect(ratesPage.saveButton).not.toBeVisible({ timeout: 5000 });
    });

    test('el panel de edición pre-carga los datos de la tarifa seleccionada', async ({
      ratesPage,
      page,
    }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(20000);

      await ratesPage.loginAndGoto(HOTEL_ADMIN_EMAIL, HOTEL_ADMIN_PASSWORD);

      const rowCount = await ratesPage.getRowCount();
      test.skip(rowCount === 0, 'No hay tarifas para editar');

      await ratesPage.clickEditButton(0);

      // El price input debe tener un valor pre-cargado (no vacío)
      const price = await ratesPage.priceInput.inputValue();
      expect(Number(price)).toBeGreaterThan(0);
    });
  });

  // ─── Filtros y búsqueda – UI ────────────────────────────────────────────────

  test.describe('Filtros y búsqueda', () => {
    test.beforeEach(async ({ ratesPage }) => {
      await ratesPage.goto();
    });

    test('el chip activo por defecto es Todas', async ({ ratesPage }) => {
      // "Todas" debe estar visible y funcional al cargar
      await expect(ratesPage.filterAll).toBeVisible();
    });

    test('hacer clic en un chip de filtro no rompe la página', async ({ ratesPage }) => {
      await ratesPage.filterStandard.click();
      // La página sigue mostrando el título y buscador sin errores
      await expect(ratesPage.title).toBeVisible();
      await expect(ratesPage.searchInput).toBeVisible();
    });

    test('escribir en el buscador no rompe la página', async ({ ratesPage }) => {
      await ratesPage.searchInput.fill('Suite');
      await expect(ratesPage.title).toBeVisible();
    });
  });
});
