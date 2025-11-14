import {itemsOrganicos, itemsInorganicos} from "../items/DataItems.js";

import { Items } from "../items/Items.js";
import {player} from "../player/player.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
import { Enemies } from "../enemies/Enemies.js";
import { empujar } from "../funciones/empujar.js";
import { itemTiempo } from "../items/ItemTiempo.js";
import { armas } from "../items/DataItemsPotenciadores.js";

export class StartGame extends Phaser.Scene{//cuando inicia la partida

    constructor(){
        super('StartGame');
        //console.log("Estoy en StartGame");

    }
    //aqui se cargan las variables globales desde preload()
    cargarVariablesGlobales(){

      this.tiempo=100;
      this.tiempoProgresivo=0;//el tiempo progresivo sirve para llevar el tiempo siempre adelante
      this.tiempoParaCrearEnemigos=10;
      //agregar arma
      this.armas=armas;

      //fuente del texto

      this.fontText='FontArcade3';
   // console.log("Preload "+this.scene.key);
      this.widthPantalla=this.sys.game.config.width;
      this.heightPantalla=this.sys.game.config.height;

    this.widthEscenario=0;
    this.heightEscenario=0;

    this.tamañoTextoStandard=16;
    this.tamañoImagenItemStandard=25;


    this.contactoSprites=[
       false//Contacto de enemigo con player
      ,false//Contacto de ataque con enemigo
      ,false//Contacto de enemigo con enemigo
    ];

    this.estaAtacando=false;//esto me sirve para generar una condicional de tiempo de ataque asi no genera errores

     this.cantidadRelojes=20;

       //TODO REFEREIDO A ENEMIGOS

   this.listaEnemigos=[];
    
    this.puntosCreacionEnemigo=10;
    this.topeCreacionEnemigos=10;

    this.getPotenciadorPuntos=200;
    this.puntosPotenciadorAcumulador=1;
    }

    cargarBotonesTeclas(){  
      this.controles = {
  ataque:false
};


    }
  

    cargarImagenes(){
      
      //Agregar efectos

    this.load.image("ataqueLateralAbajo","./assets/effect/ataqueLateralAbajo.png");
    this.load.image("ataqueLateralArriba","./assets/effect/ataqueLateralArriba.png");
    this.load.image("ataqueLateralDerecha","./assets/effect/ataqueLateralDerecha.png");
    this.load.image("ataqueLateralIzquierda","./assets/effect/ataqueLateralIzquierda.png");
    

   // this.load.image("croquis","./assets/croquis_escuela.png");


   this.load.image("player","./assets/player/Player.png"); 
   this.load.image('tiles', './assets/[Base]BaseChip_pipo.png');
   this.load.tilemapTiledJSON('mapa', './assets/mapa_scene.json');
   //item basura
   this.load.image("item_basura1","./assets/items/Cascara_platano.png"); 
   this.load.image("item_basura2","./assets/items/Manzana_mordida.png"); 
   this.load.image("item_basura3","./assets/items/Hueso_pescado.png"); 
   this.load.image("item_basura4","./assets/items/Pizza_mordida.png"); 
   this.load.image("item_basura5","./assets/items/Hojas_secas.png"); 
   this.load.image("item_basura6","./assets/items/Hueso.png"); 
   this.load.image("item_basura7","./assets/items/Botella_agua.png"); 
   this.load.image("item_basura8","./assets/items/Bolsa_plastico.png"); 
   this.load.image("item_basura9","./assets/items/Vaso_plastico.png"); 
   this.load.image("item_basura10","./assets/items/Lata.png"); 
   this.load.image("item_basura11","./assets/items/Tapa.png"); 
   this.load.image("item_basura12","./assets/items/Vidrio.png"); 

   //Textura de tiempo
   this.load.image("reloj","./assets/items/otrosItems/reloj.png");
  

   //enemigos

  // this.load.image('enemie1',"./assets/enemies/enemie1.png");

  //textura armas

  for(let i=0;i<armas.length;i++)
    this.load.image(armas[i].diseno,"./assets/potenciadores/armas/"+(i+1)+".png"); 

    }

