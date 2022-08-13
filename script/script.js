var  $= function(id){
    return document.getElementById(id);
}
/************************************************************************/
//Data
var films=[{id:0, name:"", poster:""}];
    

var sessions=[];
//[{id:0, id_film:0, id_hall:0, hallname:"", tm:"", dt:"", rows:0, places:0, price:0}]

var cur_session=[{id:0, id_film:0, id_hall:0, hallname:"", tm:"", dt:"", rows:0, places:0, price:0}]

var arr_places=[];

var arr_rows=[];

//var sales=[{id:0, id_session:0, rows:0, places:0}];



//localStorage

var cart=[];

cart = JSON.parse( localStorage.getItem("myCart") );


if(cart==null)cart=[];
if(cart.length!=0){
    //console.log(cart);
    //refresh_cart();
}
//alert(localStorage.getItem("myCart"));
/*sales = JSON.parse( localStorage.getItem("sales") );

if(sales==null)sales=[];*/

//{id_film:0,row:0,places:0,price:0}

//hals

var w=10;
var cur_film=[{id:0, name:"", tm:"", poster:""}];

var cur_poster;

var cur_sale={id_film:0,row:0,place:0,price:0};

var hall=$("hall");

var list_posters;
var cur_index_film=0;

var arrows;

/*Timer --------------*/
var timer;

/******************************************************************************* */
//Function
//localStorage.clear();

/*Server---------------------------------------------------------
------------------------------------------------------------------*/
function get_film_list(){
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

function set_current_session(id_session){
    for (var i=0; i<sessions.length; i++){

    if(sessions[i].id==id_session){
        cur_session=sessions[i];
        console.log(cur_session);
        break
    }
    
    }   
}
/*Set up current thing---------------------------------------------------------
------------------------------------------------------------------*/

function setCurrentFilm(id_film){
    for (var i=0; i<films.length; i++){
        if(films[i].id==id_film){
            cur_film=films[i];
            cur_poster=films[i].poster;
            break
        }
    }
}

function cart_filname(id_session){
    get_film_list();
    var xhttp =  new XMLHttpRequest();

    xhttp.onreadystatechange =function() {
        //alert("Ready state="+this.status);
        if (this.readyState == 4 && this.status == 200) {
                        
            //console.log(JSON.parse(this.responseText));
            sessions=JSON.parse(this.responseText);
            
        }
    };
    
    xhttp.open("GET", "server/sessions_id.php?id_session="+id_session);
    xhttp.send();
    for (var i=0; i<cart.length; i++){
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            //alert("Ready state="+this.status);
            if (this.readyState == 4 && this.status == 200) {
                            
                //console.log(JSON.parse(this.responseText));
                console.log(this.responseText);
                return this.responseText;
                
                //console.log(this.responseText);
                
                //create_sessions(cur_film.name,sessions);
                
                /*buildPage();
                name_elem();    
                show_poster(0);
                //create_sessions();

                buildPage();
                name_elem();    
                show_poster(0);*/
                            
            }
        };
            
        xhttp.open("GET", "server/film_name.php?id_session="+cart[i].id_session);
        xhttp.send();
        /*var xhttp = new XMLHttpRequest();
    
            xhttp.onreadystatechange = function() {
                //alert("Ready state="+this.status);
                if (this.readyState == 4 && this.status == 200) {
                                
                    //console.log(JSON.parse(this.responseText));
                    console.log(this.responseText);
                    
                    sessions=JSON.parse(this.responseText);      
                  
                }
            };
            
            xhttp.open("GET", "server/session.php?id_film="+id_film);
            xhttp.send();*/
    
    }
    
}

/*Start  function-------------------------------------------------------------------
------------------------------------------------------------------------------*/

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
    
    name_elem();    
    show_poster(0);
    refresh_cart();

    /*var timer= setInterval(
        function(){
            sales = JSON.parse(localStorage.getItem("sales") );

            if(sales==null)sales=[];
            refresh_hall(0);
        },
        1000
    );*/
}




