//---------------------------Variables------------------------------------------------------------------------------------
var misiles = 4;
////-----------------------------------------------------------------------------------------------------------------------
////----------------------------Objetos----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------
class PersonajePrincipal{
    constructor (matrizDondeSeTrabaja) {
         this.matrizDondeSeTrabaja = matrizDondeSeTrabaja;
     }
    JustTheCreator(){
        function BulletBar(numero){//Cuantas balas tienes
      var barras = new Array(4);
      var context = new Array(4);
  for(let i=0; i<4; i++){
      let total = i+1;
      barras[i]= document.getElementById("bala"+ total);
      context[i] = barras[i].getContext("2d");
  }
  //esta sera el que limpie
  for(let i=0; i<4; i++){
      context[i].beginPath();
      context[i].rect(1, 1, 30, 18);//la tercera es la que tengo que modificar
      context[i].fillStyle = "#373737";
      context[i].fill();
      context[i].closePath();
  }
  //este sera el que rellene todos de color
  if(numero != 0){
      for(let i=0; i<numero; i++){
      context[i].beginPath();
      context[i].rect(1, 1, 30, 18);//la tercera es la que tengo que modificar
      context[i].fillStyle = "#B90000";
      context[i].fill();
      context[i].closePath();
  }
  }

}               
       //Colocamos a el jugador en su posición Inicial
       camera.position.x = MatrizThatMakeMeCry[0][1];
       camera.position.y = MatrizThatMakeMeCry[0][2];
       camera.position.z = MatrizThatMakeMeCry[0][3];

       LifeBar(MatrizThatMakeMeCry[0][6])//poniendo la barra de vida al tope

       function mover(matriz){//Fucnión de movimiento
         setTimeout(function(){
           //  MatrizThatMakeMeCry   //esta es la matriz con todas la posiciones
             matriz[0][1] = camera.position.x;
             matriz[0][2] = camera.position.y;
             matriz[0][3] = camera.position.z;

           mover(matriz);//Volvemos a llamarla para continuar el ciclo
         }, 50);

       }
       mover(this.matrizDondeSeTrabaja);//Llamamos a la función para comenzar el ciclo

       document.addEventListener("click", function(){//Si hace click con el mouse
         
        //dispara
        var bala = new BalasPrincipal(1);
        bala.disparo();
        bala.sonidoLaser();
       });
       BulletBar(misiles);
           document.addEventListener('keydown', (event) => {
        if(event.code == "Space"){  
            if (misiles > 0) {
              var bala = new BalasPrincipal(2);
              bala.disparo();
              bala.sonidoMissile();       
            }         
                 misiles--;
            BulletBar(misiles);
            console.log(misiles)
            if(misiles == 0){
                    console.log('estoy adentro')
                    function Upper(time){
                        setTimeout(function(){ 
                        misiles++;
                        BulletBar(misiles);
                      
                     }, time)
                    }
                    Upper(2000);
                    Upper(4000);
                    Upper(6000);
                    Upper(8000);
                   

                }
            }
        });  
   }
   vida(){
    

     function subirVida(){
       setTimeout(()=>{
         if (MatrizThatMakeMeCry[0][6] < 11) {

           MatrizThatMakeMeCry[0][6]++;////Aqui hize que la nave no pierda en caso de chocar
           LifeBar(MatrizThatMakeMeCry[0][6])
           subirVida();//para que se haga ciclo 
         }
       }, 1500)
     }//final de la funcion
    function Recargo(){//bucle para saber si recargo la funcion o no
       setTimeout(()=>{
           if (MatrizThatMakeMeCry[0][6] <= 3) {
             console.log("Recién subió vida");
             subirVida();
           }
           Recargo() 
       }, 2000)
          
     }
     Recargo();
   }
  Escudo(){
         function Resumida(num){//junta la funcion de el relleno de las dos funciones
             ShieldBar(num, 'Barraescudos1')
             ShieldBar(num, 'Barraescudos2')
         }
           ////Funcion bucle escudos
         function recargaShields(){//ciclo pa que se recarguen los escudos
           setTimeout(()=>{
               if(vidaDelEscudo <= (15)){
                  vidaDelEscudo++;
               }
               recargaShields()
               Resumida(vidaDelEscudo)
           },2000)
         }///Fata otra vez llamar esta funcion
 //--------------------------------  
         function ActivacionEscudos(){
             document.addEventListener('keydown', (event) => {
             if(event.key == "Enter" && vidaDelEscudo> 1){
               var OwnLife = MatrizThatMakeMeCry[0][6];
               LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada
                 document.getElementById("escudos").style.visibility = "visible";
                 function loopShield(){
                   setTimeout(()=>{
                     MatrizThatMakeMeCry[0][6]= OwnLife;//Pra que no se le vabe vida al tipo xd
                     LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada
                     if(vidaDelEscudo == 0){
                       MatrizThatMakeMeCry[0][6] = OwnLife
                       LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada
                       document.getElementById("escudos").style.visibility = "hidden";
                        Resumida(vidaDelEscudo)
                    }else{
                     MatrizThatMakeMeCry[0][6] = OwnLife
                     LifeBar(OwnLife)//Se imprime el valor de la vida que se tenia para que no fluctue nada
                       vidaDelEscudo--
                       Resumida(vidaDelEscudo)
                       loopShield()
                     }
                   },300)
                 }
             loopShield()
               }     
               });
           }
           ActivacionEscudos()
           recargaShields()
           Resumida(vidaDelEscudo)
  }
   
 }//fin del metodo
