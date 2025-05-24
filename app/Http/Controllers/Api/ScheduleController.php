<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\Route;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'origin_city_id' => 'required|exists:cities,id',
            'destination_city_id' => 'required|exists:cities,id|different:origin_city_id',
            'departure_date' => 'required|date|after_or_equal:today',
            'passengers' => 'required|integer|min:1|max:10'
        ]);

        // پیدا کردن مسیر
        $route = Route::where('origin_city_id', $request->origin_city_id)
            ->where('destination_city_id', $request->destination_city_id)
            ->where('is_active', true)
            ->first();

        if (!$route) {
            return response()->json([
                'success' => false,
                'message' => 'مسیر مورد نظر یافت نشد'
            ], 404);
        }

        // جستجوی برنامه‌های سفر
        $schedules = Schedule::with(['route.originCity', 'route.destinationCity', 'bus.company'])
            ->where('route_id', $route->id)
            ->where('departure_date', $request->departure_date)
            ->where('available_seats', '>=', $request->passengers)
            ->where('status', 'active')
            ->orderBy('departure_time')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'route' => $route->load(['originCity', 'destinationCity']),
                'schedules' => $schedules,
                'search_params' => [
                    'origin_city_id' => $request->origin_city_id,
                    'destination_city_id' => $request->destination_city_id,
                    'departure_date' => $request->departure_date,
                    'passengers' => $request->passengers
                ]
            ]
        ]);
    }

    public function show($id)
    {
        $schedule = Schedule::with(['route.originCity', 'route.destinationCity', 'bus.company'])
            ->find($id);

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'برنامه سفر یافت نشد'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $schedule
        ]);
    }
}