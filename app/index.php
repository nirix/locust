<?php require __DIR__ . '/vendor/autoload.php'; ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Locust</title>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		<base href="<?= Nanite::baseUri() ?>">
	</head>
	<body ng-app="locust">
		<?php require __DIR__ . '/views/header.html'; ?>

		<main>
			<div ui-view></div>
		</main>

		<!-- Angular -->
		<script src="bower_components/angular/angular.js"></script>
		<script src="bower_components/angular-resource/angular-resource.js"></script>
		<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>

		<!-- Locust -->
		<script src="js/locust.js"></script>

		<!-- Locust modules -->
		<script src="js/auth/auth.js"></script>
		<script src="js/auth/resources.js"></script>

		<script src="js/roadmap/roadmap.js"></script>
		<script src="js/roadmap/resources.js"></script>

		<script src="js/issues/issues.js"></script>
		<script src="js/issues/resources.js"></script>

		<!-- Other -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="bower_components/marked/marked.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	</body>
</html>
