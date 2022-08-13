<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/styleform.css">
    <!-- CSS only -->

</head>
<body>
<nav>  
   
   
    <div  id="films">
        <div id="films_container">

        </div>
        <div class="arrow left" vector="-1"><i class="arrow_elem left_elem"></i></div>
        
        <div class="arrow right" vector="1"><i class="arrow_elem right_elem "></i></div>
    </div>
    <div id='sessions'>
        <div id="sessions__info">
            Ви не вибрали сесію
        </div>
        <div id="sessions__div">

        </div>
    </div>
    <div id="places">
        <div id="name_film">Назва фільму</div>
        <hr>
        <div class="main_content">
            <div id="hall">
                
                
                </div>
                <div id="choose">
                    <div class="text">
                        <span>Вибрано</span>
                        
                    </div>
                    <div id="hide_ticket ">
                        <p>Закрити <i class="hide_arrow up"></i><button class="exs" onclick="clear_cart()">Очистити</button></p>
                        
                    </div>
                
                    <div id="choose_places">
            
                    </div>
                    <button id="buy_tickets" onclick="pay()">Оплатити</button>
                </div>
        </div>
        
        <div id="info">
            Ряд:  Місце:
        </div>
        
        
        
    </div>
    
    <script src="script/script.js"></script>
    

    
    <!---form---------->
    

</body>
</html>