<?php
$servername = "localhost";
$username = "root";
$password = '';
$db_name = 'recipe_app';

/* 
$mysqli = new mysqli($servername, $username, $password, $db_name);
if ($mysqli->connect_error) {
    die('connection failed' . $conn->connect_error);
} else {
     //return $mysqli;
     //echo "connection established";
}*/

$config = ['host'=>$servername,'user'=>$username,'password'=>$password,'database'=>$db_name];
return $config;