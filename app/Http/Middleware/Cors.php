<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        // اگر درخواست OPTIONS بود، پاسخ سریع می‌دهیم
        if ($request->getMethod() === "OPTIONS") {
            return response()->json('OK', 200, [
                'Access-Control-Allow-Origin'      => 'http://localhost:3000',
                'Access-Control-Allow-Methods'     => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers'     => 'X-Requested-With, Content-Type, X-Token-Auth, Authorization',
                'Access-Control-Allow-Credentials' => 'true',
            ]);
        }

        // ادامه درخواست و اضافه کردن هدرهای CORS
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}
