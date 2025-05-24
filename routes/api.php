
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\RouteController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\BookingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes - مسیرهای عمومی
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Cities
Route::get('/cities', [CityController::class, 'index']);
Route::get('/cities/{id}', [CityController::class, 'show']);

// Routes
Route::get('/routes', [RouteController::class, 'index']);
Route::get('/routes/popular', [RouteController::class, 'popular']);

// Schedule search
Route::post('/schedules/search', [ScheduleController::class, 'search']);
Route::get('/schedules/{id}', [ScheduleController::class, 'show']);

// Protected routes - مسیرهای محافظت شده
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{bookingNumber}', [BookingController::class, 'show']);
    Route::put('/bookings/{bookingNumber}/cancel', [BookingController::class, 'cancel']);
});