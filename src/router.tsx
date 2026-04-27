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
import { ProtectedHotelRoute } from './hotels/auth/ProtectedHotelRoute';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  // Design System
  { path: '/design-system', element: <DesignSystemPage /> },

  // Traveler Portal — Public
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/results', element: <ResultsPage /> },
  { path: '/property/:id', element: <PropertyDetailPage /> },

  // Traveler Portal — Protected
  {
    path: '/checkout/cart',
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout/payment',
    element: (
      <ProtectedRoute>
        <PaymentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout/confirmation/:paymentId',
    element: (
      <ProtectedRoute>
        <ConfirmationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reservations',
    element: (
      <ProtectedRoute>
        <MyReservationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reservations/:id',
    element: (
      <ProtectedRoute>
        <ReservationDetailPage />
      </ProtectedRoute>
    ),
  },

  // Hotel Admin Portal
  { path: '/hotel/login', element: <HotelLoginPage /> },
  {
    path: '/hotel/dashboard',
    element: (
      <ProtectedHotelRoute>
        <DashboardPage />
      </ProtectedHotelRoute>
    ),
  },
  {
    path: '/hotel/reservations',
    element: (
      <ProtectedHotelRoute>
        <ReservationsPage />
      </ProtectedHotelRoute>
    ),
  },
  {
    path: '/hotel/reservations/:id',
    element: (
      <ProtectedHotelRoute>
        <HotelReservationDetailPage />
      </ProtectedHotelRoute>
    ),
  },
  {
    path: '/hotel/rates',
    element: (
      <ProtectedHotelRoute>
        <RatesPage />
      </ProtectedHotelRoute>
    ),
  },
  {
    path: '/hotel/discounts',
    element: (
      <ProtectedHotelRoute>
        <DiscountsPage />
      </ProtectedHotelRoute>
    ),
  },
  {
    path: '/hotel/reports',
    element: (
      <ProtectedHotelRoute>
        <ReportsPage />
      </ProtectedHotelRoute>
    ),
  },
]);
