<?php 

$conn = new mysqli('localhost', 'root', '', 'pastebin');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

?>
