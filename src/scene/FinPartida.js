export class FinPartida extends Phaser.Scene{ //cuando se termina la partida 

constructor(){
    super('FinPartida');
    //console.log("Estoy en FinPartida")
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
        fontFamily:this.fontText,
        fill: '#fff'

    });
    this.gameOverText.setPosition(100,50);

    this.gamePuntos= this.add.text(16,16,'Puntos Acumulados: '+this.puntos,{
        fontSize: '20px',
        fontFamily:this.fontText,
        fill: '#fff'

    });

    this.gamePuntos.setPosition(100,100);

    this.mensaje=this.add.text(16,16,this.mensaje,{
 fontSize: '50px',
        fontFamily:this.fontText,
        fill: '#fff'
    });

    this.mensaje.setPosition(this.widthPantalla/2-(this.mensaje.width/2),this.heightPantalla/2-(this.mensaje.height/2));



}

  preload(){
    this.fontText='FontArcade3'
    this.widthPantalla=this.sys.game.config.width;
    this.heightPantalla=this.sys.game.config.height;
    console.log("Preload "+this.scene.key);
    this.load.image("imagenFondoEnd","./assets/fondoEnd.png");
    this.load.audio('musicaFondoEnd','./sounds/fondoEceneEnd.mp3');
    //fondoEceneEnd
}

cargarFondo(){
        this.fondo = this.add.image(0, 0, 'imagenFondoEnd').setOrigin(0,0)
    .setDisplaySize(this.widthPantalla*1.5,this.heightPantalla);

    if(this.widthPantalla<this.heightPantalla){
      this.fondo.setDisplaySize(this.widthPantalla*2.5,this.heightPantalla);
    }

    

    let desplazamientoFondo=((this.fondo.displayWidth)-(this.widthPantalla));
    

// Tween que lo mueve a la derecha y luego regresa
this.tweens.add({
  targets: this.fondo,
  x: -desplazamientoFondo, // desplaza hacia la izquierda para simular movimiento a la derecha
  duration: 20000,
  yoyo: true, // regresa al punto inicial
  repeat: -1, // infinito
  ease: 'Sine.easeInOut'
});
}

create(){
    console.log("Create "+this.scene.key);
    this.cargarFondo();
    this.cargarTextos();

    this.musica = this.sound.add('musicaFondoEnd', {
    loop: true,
    volume: 0.5   // volumen entre 0 y 1
  });
  this.musica.play();

  this.cargarBotonReiniciar();
  this.cargarBotonMenu();
    
}

cargarBotonReiniciar(){
    
document.fonts.ready.then(() => {

  this.botonRestart = this.add.text((this.widthPantalla)/2, this.heightPantalla/2, 'Reiniciar', {
  fontSize: '32px',
  fill: '#000',
  backgroundColor: '#fff',
  padding: { x: 80, y: 10 },
  fontFamily:this.fontText
})
.setInteractive()
.on('pointerdown', () => {

  
  
  this.scene.start('StartGame');

  this.musica.stop();


});

this.botonRestart.setPosition(this.widthPantalla/2-this.botonRestart.width/2,this.mensaje.y+this.mensaje.height+10);


this.tweens.add({
  targets: this.botonRestart,
  scaleX: this.botonRestart.scaleX * 1.1,
  scaleY: this.botonRestart.scaleY * 1.1,
  duration: 1000,
  yoyo: true,
  repeat: -1
});

//
});
}

cargarBotonMenu(){

document.fonts.ready.then(() => {

  this.botonMenu = this.add.text((this.widthPantalla)/2, this.heightPantalla/2, 'Menu', {
  fontSize: '32px',
  fill: '#000',
  backgroundColor: '#fff',
  padding: { x: 110, y: 10 },
  fontFamily:this.fontText
})
.setInteractive()
.on('pointerdown', () => {
  
  this.scene.start('MenuPrincipal');

  this.musica.stop();


});

this.botonMenu.setPosition(this.widthPantalla/2-this.botonMenu.width/2,this.botonRestart.y+this.botonRestart.height+10);


this.tweens.add({
  targets: this.botonMenu,
  scaleX: this.botonMenu.scaleX * 1.1,
  scaleY: this.botonMenu.scaleY * 1.1,
  duration: 1000,
  yoyo: true,
  repeat: -1
});

//
});
    
}


}