    cargarAnimaciones(){

      for(let i=0;i<=3;i++){

      this.load.spritesheet(dataEnemigos[i].diseno, "./assets/enemies/"+dataEnemigos[i].diseno+".png", {
  frameWidth: 128,
  frameHeight: 128
});

console.log("Creado "+dataEnemigos[i].diseno+" de directorio: ./assets/enemies/"+dataEnemigos[i].diseno+".png");

}


//this.load.image(dataEnemigos[0].diseno+'_golpeado',"./assets/enemies/"+(dataEnemigos[0].diseno)+"_golpeado.png");


    }

    crearJoystick(){
     
console.log("En Joystick");
    let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);
     
   

    }

//aqui cargo todos los archivos y objetos necesarios antes de que inicie el escenario
    preload(){

       
      

      this.cargarVariablesGlobales();
      
      this.cargarImagenes();

      this.cargarAnimaciones();

      this.crearJoystick();

      this.cargarBotonesTeclas();
   
    
     

      
}


//CREACION DE TILES (Son las texturas que no son sprites como tal sino que actua como escenario)

//metodo que crea y modifica el escenario
crearEscenario(){
    
    //this.escenario=scene.add.image(0,0,'croquis');
    //this.escenario.setOrigin(0);
    //this.scene.setDisplaySize(this.scale.width,this.scale.height);

    console.log(this.escenario);

   //Dimensiones del mapa
    this.map= this.make.tilemap({ key: "mapa" });
    this.widthEscenario=this.map.widthInPixels;
    this.heightEscenario=this.map.heightInPixels;

    



    console.log(`width:${this.widthEscenario} height:${this.heightEscenario}`);
    this.tileset = this.map.addTilesetImage('map-tecmm', 'tiles');
  //  const tileset2 = map.addTilesetImage('[Base]BaseChip_pipo', 'tiles');

  // const fondo0 = map.createLayer('Capa de patrones 1', tileset, 0, 0);
     //const fondo1 = map.createLayer('FONDO', tileset, 0, 0);
     const fondo14 = this.map.createLayer('BACKGRASS', this.tileset , 0, 0);
    const fondo2 = this.map.createLayer('GRASS', this.tileset , 0, 0);

   const fondo4 = this.map.createLayer('BASE_ROADS_CAR', this.tileset , 0, 0);
   const fondo5 = this.map.createLayer('BASE_ROADS_WALK', this.tileset , 0, 0);
    
    
    const fondo6 = this.map.createLayer('DOORS', this.tileset , 0, 0);
    //const fondo7 = this.map.createLayer('arbol', tileset, 0, 0);
   

    const fondo7 = this.map.createLayer('WINDOWS', this.tileset , 0, 0);

    //this.edificio_maestria.setCollisionByProperty({colisionar:true});
   



    //this.physics.world.setBounds(0, 0, this.width, this.height);
    console.log(this.map);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);




  // Este nombre debe coincidir con el nombre del tileset dentro de Tiled
  //const tileset = map.addTilesetImage('[Base]BaseChip_pipo', 'tiles');

  // Crear capa (usa el nombre de la capa en Tiled)
  //const fondo = map.createLayer('Fondo', tileset, 0, 0);



}
//metodo que crea los edificios
crearEdificios(){

  
    this.edificio_industrial = this.map.createLayer('DEPARTAMENTS/INDUSTRIAL', this.tileset , 0, 0);
    this.edificio_basica = this.map.createLayer('DEPARTAMENTS/BASICA', this.tileset , 0, 0);
    this.edificio_electronica = this.map.createLayer('DEPARTAMENTS/ELECTRONICA', this.tileset , 0, 0);
    this.edificio_mecatronica= this.map.createLayer('DEPARTAMENTS/MECATRONICA', this.tileset , 0, 0);
    this.edificio_sistemas= this.map.createLayer('DEPARTAMENTS/SISTEMAS', this.tileset , 0, 0);
    this.edificio_maestria = this.map.createLayer('DEPARTAMENTS/MAESTRIA', this.tileset , 0, 0);


}
//metodo para crear los arboles
crearArboles(){
    this.arboles = this.map.createLayer('TREE', this.tileset , 0, 0);
}



