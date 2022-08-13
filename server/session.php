<?php 
	include "config.php";  
    header('Content-Type: text/html; charset=utf-8');
	$id_film=$_GET["id_film"];
	$link = mysqli_connect($host, $user, $password, $db);

    // Check connection
    if (!$link) {
      die("Connection failed: " . mysqli_connect_error());
    }
   
    $query="SELECT S.id, S.id_film, H.id as id_hall, H.hallname, S.tm, S.dt, H.rows, H.places, S.price  FROM sessions S, halls H WHERE S.id_hall=H.id AND S.id_film=".$id_film;
    //id_film:0,name:"",tm:"",dt:"",hall:"",rows:0,places:0
    /*$query="SELECT S.id_film, F.filmname, S.tm, F.poster, 100 as price, P.producer 
            FROM session S, films F, producers P 
            WHERE S.id_film=F.id and F.id_producer=P.id
            ORDER BY F.filmname";*/

    $result = mysqli_query($link, $query);

    $n=mysqli_num_rows($result);
    if ($n > 0) {
        // output data of each row
        $str_array="[";
        for ($i=0; $i < $n; $i++) { 
            $row = mysqli_fetch_assoc($result);
            /*$str_array.='{"id":"'.$row["id_film"].'","name":"'.$row["filmname"].'","tm":"'.$row["tm"].'","poster":"'.$row["poster"].'","price":"'.$row["price"].'"},';*/
            $str_array.='{"id":"'.$row["id"].'","id_film":"'.$row["id_film"].'","id_hall":"'.$row["id_hall"].'","hallname":"'.$row["hallname"].'","tm":"'.$row["tm"].'","dt":"'.$row["dt"].'","rows":"'.$row["rows"].'","places":"'.$row["places"].'","price":"'.$row["price"].'"},';
        }

        $str_array = substr($str_array,0,-1);

        $str_array.="]";
        echo $str_array;
        
       
       
    } else {
        echo "0 results";
    }


 ?>