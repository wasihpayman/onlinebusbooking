// app/Http/Controllers/Api/CityController.php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'province']);

        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    public function show($id)
    {
        $city = City::find($id);
        
        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'شهر یافت نشد'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $city
        ]);
    }
}