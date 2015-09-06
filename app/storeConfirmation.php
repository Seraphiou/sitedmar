<?php

	include_once('config.php');
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$name = $request->name;
	$firstname =$request->firstname;
	$placeCount = $request->placeCount;
	$password = $request->password;
	$iscoming = $request->iscoming;
	if ($password=="ParisAlsace") {

		$mysqli->set_charset("utf8");

		$query = "INSERT INTO `db573129485`.`Confirmation`(`NOM`, `PRENOM`, `NOMBRE`, `ISCOMING`, `ID`) VALUES ( ?, ?, ?, ?, NULL )";

		$stmt = $mysqli->stmt_init();

		if(!$stmt->prepare($query)) {
		    print "Failed to prepare statement\n";
		}
		else {
			$stmt->bind_param("ssii", $name, $firstname, $placeCount, $iscoming);
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
	}else {
		echo "pwerror";
	}
	

	$stmt->close();
	$mysqli->close();
?>