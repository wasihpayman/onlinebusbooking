import React, { useState, useEffect } from 'react';
import { ArrowRight, Bus, Clock, MapPin, Users, Star, ChevronLeft, Calendar, Search } from 'lucide-react';
import { formatCurrency, formatTime, formatDate } from '../hooks/dateUtils';
import Loading from '../components/Loading';
import scheduleService from '../services/scheduleService';

// ==================================================
// Search Results Page - صفحه نتایج جستجو
// ==================================================

interface SearchParams {
  departure_date: string;
  passengers: number;
}

const SearchResultsPage = ({ searchParams, onBack, onSelectSchedule }: { searchParams: SearchParams; onBack: () => void; onSelectSchedule: (schedule: Schedule) => void }) => {
  const [searchResults, setSearchResults] = useState<{ route?: { origin_city?: { name: string }; destination_city?: { name: string } }; schedules?: Schedule[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const performSearch = async () => {
      try {
        setLoading(true);
        setError('');
        const results = await scheduleService.searchSchedules({
          ...searchParams,
          origin_city_id: 1, // Replace with actual origin city ID
          destination_city_id: 2, // Replace with actual destination city ID
        });
        setSearchResults(results);
      } catch (err) {
        setError((err instanceof Error ? err.message : 'خطا ناشناخته') || 'خطا در جستجو');
      } finally {
        setLoading(false);
      }
    };

    if (searchParams) {
      performSearch();
    }
  }, [searchParams]);

  if (loading) {
    return <Loading text="در حال جستجوی سفرها..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowRight className="h-5 w-5" />
            <span>بازگشت به جستجو</span>
          </button>
          
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <h3 className="font-bold mb-2">خطا در جستجو</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { route, schedules } = searchResults || {};

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 space-x-reverse text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowRight className="h-5 w-5" />
            <span>بازگشت به جستجو</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {route?.origin_city?.name} به {route?.destination_city?.name}
              </h1>
              <p className="text-gray-600">
                {formatDate(new Date(searchParams.departure_date))} - {searchParams.passengers} مسافر
              </p>
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-blue-600">
                {schedules?.length || 0} سفر یافت شد
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {schedules && schedules.length > 0 ? (
          <div className="space-y-4">
            {schedules.map((schedule: Schedule) => (
              <ScheduleCard 
                key={schedule.id} 
                schedule={schedule} 
                passengers={searchParams.passengers}
                onSelect={() => onSelectSchedule(schedule)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              هیچ سفری یافت نشد
            </h3>
            <p className="text-gray-500 mb-6">
              برای این تاریخ و مسیر، سفری موجود نیست
            </p>
            <button 
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              تغییر جستجو
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================================================
// Schedule Card Component - کارت برنامه سفر
// ==================================================

interface Schedule {
  id: number;
  price: number;
  available_seats: number;
  bus?: {
    company?: { name: string };
    bus_type?: string;
    amenities?: string[];
  };
  route?: {
    origin_city?: { name: string };
    destination_city?: { name: string };
    duration_minutes?: number;
  };
  departure_time: string;
  arrival_time: string;
}

const ScheduleCard = ({ schedule, passengers, onSelect }: { schedule: Schedule; passengers: number; onSelect: () => void }) => {
  const totalPrice = schedule.price * passengers;
  const company = schedule.bus?.company;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Company Info */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{company?.name}</h3>
              <p className="text-sm text-gray-600">{schedule.bus?.bus_type}</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 space-x-reverse">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Time Info */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {formatTime(new Date(schedule.departure_time))}
                </p>
                <p className="text-sm text-gray-600">
                  {schedule.route?.origin_city?.name}
                </p>
              </div>
              
              <div className="flex-1 mx-4">
                <div className="flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                  <div className="px-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-1">
                  {Math.floor((schedule.route?.duration_minutes ?? 0) / 60)} ساعت
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {formatTime(new Date(schedule.arrival_time))}
                </p>
                <p className="text-sm text-gray-600">
                  {schedule.route?.destination_city?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Price & Seats */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">قیمت (برای {passengers} نفر)</p>
            <p className="text-2xl font-bold text-orange-500">
              {formatCurrency(totalPrice)}
            </p>
            <p className="text-sm text-gray-500">
              {schedule.available_seats} صندلی خالی
            </p>
          </div>

          {/* Select Button */}
          <div>
            <button 
              onClick={onSelect}
              disabled={schedule.available_seats < passengers}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              <span>انتخاب</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bus Amenities */}
        {schedule.bus?.amenities && schedule.bus.amenities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">امکانات:</p>
            <div className="flex flex-wrap gap-2">
              {schedule.bus.amenities.map((amenity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================================================
// Main App Component - کامپوننت اصلی اپ
// ==================================================

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchParams, setSearchParams] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState<{
    id: number;
    price: number;
    available_seats: number;
    bus?: {
      company?: { name: string };
      bus_type?: string;
      amenities?: string[];
    };
    route?: {
      origin_city?: { name: string };
      destination_city?: { name: string };
      duration_minutes?: number;
    };
    departure_time: string;
    arrival_time: string;
  } | null>(null);

  const handleSearch = (params: React.SetStateAction<null>) => {
    setSearchParams(params);
    setCurrentPage('search-results');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSearchParams(null);
  };

  const handleSelectSchedule = (schedule: { id: number; price: number; available_seats: number; bus?: { company?: { name: string }; bus_type?: string; amenities?: string[] }; route?: { origin_city?: { name: string }; destination_city?: { name: string }; duration_minutes?: number }; departure_time: string; arrival_time: string }) => {
    setSelectedSchedule(schedule);
    setCurrentPage('booking'); // صفحه رزرو که بعداً ایجاد می‌شود
  };

  // Import BusBookingHome component
  const BusBookingHome = () => {
    const [fromCityId, setFromCityId] = useState('');
    const [toCityId, setToCityId] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState('');

    // Mock data برای نمایش
    const cities = [
      { id: 1, name: 'کابل' },
      { id: 2, name: 'هرات' },
      { id: 3, name: 'قندهار' },
      { id: 4, name: 'مزار شریف' }
    ];

    const handleHomeSearch = async () => {
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

      // شبیه‌سازی درخواست API
      setTimeout(() => {
        const searchData = {
          origin_city_id: parseInt(fromCityId),
          destination_city_id: parseInt(toCityId),
          departure_date: departureDate,
          passengers: passengers
        };
        
        handleSearch(searchData);
        setSearching(false);
      }, 1000);
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
                      className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                      <option value="">انتخاب شهر مبدا</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
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
                      className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                      <option value="">انتخاب شهر مقصد</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
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
                      min={new Date().toISOString().split('T')[0]}
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
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} نفر</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex flex-col justify-end">
                  <button 
                    onClick={handleHomeSearch}
                    disabled={searching}
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
      </div>
    );
  };

  return (
    <div>
      {currentPage === 'home' && <BusBookingHome />}
      {currentPage === 'search-results' && (
        <SearchResultsPage 
          searchParams={searchParams as unknown as SearchParams}
          onBack={handleBackToHome}
          onSelectSchedule={handleSelectSchedule}
        />
      )}
    </div>
  );
}