<?php


// -----------------------------------------------------------------------------
// Issues
get('/issues.json', function () use ($db) {
    $issues = $db->prepare("SELECT * FROM issues");
    $issues->execute();
    echo json_encode($issues->fetchAll(PDO::FETCH_ASSOC));
});

// Create issue
post('/issues.json', function () use ($db) {
    // Check if logged in
    if (!currentUser()) {
        return http_response_code(401);
    }

    $data = [
        'summary'     => ng()['summary'],
        'description' => ng()['description'],
        'version_id'  => 1,
        'user_id'     => currentUser()['id']
    ];

    $error = false;
    foreach (['summary', 'description'] as $field) {
        if (empty($data[$field])) {
            $error = true;
        }
    }

    if (!$error) {
        $result = $db->prepare("INSERT INTO issues
            (summary, description, version_id, user_id, created_at, updated_at)
            VALUES(
                :summary,
                :description,
                :version_id,
                :user_id,
                NOW(),
                NOW()
            )
        ")
        ->execute($data);

        $lastInserted = $db->query("SELECT * FROM issues ORDER BY id DESC LIMIT 1");
        echo json_encode($lastInserted->fetch(PDO::FETCH_ASSOC));
    }
});

// Delete issue
delete('/issues/(\d+).json', function ($id) use ($db) {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(currentUser() ? 401 : 403);
    }

    $result = $db->prepare("DELETE FROM issues WHERE id = ?")->execute([$id]);
});

// Show issue
get('/issues/(\d+).json', function ($id) use ($db) {
    $issue = $db->prepare("SELECT * FROM issues WHERE id = ? LIMIT 1");
    $issue->execute([$id]);
    echo json_encode($issue->fetch(PDO::FETCH_ASSOC));
});
