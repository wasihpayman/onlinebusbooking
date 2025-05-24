
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'province',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function originRoutes()
    {
        return $this->hasMany(Route::class, 'origin_city_id');
    }

    public function destinationRoutes()
    {
        return $this->hasMany(Route::class, 'destination_city_id');
    }
}
