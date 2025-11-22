export class Enemies extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, dataEnemie, x=0,y=0){

      

      super(scene,x,y,dataEnemie.diseno);

      scene.add.existing(this);
      scene.physics.add.existing(this);

        
        
        this.dataEnemie=dataEnemie;
        this.velocidad=Math.floor(Math.random() * ((Number(this.dataEnemie.velocidad)) - (Number(this.dataEnemie.velocidad)-30) + 1)) + (Number(this.dataEnemie.velocidad)-30);

        this.vida=Number(dataEnemie.vida);
        

        this.golpeado=false;

        //console.log("escena fisica: "+this.scene.physics);

        
      this
        .setOrigin(0)
        .setDisplaySize(this.dataEnemie.width,this.dataEnemie.height)
        .setCollideWorldBounds(true)
        ;

        if (!this.scene.anims.exists(this.dataEnemie.diseno+"_camina")) {
        this.scene.anims.create({
        key: this.dataEnemie.diseno+"_camina",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno, { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
          });
        }

        //this.body.setSize(200, 200);
        //this.body.setOffset(0, 0);
        //this.body.setCollideWorldBounds(true);

        this.play(this.dataEnemie.diseno+"_camina");
        //this.play('enemigoCamina');
        

    }


    getContainer(){
        return this;
    }

    setVida(n){
      this.vida=this.vida-n;

    }

    setFullVida(n){
      this.vida=n;
    }

    getVida(){
      return Number(this.vida);
    }

    setGolpeado(){
      if (!this || !this.scene) return;
      if (!this.scene.anims.exists(this.dataEnemie.diseno+"_golpeado")) {
      this.scene.anims.create({
        key: this.dataEnemie.diseno+"_golpeado",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno, { start: 4, end: 4 }),
        frameRate: 6,
        repeat: -1
          });}

      
      this.play(this.dataEnemie.diseno+"_golpeado");
      

      this.scene.time.delayedCall(500,()=>{ 
         if (this && this.scene && !this.destroyed){
          this.play(this.dataEnemie.diseno+"_camina");}
          this.golpeado=false;
      }
    );
    }

    setEnemiePosition(x,y){
        this.setPosition(x,y).setActive(true).setVisible(true);;
    }

    getPositionX(){
      return this.x;
    }

    getpositionY(){
      return this.y;
    }

    setEnemiesVelocity(n=0){
        this.setVelocity(n);
    }   

    setEnemiesMovementX(n=1){
        this.setVelocityX(n);
    }

    setEnemiesMovementY(n=1){
        this.setVelocityY(n);
    }

    setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo){


      //console.log(`!contacto:${!contacto}, !this.vida${!(this.vida<=0)}, !contractoAtaque:${!contactoAtaque} !contactoEnemigo:${!contactoEnemigo}`)
      if(!contacto && !(this.vida<=0) && !contactoAtaque && !contactoEnemigo){

        //console.log('DENTRO');
         
        let vel=this.velocidad;
        //console.log("Velocidad enemigo: "+vel);

     //this.player.getContainer().setVelocity(0); BLOQUEADO POR EL MOMENTO

        //se hace el llamado a la clase "player"
     //movimientos diagonales

    // const longitud = Math.hypot(velocidad, velocidad);
    let rango_enemigo_movimiento=Number(this.dataEnemie.movimiento);//es el rango que tendra el enemigo con el player para cambio de movimiento

    let playerX=player.x;
    let playerY=player.y;

    let enemigoX=this.x;
    let enemigoY=this.y;

    //console.log(`Posicion Player: x:${playerX} y:${playerY}`);
    //console.log(`Posicion Enemigo: x:${enemigoX} y:${enemigoY}`);

   
      
      let velocidadDiagonal=vel/Math.sqrt(2);
  
      
      // console.log("velocidadparteDiagonal: "+velocidadDiagonal);

      //player esta arriba y derecha

      if(playerX===enemigoX&&playerY===enemigoY) this.setEnemiesVelocity(0);


      
//movimientos normales
 if(playerY<enemigoY && ((playerX-rango_enemigo_movimiento<=enemigoX&&(playerX+rango_enemigo_movimiento)>=enemigoX))){
    //console.log("UP");
    //console.log("ESTOY EN MOV NORMAL -Y");
    this.setVelocityY(-vel);
   if(!(this.dataEnemie.ofzigzag))
    this.setVelocityX(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
 }else if(playerY>enemigoY && ((playerX-rango_enemigo_movimiento<=enemigoX&&(playerX+rango_enemigo_movimiento)>=enemigoX))){
     //console.log("DOWN");
    this.setVelocityY(vel);
  if(!(this.dataEnemie.ofzigzag))
    this.setVelocityX(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
     //console.log("ESTOY EN MOV NORMAL Y");
 }else if(((playerY-rango_enemigo_movimiento<=enemigoY&&(playerY+rango_enemigo_movimiento)>=enemigoY)) && playerX>enemigoX){
   //  console.log("LEFT");
  // console.log("ESTOY EN MOV NORMAL -X");
    this.setVelocityX(vel);
    if(!(this.dataEnemie.ofzigzag))
    this.setVelocityY(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
 }else if(((playerY-rango_enemigo_movimiento<=enemigoY&&(playerY+rango_enemigo_movimiento)>=enemigoY))&& playerX<enemigoX){
    // console.log("RIGHT");
    this.setVelocityX(-vel);
  if(!(this.dataEnemie.ofzigzag))
    this.setVelocityY(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
     //console.log("ESTOY EN MOV NORMAL X");
 }
  else

  if(playerY<enemigoY&& playerX>enemigoX){
    // console.log("UP + RIGHT");

    this.setVelocityY(-velocidadDiagonal);
   this.setVelocityX(velocidadDiagonal);
  }

  
//player esta arriba e izquierda
  else if(playerY<enemigoY&& playerX<enemigoX){
   // console.log("UP + LEFT");
    this.setVelocityY(-velocidadDiagonal);
    this.setVelocityX(-velocidadDiagonal);
  }

  //player esta debajo e izquierda
  else if(playerY>enemigoY && playerX<enemigoX){
   // console.log("DOWN + LEFT");
    this.setVelocityY(velocidadDiagonal);
    this.setVelocityX(-velocidadDiagonal);
  }

  //player esta debajo y derecha
  else if(playerY>enemigoY && playerX>enemigoX){
     //console.log("DOWN + RIGHT");
     
    this.setVelocityY(velocidadDiagonal);
    this.setVelocityX(velocidadDiagonal);
  }
 
    }

    


    }

    setMuerteEnemigo(){
      
        this.destroy();
    // this.container.destroy();
    }


}