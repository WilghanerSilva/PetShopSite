<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    protected $fillable = [
        'name',
        'price'
    ];

    public function services()
    {
        return $this->belongsToMany(Service::class);
    }
}
