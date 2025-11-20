export class MenuPrincipal extends Phaser.Scene{//cuando estamos en el menu Principal

constructor(){
    super('MenuPrincipal');
    //console.log("Estoy en MenuPrincipal");
}

//HUD 

bStart(){



  
    //console.log(this.scene);
  

document.fonts.ready.then(() => {

  this.boton = this.add.text((this.widthPantalla)/2, this.heightPantalla/2, 'Iniciar', {
  fontSize: '32px',
  fill: '#000',
  backgroundColor: '#79E136',
  padding: { x: 80, y: 30 },
  fontFamily:this.fontText
})
.setInteractive()
.on('pointerdown', () => {
  
  this.scene.start('StartGame');

  //this.musica.pause();


});

this.boton.setPosition(((this.widthPantalla)/2)-this.boton.width/2,(this.heightPantalla/2)-this.boton.height/2);


this.tweens.add({
  targets: this.boton,
  scaleX: this.boton.scaleX * 1.1,
  scaleY: this.boton.scaleY * 1.1,
  duration: 1000,
  yoyo: true,
  repeat: -1
});

//
});





}



  preload(){
    this.load.image("imagenFondo","./assets/fondoMain.png");
    this.load.image("titulo","./assets/tituloMain.png");
    this.load.audio('musicaFondo','./sounds/menu.mp3');
    this.fontText='FontArcade3'
    this.widthPantalla=this.sys.game.config.width;
    this.heightPantalla=this.sys.game.config.height;
    //console.log("Preload "+this.scene.key);
}




create(){
   // console.log("Create "+this.scene.key);
   

    this.scale.resize(this.widthPantalla,this.heightPantalla);


    this.fondo = this.add.image(0, 0, 'imagenFondo').setOrigin(0,0)
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



this.titulo=this.add.image(0,0,'titulo').setOrigin(0)
//
// .setDisplaySize(this.widthPantalla,150)
.setScale(0.1,0.1);
;
this.titulo.setPosition((this.widthPantalla/2)-(this.titulo.displayWidth/2),0);
/*
this.tweens.add({
  targets: this.titulo,
  scaleX: this.titulo.scaleX * 1.1,
  scaleY: this.titulo.scaleY * 1.1,
  duration: 1500,
  yoyo: true,
  repeat: -1
});*/




 this.bStart();

   this.musica = this.sound.add('musicaFondo', {
    loop: true,
    volume: 0.5   // volumen entre 0 y 1
  });

  this.musica.play();
}


}