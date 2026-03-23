import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:5173';
const OUT = './screenshots';

// Create folder structure
const dirs = [
  `${OUT}/travelers-web`,
  `${OUT}/travelers-mobile`,
  `${OUT}/hotels-web`,
];
dirs.forEach(d => mkdirSync(d, { recursive: true }));

const WEB = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const routes = [
  // ── Travelers Web ──
  { path: '/', name: 'travelers-web/home', viewport: WEB },
  { path: '/login', name: 'travelers-web/login', viewport: WEB },
  { path: '/register', name: 'travelers-web/register', viewport: WEB },
  { path: '/results', name: 'travelers-web/results', viewport: WEB },
  { path: '/property/1', name: 'travelers-web/property-detail', viewport: WEB },
  { path: '/checkout/cart', name: 'travelers-web/cart', viewport: WEB },
  { path: '/checkout/payment', name: 'travelers-web/payment', viewport: WEB },
  { path: '/checkout/confirmation', name: 'travelers-web/confirmation', viewport: WEB },
  { path: '/reservations', name: 'travelers-web/my-reservations', viewport: WEB },
  { path: '/reservations/1', name: 'travelers-web/reservation-detail', viewport: WEB },

  // Modals on reservation detail
  {
    path: '/reservations/1',
    name: 'travelers-web/modal-reservation-confirmed',
    viewport: WEB,
    action: async (page) => {
      // Click "View Confirmation" button
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Ver confirmación')) {
          await btn.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 600));
    },
  },
  {
    path: '/reservations/1',
    name: 'travelers-web/modal-reservation-cancel',
    viewport: WEB,
    action: async (page) => {
      // Click "Cancel Reservation" button
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Cancelar reserva')) {
          await btn.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 600));
    },
  },

  // Nav menus (language & currency selectors — Box elements inside <nav>, not <header>)
  {
    path: '/',
    name: 'travelers-web/menu-language-selector',
    viewport: WEB,
    action: async (page) => {
      const pos = await page.evaluate(() => {
        const divs = document.querySelectorAll('nav div');
        for (const d of divs) {
          if (d.innerText?.trim() === 'ES' && getComputedStyle(d).cursor === 'pointer') {
            const rect = d.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          }
        }
        return null;
      });
      if (pos) await page.mouse.click(pos.x, pos.y);
      await new Promise(r => setTimeout(r, 600));
    },
  },
  {
    path: '/',
    name: 'travelers-web/menu-currency-selector',
    viewport: WEB,
    action: async (page) => {
      const pos = await page.evaluate(() => {
        const divs = document.querySelectorAll('nav div');
        for (const d of divs) {
          if (d.innerText?.trim() === 'COP' && getComputedStyle(d).cursor === 'pointer') {
            const rect = d.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          }
        }
        return null;
      });
      if (pos) await page.mouse.click(pos.x, pos.y);
      await new Promise(r => setTimeout(r, 600));
    },
  },

  // ── Hotels Web ──
  { path: '/hotel/login', name: 'hotels-web/login', viewport: WEB },
  { path: '/hotel/dashboard', name: 'hotels-web/dashboard', viewport: WEB },
  { path: '/hotel/reservations', name: 'hotels-web/reservations', viewport: WEB },
  { path: '/hotel/reservations/1', name: 'hotels-web/reservation-detail', viewport: WEB },
  { path: '/hotel/rates', name: 'hotels-web/rates', viewport: WEB },
  { path: '/hotel/discounts', name: 'hotels-web/discounts', viewport: WEB },
  { path: '/hotel/reports', name: 'hotels-web/reports', viewport: WEB },

  // ── Travelers Mobile ──
  { path: '/mobile/search', name: 'travelers-mobile/search', viewport: MOBILE },
  { path: '/mobile/results', name: 'travelers-mobile/results', viewport: MOBILE },
  { path: '/mobile/property/1', name: 'travelers-mobile/property-detail', viewport: MOBILE },
  { path: '/mobile/checkout', name: 'travelers-mobile/checkout-summary', viewport: MOBILE },
  { path: '/mobile/checkout/payment', name: 'travelers-mobile/payment', viewport: MOBILE },
  { path: '/mobile/success', name: 'travelers-mobile/success', viewport: MOBILE },
  { path: '/mobile/login', name: 'travelers-mobile/login', viewport: MOBILE },
  { path: '/mobile/register', name: 'travelers-mobile/register', viewport: MOBILE },
  { path: '/mobile/profile', name: 'travelers-mobile/profile', viewport: MOBILE },
  { path: '/mobile/reservations', name: 'travelers-mobile/my-reservations', viewport: MOBILE },
  { path: '/mobile/reservations/1', name: 'travelers-mobile/reservation-detail', viewport: MOBILE },
  { path: '/mobile/reservations/1/cancel', name: 'travelers-mobile/cancel-reservation', viewport: MOBILE },
  { path: '/mobile/reservations/1/qr', name: 'travelers-mobile/qr-checkin', viewport: MOBILE },

  // Mobile profile menus
  {
    path: '/mobile/profile',
    name: 'travelers-mobile/menu-language-selector',
    viewport: MOBILE,
    action: async (page) => {
      // Find and click the language row
      const rows = await page.$$('[class*="MuiBox"]');
      for (const row of rows) {
        const text = await page.evaluate(el => el.textContent, row);
        if (text && text.includes('Idioma') && text.length < 50) {
          await row.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 400));
    },
  },
  {
    path: '/mobile/profile',
    name: 'travelers-mobile/menu-currency-selector',
    viewport: MOBILE,
    action: async (page) => {
      const rows = await page.$$('[class*="MuiBox"]');
      for (const row of rows) {
        const text = await page.evaluate(el => el.textContent, row);
        if (text && text.includes('Moneda') && text.length < 50) {
          await row.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 400));
    },
  },
];

const browser = await puppeteer.launch({ headless: true });
let count = 0;

for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport(route.viewport);
  await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 500));

  if (route.action) {
    await route.action(page);
  }

  const file = `${OUT}/${route.name}.png`;
  await page.screenshot({ fullPage: !route.action, path: file });
  count++;
  console.log(`[${count}/${routes.length}] ✓ ${route.name}`);
  await page.close();
}

await browser.close();
console.log(`\nDone! ${count} screenshots saved to ${OUT}/`);
