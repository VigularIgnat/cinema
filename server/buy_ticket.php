<?php 
	include "config.php";  
    header('Content-type', 'application/json; charset=utf-8');
    $params = json_decode(file_get_contents("php://input"), true);
    //echo ($params[0]["id_session"]);
    $n=count($params);
    //print_r($params);
    
    $id_session=$params["id_session"];
    $row=$params["row"];
    $place=$params["place"];
    //use \Datetime;

    //$now = new DateTime();
    //$tm_lock=date("m.d.y H:i:s");
    $tm_lock=date("Y-m-d H:i:s");
    //2022-04-23 17:23:35.000000
    $link = mysqli_connect($host, $user, $password, $db);

    // Check connection
    if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
    }
    $query="SELECT id FROM sales WHERE id_session=".$id_session." AND row=".$row." AND place=".$place;
    $result=mysqli_query($link, $query);

    $n=mysqli_num_rows($result);
    if ($n==0){
        $query="INSERT INTO sales(id_session,row,place) VALUES (".$id_session.", ".$row.", ".$place.")";
        //echo $query;
        mysqli_query($link, $query);
        mysqli_close($link);
        echo 1;
        
    }   
    else{
        echo 'no';
    }

    
    
   
 ?>