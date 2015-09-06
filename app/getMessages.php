<?php

	include_once('config.php');
	$mysqli->set_charset("utf8");
	
	if ($result = $mysqli->query("Select * from db573129485.Message order by Date desc")) {

	    while($row = $result->fetch_array(MYSQL_ASSOC)) {
	        $myArray[] = $row;
	    }
	    echo json_encode($myArray);
	}
	    
    /* Libère le résultat */
    $result->close();
?>