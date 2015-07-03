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

use Locust\Models\Issue;

// -----------------------------------------------------------------------------
// Issues
get('/issues.json', function () use ($db) {
    $issues = Issue::all();
    echo json_encode($issues);
});

// Create issue
post('/issues.json', function () use ($db) {
    // Check if logged in
    if (!currentUser()) {
        return http_response_code(401);
    }

    $data = [
        'summary'     => ng('summary'),
        'description' => ng('description'),
        'version_id'  => ng('version_id'),
        'user_id'     => currentUser()['id']
    ];

    $issue = new Issue($data);

    if ($issue->save()) {
        echo json_encode($issue);
    } else {
        http_response_code(400);
        echo json_encode($issue->errors());
    }
});

// Delete issue
delete('/issues/(\d+).json', function ($id) use ($db) {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(currentUser() ? 401 : 403);
    }

    $issue = Issue::find($id)->delete();
});

// Show issue
get('/issues/(\d+).json', function ($id) use ($db) {
    $issue = Issue::find($id);
    echo json_encode($issue);
});
