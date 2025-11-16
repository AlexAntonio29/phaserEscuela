import  {empujar}  from "../funciones/empujar.js";
export class player {

  constructor(scene, texture, x = 20, y = 25, joystick,controles) {

    this.vida=3;
    this.scene = scene;
    this.texture = texture;
    this.x=x;
    this.y=y;
    this.arma;
    this.joystick=joystick;
    this.controles=controles;

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


    
    
    /*
    'x':(this.sprite.x)-(this.sprite.displayWidth/2),
      'y':(this.sprite.y)+(this.sprite.displayHeight/2)
    */


    console.log("CREACION del player");
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

  setMovementX(n = 1) {
    this.sprite.setVelocityX(n);
  }

  setMovementY(n = 1) {
    this.sprite.setVelocityY(n);
  }


  setMovimientoPlayer(contacto){

      this.keys = this.input.keyboard.addKeys({
    W: Phaser.Input.Keyboard.KeyCodes.W,
    A: Phaser.Input.Keyboard.KeyCodes.A,
    S: Phaser.Input.Keyboard.KeyCodes.S,
    D: Phaser.Input.Keyboard.KeyCodes.D
    
});


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

   

  if((this.scene.cursor.up.isDown && this.scene.cursor.right.isDown)||(this.joystick.up.isDown&&this.joystick.right.isDown)){
    // console.log("UP + RIGHT");

      

      
     
     this.sprite.setVelocityY(-velocidadDiagonal);
     this.sprite.setVelocityX(velocidadDiagonal);
  }

  else if((this.scene.cursor.up.isDown && this.scene.cursor.left.isDown)||(this.joystick.up.isDown&&this.joystick.left.isDown)){
   // console.log("UP + LEFT");
     this.sprite.setVelocityY(-velocidadDiagonal);
     this.sprite.setVelocityX(-velocidadDiagonal);
  }
  else if((this.scene.cursor.down.isDown && this.scene.cursor.left.isDown)||(this.joystick.down.isDown&&this.joystick.left.isDown)){
   // console.log("DOWN + LEFT");
     this.sprite.setVelocityY(velocidadDiagonal);
     this.sprite.setVelocityX(-velocidadDiagonal);
  }

  else if((this.scene.cursor.down.isDown && this.scene.cursor.right.isDown)||(this.joystick.down.isDown&&this.joystick.right.isDown)){
     //console.log("DOWN + RIGHT");
     
     this.sprite.setVelocityY(velocidadDiagonal);
     this.sprite.setVelocityX(velocidadDiagonal);
  }
  else
//movimientos normales
 if(this.scene.cursor.up.isDown||this.joystick.up.isDown){
//.setOrigin(0.5,1)//arriba
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
 }else if(this.scene.cursor.down.isDown||this.joystick.down.isDown){
// .setOrigin(0.5,0)//abajo
   this.componentesAtaque.x=0.5;
  this.componentesAtaque.y=0;
 

   //cambio de tamaño
   this.componentesAtaque.width=this.sprite.displayWidth*2;
   this.componentesAtaque.height=this.sprite.displayHeight;

   
   this.componentesAtaque.textura="ataqueLateralAbajo";
  
     //console.log("DOWN");
    this.sprite.setVelocityY(velocidad);
 }else if(this.scene.cursor.left.isDown||this.joystick.left.isDown){
  
  //.setOrigin(1,0.5)//izquierda
  this.componentesAtaque.x=1;
  this.componentesAtaque.y=0.5;


   this.componentesAtaque.textura="ataqueLateralIzquierda";
   //cambio del tamaño
   
   this.componentesAtaque.width=this.sprite.displayHeight;
   this.componentesAtaque.height=this.sprite.displayWidth*2;
   
   //  console.log("LEFT");
    this.sprite.setVelocityX(-velocidad);
 }else if(this.scene.cursor.right.isDown||this.joystick.right.isDown){

  //.setOrigin(0,0.5)//derecha
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

  }

  setArma(arma){

    this.arma=arma;
    console.log("SetArma: ");
    console.log(arma);

  }

  getArma(){
    console.log("GetArma: ");
    console.log(this.arma);
    return this.arma;
  }

  setAtaque(){
  }

  getAtaque(listaEnemigos,contacto,n){


   

    if(this.arma!=undefined) 

      if((Phaser.Input.Keyboard.JustDown((this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)))||this.controles.ataque)&&!this.estaAtacando){
         this.estaAtacando=true;

         console.log("dentro de ataque");

        let spriteAtaque=this.scene.add.sprite(0,0,this.componentesAtaque.textura)
      // .setOrigin(0.5,0)//abajo
       //.setOrigin(1,0.5)//izquierda
       //.setOrigin(0,0.5)//derecha
      //.setOrigin(0.5,1)//arriba
      
    
        .setOrigin(this.componentesAtaque.x,this.componentesAtaque.y)
        .setDisplaySize(Number(this.arma.width)*(this.arma.nivel),Number(this.arma.heigth)*(this.arma.nivel))
        .setPosition(this.sprite.x+this.sprite.displayWidth/2, this.sprite.y+this.sprite.displayHeight/2);
        
        
        this.scene.physics.add.existing(spriteAtaque);
        spriteAtaque.body.setCollideWorldBounds(true);

        //this.ataque.setPosition((this.sprite.x)+this.componentesAtaque.x,this.sprite.y+this.componentesAtaque.y);

       
        this.sprite.setVelocity(0);



        if((this.arma.largoAtaque))
          switch(this.componentesAtaque.textura){

            case 'ataqueLateralArriba':
              spriteAtaque.body.setVelocityY(-this.arma.tiempoDisparo*(this.arma.nivel));

            break;
            case 'ataqueLateralAbajo':
              spriteAtaque.body.setVelocityY(this.arma.tiempoDisparo*(this.arma.nivel));

            break;
            case 'ataqueLateralDerecha':
              spriteAtaque.body.setVelocityX(this.arma.tiempoDisparo*(this.arma.nivel));
            break;
            case 'ataqueLateralIzquierda':
              spriteAtaque.body.setVelocityX(-this.arma.tiempoDisparo*(this.arma.nivel));

            break;
            default:
              break;
        }
/*
           listaEnemigos.map(enemigo=>{
          this.scene.physics.add.overlap(
          spriteAtaque,
          enemigo.getContainer(),
          ()=>{
            console.log("vida enemigo: "+enemigo.getVida());
            enemigo.setVida(parseInt((this.arma.ataque)*(this.arma.nivel)));
            console.log("vida enemigo AQUI REVISA->: "+enemigo.getVida());
             if(enemigo.getVida()<=0){enemigo.getContainer().destroy();
              console.log("Enemigo Eliminado - Cantidad: "+ listaEnemigos.length);
               const index = listaEnemigos.indexOf(enemigo);
              if (index !== -1) listaEnemigos.splice(index, 1);

        console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);
             }
          else empujar(spriteAtaque,enemigo.getContainer(),n,contacto,this.scene);

          // contacto[n]=false;

              }, null, this
              );
                })*/

                
this.grupoEnemigos = this.scene.physics.add.group();

listaEnemigos.forEach(enemigo => {
  this.grupoEnemigos.add(enemigo.getContainer());
});

this.scene.physics.add.overlap(spriteAtaque, this.grupoEnemigos, (ataque, enemigoSprite) => {
  const enemigo = listaEnemigos.find(e => e.getContainer() === enemigoSprite);
  if (!enemigo) return;

  if(enemigo.golpeado) return;
  enemigo.golpeado=true;

  console.log("vida enemigo: " + enemigo.getVida());
  enemigo.setVida(parseInt(this.arma.ataque * this.arma.nivel));

  if (enemigo.getVida() <= 0) {
    enemigo.getContainer().destroy();
    const index = listaEnemigos.indexOf(enemigo);
              if (index !== -1) listaEnemigos.splice(index, 1);
    console.log("Enemigo Eliminado - Cantidad: " + listaEnemigos.length);
  } else {
    empujar(spriteAtaque, enemigo.getContainer(), n, contacto, this.scene);
    enemigo.setGolpeado();
  }
}, null, this);
                

                 //contacto[n]=false;
      

       this.scene.time.delayedCall(this.arma.velocidad, () => {
    this.estaAtacando=false;
    spriteAtaque.destroy();
    
  });


  


   
  } 

  

  

  }


}
