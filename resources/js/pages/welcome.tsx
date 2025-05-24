import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Bus } from 'lucide-react';
import { useCities } from '../hooks/useCities';
import { usePopularRoutes, PopularRoute } from '../hooks/usePopularRoutes';
import { formatCurrency } from '../utils/dateUtils';
import scheduleService from '../services/scheduleService';
import Loading from '../components/Loading';

export default function BusBookingHome() {
  const [fromCityId, setFromCityId] = useState('');
  const [toCityId, setToCityId] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const { cities, loading: citiesLoading }: { cities: { id: number; name: string }[]; loading: boolean } = useCities();
  const { routes: popularRoutes, loading: routesLoading } = usePopularRoutes();

  const handleSearch = async () => {
    if (!fromCityId || !toCityId || !departureDate) {
      setSearchError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    if (fromCityId === toCityId) {
      setSearchError('شهر مبدا و مقصد نمی‌توانند یکسان باشند');
      return;
    }

    setSearching(true);
    setSearchError('');

    try {
      const searchParams = {
        origin_city_id: parseInt(fromCityId),
        destination_city_id: parseInt(toCityId),
        departure_date: departureDate,
        passengers
      };

      const result = await scheduleService.searchSchedules(searchParams);

      if (result.schedules && result.schedules.length > 0) {
        alert(`${result.schedules.length} سفر یافت شد!`);
      } else {
        setSearchError('هیچ سفری برای این تاریخ یافت نشد');
      }

    } catch (error) {
      setSearchError(error instanceof Error ? error.message : 'خطا در جستجو');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Bus className="h-8 w-8" />
              <h1 className="text-2xl font-bold">سفرنت</h1>
            </div>
            <nav className="hidden md:flex space-x-6 space-x-reverse">
              <a href="#" className="hover:text-blue-200 transition-colors">خانه</a>
              <a href="#" className="hover:text-blue-200 transition-colors">بلیط های من</a>
              <a href="#" className="hover:text-blue-200 transition-colors">تماس با ما</a>
              <a href="#" className="hover:text-blue-200 transition-colors">ورود / ثبت نام</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">رزرو آسان بلیط اتوبوس</h2>
            <p className="text-xl text-blue-100">سفر راحت و ایمن با بهترین قیمت‌ها</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto">
            {searchError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {searchError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* From City */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-2">مبدا</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={fromCityId}
                    onChange={(e) => setFromCityId(e.target.value)}
                    disabled={citiesLoading}
                    className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:bg-gray-100"
                  >
                    <option value="">انتخاب شهر مبدا</option>
                    {cities.map((city: { id: number; name: string }) => (
                      <option key={String(city.id)} value={city.id ?? ''}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To City */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-2">مقصد</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={toCityId}
                    onChange={(e) => setToCityId(e.target.value)}
                    disabled={citiesLoading}
                    className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 disabled:bg-gray-100"
                  >
                    <option value="">انتخاب شهر مقصد</option>
                    {cities.map((city: { id: React.Key | readonly string[] | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                      <option key={String(city.id)} value={city.id ?? ''}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Departure Date */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-2">تاریخ رفت</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-2">تعداد مسافر</label>
                <div className="relative">
                  <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} نفر</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSearch}
                  disabled={searching || citiesLoading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {searching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>در حال جستجو...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>جستجو</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">محبوب‌ترین مسیرها</h3>

          {routesLoading ? (
            <Loading text="در حال بارگذاری مسیرها..." />
          ) : popularRoutes.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              هیچ مسیر محبوبی یافت نشد
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularRoutes.map((route: PopularRoute, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-r-4 border-blue-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">
                        {route.origin_city?.name} - {route.destination_city?.name}
                      </h4>
                      <p className="text-gray-600">
                        مدت سفر: {Math.floor(route.duration_minutes / 60)} ساعت
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-orange-500">
                        {formatCurrency(route.base_price)}
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                    انتخاب مسیر
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
