var  $= function(id){
    return document.getElementById(id);
}
/************************************************************************/
//Data
var films=[{id:0, name:"", tm:"", poster:""}];
    
/*{id:1,name:"Людина-павук", tm: "17:00", poster:"1.jpg", price:80},
    {id:2,name:"Вверх", tm: "19:00", poster:"2.jpg", price:60},
    {id:3,name:"Головоломка", tm: "21:00", poster:"3.jpg", price:90},

    {id:4,name:"Людина-павук 2", tm: "17:00", poster:"4.jpg", price:80},
    {id:5,name:"Вверх 2", tm: "19:00", poster:"5.jpg", price:60},
    {id:6,name:"Головоломка 2", tm: "21:00", poster:"6.jpg", price:90},

    {id:7,name:"Людина-павук 3", tm: "17:00", poster:"1.jpg", price:80},
    {id:8,name:"Вверх 3", tm: "19:00", poster:"2.jpg", price:60},
    {id:9,name:"Головоломка 3", tm: "21:00", poster:"3.jpg", price:90}*/

var sessions=[{id:0, id_film:0, id_hall:0, hallname:"", tm:"", dt:"", rows:0, places:0}]


var arr_places=[];


var arr_rows=[];

var sales=[{id_film:0,row:0,place:0,price:0}];


//localStorage

var cart=[];
cart = JSON.parse( localStorage.getItem("myCart") );

if(cart==null)cart=[];
//alert(localStorage.getItem("myCart"));
sales = JSON.parse( localStorage.getItem("sales") );

if(sales==null)sales=[];

//{id_film:0,row:0,places:0,price:0}

//hals
var rows=10, places=25;
var w=10;
var cur_film={id:0, name:"noname", tm:"00:00", poster:"0.jpg", price:0};
var cur_poster;

var cur_sale={id_film:0,row:0,place:0,price:0};

var hall=$("hall");

var list_posters;
var cur_index_film=0;

var arrows;

/******************************************************************************* */
//Function

function getFilmList(){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            //console.log(JSON.parse(this.responseText));
            //
        
            films=JSON.parse(this.responseText);
            buildPage();
            name_elem();    
            show_poster(0);

            
        }   
    };
    xhttp.open("GET", "server/films.php");
    xhttp.send();

}

 
function setCurrentFilm(id_film){
    for (var i=0; i<films.length; i++){
        if(films[i].id==id_film){
            cur_film=films[i];
            cur_poster=films[i].poster;
            break
        }
    }
}

function setTimer(){
    var timer= setInterval(
        function(){
            clearCart();
            refresh_hall(1);
            refresh_card();
        },
        140000
        );
}

/*function hide_ticket(cart_place){
    cart_place.classList.toggle("hide_choose_place");
}*/

function create_card(number){
    for(var i=0; i<number; i++){
        var card = document.createElement("div");
        card.className = "card "; 
        
        card.ondblclick=function(){
            
            var id_film=1*this.getAttribute("id");
            //alert(id_film);
            if(id_film!=cur_film.id){
                //query(id_film);
                //alert(id_film);
                setCurrentFilm(id_film);
                var xhttp = new XMLHttpRequest();
    
                xhttp.onreadystatechange = function() {
                    //alert("Ready state="+this.status);
                    if (this.readyState == 4 && this.status == 200) {
                                    
                        //console.log(JSON.parse(this.responseText));
                        
                        
                        sessions=JSON.parse(this.responseText);      
                        //console.log
            
                        create_sessions(cur_film.name,sessions);
                        
                        /*buildPage();
                        name_elem();    
                        show_poster(0);*/
            
                                    
                    }   
                };
                
                xhttp.open("GET", "server/session.php?id_film="+id_film);
                xhttp.send();
                
                
                //refresh_hall(1);
                /*$("name_film").innerHTML=cur_film.name;
                refresh_card();*/

            }
            
        }

        $("films").appendChild(card);    
    }
}


