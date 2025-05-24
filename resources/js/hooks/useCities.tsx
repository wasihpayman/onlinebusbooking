import { useEffect, useState } from 'react';

// تعریف نوع داده برای شهر
interface City {
  id: number;
  name: string;
  province?: string;
}

// داده‌های ثابت شهرهای افغانستان
const afghanistanCities: City[] = [
  { id: 1, name: 'کابل', province: 'کابل' },
  { id: 2, name: 'هرات', province: 'هرات' },
  { id: 3, name: 'مزار شریف', province: 'بلخ' },
  { id: 4, name: 'قندهار', province: 'قندهار' },
  { id: 5, name: 'جلال‌آباد', province: 'ننگرهار' },
  { id: 6, name: 'کندز', province: 'کندز' },
  { id: 7, name: 'پل‌علم', province: 'لوگر' },
  { id: 8, name: 'فیض‌آباد', province: 'بدخشان' },
  { id: 9, name: 'غزنی', province: 'غزنی' },
  { id: 10, name: 'بامیان', province: 'بامیان' },
];

// هوک برای دریافت لیست شهرها
export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // شبیه‌سازی دریافت از سرور با تأخیر کوتاه
    const fetchCities = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // شبیه‌سازی تاخیر
        setCities(afghanistanCities);
      } catch (err: any) {
        setError('خطا در بارگذاری شهرها');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading, error };
};
