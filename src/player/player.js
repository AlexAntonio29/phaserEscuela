import  {empujar}  from "../funciones/empujar.js";
import { crearItemsBasura } from "../funciones/crearItemsBasura.js";
import { armas } from "../items/DataItemsPotenciadores.js";
import {dataEnemigos} from "../enemies/DataEnemies.js"
export class player {

  constructor(scene, texture, x = 20, y = 25, joystick,controles, keys,listaEnemigos) {

    this.vida=3;
    this.scene = scene;
    this.texture = texture;
    this.x=x;
    this.y=y;
    this.arma;

    this.sonidoAtaque;
    this.spriteAtaque;

    this.listaEnemigos=listaEnemigos;

    this.joystick=joystick;
    this.controles=controles;
    this.caminar=false;
    this.caminarInversoEstatico=false;
    this.keys=keys;

    this.habilitarCollision=false;

   

     this.estaAtacando=false;//para determinar que no genere muchos ataques sin limites

    // Crear sprite físico directamente
    this.sprite = scene.physics.add.sprite(0, 0, texture);
    this.sprite.setOrigin(0);
    this.sprite.setDisplaySize(x, y);
    this.sprite.setBounce(1);
    this.sprite.setCollideWorldBounds(true);

    this.componentesAtaque={
      'textura':'ataqueLateralAbajo',
      'width':this.sprite.displayWidth*2,
      'height':this.sprite.displayHeight,
      'x':0.5,
      'y':0
    }

    this.ataque=5;

    this.scene.anims.create({
        key: "player_estatico",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
        frameRate: 6,
        repeat: -1
          });
    this.sprite.play("player_estatico");

    this.scene.anims.create({
        key: "player_camina",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
          });
          this.scene.anims.create({
        key: "player_camina_inverso",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
          });

          this.scene.anims.create({
        key: "player_estatico_inverso",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 5, end: 5 }),
        frameRate: 6,
        repeat: -1
          });

   
         // this.sprite.play('player_camina');

         

          //this.sprite.play('player_estatico');
        /* if(!this.caminar) this.sprite.play('player_estatico');
          else this.sprite.play('player_caminar');*/


    
    
    /*
    'x':(this.sprite.x)-(this.sprite.displayWidth/2),
      'y':(this.sprite.y)+(this.sprite.displayHeight/2)
    */


    //console.log("CREACION del player");

   
  }

  getHabilitarCollision(){
    return this.habilitarCollision;
  }

  setHabilitarCollision(n){
      this.habilitarCollision=n;
  }



  getCaminar(){


    //console.log("Caminando");

     this.scene.anims.create({
        key: "player_camina",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
          });
    this.sprite.play('player_camina');
  }

  getNoCaminar(){
   // console.log("NO Caminando");
     this.scene.anims.create({
        key: "player_estatico",
        frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
        frameRate: 6,
        repeat: -1
          });
    this.sprite.play("player_estatico");
  }

  getChangeSprite(){
    

     this.keys.W.on('down', () => {
    this.sprite.play('player_caminar');
    //console.log("AQUI en caminar");
  });

  this.keys.W.on('up', () => {
    this.sprite.play('player_estatico');
    //console.log("AQUI en estatico")
  });
  }




  getContainer() {
    return this.sprite;
  }

  setVida(n){

      this.vida=this.vida-n;
  }

  getVida(){
    return this.vida;
  }

  setPositionInitial(x, y) {
    this.sprite.setPosition(x, y);
    
  }

  getPositionX(){
    return this.sprite.x;
  }
  getPositionY(){
    return this.sprite.y;
  }

  setMovementX(n = 1) {
    this.sprite.setVelocityX(n);
  }

  setMovementY(n = 1) {
    this.sprite.setVelocityY(n);
  }


  setMovimientoPlayer(contacto){

    let caminar=false;
    let caminarInverso=false;
    



      


    let velocidad=350;

   // console.log("MM_X: "+this.componentesAtaque.x);
   // console.log("MM_Y: "+this.componentesAtaque.y);
    

     //this.player.getContainer().setVelocity(0);

       if (!contacto && !(this.estaAtacando)) {


    this.sprite.setVelocity(0);
  

        //se hace el llamado a la clase "player"
     //movimientos diagonales

    // const longitud = Math.hypot(velocidad, velocidad);
   
      
      let velocidadDiagonal=velocidad/Math.sqrt(2);
  
      
      // console.log("velocidadparteDiagonal: "+velocidadDiagonal);

   

  if((this.scene.cursor.up.isDown && this.scene.cursor.right.isDown)||(this.keys.W.isDown&&this.keys.D.isDown)||(this.joystick.up.isDown&&this.joystick.right.isDown)){
    // console.log("UP + RIGHT");

      
     caminar=true;
     this.caminarInversoEstatico=true;
    //this.sprite.play('player_camina');
     
     this.sprite.setVelocityY(-velocidadDiagonal);
     this.sprite.setVelocityX(velocidadDiagonal);
  }

  else if((this.scene.cursor.up.isDown && this.scene.cursor.left.isDown)||(this.keys.W.isDown&&this.keys.A.isDown)||(this.joystick.up.isDown&&this.joystick.left.isDown)){
   // console.log("UP + LEFT");
    //this.sprite.play('player_camina');
    this.caminarInversoEstatico=true;
     caminar=true;
     caminarInverso=true;
     this.sprite.setVelocityY(-velocidadDiagonal);
     this.sprite.setVelocityX(-velocidadDiagonal);
  }
  else if((this.scene.cursor.down.isDown && this.scene.cursor.left.isDown)||(this.keys.S.isDown&&this.keys.A.isDown)||(this.joystick.down.isDown&&this.joystick.left.isDown)){
   // console.log("DOWN + LEFT");
    // this.sprite.play('player_camina');
    this.caminarInversoEstatico=true;
     caminar=true;
     caminarInverso=true;
     this.sprite.setVelocityY(velocidadDiagonal);
     this.sprite.setVelocityX(-velocidadDiagonal);
  }

  else if((this.scene.cursor.down.isDown && this.scene.cursor.right.isDown)||(this.keys.S.isDown&&this.keys.D.isDown)||(this.joystick.down.isDown&&this.joystick.right.isDown)){
     //console.log("DOWN + RIGHT");
     //this.sprite.play('player_camina');
     this.caminarInversoEstatico=false;
     caminar=true;
     this.sprite.setVelocityY(velocidadDiagonal);
     this.sprite.setVelocityX(velocidadDiagonal);
  }
  else
//movimientos normales
 if(this.scene.cursor.up.isDown||this.keys.W.isDown||this.joystick.up.isDown){
//.setOrigin(0.5,1)//arriba
  //this.sprite.play('player_camina');
  caminar=true;
  this.caminarInversoEstatico=false;
  this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=1;
  


  this.componentesAtaque.textura="ataqueLateralArriba";
  //cambio de tamaño
   this.componentesAtaque.width=this.sprite.displayWidth*2;
   this.componentesAtaque.height=this.sprite.displayHeight;

   //this.componentesAtaque.x=-1*this.componentesAtaque.x;
   //this.componentesAtaque.y=-1*this.componentesAtaque.y;

    //console.log("UP");
    this.sprite.setVelocityY(-velocidad);
 }else if(this.keys.S.isDown||this.scene.cursor.down.isDown||this.joystick.down.isDown){
// .setOrigin(0.5,0)//abajo
  //this.sprite.play('player_camina');
  caminar=true;
  this.caminarInversoEstatico=false;
   this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=0;
 

   //cambio de tamaño
   this.componentesAtaque.width=this.sprite.displayWidth*2;
   this.componentesAtaque.height=this.sprite.displayHeight;

   
   this.componentesAtaque.textura="ataqueLateralAbajo";
  
     //console.log("DOWN");
    this.sprite.setVelocityY(velocidad);
 }else if(this.scene.cursor.left.isDown||this.keys.A.isDown||this.joystick.left.isDown){

 // this.sprite.play('player_camina');
  
  //.setOrigin(1,0.5)//izquierda
  this.caminarInversoEstatico=true;
  caminar=true;
  caminarInverso=true;
  this.componentesAtaque.x=1;
  this.componentesAtaque.y=0.5;


   this.componentesAtaque.textura="ataqueLateralIzquierda";
   //cambio del tamaño
   
   this.componentesAtaque.width=this.sprite.displayHeight;
   this.componentesAtaque.height=this.sprite.displayWidth*2;
   
   //  console.log("LEFT");
    this.sprite.setVelocityX(-velocidad);
 }else if(this.scene.cursor.right.isDown||this.keys.D.isDown||this.joystick.right.isDown){

 // this.sprite.play('player_camina');

  //.setOrigin(0,0.5)//derecha
  this.caminarInversoEstatico=false;
  caminar=true;
  this.componentesAtaque.x=0;
  this.componentesAtaque.y=0.5;

   this.componentesAtaque.textura="ataqueLateralDerecha";

   //cambio del tamaño
   
   this.componentesAtaque.width=this.sprite.displayHeight;
   this.componentesAtaque.height=this.sprite.displayWidth*2;
    // console.log("RIGHT");
    this.sprite.setVelocityX(velocidad);
 }

 }

if (caminar) {
  if (caminarInverso) {
    if (this.sprite.anims.currentAnim?.key !== 'player_camina_inverso') {
      this.sprite.play('player_camina_inverso');
    }
  } else {
    if (this.sprite.anims.currentAnim?.key !== 'player_camina') {
      this.sprite.play('player_camina');
    }
  }
} else {
  if (this.caminarInversoEstatico) {
    if (this.sprite.anims.currentAnim?.key !== 'player_estatico_inverso') {
      this.sprite.play('player_estatico_inverso');
    }
  } else {
    if (this.sprite.anims.currentAnim?.key !== 'player_estatico') {
      this.sprite.play('player_estatico');
    }
  }
}


 

  }

  setArma(arma){

    this.arma=arma;
    this.sonidoAtaque=this.scene.sound.add(arma.sonido,{
        loop:false,
        volume:1
      });

  

  }

  getArma(){
    //console.log("GetArma: ");
    //console.log(this.arma);
    return this.arma;
  }

  setAtaque(){

  }


  contactoAtaque(ataque,enemigo){

    

              if (!enemigo) return;

            if(enemigo.golpeado) return;
               enemigo.golpeado=true;
        
            enemigo.setVida(parseInt((this.arma.ataque)*(this.arma.nivel)));
            this.soundGolpe.play();
            
             if(enemigo.getVida()<=0){
               // crearItemsBasura(this.scene,enemigo.dataEnemie.items,this.listaItems,enemigo.getPositionX(),enemigo.getpositionY(),false,this.sprite);
             

              let x=Math.floor(Math.random() * ((this.widthEscenario-30) - 0 + 1)) + 0;
              let y=Math.floor(Math.random() * ((this.heightEscenario-30) - 0 + 1)) + 0;
              let t=parseInt(enemigo.dataEnemie.id)-1;

              
              enemigo.setFullVida(dataEnemigos[t].vida);
              enemigo.setEnemiePosition(x,y);
              //enemigo
              //enemigo.setMovimientoEnemigo(this.sprite,contactoMov[0],contactoMov[1],contactoMov[2]);

              
              
              
             /*enemigo.getContainer().destroy();
             // console.log("Enemigo Eliminado - Cantidad: "+ listaEnemigos.length);
               const index = listaEnemigos.indexOf(enemigo);
              if (index !== -1) listaEnemigos.splice(index, 1);*/
                this.habilitarCollision=true;
        //console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);
             }
          else empujar(this.spriteAtaque,enemigo.getContainer(),1,this.contacto,this.scene);
          enemigo.setGolpeado();

          // contacto[n]=false;

              
  }


  getAtaque(listaEnemigos,contacto,n,listaItems,widthEscenario,heightEscenario,contactoMov,sound){


   

    if(this.arma!=undefined) 

      if((Phaser.Input.Keyboard.JustDown((this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)))||this.controles.ataque)&&!this.estaAtacando){
         this.estaAtacando=true;
        this.widthEscenario=widthEscenario;
        this.heightEscenario=heightEscenario;
         
         this.contacto=contacto;
        if(this.spriteAtaque==undefined){

        this.spriteAtaque=this.scene.add.sprite(0,0,this.componentesAtaque.textura)
        .setOrigin(this.componentesAtaque.x,this.componentesAtaque.y)
        .setDisplaySize(Number(this.arma.width)*(this.arma.nivel),Number(this.arma.heigth)*(this.arma.nivel))
        .setPosition(this.sprite.x+this.sprite.displayWidth/2, this.sprite.y+this.sprite.displayHeight/2);
        
        this.scene.physics.add.existing(this.spriteAtaque);
        this.spriteAtaque.body.setCollideWorldBounds(true);

        this.listaItems=listaItems;

         this.scene.physics.add.overlap(this.spriteAtaque, this.listaEnemigos, this.contactoAtaque, null, this);

          this.soundGolpe=sound;


      
      } else{
        this.spriteAtaque
        .setOrigin(this.componentesAtaque.x,this.componentesAtaque.y)
        .setDisplaySize(Number(this.arma.width)*(this.arma.nivel),Number(this.arma.heigth)*(this.arma.nivel))
        .setPosition(this.sprite.x+this.sprite.displayWidth/2, this.sprite.y+this.sprite.displayHeight/2)
        .setTexture(this.componentesAtaque.textura);
             ;

             //this.scene.physics.add.existing(this.spriteAtaque);
        //this.spriteAtaque.body.setCollideWorldBounds(true);
      }

      this.spriteAtaque.setVisible(true);
    this.spriteAtaque.body.enable = true;



        //this.ataque.setPosition((this.sprite.x)+this.componentesAtaque.x,this.sprite.y+this.componentesAtaque.y);

       
        this.sprite.setVelocity(0);

        //cargarSonido
        this.sonidoAtaque.play();



        if((this.arma.largoAtaque))
          switch(this.componentesAtaque.textura){

            case 'ataqueLateralArriba':
              this.spriteAtaque.body.setVelocityY(-this.arma.tiempoDisparo*(this.arma.nivel));

            break;
            case 'ataqueLateralAbajo':
              this.spriteAtaque.body.setVelocityY(this.arma.tiempoDisparo*(this.arma.nivel));

            break;
            case 'ataqueLateralDerecha':
              this.spriteAtaque.body.setVelocityX(this.arma.tiempoDisparo*(this.arma.nivel));
            break;
            case 'ataqueLateralIzquierda':
              this.spriteAtaque.body.setVelocityX(-this.arma.tiempoDisparo*(this.arma.nivel));

            break;
            default:
              break;
        }

       // console.log(this.scene.physics.world.colliders.length)

        /*

           listaEnemigos.map(enemigo=>{
          this.scene.physics.add.overlap(
          this.spriteAtaque,
          enemigo.getContainer(),
          ()=>{

              if (!enemigo) return;

            if(enemigo.golpeado) return;
               enemigo.golpeado=true;
        
            enemigo.setVida(parseInt((this.arma.ataque)*(this.arma.nivel)));
            //sound.play();
            
             if(enemigo.getVida()<=0){
                //crearItemsBasura(this.scene,enemigo.dataEnemie.items,listaItems,enemigo.getPositionX(),enemigo.getpositionY(),false,this.sprite);
             

              let x=Math.floor(Math.random() * ((widthEscenario-30) - 0 + 1)) + 0;
              let y=Math.floor(Math.random() * ((heightEscenario-30) - 0 + 1)) + 0;
              let t=parseInt(enemigo.dataEnemie.id)-1;

              
              enemigo.setFullVida(dataEnemigos[t].vida);
              enemigo.setEnemiePosition(x,y);
              //enemigo
              //enemigo.setMovimientoEnemigo(this.sprite,contactoMov[0],contactoMov[1],contactoMov[2]);

              
              
              
             /*enemigo.getContainer().destroy();
             // console.log("Enemigo Eliminado - Cantidad: "+ listaEnemigos.length);
               const index = listaEnemigos.indexOf(enemigo);
              if (index !== -1) listaEnemigos.splice(index, 1);
                this.habilitarCollision=true;
        //console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);
             }
          else empujar(this.spriteAtaque,enemigo.getContainer(),n,contacto,this.scene);
          enemigo.setGolpeado();

          // contacto[n]=false;

              }, null, this
              );
                })



                */

                /*
this.grupoEnemigos = this.scene.physics.add.group();

listaEnemigos.forEach(enemigo => {
  this.grupoEnemigos.add(enemigo.getContainer());
});

this.scene.physics.add.overlap(spriteAtaque, this.grupoEnemigos, (ataque, enemigoSprite) => {
  const enemigo = listaEnemigos.find(e => e.getContainer() === enemigoSprite);
  if (!enemigo) return;

  if(enemigo.golpeado) return;
  enemigo.golpeado=true;

  //console.log("vida enemigo: " + enemigo.getVida());
  enemigo.setVida(parseInt(this.arma.ataque * this.arma.nivel));

  if (enemigo.getVida() <= 0) {
    

    //crearItemsBasura(this.scene,enemigo.dataEnemie.items,listaItems,enemigo.getPositionX(),enemigo.getpositionY(),false,this.sprite);
    enemigo.getContainer().destroy();
    const index = listaEnemigos.indexOf(enemigo);
              if (index !== -1) listaEnemigos.splice(index, 1);
   // console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);

    this.habilitarCollision=true;

  } else {
    empujar(spriteAtaque, enemigo.getContainer(), n, contacto, this.scene);
    enemigo.setGolpeado();
  }

}, null, this);*/
                

                 //contacto[n]=false;
      

       this.scene.time.delayedCall(this.arma.velocidad, () => {
    this.estaAtacando=false;
    this.spriteAtaque.setVisible(false);
    this.spriteAtaque.body.enable = false;
    
  });


  


   
  } 

  

  

  }


}
