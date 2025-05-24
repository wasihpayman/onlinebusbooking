<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index(Request $request)
    {
        $query = Route::with(['originCity', 'destinationCity'])
            ->where('is_active', true);

        if ($request->has('origin_city_id')) {
            $query->where('origin_city_id', $request->origin_city_id);
        }

        if ($request->has('destination_city_id')) {
            $query->where('destination_city_id', $request->destination_city_id);
        }

        $routes = $query->get();

        return response()->json([
            'success' => true,
            'data' => $routes
        ]);
    }

    public function popular()
    {
        $popularRoutes = Route::with(['originCity', 'destinationCity'])
            ->where('is_active', true)
            ->orderBy('base_price')
            ->limit(4)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $popularRoutes
        ]);
    }
}s