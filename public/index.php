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
		<nav class="navbar navbar-default navbar-static-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" ui-sref="roadmap">Locust</a>
				</div>

				<div class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li ui-sref-active="active"><a ui-sref="roadmap">Roadmap</a></li>
						<li ui-sref-active="active"><a ui-sref="issues">Issues</a></li>
						<li ui-sref-active="active"><a ui-sref="new-issue">New Issue</a></li>
					</ul>

					<ul class="nav navbar-nav navbar-right" ng-if="!currentUser">
						<li ui-sref-active="active"><a ui-sref="login">Login</a></li>
						<li ui-sref-active="active"><a ui-sref="register">Register</a></li>
					</ul>

					<ul class="nav navbar-nav navbar-right" ng-if="currentUser">
						<li>
							<a href="#"><i class="glyphicon glyphicon-user"></i></a>
						</li>
						<li><a ui-sref="logout">Logout</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<main>
			<div ui-view></div>
		</main>

		<script src="<?=Nanite::baseUri('assets/bundle.js')?>"></script>
	</body>
</html>
