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

use Locust\Models\User;

// -----------------------------------------------------------------------------
// Users

// Create user
post('/users.json', function () {
    $user = new User([
        'username' => ng('username'),
        'password' => ng('password'),
        'email'    => ng('email'),
        'role'     => "user"
    ]);

    if ($user->save()) {
        echo json_encode($user);
    } else {
        http_response_code(400);
        echo json_encode($user->errors);
    }
});

// Login
post('/login', function () {
    $user = User::find('username', ng('username', ''));

    if ($user && $user->authenticate(ng('password'))) {
        setcookie('locust_session', $user->session_hash, 0, '/', null, false, true);
        echo json_encode($user->toArray());
    } else {
        http_response_code(401);
    }
});

// Profile
get('/profile', function () {
    if (isset($_COOKIE['locust_session'])) {
        $user = User::find('session_hash', $_COOKIE['locust_session']);
        echo json_encode($user->toArray());
    } else {
        http_response_code(401);
    }
});

// Logout
delete('/logout', function () {
    setcookie('locust_session', null, 0, '/', null, false, true);
});