crearItemsBasura(n=1){

    //Math.floor(Math.random() * (max - min + 1)) + min;
    //Crear objeto basura
     

    this.items_basura=[];


    
     for(let i=0;i<=n;i++){

        let x,y;
         //generar selecion de objeto
    let seleccion=Math.floor(Math.random() * 6) + 0;//aqui se generaran valores aleatorios
    let c=Math.random() < 0.5 ? 1 : 2;
    let tipo;
    //console.log("categoria: "+c+" seleccion: "+seleccion);

    if(c===1)
    tipo=itemsOrganicos[seleccion];//igual, se generara aleatorio
    else tipo=itemsInorganicos[seleccion];//igual, se generara aleatorio
    //Crear cuerpo 
    x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
    y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;


    this.cuerpo=new Items(this,tipo.id, tipo.categoria,25,25,x,y);
    

    //this.cuerpo.setColor(tipo.id, tipo.categoria);
    

        this.items_basura.push({
            'id':Date.now()+i,
        'id_objeto': tipo.id,
        'cuerpo': this.cuerpo,
        'categoria':tipo.categoria,
        'puntos':tipo.puntos,
        'name':tipo.item
    });

  
    }


}

crearItemReloj(){

  this.listaRelojes=[];

  for(let i=0;i<=this.cantidadRelojes;i++){

     let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
     let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;

    this.listaRelojes.push(new itemTiempo(this,null,null,30,30,x,y,"reloj"));
   // this.listaRelojes[i].setItemPosition(x,y);

  }

}

//Aqui se generaran los items
crearItems(n){
    

   this.crearItemsBasura(n); 

   this.crearItemReloj();
}

//METODOS DEL ENEMIGO

crearEnemigoPorPuntos(){
  let valor=0;

valor=Math.random() < 0.5 ? 0 : 1;

return valor;

}

//Crear enemigo
crearEnemigo(n=1){




  if(n!==0){
    for(let i=0;i<n;i++){

      let valor=Math.floor(Math.random() * 4) + 0;
      
   
   let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
    let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;
   
    this.listaEnemigos.push(new Enemies(this,JSON.parse(JSON.stringify(dataEnemigos[valor])),x,y));
    
    /*
    this.listaEnemigos.map(enemigo=>{

      let enemigoNuevo=this.listaEnemigos[this.listaEnemigos.length-1];
      console.log("AQUI!!!2");
      this.physics.add.collider(enemigo.getContainer(), enemigoNuevo.getContainer(),()=>{
        console.log("creacion de colision entre enemigos AQUI Cantidad"+this.listaEnemigos.length);
     empujar(enemigo.getContainer(),enemigoNuevo.getContainer(),2,this.contactoSprites,this,400,false);
    });


    });*/
  }

  
   

     this.collisionPlayerEnemigo();
     //this.collisionEnemigoEnemigo();
  } else console.log("Tope al maximo no se crearan enemigo: "+this.listaEnemigos.length);
  

   

}
//Movimientos Enemigo

movimientosEnemigo(){
     
     this.listaEnemigos.map(enemigo=>{
      enemigo.setMovimientoEnemigo(this.player.getContainer(),this.contactoSprites[0],this.contactoSprites[1],this.contactoSprites[2]);
     })

     

}


//METODOS DEL PLAYER


getPlayer(){

  
    this.player=new player(this, 'player',20,25,this.joystickCursors, this.controles);
  

   
   
    this.player.setPositionInitial(800,1000);

     //movimientos de jugador

     this.cursor=this.input.keyboard.createCursorKeys();//flechas

     //collision del jugador

   
}

//Moviemientos Player

movimientosPlayer(){
     this.player.setMovimientoPlayer(this.contactoSprites[0]);
    
     this.player.getAtaque(this.listaEnemigos,this.contactoSprites,1);


    // console.log("ESTA ATACANDO: "+this.estaAtacando);

   



}

ataquePlayer(){

}





