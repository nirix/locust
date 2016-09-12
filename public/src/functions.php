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

/**
 * Gets the current user.
 *
 * @return array|null
 */
function currentUser()
{
    global $db;
    static $currentUser;

    if (isset($_COOKIE['locust_session']) && !$currentUser) {
        $user = $db->prepare("SELECT * FROM users WHERE session_hash = ? LIMIT 1");
        $user->execute([$_COOKIE['locust_session']]);

        return $currentUser = $user->fetch(PDO::FETCH_ASSOC);
    }

    return $currentUser;
}

/**
 * Get input and decode into an array.
 *
 * @return array
 */
function ng($index = null, $default = null)
{
    static $ng;

    if (!$ng) {
        $ng = json_decode(file_get_contents('php://input'), true);
    }

    if ($index) {
        return isset($ng[$index]) ? $ng[$index] : $default;
    } else {
        return $ng;
    }
}
