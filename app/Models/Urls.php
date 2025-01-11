<?php

declare(strict_types=1);

namespace App\Models;

use Ramsey\Uuid\Guid\Guid;
use Illuminate\Database\Eloquent\Model;

class Urls extends Model
{
    protected $table = "urls";
    protected $primaryKey = 'id'; 
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'extended_url',
        'short_url',
        'user_agent_info',
        'expires_in'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($url) {
            if (!$url->id) {
                $url->id = (string) Guid::uuid4();
            }
        });
    }
}
