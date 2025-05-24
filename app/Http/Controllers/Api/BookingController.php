<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Schedule;
use App\Models\Passenger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'passengers' => 'required|array|min:1',
            'passengers.*.name' => 'required|string|max:255',
            'passengers.*.national_id' => 'required|string|max:20',
            'passengers.*.gender' => 'required|in:male,female',
            'passengers.*.seat_number' => 'required|integer|min:1',
            'passengers.*.phone' => 'nullable|string|max:20'
        ]);

        $schedule = Schedule::find($request->schedule_id);

        if ($schedule->available_seats < count($request->passengers)) {
            return response()->json([
                'success' => false,
                'message' => 'تعداد صندلی‌های خالی کافی نیست'
            ], 400);
        }

        DB::beginTransaction();
        try {
            // ایجاد رزرو
            $booking = Booking::create([
                'booking_number' => Booking::generateBookingNumber(),
                'user_id' => Auth::id(),
                'schedule_id' => $request->schedule_id,
                'seat_count' => count($request->passengers),
                'total_amount' => $schedule->price * count($request->passengers),
                'booking_date' => now()
            ]);

            // ایجاد مسافران
            foreach ($request->passengers as $passengerData) {
                Passenger::create([
                    'booking_id' => $booking->id,
                    'name' => $passengerData['name'],
                    'national_id' => $passengerData['national_id'],
                    'gender' => $passengerData['gender'],
                    'seat_number' => $passengerData['seat_number'],
                    'phone' => $passengerData['phone'] ?? null
                ]);
            }

            // کاهش صندلی‌های خالی
            $schedule->decrement('available_seats', count($request->passengers));

            DB::commit();

            $booking->load(['schedule.route.originCity', 'schedule.route.destinationCity', 'passengers']);

            return response()->json([
                'success' => true,
                'message' => 'رزرو با موفقیت ثبت شد',
                'data' => $booking
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'خطا در ثبت رزرو'
            ], 500);
        }
    }

    public function index()
    {
        $bookings = Booking::with(['schedule.route.originCity', 'schedule.route.destinationCity', 'passengers'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $bookings
        ]);
    }

    public function show($bookingNumber)
    {
        $booking = Booking::with(['schedule.route.originCity', 'schedule.route.destinationCity', 'schedule.bus.company', 'passengers'])
            ->where('booking_number', $bookingNumber)
            ->where('user_id', Auth::id())
            ->first();

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'رزرو یافت نشد'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $booking
        ]);
    }

    public function cancel($bookingNumber)
    {
        $booking = Booking::where('booking_number', $bookingNumber)
            ->where('user_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if (!$booking) {
            return response()->json([
                'success' => false,
                'message' => 'رزرو یافت نشد یا قابل کنسل نیست'
            ], 404);
        }

        DB::beginTransaction();
        try {
            // کنسل کردن رزرو
            $booking->update(['status' => 'cancelled']);

            // برگرداندن صندلی‌های خالی
            $booking->schedule->increment('available_seats', $booking->seat_count);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'رزرو با موفقیت کنسل شد'
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'خطا در کنسل رزرو'
            ], 500);
        }
    }
}