import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
// ─── Destinations ───────────────────────────────────────────────────────────

interface BackendDestination {
  city: string;
  country: string;
}

interface DestinationsResponse {
  destinations: BackendDestination[];
  total: number;
}

export function useDestinations() {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const [destRaw, hotelsRaw] = await Promise.all([
        httpClient.get<DestinationsResponse | BackendDestination[]>('/search/destinations'),
        httpClient.get<HotelsSearchResponse | BackendHotel[]>('/search/hotels'),
      ]);

      // Build city → min price map
      const hotelsList: BackendHotel[] = Array.isArray(hotelsRaw)
        ? (hotelsRaw as BackendHotel[])
        : ((hotelsRaw as HotelsSearchResponse).results ?? []);

      const priceByCity: Record<string, number> = {};
      for (const h of hotelsList) {
        const city = h.city ?? '';
        const price = h.min_price ?? 0;
        if (city && (!priceByCity[city] || price < priceByCity[city])) {
          priceByCity[city] = price;
        }
      }

      // Mock fallback: plain array with {name, country, gradient}
      if (Array.isArray(destRaw)) {
        return (
          destRaw as unknown as Array<{
            name: string;
            country: string;
            hotelCount: number;
            gradient: string;
          }>
        ).map(d => ({ ...d, minPrice: priceByCity[d.name] ?? 0 }));
      }

      const list = (destRaw as DestinationsResponse).destinations ?? [];
      return list.map(d => ({
        name: d.city,
        country: d.country,
        hotelCount: 0,
        gradient: gradientForCity(d.city),
        minPrice: priceByCity[d.city] ?? 0,
      }));
    },
  });
}

// ─── Hotels search ───────────────────────────────────────────────────────────

export interface HotelSearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minRating?: number;
  page?: number;
  pageSize?: number;
}

interface BackendHotel {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  address: string;
  rating: number;
  available_rooms_count: number;
  min_price: number;
}

interface HotelsSearchResponse {
  results: BackendHotel[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export function useSearchHotels(params?: HotelSearchParams) {
  return useQuery({
    queryKey: ['hotels', params],
    queryFn: async () => {
      // Map camelCase → snake_case for the backend
      const backendParams: Record<string, unknown> = {};
      if (params?.destination) backendParams['city'] = params.destination;
      if (params?.checkIn) backendParams['check_in'] = params.checkIn;
      if (params?.checkOut) backendParams['check_out'] = params.checkOut;
      if (params?.guests) backendParams['guests'] = params.guests;
      if (params?.minRating) backendParams['min_rating'] = params.minRating;
      if (params?.page) backendParams['page'] = params.page;
      if (params?.pageSize) backendParams['page_size'] = params.pageSize;

      const raw = await httpClient.get<HotelsSearchResponse | BackendHotel[]>('/search/hotels', {
        params: backendParams,
      });

      // Backend returns { results: [...], total, ... }; mock returns plain array
      const list: BackendHotel[] = Array.isArray(raw)
        ? raw
        : ((raw as HotelsSearchResponse).results ?? []);

      return list.map(h => ({
        id: h.id,
        type: 'Hotel',
        name: h.name,
        location: `${h.city}, ${h.country}`,
        rating: h.rating ?? 0,
        reviewCount: 0,
        starsText: '★'.repeat(Math.round(h.rating ?? 0)),
        pricePerNight: h.min_price ?? 0,
        gradient: gradientForCity(h.city),
        amenities: mapAmenities(
          (h as BackendHotel & { amenities?: Record<string, boolean> }).amenities
        ),
        photoCount: 0,
      }));
    },
  });
}

interface BackendRoom {
  id: string;
  hotel_id: string;
  room_type: string;
  room_number: string;
  capacity: number;
  price_per_night: number;
  tax_rate: number;
  description: string;
  amenities?: Record<string, boolean>;
  total_quantity: number;
}

interface HotelRoomsResponse {
  hotel_id: string;
  rooms: BackendRoom[];
  total?: number;
}

export function useHotelDetail(hotelId: string) {
  return useQuery({
    queryKey: ['hotels', hotelId],
    queryFn: () => httpClient.get(`/search/hotels/${hotelId}`),
    enabled: !!hotelId,
  });
}

export function useHotelRooms(hotelId: string) {
  return useQuery({
    queryKey: ['hotels', hotelId, 'rooms'],
    queryFn: async () => {
      const raw = await httpClient.get<HotelRoomsResponse | BackendRoom[]>(
        `/search/hotels/${hotelId}/rooms`
      );
      const list: BackendRoom[] = Array.isArray(raw)
        ? raw
        : ((raw as HotelRoomsResponse).rooms ?? []);
      return list.map(r => ({
        id: r.id,
        roomType: r.room_type,
        roomNumber: r.room_number,
        capacity: r.capacity,
        pricePerNight: r.price_per_night,
        taxRate: r.tax_rate,
        description: r.description,
        amenities: mapAmenities(r.amenities),
      }));
    },
    enabled: !!hotelId,
  });
}

export function useHotelReviews(hotelId: string) {
  return useQuery({
    queryKey: ['hotels', hotelId, 'reviews'],
    queryFn: () => httpClient.get(`/search/hotels/${hotelId}/reviews`),
    enabled: !!hotelId,
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const AMENITY_MAP: Record<string, { icon: string; label: string }> = {
  wifi: { icon: 'wifi', label: 'Wi-Fi' },
  ac: { icon: 'ac_unit', label: 'A/C' },
  tv: { icon: 'tv', label: 'TV' },
  minibar: { icon: 'local_bar', label: 'Minibar' },
  balcony: { icon: 'balcony', label: 'Balcón' },
  jacuzzi: { icon: 'hot_tub', label: 'Jacuzzi' },
  desk: { icon: 'desk', label: 'Escritorio' },
  kitchen: { icon: 'kitchen', label: 'Cocina' },
  private_pool: { icon: 'pool', label: 'Piscina privada' },
  garden_view: { icon: 'park', label: 'Vista al jardín' },
};

function mapAmenities(
  amenities: Record<string, boolean> | undefined
): Array<{ key: string; icon: string; label: string }> {
  if (!amenities) return [];
  return Object.entries(amenities)
    .filter(([, value]) => value)
    .map(([key]) => ({ key, ...(AMENITY_MAP[key] ?? { icon: 'check_circle', label: key }) }))
    .slice(0, 4);
}

const CITY_GRADIENTS: Record<string, string> = {
  'Buenos Aires': 'linear-gradient(135deg, #7B4F00, #C89030)',
  Mendoza: 'linear-gradient(135deg, #B5451B, #E07050)',
  Cartagena: 'linear-gradient(135deg, #006874, #4A9FAA)',
  Cusco: 'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
  'Ciudad de Mexico': 'linear-gradient(135deg, #5B5EA6, #8E91CC)',
  Santiago: 'linear-gradient(135deg, #B5451B, #E07050)',
};

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #006874, #4A9FAA)',
  'linear-gradient(135deg, #1A6B4F, #4A9F7E)',
  'linear-gradient(135deg, #5B5EA6, #8E91CC)',
  'linear-gradient(135deg, #B5451B, #E07050)',
  'linear-gradient(135deg, #7B4F00, #C89030)',
];

let gradientIndex = 0;
function gradientForCity(city: string): string {
  return CITY_GRADIENTS[city] ?? FALLBACK_GRADIENTS[gradientIndex++ % FALLBACK_GRADIENTS.length];
}