/*function query(id_film){
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                        
            //console.log(JSON.parse(this.responseText));
            console.log(this.responseText);
            sessions=JSON.parse(this.responseText);      
            

            //create_sessions();
            
            buildPage();
            name_elem();    
            show_poster(0);

                        
        }   
    };
    xhttp.open("GET", "server/session.php?id_film="+id_film);
    xhttp.send();

}*/


function create_sessions(film_name, film_array){
    $("sessions__info").innerHTML=film_name;
    //$("sessions").style.minHeight="700px";
    $("sessions__div").innerHTML="";
    for (var i = 0; i <film_array.length; i++) {
        $("sessions__div").innerHTML+="<div id='"+film_array[i].id+"' id_hall='"+film_array[i].id_hall+"'> <span>"+film_array[i].dt+"</span><span>"+film_array[i].tm+"</span><span>"+film_array[i].hallname+"</span></div>";
    }
    var list_sessions_div=$("sessions__div").getElementsByTagName("div");
    for (var i=0; i< list_sessions_div.length; i++){
        list_sessions_div[i].ondblclick=function(){
            var hall =this.getAttribute("id_hall");
            alert(hall);
        }
    }
}


function name_elem(){
    console.log(films);
    for(var i=0; i<list_posters.length;i++){
        
        list_posters[i].setAttribute("name", films[i].name);
        list_posters[i].setAttribute("id",films[i].id);
        
    }

}

function show_poster(vector){
   
    var flag=true;
    if (cur_index_film+vector < 0){
        flag=false;
    }   
    if (cur_index_film+vector > films.length-list_posters.length){
        flag=false;
    } 
    
    if (flag){
        cur_index_film+=vector;
        var j=cur_index_film;
        var str="";
        
        for(var i=0; i< list_posters.length;i++){
            list_posters[i].style.background="url(img/"+films[j++].poster + ") no-repeat";
            list_posters[i].style.backgroundSize="100%";
            
            list_posters[i].setAttribute("id",films[j-1].id);
            list_posters[i].setAttribute("name",films[j-1].name);

            str="<div id='name'><h3>"+films[j-1].name+"</h3></div>";
            
            list_posters[i].innerHTML=str;

            
        }
    }
    
}

function get_filmById(id_film){
    var film=null;
    for(var i=0; i<films.length;i++){
        
        if(films[i].id==id_film){
            //alert(films[i].id);
            film=films[i];
            break;
        }
    }
    return film;
}


function del_ticket(id_film, row, place){
    for( var i=0; i<cart.length; i++){
        if(cart[i].id_film==id_film && cart[i].row==row && cart[i].place==place){
            cart.splice(i,1);
            refresh_card();
        }
    }
    refresh_card();
    selectPlace(row,place, "none");
}

function refresh_card(){
    let html_ticket="";
    
    for( var i=0; i<cart.length; i++){
        let film=get_filmById(cart[i].id_film);
        if( cart[i].id_film==cur_film.id){
            selectPlace( cart[i].row,cart[i].place, "choose");
        }

        html_ticket+="<div class='ticket'>"+
                //"<img class='poster_cart' src='../img/"+ cur_poster[i]+"'>"+
                "<h3>"+film.name+"</h3>"+
                "<p>Початок о"+film.tm+
                "[ ряд"+cart[i].row +
                " місце"+cart[i].place +"]</p> <button title='Вилучити' class='del_ticket' onclick='del_ticket(" + cart[i].id_film + ','
                                                                             + cart[i].row + ','
                                                                             + cart[i].place + ")' ></button></div>";
    }
    $("choose_places").innerHTML=html_ticket;

    localStorage.setItem('myCart', JSON.stringify(cart));
    
   
}

function pay(){
    var ticket;
    while(cart.length>0){
        ticket=cart.pop();
        sales.push(ticket);
    }
    refresh_card();
    localStorage.setItem('sales', JSON.stringify(sales));
    refresh_hall(1);
}

function clearCart(){
    cart=[];
    localStorage.setItem('myCart', JSON.stringify(cart));
    refresh_card();
    refresh_hall(1);
}

