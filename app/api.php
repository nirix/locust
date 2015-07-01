<?php
require __DIR__ . '/vendor/autoload.php';

$versions = [
    ['id' => 1, 'name' => '0.1.0', 'slug' => '0.1.0', 'display_order' => 00100],
    ['id' => 2, 'name' => '0.2.0', 'slug' => '0.2.0', 'display_order' => 00200],
    ['id' => 3, 'name' => '1.0.0', 'slug' => '1.0.0', 'display_order' => 10000]
];

get('/roadmap.json', function () use ($versions) {
    echo json_encode($versions);
});

get('/roadmap/(0.1.0|0.2.0|1.0.0).json', function ($id) use ($versions) {
    switch ($id) {
        case '0.1.0':
            $version = $versions[0];
            break;

        case '0.2.0':
            $version = $versions[1];
            break;

        case '1.0.0':
            $version = $versions[2];
            break;
    }

    echo json_encode($version);
});

get('/issues.json', function () {
    echo json_encode([
        ['id' => 1, 'summary' => 'It\'s broked']
    ]);
});
