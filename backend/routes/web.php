<?php

declare(strict_types=1);

use App\Http\Controllers\UrlsController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/r/{shortUrl}', [UrlsController::class, 'redirectToUrl']);
