<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Urls;
use App\Services\UrlService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\UrlRequest;
use Carbon\Carbon;

/**
 * UrlsController class
 * 
 * @author Guilherme Miranda <guilhermehenrique1099@gmail.com>
 * @category controller
 * @package Controllers
 */
class UrlsController extends Controller
{
    public function listAllUrls()
    {
        return Urls::all();
    }

    public function createUrl(UrlRequest $request): JsonResponse
    {
        $request->validated();

        $url = $request->url;
        $status = 200;
        $userData = [
            "ip" => $request->ip(),
            "user_agent" => $request->userAgent()
        ];

        try {
            $generatedUrl = new Urls();
            $generatedUrl->extended_url = $url;
            $generatedUrl->short_url = UrlService::generateRandomUrl($url);
            $generatedUrl->user_agent_info = json_encode($userData);
            $generatedUrl->save();

            return new JsonResponse([
                "old_url" => $url,
                "new_url" => $generatedUrl->short_url,
                "message" => __("Short URL Created!")
            ], $status);
        } catch (\Throwable $th) {
            throw $th;
            $status = 409;
        }

        return new JsonResponse([
            "old_url" => $url,
            "new_url" => null,
            "message" => __("Fail on create short URL!")
        ], $status);
    }

    public function redirectToUrl(Request $request , String $shortUrl)
    {
        $url = Urls::where('short_url', '=', env('REDIRECT_URL') . $shortUrl)->where('expires_in', '>=', Carbon::now())->first();

        if(!$url) {
            return redirect(env('APP_URL'));
        }

        header('Location: ' . $url->extended_url);
        die();
    }
}
