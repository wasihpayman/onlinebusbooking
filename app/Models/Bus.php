<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'plate_number',
        'bus_type',
        'total_seats',
        'amenities',
        'is_active'
    ];

    protected $casts = [
        'amenities' => 'array',
        'is_active' => 'boolean',
    ];

    public function company()
    {
        return $this->belongsTo(BusCompany::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}