/*
empujar(sujetoEmpujador, sujetoEmpujado, contacto, movCamara=true) {
  const empujado = sujetoEmpujado.getContainer();
  const empujador = sujetoEmpujador.getContainer();
  if (!empujado || !empujado.body) {
    console.warn("Jugador o body indefinido en empujarJugador");
    return;
  }

  // Asegurar propiedades físicas
  const cuerpo = empujado.body;
  cuerpo.setImmovable(false);
  cuerpo.moves = true;
  cuerpo.setAllowGravity(false);
  empujado.setBounce(0);
  cuerpo.setMaxVelocity(1200, 1200);

  // Vector normalizado
  const dx = empujado.x - empujador.x;
  const dy = empujado.y - empujador.y;
  const magnitud = Math.sqrt(dx*dx + dy*dy) || 1;
  const nx = dx / magnitud;
  const ny = dy / magnitud;

  const fuerza = 600; // ajusta si se siente poco o mucho

  console.log("Aplicando empuje:", nx, ny, "magnitud:", magnitud);

  // Forzar que no esté bloqueado en ambos ejes antes de aplicar
  if (cuerpo.blocked.none === false) {
    console.log("Jugador bloqueado:", cuerpo.blocked);
    // si está bloqueado, aplicamos una pequeña corrección en el eje libre
    if (cuerpo.blocked.left) cuerpo.setVelocity(Math.abs(fuerza*0.5), cuerpo.velocity.y);
    if (cuerpo.blocked.right) cuerpo.setVelocity(-Math.abs(fuerza*0.5), cuerpo.velocity.y);
    if (cuerpo.blocked.up) cuerpo.setVelocity(cuerpo.velocity.x, Math.abs(fuerza*0.5));
    if (cuerpo.blocked.down) cuerpo.setVelocity(cuerpo.velocity.x, -Math.abs(fuerza*0.5));
  } else {
    cuerpo.setVelocity(nx * fuerza, ny * fuerza);
  }

  this.contactoSprites[contacto] = true;//

  // Frenado progresivo pero con checks para blocked
  this.time.delayedCall(120, () => {
    if (cuerpo) cuerpo.setVelocity(cuerpo.velocity.x * 0.5, cuerpo.velocity.y * 0.5);
  });

  this.time.delayedCall(300, () => {
    if (cuerpo) {
      cuerpo.setVelocity(0, 0);
      this.contactoSprites[contacto] = false;
      empujado.setBounce(1); // si quieres restaurarlo
    }
  });

 if(movCamara) this.cameras.main.shake(80, 0.01);
}*/





//LLAMAR A TODAS LAS COLISIONES
crearColisiones(){

  //crear collider de objetos

  //ARBOLES
  this.arboles.setCollisionByProperty({collider:true});

  //EDIFICIOS
  this.edificio_industrial.setCollisionByProperty({collider:true});
this.edificio_basica.setCollisionByProperty({collider:true});
this.edificio_electronica.setCollisionByProperty({collider:true});
this.edificio_mecatronica.setCollisionByProperty({collider:true});
this.edificio_sistemas.setCollisionByProperty({collider:true});
this.edificio_maestria.setCollisionByProperty({collider:true});

  this.collisionRecogerItemBasura();
  this.collisionRecogerItemTiempo();

  this.collisionPlayerEdificioColision();
  this.collisionPlayerArboles();
  
}

