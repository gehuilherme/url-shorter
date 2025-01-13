<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use App\Services\Status\DatabaseService;

/**
 * ApiStatusController class
 * 
 * @author Guilherme Miranda <guilhermehenrique1099@gmail.com>
 * @category controller
 * @package Controllers
 */
class ApiStatusController extends Controller
{
    public function status()
    {
        $databaseInfo = DatabaseService::databaseStatus();

        return new JsonResponse([
            "updated_at" => Carbon::now(),
            "dependencies" => [
                "database" => $databaseInfo
            ]
        ]);
    }
}
