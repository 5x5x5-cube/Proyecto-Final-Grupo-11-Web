import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

type RawTariff = {
  id: string;
  room_id: string;
  room_name: string;
  room_location: string;
  rate_type: string;
  price_per_night: number;
  start_date: string | null;
  end_date: string | null;
};

type RawRoom = {
  id: string;
  name: string;
  location: string;
};

function mapTariff(t: RawTariff) {
  return {
    id: t.id,
    roomId: t.room_id,
    roomName: t.room_name,
    roomLocation: t.room_location,
    rateType: t.rate_type,
    pricePerNight: t.price_per_night,
    startDate: t.start_date,
    endDate: t.end_date,
  };
}

export function useTariffs() {
  return useQuery({
    queryKey: ['tariffs'],
    queryFn: async () => {
      const data = await httpClient.get<RawTariff[] | unknown>('/inventory/tariffs');
      if (Array.isArray(data)) return data.map(mapTariff);
      return data;
    },
  });
}

export function useHotelAdminRooms() {
  return useQuery({
    queryKey: ['hotelAdminRooms'],
    queryFn: async () => {
      const data = await httpClient.get<RawRoom[] | unknown>('/inventory/tariffs/admin/rooms');
      return data;
    },
  });
}

type TariffPayload = {
  roomId?: string;
  roomName?: string;
  roomLocation?: string;
  rateType?: string;
  pricePerNight?: number;
  startDate?: string | null;
  endDate?: string | null;
};

function toSnakeCase(data: TariffPayload) {
  return {
    room_id: data.roomId,
    rate_type: data.rateType,
    price_per_night: data.pricePerNight,
    start_date: data.startDate ?? null,
    end_date: data.endDate ?? null,
  };
}

export function useCreateTariff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TariffPayload) =>
      httpClient.post('/inventory/tariffs', { body: toSnakeCase(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tariffs'] });
    },
  });
}

export function useUpdateTariff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & TariffPayload) =>
      httpClient.put(`/inventory/tariffs/${id}`, { body: toSnakeCase(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tariffs'] });
    },
  });
}

export function useDeleteTariff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => httpClient.delete(`/inventory/tariffs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tariffs'] });
    },
  });
}
