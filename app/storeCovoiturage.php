<?php

	include_once('config.php');
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$name = $request->name;
	$return = $request->return;
	$firstname =$request->firstname;
	$driver =$request ->driver;
	$town = $request ->town;
	$tel = $request->tel;
	$placeCount = $request->placeCount;
	$mysqli->set_charset("utf8");

	$query = "INSERT INTO `db573129485`.`Covoiturage`(`NOM`, `ALLER_RETOUR`, `PRENOM`, `CONDUCTEUR`, `VILLE_DEPART`, `NUMERO`, `NOMBRE_PLACE`, `ID`) VALUES ( ?, ?, ?, ?, ?, ?, ?, NULL )";

	$stmt = $mysqli->stmt_init();

	if(!$stmt->prepare($query)) {
	    print "Failed to prepare statement\n";
	}
	else {
		$stmt->bind_param("sisissi", $name, $return, $firstname, $driver, $town, $tel, $placeCount);
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