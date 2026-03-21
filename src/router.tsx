import { createBrowserRouter } from 'react-router-dom';

import HomePage from './travelers/pages/HomePage';
import LoginPage from './travelers/pages/LoginPage';
import ResultsPage from './travelers/pages/ResultsPage';
import PropertyDetailPage from './travelers/pages/PropertyDetailPage';
import CartPage from './travelers/pages/CartPage';
import PaymentPage from './travelers/pages/PaymentPage';
import ConfirmationPage from './travelers/pages/ConfirmationPage';
import MyReservationsPage from './travelers/pages/MyReservationsPage';
import ReservationDetailPage from './travelers/pages/ReservationDetailPage';

import DesignSystemPage from './design-system/pages/DesignSystemPage';
import HotelLoginPage from './hotels/pages/HotelLoginPage';
import DashboardPage from './hotels/pages/DashboardPage';
import ReservationsPage from './hotels/pages/ReservationsPage';
import HotelReservationDetailPage from './hotels/pages/HotelReservationDetailPage';
import RatesPage from './hotels/pages/RatesPage';
import DiscountsPage from './hotels/pages/DiscountsPage';
import ReportsPage from './hotels/pages/ReportsPage';

import MobileSearchPage from './mobile/pages/MobileSearchPage';
import MobileResultsPage from './mobile/pages/MobileResultsPage';
import MobilePropertyDetailPage from './mobile/pages/MobilePropertyDetailPage';
import MobileReservationSummaryPage from './mobile/pages/MobileReservationSummaryPage';
import MobileSuccessPage from './mobile/pages/MobileSuccessPage';
import MobileLoginPage from './mobile/pages/MobileLoginPage';
import MobileMyReservationsPage from './mobile/pages/MobileMyReservationsPage';
import MobileReservationDetailPage from './mobile/pages/MobileReservationDetailPage';
import MobileCancelReservationPage from './mobile/pages/MobileCancelReservationPage';
import MobileQRCheckInPage from './mobile/pages/MobileQRCheckInPage';

export const router = createBrowserRouter([
  // Design System
  { path: '/design-system', element: <DesignSystemPage /> },

  // Traveler Portal
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/results', element: <ResultsPage /> },
  { path: '/property/:id', element: <PropertyDetailPage /> },
  { path: '/checkout/cart', element: <CartPage /> },
  { path: '/checkout/payment', element: <PaymentPage /> },
  { path: '/checkout/confirmation', element: <ConfirmationPage /> },
  { path: '/reservations', element: <MyReservationsPage /> },
  { path: '/reservations/:id', element: <ReservationDetailPage /> },

  // Hotel Admin Portal
  { path: '/hotel/login', element: <HotelLoginPage /> },
  { path: '/hotel/dashboard', element: <DashboardPage /> },
  { path: '/hotel/reservations', element: <ReservationsPage /> },
  { path: '/hotel/reservations/:id', element: <HotelReservationDetailPage /> },
  { path: '/hotel/rates', element: <RatesPage /> },
  { path: '/hotel/discounts', element: <DiscountsPage /> },
  { path: '/hotel/reports', element: <ReportsPage /> },

  // Mobile Traveler App
  { path: '/mobile/search', element: <MobileSearchPage /> },
  { path: '/mobile/results', element: <MobileResultsPage /> },
  { path: '/mobile/property/:id', element: <MobilePropertyDetailPage /> },
  { path: '/mobile/checkout', element: <MobileReservationSummaryPage /> },
  { path: '/mobile/success', element: <MobileSuccessPage /> },
  { path: '/mobile/login', element: <MobileLoginPage /> },
  { path: '/mobile/reservations', element: <MobileMyReservationsPage /> },
  { path: '/mobile/reservations/:id', element: <MobileReservationDetailPage /> },
  { path: '/mobile/reservations/:id/cancel', element: <MobileCancelReservationPage /> },
  { path: '/mobile/reservations/:id/qr', element: <MobileQRCheckInPage /> },
]);
