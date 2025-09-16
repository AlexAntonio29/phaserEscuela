export class FinPartida extends Phaser.Scene{

constructor(){
    super('FinPartida');
    console.log("Estoy en FinPartida")
}

  preload(){
    console.log("Preload "+this.scene.key);
}

create(){
    console.log("Create "+this.scene.key);
}


}