import { armas } from "../items/DataItemsPotenciadores.js";

export class conjuntoArmas{

    constructor(){
        this.armas = armas.map(a => ({ ...a }));
    }

    setArmas(){


    }

    getArmas(){

        return this.armas;

    }
}