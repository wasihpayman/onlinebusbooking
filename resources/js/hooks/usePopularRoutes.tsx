import { useEffect, useState } from 'react';

interface PopularRoute {
  origin_city: any;
  destination_city: any;
  duration_minutes: number;
  base_price(base_price: any): import("react").ReactNode;
  id: number;
  from: string;
  to: string;
  distanceKm: number;
  estimatedTimeHours: number;
  price: number;
}
export type { PopularRoute };
const mockedRoutes: PopularRoute[] = [
  {
    id: 1,
    from: 'کابل',
    to: 'هرات',
    distanceKm: 1100,
    estimatedTimeHours: 16,
    price: 1500,
    origin_city: undefined,
    destination_city: undefined,
    duration_minutes: 0,
    base_price: function (base_price: any): import('react').ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 2,
    from: 'کابل',
    to: 'مزار شریف',
    distanceKm: 430,
    estimatedTimeHours: 8,
    price: 900,
    origin_city: undefined,
    destination_city: undefined,
    duration_minutes: 0,
    base_price: function (base_price: any): import('react').ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 3,
    from: 'هرات',
    to: 'قندهار',
    distanceKm: 750,
    estimatedTimeHours: 11,
    price: 1200,
    origin_city: undefined,
    destination_city: undefined,
    duration_minutes: 0,
    base_price: function (base_price: any): import('react').ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 4,
    from: 'کابل',
    to: 'جلال‌آباد',
    distanceKm: 150,
    estimatedTimeHours: 3,
    price: 400,
    origin_city: undefined,
    destination_city: undefined,
    duration_minutes: 0,
    base_price: function (base_price: any): import('react').ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 5,
    from: 'کابل',
    to: 'غزنی',
    distanceKm: 200,
    estimatedTimeHours: 4,
    price: 500,
    origin_city: undefined,
    destination_city: undefined,
    duration_minutes: 0,
    base_price: function (base_price: any): import('react').ReactNode {
      throw new Error('Function not implemented.');
    }
  },
];

export const usePopularRoutes = () => {
  const [routes, setRoutes] = useState<PopularRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // شبیه‌سازی تاخیر
        setRoutes(mockedRoutes);
      } catch (err) {
        setError('خطا در بارگذاری مسیرها');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { routes, loading, error };
};
