export class FinPartida extends Phaser.Scene{ //cuando se termina la partida 

constructor(){
    super('FinPartida');
    console.log("Estoy en FinPartida")
}

init(data) {
  this.puntos = data.puntos;
  //this.vida = data.vida;
  this.mensaje = data.mensaje;
  console.log("Recibí puntos:", this.puntos);
  console.log("MENSAJE 2 "+this.mensaje);
}

cargarTextos(){

    this.gameOverText= this.add.text(16,16,'Game Over',{
        fontSize: '30px',
        fontFamily:"Arial",
        fill: '#fff'

    });
    this.gameOverText.setPosition(100,50);

    this.gamePuntos= this.add.text(16,16,'Puntos Acumulados: '+this.puntos,{
        fontSize: '20px',
        fontFamily:"Arial",
        fill: '#fff'

    });

    this.gamePuntos.setPosition(100,100);

    this.mensaje=this.add.text(16,16,this.mensaje,{
 fontSize: '50px',
        fontFamily:"Arial",
        fill: '#fff'
    });

    this.mensaje.setPosition(this.widthPantalla/2-(this.mensaje.width/2),this.heightPantalla/2-(this.mensaje.height/2));



}

  preload(){
    this.widthPantalla=this.sys.game.config.width;
    this.heightPantalla=this.sys.game.config.height;
    console.log("Preload "+this.scene.key);
}

create(){
    console.log("Create "+this.scene.key);
    this.cargarTextos();
}


}