//FUNCIONES DE LAS COLISIONES

  //colision al contacto del player con el enemigo
      collisionPlayerEnemigo(){
 


   


this.listaEnemigos.map(enemigo=>{
 this.physics.add.collider(
    this.player.getContainer(),
    enemigo.getContainer(),
    ()=>{
        console.log("Contacto enemigo con player");
          empujar(enemigo.getContainer(),this.player.getContainer(),0,this.contactoSprites,this);//
          this.player.setVida(1);
          if(this.player.getVida()<=0)this.finalizarPartida("Has muerto") ;
    }, null, this
);
})

   

    

  

}
//colision entre los enemigos para que no transpasen
      collisionEnemigoEnemigo(){
 // this.physics.collider();
 
 this.listaEnemigos.forEach((a, i) => {
  for (let j = i + 1; j < this.listaEnemigos.length; j++) {
    const b = this.listaEnemigos[j];
    this.physics.add.collider(a.getContainer(), b.getContainer(),()=>{
     empujar(a.getContainer(),b.getContainer(),2,this.contactoSprites,this,400,false);
    });
    console.log("Creacion de colision de enemigos");
  }
});


}
//colision de arboles para que el player no las pase
      collisionPlayerArboles(){
   
if(this.player && this.arboles){
  console.log("Dentro de player y arbol");
this.physics.add.collider(this.player.getContainer(),this.arboles);
}
}//s
//colision para cuando el player recoge el itemBasura
      collisionRecogerItemBasura(){


    this.items_basura.forEach( (item, index)=>{

        this.physics.add.overlap(
        this.player.getContainer(),
        item.cuerpo.getContainer(),
        ()=>{

          this.puntos=Number(this.puntaje.text);

          console.log("AQUI2->"+this.puntos);

          
          //organizar puntos en items
          let cantidadItem;
          if(item.categoria=="organico"){
            
            cantidadItem=parseInt(itemsOrganicos[(parseInt(item.id_objeto)-1)].cantidad)+1;
            itemsOrganicos[(parseInt(item.id_objeto)-1)].cantidad=cantidadItem;
            


          }
            else if(item.categoria=="inorganico"){
              
               cantidadItem=parseInt(itemsInorganicos[parseInt(item.id_objeto)-1].cantidad)+1;
               itemsInorganicos[(parseInt(item.id_objeto)-1)].cantidad=cantidadItem;

               
               
            }

            this.hudContainerMochila.destroy();
            this.hudMochila(this);


           
            item.cuerpo.setRecoger();//se elimina el item

            let puntosTemporales=0;

            itemsOrganicos.map(item=>{
              puntosTemporales=puntosTemporales+(parseInt(item.cantidad)*parseInt(item.puntos));
            });
            itemsInorganicos.map(item=>{
                 puntosTemporales=puntosTemporales+(parseInt(item.cantidad)*parseInt(item.puntos));
            });
            console.log("AQUI->"+this.puntos)
            this.puntos+=Number(item.puntos);//puntosTemporales;

            //this.puntos=parseInt(this.puntos)+parseInt(item.puntos);
            console.log("puntos: "+this.puntos);
            
            this.puntaje.setText((this.puntos));
            //Al superar cierta cantidad de puntos aparecera un nuevo enemigo
             if(parseInt(this.puntos) >this.puntosCreacionEnemigo){
               
              this.puntosCreacionEnemigo=this.puntosCreacionEnemigo+200;
              
             this.topeCreacionEnemigos+=15;
            }

            if(this.puntos>=this.getPotenciadorPuntos)  this.getPotenciador();
            //this.crearEnemigo(this.topeCreacionEnemigos-this.listaEnemigos.length);
        }
    );

    });

    
}  



    //ventanaPause para escoger potenciador

    getPotenciador(){//Es la arma o potenciador que obtiene el personaje
      this.scene.pause();
      

      this.getPotenciadorPuntos+=200*this.puntosPotenciadorAcumulador;

      this.puntosPotenciadorAcumulador++;  

this.scene.launch('ScenePotenciador',{scene:this.scene,puntos:this.puntos,player:this.player,puntaje:this.puntaje,armas:this.armas});

    }

//colision del tiempo

    collisionRecogerItemTiempo(){

      this.listaRelojes.map(reloj=>{
      this.physics.add.overlap(reloj.getContainer(),this.player.getContainer(),()=>{
        let tiempoExtra=Math.floor(Math.random() * (50 - 10 + 1)) + 10;

        this.tiempo+=tiempoExtra;

        reloj.setRecoger();
      })
      })


      
    }
//colision para que player no transpase los edificios
      collisionPlayerEdificioColision(){ 

this.physics.add.collider(this.player.getContainer(), this.edificio_industrial);
this.physics.add.collider(this.player.getContainer(), this.edificio_basica);
this.physics.add.collider(this.player.getContainer(), this.edificio_electronica);
this.physics.add.collider(this.player.getContainer(), this.edificio_mecatronica);
this.physics.add.collider(this.player.getContainer(), this.edificio_sistemas);
this.physics.add.collider(this.player.getContainer(), this.edificio_maestria);



}
//colision cuando un enemigo recibe un ataque
      collisionAtaqueEnemigo(){

      }





//solo sirve para testear
depurarColisiones() {
  const debugGraphics = this.add.graphics().setAlpha(0.75);

  // Dibuja los tiles con colisión activa en la capa TREE
  if (this.arboles) {
    this.arboles.renderDebug(debugGraphics, {
      tileColor: null, // tiles sin colisión (transparentes)
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // naranja
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // bordes
    });
  }

  if (this.edificio_maestria) {
    this.edificio_maestria.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(0, 255, 0, 200), // verde
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });
  }
}




//creacion de la camara
crearCamera(){
    this.cameras.main;
    
    this.cameras.main.startFollow(this.player.getContainer());
    this.cameras.main.setZoom(1.0);
    this.cameras.main.setBackgroundColor('#FFFFFF');

}