function create_card(number){
    for(var i=0; i<number; i++){
        var card = document.createElement("div");
        card.className = "card "; 
        
        card.ondblclick=function(){
            clearInterval(timer);

            var id_film=1*this.getAttribute("id");
            //alert(id_film);
            if(id_film!=cur_film.id){
                //query(id_film);
                //alert(id_film);
                setCurrentFilm(id_film);
                //request("session.php",sessions,"id_film", id_film);
                
                var xhttp = new XMLHttpRequest();
    
                xhttp.onreadystatechange = function() {
                    //alert("Ready state="+this.status);
                    if (this.readyState == 4 && this.status == 200) {
                                    
                        //console.log(JSON.parse(this.responseText));
                        //console.log(this.responseText);
                        
                        sessions=JSON.parse(this.responseText);      
                        //console.log(this.responseText);
                        //console.table(sessions);
                        /*console.log('sessions');
                        console.log(sessions);*/
                        create_sessions(cur_film.name,sessions);
                        
                        /*buildPage();
                        name_elem();    
                        show_poster(0);
                        //create_sessions();
            
                        buildPage();
                        name_elem();    
                        show_poster(0);*/
                                    
                    }
                };
                
                xhttp.open("GET", "server/session.php?id_film="+id_film);
                xhttp.send();
                
                
                //refresh_hall(1);
                //$("name_film").innerHTML=cur_film.name;
                //refresh_card();

            }
            
        }

        $("films_container").appendChild(card);    
    }
}



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

            var id_session =this.getAttribute("id");
            
            set_current_session(id_session);
            //console.log("cur.id_session"+cur_session.id);
            var id_hall =this.getAttribute("id_hall");
            $("name_film").innerHTML=cur_film.name;
            
            build_hall(cur_session.rows,cur_session.places,w,hall);
            refresh_hall(0);
            refresh_cart();
            refresh_choose();
            setTimer();
            
        }
    }
}


function build_hall(r,p,w,phall){
    phall.innerHTML="";
    var str="";
    for(var i=0; i<r;i++){
        str+='<div class="row" row="'+(i+1)+'"price="100">';
        for(var j=0; j<p;j++){
            str+= '<div class="place" place="'+(j+1)+'"></div>';

        }
        str+="</div>";
    }
    phall.innerHTML+=str;

    arr_places=phall.getElementsByClassName("place");
    arr_rows=phall.getElementsByClassName("row");

    for (var i=0; i<arr_places.length;i++){
        arr_places[i].onmouseover=function(){
            this.classList.add("select");
            var nr=this.parentElement.getAttribute("row");
            
            var np=this.getAttribute("place");
            $("info").innerHTML="Ряд:" +nr +" Місце:"+np; // " Ціна: " +1*cur_film.price;
            
        }
        arr_places[i].onmouseleave=function(){
            this.classList.remove("select");
            $("info").innerHTML="Ряд: "+ 0 + " Місце: "+0;
            


        }
        arr_places[i].ondblclick= function(){
            if(this.classList.contains("busy")||this.classList.contains("choose") ){
                return;
            }
            if (cur_session.id==0){
                alert("You don't choose session");
                
                return;
            }

            if( !this.classList.contains("choose") ){
                
                //this.classList.add("choose");

                let ticket= {id_session:0, name:'', row:0, place:0, price:0};
                //
                
                ticket.id_session=cur_session.id;
                ticket.name=cur_film.name;
                ticket.row=1*this.parentElement.getAttribute("row");
                ticket.place=1*this.getAttribute("place");
                ticket.price=cur_session.price;
                
                cart.push(ticket);
                
                refresh_cart();
                refresh_choose();
                //1*this.parentElement.getAttribute("price");
                
                //var now=new Date();
                //ticket.tm_lock=now.getMinutes();

                //this.setAttribute("tm_lock", ticket.tm_lock);

                /*var xhttp = new XMLHttpRequest();
    
                xhttp.onreadystatechange = function() {
                    //alert("Ready state="+this.status);
                    if (this.readyState == 4 && this.status == 200) {
                        
                        if (this.responseText=="1"){
                            
                            cart.push(ticket);
                            
                            refresh_cart();
                        }
                        
                    }   
                };
                var query="server/set_lock_ticket.php?id_session="+ticket.id_session+"&row="+ticket.row+"&place="+ticket.place;
                console.log(query);
                xhttp.open("GET", query);
                xhttp.send();*/

                
            }
           
        }
    }

}


