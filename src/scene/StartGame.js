export class StartGame extends Phaser.Scene{

    constructor(){
        super('StartGame');
        console.log("Estoy en StartGame");

    }

    preload(){
    console.log("Preload "+this.scene.key);
}

create(){
    console.log("Create "+this.scene.key);
}

update(time, delta){
    console.log(delta);
}
}