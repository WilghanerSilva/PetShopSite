<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{

    protected $fillable = [
        'name',
        'breed',
        'specie',
        'age',
        'weight',
        'user_id',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
