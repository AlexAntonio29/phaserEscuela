export class Enemies{

    constructor(scene, dataEnemie, x=0,y=0){

      
        this.scene=scene;
        this.dataEnemie=dataEnemie;
        this.velocidad=Math.floor(Math.random() * ((Number(this.dataEnemie.velocidad)) - (Number(this.dataEnemie.velocidad)-30) + 1)) + (Number(this.dataEnemie.velocidad)-30);

        this.vida=Number(dataEnemie.vida);
        this.x=x;
        this.y=y;

        this.golpeado=false;

        //console.log("escena fisica: "+this.scene.physics);

        this.setBody();
        //this.enemigo.play('enemigoCamina');

    }


    getContainer(){
        return this.enemigo;
    }

    setVida(n){
      this.vida=this.vida-n;

    }

    getVida(){
      return Number(this.vida);
    }

    setBody(){

        if (!this.scene.anims.exists(this.dataEnemie.diseno+"_camina")) {
        this.scene.anims.create({
        key: this.dataEnemie.diseno+"_camina",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno, { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
          });
        }


        this.enemigo=this.scene.physics.add.sprite(0,0,this.dataEnemie.diseno)
        .setOrigin(0)
        .setDisplaySize(this.dataEnemie.width,this.dataEnemie.height)
        .setPosition(this.x,this.y);
        
        //this.enemigo.body.setSize(200, 200);
        //this.enemigo.body.setOffset(0, 0);
        this.enemigo.body.setCollideWorldBounds(true);

        this.enemigo.play(this.dataEnemie.diseno+"_camina");
        

    }

    setGolpeado(){
      if (!this.enemigo || !this.enemigo.scene) return;
      if (!this.scene.anims.exists(this.dataEnemie.diseno+"_golpeado")) {
      this.scene.anims.create({
        key: this.dataEnemie.diseno+"_golpeado",
        frames: this.scene.anims.generateFrameNumbers(this.dataEnemie.diseno, { start: 4, end: 4 }),
        frameRate: 6,
        repeat: -1
          });}

      
      this.enemigo.play(this.dataEnemie.diseno+"_golpeado");
      

      this.scene.time.delayedCall(500,()=>{ 
         if (this.enemigo && this.enemigo.scene && !this.enemigo.destroyed){
          this.enemigo.play(this.dataEnemie.diseno+"_camina");}
          this.golpeado=false;
      }
    );
    }

    setEnemiePosition(x,y){
        this.enemigo.setPosition(x,y);
    }

    getPositionX(){
      return this.enemigo.x;
    }

    getpositionY(){
      return this.enemigo.y;
    }

    setEnemiesVelocity(n=0){
        this.enemigo.setVelocity(n);
    }   

    setEnemiesMovementX(n=1){
        this.enemigo.setVelocityX(n);
    }

    setEnemiesMovementY(n=1){
        this.enemigo.setVelocityY(n);
    }

    setMovimientoEnemigo(player,contacto,contactoAtaque,contactoEnemigo){


      if(!contacto && !(this.vida<=0) && !contactoAtaque && !contactoEnemigo){
         
        let vel=this.velocidad;
        //console.log("Velocidad enemigo: "+vel);

     //this.player.getContainer().setVelocity(0); BLOQUEADO POR EL MOMENTO

        //se hace el llamado a la clase "player"
     //movimientos diagonales

    // const longitud = Math.hypot(velocidad, velocidad);
    let rango_enemigo_movimiento=Number(this.dataEnemie.movimiento);//es el rango que tendra el enemigo con el player para cambio de movimiento

    let playerX=player.x;
    let playerY=player.y;

    let enemigoX=this.enemigo.x;
    let enemigoY=this.enemigo.y;

    //console.log(`Posicion Player: x:${playerX} y:${playerY}`);
    //console.log(`Posicion Enemigo: x:${enemigoX} y:${enemigoY}`);

   
      
      let velocidadDiagonal=vel/Math.sqrt(2);
  
      
      // console.log("velocidadparteDiagonal: "+velocidadDiagonal);

      //player esta arriba y derecha

      if(playerX===enemigoX&&playerY===enemigoY) this.enemigo.setEnemiesVelocity(0);


      
//movimientos normales
 if(playerY<enemigoY && ((playerX-rango_enemigo_movimiento<=enemigoX&&(playerX+rango_enemigo_movimiento)>=enemigoX))){
    //console.log("UP");
    //console.log("ESTOY EN MOV NORMAL -Y");
    this.enemigo.setVelocityY(-vel);
   if(!(this.dataEnemie.ofzigzag))
    this.enemigo.setVelocityX(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
 }else if(playerY>enemigoY && ((playerX-rango_enemigo_movimiento<=enemigoX&&(playerX+rango_enemigo_movimiento)>=enemigoX))){
     //console.log("DOWN");
    this.enemigo.setVelocityY(vel);
  if(!(this.dataEnemie.ofzigzag))
    this.enemigo.setVelocityX(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
     //console.log("ESTOY EN MOV NORMAL Y");
 }else if(((playerY-rango_enemigo_movimiento<=enemigoY&&(playerY+rango_enemigo_movimiento)>=enemigoY)) && playerX>enemigoX){
   //  console.log("LEFT");
  // console.log("ESTOY EN MOV NORMAL -X");
    this.enemigo.setVelocityX(vel);
    if(!(this.dataEnemie.ofzigzag))
    this.enemigo.setVelocityY(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
 }else if(((playerY-rango_enemigo_movimiento<=enemigoY&&(playerY+rango_enemigo_movimiento)>=enemigoY))&& playerX<enemigoX){
    // console.log("RIGHT");
    this.enemigo.setVelocityX(-vel);
  if(!(this.dataEnemie.ofzigzag))
    this.enemigo.setVelocityY(0);//para mayor dificultad deja la velocity de la dimension, ejemplo esta
     //console.log("ESTOY EN MOV NORMAL X");
 }
  else

  if(playerY<enemigoY&& playerX>enemigoX){
    // console.log("UP + RIGHT");

    this.enemigo.setVelocityY(-velocidadDiagonal);
   this.enemigo.setVelocityX(velocidadDiagonal);
  }

  
//player esta arriba e izquierda
  else if(playerY<enemigoY&& playerX<enemigoX){
   // console.log("UP + LEFT");
    this.enemigo.setVelocityY(-velocidadDiagonal);
    this.enemigo.setVelocityX(-velocidadDiagonal);
  }

  //player esta debajo e izquierda
  else if(playerY>enemigoY && playerX<enemigoX){
   // console.log("DOWN + LEFT");
    this.enemigo.setVelocityY(velocidadDiagonal);
    this.enemigo.setVelocityX(-velocidadDiagonal);
  }

  //player esta debajo y derecha
  else if(playerY>enemigoY && playerX>enemigoX){
     //console.log("DOWN + RIGHT");
     
    this.enemigo.setVelocityY(velocidadDiagonal);
    this.enemigo.setVelocityX(velocidadDiagonal);
  }
 
    }

    //console.log(`movimiento tiempo Real ENEMIGO X:${this.enemigo.x} Y:${this.enemigo.y}`);


    }

    setMuerteEnemigo(){
      
        this.enemigo.destroy();
    // this.container.destroy();
    }


}