<?php

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
