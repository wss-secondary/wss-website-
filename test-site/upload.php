<?php

//Move Upload file to a new directory
$targetPath = "uploads/" . basename($_FILES["inpFile"]["name"]);
move_upload_file($_FILES["inpFile"]["tmp_name"], $targetPath);