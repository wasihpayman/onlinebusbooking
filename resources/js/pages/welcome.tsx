import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Bus, Phone, Mail, Star } from 'lucide-react';

export default function BusBookingHome() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const cities = [
    'کابل', 'هرات', 'قندهار', 'مزار شریف', 'جلال آباد', 'کندز', 'تخار', 'بلخ', 'بادغیس', 'بامیان', 'فراه', 'غزنی', 'بغلان', 'لوگر', 'کاپیسا', 'پکتیا', 'خوست', 'وردک', 'پروان', 'لغمان'
  ];

  const popularRoutes = [
    { from: 'کابل', to: 'هرات', price: '2,500', duration: '12 ساعت' },
    { from: 'کابل', to: 'قندهار', price: '2,000', duration: '8 ساعت' },
    { from: 'کابل', to: 'مزار شریف', price: '1,800', duration: '6 ساعت' },
    { from: 'هرات', to: 'قندهار', price: '2,200', duration: '10 ساعت' }
  ];

  const handleSearch = () => {
    // اینجا بعداً لاجیک جستجو اضافه می‌شود
    console.log('جستجو:', { fromCity, toCity, departureDate, passengers });
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* From City */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium mb-2">مبدا</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  <select 
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="">انتخاب شهر مبدا</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
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
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="">انتخاب شهر مقصد</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
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
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} نفر</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex flex-col justify-end">
                <button 
                  onClick={handleSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Search className="h-5 w-5" />
                  <span>جستجو</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-r-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{route.from} - {route.to}</h4>
                    <p className="text-gray-600">مدت سفر: {route.duration}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-orange-500">{route.price}</p>
                    <p className="text-sm text-gray-500">افغانی</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  انتخاب مسیر
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">چرا سفرنت؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">کیفیت بالا</h4>
              <p className="text-gray-600">اتوبوس‌های مدرن و راحت با امکانات کامل</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">پشتیبانی ۲۴ ساعته</h4>
              <p className="text-gray-600">آماده پاسخگویی در تمام ساعات شبانه‌روز</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">پوشش سراسری</h4>
              <p className="text-gray-600">سرویس‌دهی به تمام ولایات افغانستان</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <Bus className="h-6 w-6" />
                <h5 className="text-xl font-bold">سفرنت</h5>
              </div>
              <p className="text-gray-400">سیستم رزرو آنلاین بلیط اتوبوس با بهترین خدمات</p>
            </div>
            <div>
              <h6 className="font-bold mb-4">لینک‌های مفید</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">درباره ما</a></li>
                <li><a href="#" className="hover:text-white transition-colors">قوانین و مقررات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">راهنمای خرید</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">خدمات</h6>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">رزرو بلیط</a></li>
                <li><a href="#" className="hover:text-white transition-colors">استعلام بلیط</a></li>
                <li><a href="#" className="hover:text-white transition-colors">کنسلی بلیط</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold mb-4">تماس با ما</h6>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="h-4 w-4" />
                  <span>0798338570</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="h-4 w-4" />
                  <span>wasihpayman@duck.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; ۱۴۰۳ سفرنت. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}