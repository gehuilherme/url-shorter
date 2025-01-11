<?php

declare(strict_types=1);

namespace App\Services\Status;

use Illuminate\Support\Facades\DB;

final class DatabaseService
{
    public static function databaseStatus()
    {
        $dbVersion = DB::select("SHOW server_version;")[0]->server_version;
        $dbMaxConnections = (int) DB::select("SHOW max_connections;")[0]->max_connections;
        $dbOpenedConnections = DB::select(
            "SELECT count(*)::int FROM pg_stat_activity WHERE datname = ?;",
            [config('database.connections.pgsql.database')]
        )[0]->count;

        return ([
            "version" => $dbVersion,
            "max_connections" => $dbMaxConnections,
            "opened_connections" => $dbOpenedConnections
        ]);
    }
}
