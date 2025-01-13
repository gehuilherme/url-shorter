<?php

declare(strict_types=1);

use App\Http\Controllers\{
    ApiStatusController,
    UrlsController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/status', [ApiStatusController::class, 'status']);

Route::get('/urls/all', [UrlsController::class, 'listAllUrls']);
Route::post('/urls/create', [UrlsController::class, 'createUrl']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