//Crear HUD del juego
crearHUD(){
    //CREAR HUD de Puntos
    this.puntos=0;

    console.log("Dentro de HUD");

//contenedor que sirve para acomodar todo en un solo item
  this.hudContainer=this.add.container(0,0).setScrollFactor(0);
//Fondo semitransparente que servira para una mejor visualizacion
  this.hudBackground= this.add.rectangle(0,0,300,50,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);

 let textoPuntos= this.add.text(16,16,"Puntos: ",{
        fontSize: '15px',
        fontFamily:this.fontText,
        fill: '#fff'

    });
    this.hudPuntos(textoPuntos);
    this.hudCronometro();

   
//union de los puntos y cronometro al background para que este todo junto
    this.hudContainer.add(this.hudBackground);
    this.hudContainer.add(textoPuntos);
    this.hudContainer.add(this.puntaje);
    this.hudContainer.add(this.cronometro);

//creacion de hud de mochila donde iran los items recogidos

   this.hudMochila(this);

}
//donde muestra los items recolectados
    hudMochila(scene){
  this.hudBackgroundMochila= this.add.rectangle(0,0,200,200,0x000000,0.5)
    .setOrigin(0)
    .setStrokeStyle(2,0xffffff);
   this.hudContainerMochila=scene.add.container(this.widthPantalla-this.hudBackgroundMochila.width-1,0).setScrollFactor(0);
   

    this.tituloMochilaItems=this.add.text(16,16,"Organica Inorganica",{
      fontFamily:this.fontText
    }).setOrigin(0);

    //Aqui se agrega la cantidad de items de cada tipo y categoria
    this.hudContainerMochila.add(this.hudBackgroundMochila);
    this.hudContainerMochila.add(this.tituloMochilaItems);

    let ajustadorAltura=0
    let ajustadorAnchura=0;

      itemsOrganicos.map(item=>{

        
      this.hudContainerItemCantidadMochilaOrganica=scene.add.container(0,this.tamañoTextoStandard+10+ajustadorAltura);

        ajustadorAltura+=this.tamañoTextoStandard+10;
      const imageItem="item_basura"+item.id;
     
      
      let hudCantidadTexto=this.add.text(this.tamañoTextoStandard,this.tamañoTextoStandard, item.cantidad+" x ",{
        fontFamily:this.fontText
      })
      .setOrigin(0);

      
      let hudImagenItem=this.add.image(hudCantidadTexto.width+10,hudCantidadTexto.height-3,imageItem)
      .setOrigin(0)
      .setDisplaySize(this.tamañoImagenItemStandard,this.tamañoImagenItemStandard);

      

      
         //aqui se agregan
      this.hudContainerItemCantidadMochilaOrganica.add(hudCantidadTexto);
      this.hudContainerItemCantidadMochilaOrganica.add(hudImagenItem);

      this.hudContainerMochila.add(this.hudContainerItemCantidadMochilaOrganica);

      ajustadorAnchura=(hudCantidadTexto.width+hudImagenItem.displayWidth+30);
      //-----------------------
      });

      

      ajustadorAltura=0;

           itemsInorganicos.map(item=>{

        
      let hudContainerItemCantidadMochilaInorganica=scene.add.container(ajustadorAnchura,this.tamañoTextoStandard+10+ajustadorAltura);

        ajustadorAltura+=this.tamañoTextoStandard+10;
      const imageItem="item_basura"+(parseInt(item.id)+6);
     
      
      let hudCantidadTexto=this.add.text(this.tamañoTextoStandard,this.tamañoTextoStandard, item.cantidad+" x ",{
        fontFamily:this.fontText
      })
      .setOrigin(0);
      let hudImagenItem=this.add.image(hudCantidadTexto.width+10,hudCantidadTexto.height-3,imageItem).setOrigin(0);
      hudImagenItem.setDisplaySize(this.tamañoImagenItemStandard,this.tamañoImagenItemStandard);
         //aqui se agregan
      hudContainerItemCantidadMochilaInorganica.add(hudCantidadTexto);
      hudContainerItemCantidadMochilaInorganica.add(hudImagenItem);

      this.hudContainerMochila.add(hudContainerItemCantidadMochilaInorganica);

      //-----------------------
      });
}
//donde muestra los puntos acumulados
    hudPuntos(textoPuntos){
  
    this.puntaje= this.add.text(16,16,this.puntos,{
        fontSize: '15px',
        fontFamily:this.fontText,
        fill: '#fff'

    }).setPosition(textoPuntos.x+textoPuntos.width+10,textoPuntos.y);
}
//donde muetra el cronometro
    hudCronometro(){
  

    //CREAR HUD de tiempo
    this.cronometro= this.add.text(16,16,'Tiempo: '+this.tiempo,{
        fontSize: '15px',
        fontFamily: this.fontText,
        fill: '#fff'
    });
    

    this.time.addEvent({
  delay: 1000, // cada 1000 ms = 1 segundo
  callback: () => {
    this.tiempoProgresivo++;

    if(this.tiempoProgresivo===this.tiempoParaCrearEnemigos){
      this.tiempoParaCrearEnemigos+=10;
      this.crearEnemigo(this.topeCreacionEnemigos-this.listaEnemigos.length);
      console.log("Creando enemigos segun el tope: ");

    }


    
   
    

    if(this.tiempo<=0) this.finalizarPartida("");
    else{
    this.tiempo--;
    this.cronometro.setText('Tiempo: ' + this.tiempo);}
  },
  loop: true
});

    this.cronometro.setPosition(this.puntaje.width+this.puntaje.x+20, this.puntaje.height);
}


