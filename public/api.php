<?php
/*!
 * Locust
 * Copyright 2015 Jack Polgar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require __DIR__ . '/vendor/autoload.php';

$config = require "config.php";

// -----------------------------------------------------------------------------
// Database connection
$db = Avalon\Database\ConnectionManager::create($config['database']);

// -----------------------------------------------------------------------------
// Things to make things easier
require __DIR__ . '/src/functions.php';

// -----------------------------------------------------------------------------
// Routes
require __DIR__ . '/src/routes/users.php';
require __DIR__ . '/src/routes/roadmap.php';
require __DIR__ . '/src/routes/issues.php';
require __DIR__ . '/src/routes/statuses.php';

// 404
if (!Nanite::$routeProccessed) {
    http_response_code(404);
}
