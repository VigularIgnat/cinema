<?php 
	include "config.php";  
    header('Content-Type: text/html; charset=utf-8');
	if(isset($_GET["id_session"])){
        $id_session=htmlspecialchars($_GET["id_session"]);
        $link = mysqli_connect($host, $user, $password, $db);

        // Check connection
        if (!$link) {
            die("Connection failed: " . mysqli_connect_error());
        }
    
        $query="SELECT F.filmname  FROM films F, sessions S  WHERE S.id_film= F.id AND S.id=".$id_session."LIMIT 1";
        //id_film:0,name:"",tm:"",dt:"",hall:"",rows:0,places:0
        /*$query="SELECT S.id_film, F.filmname, S.tm, F.poster, 100 as price, P.producer 
                FROM session S, films F, producers P 
                WHERE S.id_film=F.id and F.id_producer=P.id
                ORDER BY F.filmname";*/

        $result = mysqli_query($link, $query);

        $n=mysqli_num_rows($result);
        if ($n== 1) {
            // output data of each row
            for ($i=0; $i < $n; $i++) { 
                $row = mysqli_fetch_assoc($result);
                $str_array=$row["filname"];
                //$array_clients=array("id_session"=> $row["id_session"], "row"=> $row["row"], "place"=>$row["place"]);
            }

            echo $str_array;
            
        
        
        } else {
            echo "0 results";
        }

    }
	
 ?>