//IR al siguiente escenario
finalizarPartida(n=""){

    console.log(this.scene);
    console.log("MENSAJE: "+n);
  this.scene.start('FinPartida',{puntos:this.puntos,mensaje:n});

}
  //carga de botones digitales
  cargarBotones(){

    let sizeBotones=(this.widthPantalla/10);
     let division=2;

    if(this.widthPantalla<this.heightPantalla){ division=1.5; sizeBotones=(this.widthPantalla/6);}
   

      this.botonesPlayer={
        'ataque':this.add.rectangle(0,0,sizeBotones,sizeBotones,0xffffff,0.5).setOrigin(0).setScrollFactor(0).setInteractive(),
                        }

    
     this.botonesPlayer.ataque.setPosition(this.widthPantalla-(this.botonesPlayer.ataque.width)*2,this.heightPantalla/division);
    


     this.botonesPlayer.ataque.on('pointerdown', () => this.controles.ataque= true);
     this.botonesPlayer.ataque.on('pointerup',   () => this.controles.ataque = false);


      this.input.on('pointerup', () => {
  // Al soltar el dedo en cualquier parte de la pantalla
 
  this.controles.ataque = false;
  
});

if(this.widthPantalla>=900){ this.botonesPlayer.ataque.setAlpha(0)}


    
    }

    cargarJoystick(){

      this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 100,
      y: 400,
      radius: 100,
      base: this.add.circle(0, 0, 50, 0x888888,0.5),
      thumb: this.add.circle(0, 0, 25, 0xcccccc,0.5),


});

if(this.widthPantalla>=900){ this.joyStick.base.setAlpha(0);
                              this.joyStick.thumb.setAlpha(0);
}


//this.joyStick.setScrollFactor(0);

this.joystickCursors = this.joyStick.createCursorKeys();
    }

    

//El create es donde acomo las cosas para que tengan un orden
create(){

   
//esto sirve para que se vean las colisiones de los sprites para testear (cuadro morado)
//this.physics.world.createDebugGraphic();

    

  
    
    //Generacion de escenario
    this.crearEscenario();
    //cantidad de items a crear
    this.crearItems(1000);//aqui puedo agregar la cantidad de items que quiero crear


    //crear personaje

    this.crearEdificios();
    this.crearArboles();

     this.cargarBotones();
    this.cargarJoystick();
    this.getPlayer();
    this.crearEnemigo();

    //colisiones en entre items
    this.crearColisiones();
    //this.depurarColisiones();

   //creacion de camara;

   this.crearCamera();

   //crear HUD
    this.crearHUD();

    //this.crearAnimaciones();
    

    

  

   
}


//el update es todo lo que se corre en tiempo real
update(time, delta){

   
    //movimientos Jugador
    this.movimientosPlayer();
    //moviemientos del enemigo
    this.movimientosEnemigo();
   //this.physics.moveToObject(this.enemie.getContainer(), this.player.getContainer(),200);

    


  
 



}
}