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

use Locust\Models\Version;

// -----------------------------------------------------------------------------
// Roadmap (active versions)
get('/roadmap.json', function () {
    $versions = Version::select()->orderBy('display_order')->fetchAll();
    echo json_encode($versions);
});

// Completed versions
get('/roadmap/completed.json', function () {
    $versions = Version::where('is_completed', 1)->orderBy('display_order')->fetchAll();
    echo json_encode($versions);
});

// Create version
post('/roadmap.json', function () {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(currentUser() ? 401 : 403);
    }

    $data = [
        'name'          => ng('name'),
        'slug'          => ng('slug'),
        'description'   => ng('description'),
        'display_order' => ng('display_order'),
        'is_completed'  => ng('is_completed')
    ];

    $version = new Version($data);

    if ($version->save()) {
        echo json_encode($version);
    } else {
        http_response_code(400);
        echo json_encode($version->errors());
    }
});

// Show version
get('/roadmap/(.*).json', function ($slug) {
    $version = Version::find('slug', $slug);
    echo json_encode($version);
});

post('/roadmap/(.*).json', function ($slug) {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(currentUser() ? 401 : 403);
    }

    if (ng('id') && $version = Version::find(ng('id'))) {
        $version->set([
            'name'          => ng('name'),
            'slug'          => ng('slug'),
            'description'   => ng('description'),
            'display_order' => ng('display_order'),
            'is_completed'  => ng('is_completed')
        ]);

        if ($version->save()) {
            echo json_encode($version);
        } else {
            http_response_code(400);
            echo json_encode($version->errors());
        }
    } else {
        http_response_code(400);
    }
});

// Delete version
delete('/roadmap/(.*).json', function ($slug) {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(currentUser() ? 401 : 403);
    }

    $version = Version::find('slug', $slug)->delete();
});
