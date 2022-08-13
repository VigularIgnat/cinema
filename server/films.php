<?php
    include "config.php" ;  

    header('Content-Type: text/html; charset=utf-8');

     // Create connection
    $link = mysqli_connect($host, $user, $password, $db);

    // Check connection
    if (!$link) {
      die("Connection failed: " . mysqli_connect_error());
    }
   
    $query="SELECT F.id, F.filmname, P.producer, F.poster, F.year_create  FROM films F, producers P WHERE F.id_producer=P.id and F.actual=1 ORDER BY F.filmname";
    //id;name;tm;poster;price
    /*$query="SELECT S.id_film, F.filmname, S.tm, F.poster, 100 as price, P.producer 
            FROM session S, films F, producers P 
            WHERE S.id_film=F.id and F.id_producer=P.id
            ORDER BY F.filmname";*/

    $result = mysqli_query($link, $query);

    $n=mysqli_num_rows($result);
    if ($n > 0) {
        // output data of each row
        $str_array="[";
        for ($i=0; $i < $n-1; $i++) { 
            $row = mysqli_fetch_assoc($result);
            /*$str_array.='{"id":"'.$row["id_film"].'","name":"'.$row["filmname"].'","tm":"'.$row["tm"].'","poster":"'.$row["poster"].'","price":"'.$row["price"].'"},';*/
            $str_array.='{"id":"'.$row["id"].'","name":"'.$row["filmname"].'","poster":"'.$row["poster"].'","year":"'.$row["year_create"].'"},';
        }
        $row = mysqli_fetch_assoc($result);

        /*$str_array.='{"id":"'.$row["id_film"].'","name":"'.$row["filmname"].'","tm":"'.$row["tm"].'","poster":"'.$row["poster"].'","price":"'.$row["price"].'"}';*/

        $str_array.='{"id":"'.$row["id"].'","name":"'.$row["filmname"].'","poster":"'.$row["poster"].'","year":"'.$row["year_create"].'"}';
        $str_array.="]";
        echo $str_array;
    } else {
        echo "0 results";
    }

            //$str_array.="{}";
            //while($row = mysqli_fetch_assoc($result)) {

            //echo "id: " . $row["id"]. " - Name: " . $row["filmname"]. " " . $row["producer"]."".$row["year_create"]. "<br>";


            /*$str_array.='{"id":"'.$row["id_film"].'","name":"'.$row["filmname"].'","tm":"'.$row["tm"].'","poster":"'.$row["poster"].'","price":"'.$row["price"].'"},';*/

            /*$str_array.='{"id":"'.$row["id_film"].'","name":"'.$row["filmname"].'","tm":"'.$row["tm"].'","poster":"'.$row["poster"].'","price":"'.$row["price"].'"}';*/








    /*$data= file_get_contents("films.txt");
    $films=explode("#", $data);
    $str_array='[';
    $fields=explode(";", $films[0]);
    $n=count($films);
    for($i=1; $i< $n-1; $i++){
        $film=explode(";", $films[$i]);
        $str_array.='{"'.$fields[0].'":"'.$film[0].'","'.
                         $fields[1].'":"'.$film[1].'","'.
                         $fields[2].'":"'.$film[2].'","'.
                         $fields[3].'":"'.$film[3].'"},';
    }
    $film=explode(";", $films[$n-1]);
    $str_array.='{"'.$fields[0].'":"'.$film[0].'","'.
                    $fields[1].'":"'.$film[1].'","'.
                    $fields[2].'":"'.$film[2].'","'.
                    $fields[3].'":"'.$film[3].'"}]';
                    

    //mb_substr($str_array, 0, 7, "UTF-8"); 
    echo $str_array;*/
?>

