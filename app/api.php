<?php
require __DIR__ . '/vendor/autoload.php';

$config = require "config.php";

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

// Show issue
get('/issues/(\d+).json', function ($id) use ($db) {
    $issue = $db->prepare("SELECT * FROM issues WHERE id = ? LIMIT 1");
    $issue->execute([$id]);
    echo json_encode($issue->fetch(PDO::FETCH_ASSOC));
});
