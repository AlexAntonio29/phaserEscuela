import { Items } from "./Items.js";

export class itemTiempo extends Items{


    constructor(scene,id=1,categoria="",width=20,height=20,x=0,y=0,textura="reloj"){

        super(scene,id,categoria,width,height,x,y,textura);

        /*

        this.sprite=this.getGraphics();
        console.log("Sprite items Reloj: "+this.sprite);

       this.sprite.setTexture("reloj");
       this.sprite.setDisplaySize(40,40).setOrigin(0.5, 0.5);

       this.container=this.getContainer();
       this.container.body.setSize(40,40);*/

    }
}