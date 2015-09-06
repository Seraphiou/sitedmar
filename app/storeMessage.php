<?php

	include_once('config.php');
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$name = $request->name;
	$message = $request->message;
	$title = $request->title;

	$mysqli->set_charset("utf8");

	$query = "INSERT INTO `db573129485`.`Message`(`NOM`, `Message`, `Titre`, `ID`) VALUES ( ?, ?, ?, NULL )";

	$stmt = $mysqli->stmt_init();

	if(!$stmt->prepare($query)) {
	    print "Failed to prepare statement\n";
	}
	else {
		$stmt->bind_param("sss", $name, $message, $title);
	}
	$stmt->execute();

	$nrows = $stmt->affected_rows;
	if (!$nrows || $nrows==-1) {
		echo "Nothing has been updated";
		echo "An error occured : ".$nrows->error ;
	}
	else {
		echo $nrows." row has been updated.";
	}
	

	$stmt->close();
	$mysqli->close();
?>