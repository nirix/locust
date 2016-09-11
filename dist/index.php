<?php require __DIR__ . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <base href="<?=Nanite::baseUri()?>">
    <title>Angular With Webpack</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <locust-app>Loading...</locust-app>
    <script src="<?=Nanite::baseUri('assets/polyfills.js')?>"></script>
    <script src="<?=Nanite::baseUri('assets/vendor.js')?>"></script>
    <script src="<?=Nanite::baseUri('assets/app.js')?>"></script>
  </body>
</html>
