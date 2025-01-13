<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Hash;

final class UrlService
{
    public static function generateRandomUrl(String $url): String
    {
        $hash = Hash::make($url);
        $hash = substr($hash, 6, 15);

        return env('REDIRECT_URL') . $hash;
    }
}
