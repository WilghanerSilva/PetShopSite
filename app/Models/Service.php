<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'price',
        'is_done',
        'customer_id',
        'employee_id',
        'pet_id',
        'pos_session_id'
    ];

    public function types()
    {
        return $this->belongsToMany(ServiceType::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function posSession()
    {
        return $this->belongsTo(PosSession::class);
    }
}
