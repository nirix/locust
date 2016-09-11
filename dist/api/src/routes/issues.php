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
use Locust\Models\Status;

// -----------------------------------------------------------------------------
// Issues
get('/issues', function () {
    $issues = Issue::all();
    echo json_encode($issues);
});

// Create issue
post('/issues', function () {
    // Check if logged in
    if (!currentUser()) {
        return http_response_code(401);
    }

    $status = Status::find(ng('status_id'));

    $data = [
        'summary'     => ng('summary'),
        'description' => ng('description'),
        'version_id'  => ng('version_id'),
        'user_id'     => currentUser()['id'],
        'status_id'   => $status->id,
        'is_closed'   => $status->is_closed,
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
delete('/issues/(\d+)', function ($id) {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(currentUser() ? 401 : 403);
    }

    $issue = Issue::find($id)->delete();
});

// Show issue
get('/issues/(\d+)', function ($id) {
    $issue = Issue::find($id);
    echo json_encode($issue);
});