function name_elem(){
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
            list_posters[i].style.backgroundSize="cover";
            
            list_posters[i].setAttribute("id",films[j-1].id);
            list_posters[i].setAttribute("name",films[j-1].name);

            str="<div id='name'><h3>"+films[j-1].name+"</h3></div>";
            
            list_posters[i].innerHTML=str;

            
        }
    }
    
}
// Function take sessions

function get_filmById(id_session){
    var film;
    for(var i=0; i<sessions.length;i++){
        if(sessions[i].id==id_session){
            //alert(films[i].id);
            film=sessions[i];
            break;
        }
    }
    return film;

}


function del_ticket(id_session, row, place){
    for( var i=0; i<cart.length; i++){
        if(cart[i].id_session==id_session && cart[i].row==row && cart[i].place==place){
            cart.splice(i,1);
            refresh_cart();
            refresh_choose();
            refresh_hall();
            break;
        }
    }
    //refresh_cart();
    
    select_place(row,place, "none");
    
}

function refresh_choose(){
    for(var i=0; i<cart.length; i++){
        if( cart[i].cid_session==cur_session.id){
            select_place( cart[i].row,cart[i].place, "choose");
        }
    }

}

//---------CART-----------------------------

function refresh_cart(){

    let html_ticket="";
    var name_film=localStorage.getItem("namefilm");
    //name_film=1;
    for( var i=0; i<cart.length; i++){
        //cart[i]['film_name']=cur_film.name//cart_filname(cart[i].id_session);
        let film=get_filmById(cart[i].id_session);
        
        //console.log(film_name);
        /*if( cart[i].id_session==cur_session.id){
            select_place( cart[i].row,cart[i].place, "choose");
        }*/
        //"<img class='poster_cart' src='../img/"+ cur_poster+"'>"+
        html_ticket+="<div class='ticket'>"+

                "<h3>"+cart[i].name+"</h3>"+
                "<p>Початок о"+film.tm+
                "[ ряд"+cart[i].row +
                " місце"+cart[i].place +"]</p> <button title='Вилучити' class='del_ticket' onclick='del_ticket(" + cart[i].id_session + ','
                                                                             + cart[i].row + ','
                                                                             + cart[i].place + ")' ></button></div>";
    }
    $("choose_places").innerHTML=html_ticket;
    
    localStorage.setItem('myCart', JSON.stringify(cart));

    //id_session:0, id_film:0,  id_hall:0, hallname:"", tm:"", dt:"", row:0, place:0, price:0, tm_lock:0
   
}

function pay(){
    cart = JSON.parse( localStorage.getItem("myCart") );
    var ticket;
    let i=0;
    
    while(cart.length>0){
        ticket=cart.pop();
        //alert(ticket[i].row);
        var xhttp = new XMLHttpRequest();
        
        var json = JSON.stringify({
            "id_session": ticket.id_session,
            "row": ticket.row,
            "place":ticket.place
        });
        /*alert(ticket.id_session);
        alert(ticket.row);
        alert(ticket.place);*/
        xhttp.onreadystatechange = function() {

            //alert("Ready state="+this.status);
            if (this.readyState == 4 && this.status == 200) {
                
                //console.log(JSON.parse(this.responseText));
                console.log(this.responseText);
                /*if (this.responseText!="0 results"){
                    array=JSON.parse(this.responseText);
                }
                else{
                    array=[];   
                }*/
                
                

                /*if (array==sessions||array!=[]){
                    create_sessions(cur_film.name,sessions);
                } */
                //console.log(this.responseText);
                
                //create_sessions(cur_film.name,sessions);
                
            }
            
        };    
        xhttp.open("POST", "server/buy_ticket.php");
        xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");    
        xhttp.send(json);
        localStorage.setItem('myCart', JSON.stringify(cart));
    }
    refresh_cart();
    refresh_hall(1);
}

