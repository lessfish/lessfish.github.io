<?php

$user_uid = rand(0, 50000);
$file_pos = strpos($_FILES['file']['name'], '.');
$file_name = $user_uid . '.' . substr($_FILES['file']['name'], $file_pos + 1);
$savePath = dirname(__FILE__) . '\\' . $file_name;
copy($_FILES['file']['tmp_name'], $savePath);

?>