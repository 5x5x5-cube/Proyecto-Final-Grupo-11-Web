import { createBrowserRouter } from 'react-router-dom';

import HomePage from './travelers/pages/HomePage';
import LoginPage from './travelers/pages/LoginPage';
import RegisterPage from './travelers/pages/RegisterPage';
import ResultsPage from './travelers/pages/ResultsPage/ResultsPage';
import PropertyDetailPage from './travelers/pages/PropertyDetailPage/PropertyDetailPage';
import CartPage from './travelers/pages/CartPage/CartPage';
import PaymentPage from './travelers/pages/PaymentPage/PaymentPage';
import ConfirmationPage from './travelers/pages/ConfirmationPage';
import MyReservationsPage from './travelers/pages/MyReservationsPage';
import ReservationDetailPage from './travelers/pages/ReservationDetailPage/ReservationDetailPage';

import DesignSystemPage from './design-system/pages/DesignSystemPage';
import HotelLoginPage from './hotels/pages/HotelLoginPage/HotelLoginPage';
import DashboardPage from './hotels/pages/DashboardPage/DashboardPage';
import ReservationsPage from './hotels/pages/ReservationsPage/ReservationsPage';
import HotelReservationDetailPage from './hotels/pages/HotelReservationDetailPage/HotelReservationDetailPage';
import RatesPage from './hotels/pages/RatesPage';
import DiscountsPage from './hotels/pages/DiscountsPage';
import ReportsPage from './hotels/pages/ReportsPage';
export const router = createBrowserRouter([
  // Design System
  { path: '/design-system', element: <DesignSystemPage /> },

  // Traveler Portal
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/results', element: <ResultsPage /> },
  { path: '/property/:id', element: <PropertyDetailPage /> },
  { path: '/checkout/cart', element: <CartPage /> },
  { path: '/checkout/payment', element: <PaymentPage /> },
  { path: '/checkout/confirmation/:paymentId', element: <ConfirmationPage /> },
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
]);
