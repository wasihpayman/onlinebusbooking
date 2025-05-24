<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_number',
        'user_id',
        'schedule_id',
        'seat_count',
        'total_amount',
        'status',
        'payment_status',
        'booking_date'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'booking_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function passengers()
    {
        return $this->hasMany(Passenger::class);
    }

    public static function generateBookingNumber()
    {
        do {
            $bookingNumber = 'BK' . date('Ymd') . rand(1000000, 9999999);
        } while (self::where('booking_number', $bookingNumber)->exists());

        return $bookingNumber;
    }
}