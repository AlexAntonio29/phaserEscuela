export class MenuPrincipal extends Phaser.Scene{//cuando estamos en el menu Principal

constructor(){
    super('MenuPrincipal');
    console.log("Estoy en MenuPrincipal");
}

//HUD 

bStart(){
    console.log(this.scene);
    const boton = this.add.text((this.widthPantalla)/2, this.heightPantalla/2, 'Iniciar', {
  fontSize: '32px',
  fill: '#000',
  backgroundColor: '#fff',
  padding: { x: 10, y: 5 }
})
.setInteractive()
.on('pointerdown', () => {
  console.log('Botón presionado');
  this.scene.start('StartGame');
});

boton.setPosition(((this.widthPantalla)/2)-boton.width/2,(this.heightPantalla/2)-boton.height/2)
}



  preload(){
    this.widthPantalla=this.sys.game.config.width;
    this.heightPantalla=this.sys.game.config.height;
    console.log("Preload "+this.scene.key);
}

create(){
    console.log("Create "+this.scene.key);
    this.bStart();

    this.scale.resize(this.widthPantalla,this.heightPantalla);
}


}