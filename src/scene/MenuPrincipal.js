export class MenuPrincipal extends Phaser.Scene{//cuando estamos en el menu Principal

constructor(){
    super('MenuPrincipal');
    console.log("Estoy en MenuPrincipal");
}

  preload(){
    console.log("Preload "+this.scene.key);
}

create(){
    console.log("Create "+this.scene.key);
}


}