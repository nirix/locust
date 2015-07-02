<?php
require __DIR__ . '/vendor/autoload.php';

$config = require "config.php";

// -----------------------------------------------------------------------------
// Database connection
switch ($config['driver']) {
    case 'pgsql':
    case 'mysql':
        $db = new PDO(
            "{$config['driver']}:host={$config['host']};dbname={$config['dbname']}",
            $config['user'],
            $config['password']
        );
        break;

    default:
        die("Unsupported database driver.");
}

// -----------------------------------------------------------------------------
// Things to make things easier

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
function ng()
{
    static $ng;

    if (!$ng) {
        return $ng = json_decode(file_get_contents('php://input'), true);
    }

    return $ng;
}

// -----------------------------------------------------------------------------
// Users
post('/login', function () use ($db) {
    $user = $db->prepare("SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1");

    $user->execute([
        ng()['username'],
        ng()['password'],
    ]);

    if ($data = $user->fetch(PDO::FETCH_ASSOC)) {
        unset($data['password']);

        setcookie('locust_session', $data['session_hash'], 0, '/', null, false, true);
        unset($data['session_hash']);

        echo json_encode($data);
    } else {
        http_response_code(401);
    }
});

get('/profile', function () use ($db) {
    if (isset($_COOKIE['locust_session'])) {
        $user = $db->prepare("SELECT * FROM users WHERE session_hash = ? LIMIT 1");
        $user->execute([$_COOKIE['locust_session']]);

        echo json_encode($user->fetch(PDO::FETCH_ASSOC));
    } else {
        http_response_code(401);
    }
});

// -----------------------------------------------------------------------------
// Roadmap
get('/roadmap.json', function () use ($db) {
    $versions = $db->prepare("SELECT * FROM versions ORDER BY display_order");
    $versions->execute();
    echo json_encode($versions->fetchAll(PDO::FETCH_ASSOC));
});

// Show version
get('/roadmap/(.*).json', function ($slug) use ($db) {
    $version = $db->prepare("SELECT * FROM versions WHERE slug = ? LIMIT 1");
    $version->execute([$slug]);
    echo json_encode($version->fetch(PDO::FETCH_ASSOC));
});

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
delete('/issues.json', function () use ($db) {
    // Check if logged in and is admin
    if (!currentUser() || currentUser()['role'] != 'admin') {
        return http_response_code(401);
    }

    $id = $_REQUEST['id'];
    $result = $db->prepare("DELETE FROM issues WHERE id = ?")->execute([$id]);
});

// Show issue
get('/issues/(\d+).json', function ($id) use ($db) {
    $issue = $db->prepare("SELECT * FROM issues WHERE id = ? LIMIT 1");
    $issue->execute([$id]);
    echo json_encode($issue->fetch(PDO::FETCH_ASSOC));
});

// 404
if (!Nanite::$routeProccessed) {
    http_response_code(404);
}