function clear_cart(){
    cart=[];
    localStorage.setItem('myCart', JSON.stringify(cart));
    refresh_cart();
    refresh_hall(1);
}


/*--------------------Places-------
----------------------Places-------*/

function select_place(row, place, classname){
    
    var rs=arr_rows[row-1];
    var pc=rs.getElementsByClassName("place");
    var cList=pc[place-1].classList;

    if (cList.contains("busy") &&classname=="none"){
        
        cList.remove("choose");
        cList.add("busy");
    }else

    if (classname=="none"){
        cList.remove("busy");
        cList.remove("choose");
    }else

    if(classname=="busy"){
        cList.remove("choose");
        cList.add("busy");
    }else 

    if(!cList.contains("busy")){
        cList.add("choose");
    }
   

    //cList.add(classname);


    /*if (!cList.contains(classname) ){
        cList.remove("busy");
        cList.remove("choose");

        if(classname!="none"){
            cList.add(classname);
        }   
    }*/
}


function clear_places(param){
    
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

function select_busy_place(cart, sales){
    for(var i=0; i<cart.length;i++){
        if (sales[i].id_session==cart[i].id_session  && sales[i].row==cart[i].row && sales[i].place==cart[i].place){

            del_ticket(sales[i].id_session, sales[i].row, sales[i].place);
            alert("Місце "+sales[i].place+" Ряд "+sales[i].row+" Сесия "+sales[i].id_session);
            refresh_choose();
            refresh_hall();
            //popup_about_busy_place(cart[i].row, cart[i].place, cur_session.price);

            /*cart.splice(i,1);
            alert(i);
            console.log(i);
            refresh_cart();
           
            
            refresh_choose();*/


            
            
        }
        
    }
    
}
//param if true---false-----

function refresh_hall(param){
    clear_places(param);
    var xhttp = new XMLHttpRequest();
    //alert(cur_session.id);
    xhttp.onreadystatechange = function() {
        
        //alert("Ready state="+this.status);
        if (this.readyState == 4 && this.status == 200) {
            
            //console.log(JSON.parse(this.responseText));
            //console.log(this.responseText);

            var sales=[{id:0, id_session:0, rows:0, places:0}];
            
            if (this.responseText!="0 results"){
                //console.log(this.responseText);
                sales=JSON.parse(this.responseText);
                
            }
            
           
            for(var i=0; i<sales.length;i++){
                if(sales[i].id_session==cur_session.id){
                    select_place(1*sales[i].row, 1*sales[i].place,"busy");
                    //console.log("row: "+sales[i].row+" place: "+sales[i].place);
                }
            }
            select_busy_place(cart, sales);

            refresh_choose();
            refresh_cart();
            /*if (array==sessions||array!=[]){
                create_sessions(cur_film.name,sessions);
            } */
            //console.log(this.responseText);
            
            //create_sessions(cur_film.name,sessions);
            
            /*request("take_sales.php",sales,"id_session", cur_session.id);
            for(var i=0; i<sales.length;i++){
            if(sales[i].id_session==cur_session.id){
            select_place(sales[i].row, 1*sales[i].place,"busy")
            }
            }*/
        }
    };
    
    xhttp.open("GET", "server/take_sales.php?id_session="+cur_session.id);
    
    xhttp.send();
}




/*Timers------------------------------------------------------------
---------------------------------------------------------------*/

//param true - full refresh

function setTimer(){
    timer= setInterval(
        function(){
            //clear_cart();
            refresh_hall(0);
            refresh_choose();
            //refresh_cart();
                
        },
        6000
        );
}



/******************************************************************************* */

get_film_list();