//este objeto controlara el movimiento de la nave usando el mouse, para subir y poder rotar la torreta
class CabinaDeControl {//objeto para que la nave principal pueda rotar y moverse hacia arriba y abajo
   constructor( canvas){
       ///aqui hayq ue poner la pantalla y no el canvas para
       this.WhereItWorks = canvas;
       //si ancho y alto son iguales se va uno
       this.inicioCamaraTorre = 5; //empieza a 90 grados
       //Aqui hay que ejecutar funcion pa que este en 90 grados
   }
   Torreta(){//todo tiene que se se un loop para que se pregunte a cada si lo hace o no
       //si el mas esta a un tercio de la pantalla bajo, no se si sea mucho
       var WhereOnX = null; //posicon del mouse en X
       var WhereOnY = null; //posicon del mouse en Y
       var MedidaPantalla = this.WhereItWorks.offsetWidth; //medidas de la pantalla
       var MedidaEnY = this.WhereItWorks.offsetHeight; //el alto de la pantalla
       var OriginalPosition = this.inicioCamaraTorre; //EMPIEZA AQUI la vista de la camar
       this.WhereItWorks.onmousemove = function(e){
           WhereOnX = e.pageX;//dice el valor de los eventos en tiempo real
           WhereOnY = e.pageY;//valor de y en tiempo real
       }
       setInterval(CheckWhereTheHellIsIn, 1);
       function CheckWhereTheHellIsIn(){
               //esto es para que pueda rotar la pantalla del jugador
               if(WhereOnX< (MedidaPantalla)/4){//girar a la derecha
                   camera.rotation.y += .007;
               }
               else if(WhereOnX> ((MedidaPantalla)/4)*3){//girara a la girar a la izquierda
                   camera.rotation.y -= .007;
               }
               
       }
       setInterval(updown, 170);//para que pueda rotrar lal camara de arriba hacia abajo
       function updown(){
         //para que la nave pueda subir o bajar

         //hace que la nave baja
         if(WhereOnY < (MedidaEnY)/3 && camera.position.y != limity-1){

             camera.position.y +=1;

         //aqui se hara que la nave suba
         }else if(WhereOnY > ((MedidaEnY)/3)*2 && camera.position.y != 0){//si esta arriba de 2/3 la nave empezara asubir
             
             camera.position.y -=1;
             
             //Aqui se hara que la nave baje
         }
       }

    
     //el chacador de si esta apto para para que se pueda mover solo va aqui
       setInterval(adelante,500); // que la nave pueda avanzar hacia adelante sola
       function adelante(){//arriba dice que hace

         var direction = camera.getWorldDirection();  //Obtenemos el vector director de la nave principal
         direction.x = Math.round(direction.x); //Rendondeamos ambas direcciones para que no tengamos posiciones no enteras
         direction.z = Math.round(direction.z);
         direction.y = Math.round(direction.y);

         camera.position.add(direction.multiplyScalar(1)); //Agregamos ese vector multiplicándolo por un número para ajustar la velocidad

         //En caso de que se qwuiera salir de el área delimitada, lo regresamos
         if(camera.position.x >= limitx-1){
           camera.position.x = limitx-1;
         }
         if(camera.position.x <= 0){
           camera.position.x = 0;
         }

         if(camera.position.z >= limitz-1){
           camera.position.z = limitz-1;
         }
         if(camera.position.z <= 0){
           camera.position.z = 0;
         }

       }
   }
}

