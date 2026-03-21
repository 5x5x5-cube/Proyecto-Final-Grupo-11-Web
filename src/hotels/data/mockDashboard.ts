export const dashboardStats = [
  {
    label: 'Reservas este mes',
    value: '47',
    change: '+12%',
    changeType: 'up' as const,
    icon: 'luggage',
    iconColor: 'teal' as const,
  },
  {
    label: 'Ingresos este mes',
    value: 'COP 94.2M',
    change: '+8%',
    changeType: 'up' as const,
    icon: 'payments',
    iconColor: 'green' as const,
  },
  {
    label: 'Pendientes de confirmar',
    value: '5',
    change: '0%',
    changeType: 'neutral' as const,
    icon: 'schedule',
    iconColor: 'amber' as const,
  },
];

export const recentReservations = [
  {
    id: 'TH-48291',
    guest: 'Carlos Martinez',
    initials: 'C',
    room: 'Habitacion Superior',
    checkIn: '15 mar 2026',
    checkOut: '20 mar 2026',
    status: 'confirmed' as const,
    total: 'COP 2.664k',
  },
  {
    id: 'TH-48305',
    guest: 'Laura Sanchez',
    initials: 'L',
    room: 'Suite Junior',
    checkIn: '18 mar 2026',
    checkOut: '22 mar 2026',
    status: 'pending' as const,
    total: 'COP 4.080k',
  },
  {
    id: 'TH-48312',
    guest: 'Miguel Torres',
    initials: 'M',
    room: 'Habitacion Superior',
    checkIn: '20 mar 2026',
    checkOut: '23 mar 2026',
    status: 'confirmed' as const,
    total: 'COP 1.596k',
  },
  {
    id: 'TH-48320',
    guest: 'Ana Ramirez',
    initials: 'A',
    room: 'Suite Junior',
    checkIn: '25 mar 2026',
    checkOut: '28 mar 2026',
    status: 'pending' as const,
    total: 'COP 2.448k',
  },
  {
    id: 'TH-48331',
    guest: 'Julian Lopez',
    initials: 'J',
    room: 'Habitacion Superior',
    checkIn: '1 abr 2026',
    checkOut: '4 abr 2026',
    status: 'confirmed' as const,
    total: 'COP 1.596k',
  },
];

export const revenueData = [
  { month: 'Ago', value: 35, highlight: false },
  { month: 'Sep', value: 50, highlight: false },
  { month: 'Oct', value: 40, highlight: false },
  { month: 'Nov', value: 65, highlight: false },
  { month: 'Dic', value: 55, highlight: false },
  { month: 'Ene', value: 80, highlight: false },
  { month: 'Feb', value: 100, highlight: true },
];

export const quickAccessItems = [
  {
    icon: 'event_available',
    label: 'Reservas',
    description: '5 pendientes',
    iconColor: 'teal' as const,
  },
  {
    icon: 'bar_chart',
    label: 'Reportes',
    description: 'Ver ingresos',
    iconColor: 'green' as const,
  },
  {
    icon: 'sell',
    label: 'Tarifas',
    description: 'Gestionar precios',
    iconColor: 'amber' as const,
  },
  {
    icon: 'local_offer',
    label: 'Descuentos',
    description: 'Crear promociones',
    iconColor: 'blue' as const,
  },
];