function selectPlace(row, place, classname){
    
    var rs=arr_rows[row-1];
    var pc=rs.getElementsByClassName("place");
    var cList=pc[place-1].classList;
    
    if (!cList.contains(classname) ){
        cList.remove("busy");
        cList.remove("choose");

        if(classname!="none"){
            cList.add(classname);
        }   
    }
}

function clearPlaces(param){
    
    for(var i=0; i< arr_places.length; i++){

        if(arr_places[i].classList.contains("busy")){
            arr_places[i].classList.remove("busy");
        }
        if(param){
            if(arr_places[i].classList.contains("choose")){
                arr_places[i].classList.remove("choose");
            }
        }
        
        
    }
}

function refresh_hall(param){
    clearPlaces(param);
    for(var i=0; i<sales.length;i++){
        if(sales[i].id_film==cur_film.id){
            selectPlace(sales[i].row, 1*sales[i].place,"busy")
        }
    }
}


function buildHall(r,p,w,phall){
    var str=""
    for(var i=0; i<r;i++){
        str+='<div class="row" row="'+(i+1)+'"price="100">';
        for(var j=0; j<p;j++){
            str+= '<div class="place" place="'+(j+1)+'"></div>';

        }
        str+="</div>";
    }
    phall.innerHTML+=str;

    arr_places= phall.getElementsByClassName("place");
    arr_rows=   phall.getElementsByClassName("row");

    for (var i=0; i<arr_places.length;i++){
        arr_places[i].onmouseover=function(){
            this.classList.add("select");
            var nr=this.parentElement.getAttribute("row");
            
            var np=this.getAttribute("place");
            info.innerHTML="Ряд:" +nr +" Місце:"+np; // " Ціна: " +1*cur_film.price;
            
        }
        arr_places[i].onmouseleave=function(){
            this.classList.remove("select");
            info.innerHTML="Ряд: "+ 0 + " Місце: "+0;
            


        }
        arr_places[i].ondblclick= function(){
            if(this.classList.contains("busy")||this.classList.contains("choose") ){
                return;
            }
            if (cur_film.id==0){
                alert("You don't choose film")
                
                return;
            }

            if( !this.classList.contains("choose") ){
                setTimer();
                this.classList.add("choose");

                let ticket= {id_film:0,row:0,places:0,price:0}
                ticket.id_film=cur_film.id;
                ticket.row=1*this.parentElement.getAttribute("row");
                ticket.place=1*this.getAttribute("place");
                ticket.price=1*this.parentElement.getAttribute("price");
                
                cart.push(ticket);
                //console.log(cart[0].id_film+' '+cart[0].row);

                refresh_card();
                /*cur_sale.id_film=cur_film.id;
                cur_sale.row=cur_row;
                cur_sale.place=cur_place;
                cur_sale.price=cur_price;
                sales.push(cur_sale);
                
                
                

                var html_ticket= "<div class='ticket'><h3>"+cur_film.name+ "</h3>"+
                "<p>Початок о"+cur_film.tm+
                "[ ряд"+cur_row +
                " місце"+cur_place +"]</p></div>";
                
                $("choose_places").innerHTML+=html_ticket;*/
            }
           
        }
    }

}

function buildPage(){
    
    create_card(3);
    list_posters=$("films").getElementsByClassName("card");
    

    arrows=$("films").getElementsByClassName('arrow');
    for(var i= 0; i<arrows.length; i++){
        arrows[i].onclick=function(){
            var vector=1*this.getAttribute("vector");
            show_poster(vector);
        }
    }



    buildHall(rows,places,w,hall);
    refresh_card();

    //$("hide_ticket").onclick=hide_ticket($("choose"));

    var timer= setInterval(
        function(){
            sales = JSON.parse( localStorage.getItem("sales") );

            if(sales==null)sales=[];
            refresh_hall(0);
        },
        1000
    );
    name_elem();    
    show_poster(0);
}

/******************************************************************************* */

getFilmList();