class BalasPrincipal{
  constructor(tipo){//tipo == 1 (balas) tipo == 2 (misial)
    this.QueTipoBala = tipo;//para saber si disparamos una bala o un misil
  }

sonidoLaser(){                   //Método para que suene el laser al disparar.
 var sonido= new Audio(laser_ali);       //variable tipo audio, con la referencia del laser de las naves aliadas.
 sonido.play();          //Método para hacerlo sonar.

}

sonidoMissile(){
  var sonido= new Audio(missile_ali);  
  sonido.volume=0.8;     //variable tipo audio, con la referencia del laser de las naves aliadas.
  sonido.play(); 

}

disparo(){
 var direction = camera.getWorldDirection();

 function enemyDestroyedSound(){
   var snap = new Audio(enemy_destroy);
   snap.play();  
 }

 //Creamos una geometría esférica de three.js

if( this.QueTipoBala == 1 ){//Aqui ira la geometria de las balas
  var geometry = new THREE.SphereGeometry( .05, .05, .05 );
  var material = new THREE.MeshBasicMaterial( {color: 0x04a2b2} );
}else{//Aqui ira la geometria de los misiles
  var geometry = new THREE.SphereGeometry( .5, .5, .5 );
  var material = new THREE.MeshBasicMaterial( {color: 0xdb7093} );
}
var sphere = new THREE.Mesh( geometry, material );
geometry = null;
material = null;
scene.add( sphere );
sphere.position.x = camera.position.x;
sphere.position.y = camera.position.y;
sphere.position.z = camera.position.z;

 function move(){ //Movemos a la bala y devolvemos valores enteros para revisar si hay alguna colision
   var x,y,z;
   sphere.position.add(direction.multiplyScalar(1));
 
   x = Math.round(sphere.position.x);
   y = Math.round(sphere.position.y);
   z = Math.round(sphere.position.z);

   var data = new Array();
   data[0] = x;
   data[1] = y;
   data[2] = z;

   return data;
 }
 
 function dispLoop(tipo){
   setTimeout(()=>{ 
     var who = 0;
     var pos = move();
     for (let i= 1+numamigas; i <= numnaves+numamigas+numasteroides; i++){
      if(MatrizThatMakeMeCry[i][0]!=null && MatrizThatMakeMeCry[i][0]!=2){
        //Posición del objeto
        var x = MatrizThatMakeMeCry[i][1];
        var y = MatrizThatMakeMeCry[i][2];
        var z = MatrizThatMakeMeCry[i][3];
        //Limites o dimensiones del objeto
        var xlim = (MatrizThatMakeMeCry[i][7]-1)/2;
        var ylim = (MatrizThatMakeMeCry[i][8]-1)/2;
        var zlim = (MatrizThatMakeMeCry[i][9]-1)/2;
        if((pos[0]>=x-xlim && pos[0]<=x+xlim) && (pos[1]>=y-ylim && pos[1]<=y+ylim) && (pos[2]>=z-zlim && pos[2]<=z+zlim)){
 
          
///this.QueTipoBala == 1

        //Aqui le aumento 1 valor a la nave pricipal para que aumente de vida cada vez que impacta una nave enemiga
      

        //Si es una nave
        if(MatrizThatMakeMeCry[i][0]==1){//nave enemiga o amiga //----------------------------------
          if ( tipo == 1 ) {
            MatrizThatMakeMeCry[i][6]--;////Se le quita solo 1 punto de vida
          }else{
            MatrizThatMakeMeCry[i][6] -=  5;
          }
          //navesVar--;//resto 1 por que ya fue eliminada xd s
          //aqui abria impacto xd jajaja
          if(MatrizThatMakeMeCry[i][6] <= 0){
              //Eliminamos a la nave de la matriz
              destroy(i);
              //Eliminamos la bala
              i = numnaves;//para acabar el ciclo
              numkills+=1;
              enemyDestroyedSound(); // sonido de destrucción de la nave enemiga.s
              if( MatrizThatMakeMeCry[0][6] < 13){          
                MatrizThatMakeMeCry[0][6]++;////Aqui hize que la nave no pierda en caso de chocar
          
                //Sonido de vida al matar a nave.
                healing_sound();
          
                LifeBar(MatrizThatMakeMeCry[0][6])
              }
          }
        }else if(MatrizThatMakeMeCry[i][0]==3){ //Si es un asteroide
          //Eliminamos a la nave de la matriz
          destroy(i);
          //Eliminamos la bala
          i = numnaves;//para acabar el ciclo
          
          enemyDestroyedSound(); // sonido de destrucción de la nave enemiga.s
        }
        scene.remove(sphere);
        sphere = null;
        who = null; 
        ///Checar si se la variable de nave es 0 
        }
     }
   }
   if(who == 0){
     //Si la bala se sale de los límites, se eliminas
     if(pos[0] <= 0 || pos[0] >= limitx || pos[1] <= 0 || pos[1] >= limity || pos[2] <= 0 || pos[2] >= limitz){
        scene.remove(sphere);
        sphere = null;
     }else{
       dispLoop(tipo);
     }
   }
 }, 100);
}

dispLoop(this.QueTipoBala);
}
}

////-----------------------------------------------------------------------------------------------------------------------
////----------------------------FUNCIONES----------------------------------------------------------------------------------
////-----------------------------------------------------------------------------------------------------------------------

function ShieldBar(numero, where){///El numero seran las divisiones en que se dibujaran
var canvasShiel = document.getElementById(where);
var Shield = canvasShiel.getContext("2d");
Shield.beginPath();
//puntos iniciales // puntos finales
Shield.rect(1, 1, 25, 370);//la tercera es la que tengo que modificar
Shield.fillStyle = "#373737";
Shield.fill();
Shield.closePath();
///---------
var vidaTotal = 15 //seran los segundos maximos que durara el escudo
var alto = ((numero * 370) / vidaTotal);//cambiar eso xd
Shield.beginPath();
Shield.rect(1, (371- alto), 25, alto);//la tercera es la que tengo que modificar
Shield.fillStyle = "#30F10E";//color verde pila 
Shield.fill();
Shield.closePath();
}

function LifeBar(numero){///El numero seran las divisiones en que se dibujaran
//la nave tendra 10 puntos de vida pero pueden ser mas 
var canvasVida = document.getElementById("me");
var life = canvasVida.getContext("2d");
life.beginPath();
//puntos iniciales // puntos finales
life.rect(1, 1, 200, 20);//la tercera es la que tengo que modificar
life.fillStyle = "#373737";
life.fill();
life.closePath();
//la nave tendra 10 puntos de vida  pero pueden ser mas 
var vidaTotal = 13 //es la vida que tendra el presonaje principal
var anchoLife = ((numero * 200) / vidaTotal);
life.beginPath();
//puntos iniciales // puntos finales
life.rect(1, 1, anchoLife, 20);//la tercera es la que tengo que modificar
life.fillStyle = "#1CBFFA";
life.fill();
life.closePath();

}
function healing_sound(){
    var heal_sound= new Audio(heal);
    heal_sound.volume=0.02;
    heal_sound.play();
  }

function impact_sound(){
  var impact= new Audio(ships_colission);
  impact.play();

}
