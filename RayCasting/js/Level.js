import { Rayo } from "./Rayo.js";

var pared = 1;
var suelo = 0;
var colorPared = 'black';
var colorSuelo = 'gray';   
export class Level {


    constructor(can, con, arr) {
        this.canvas = can;
        this.ctx = con;
        this.matriz = arr;

        //dimensiones matriz
        this.altoM  = this.matriz.length;
        this.anchoM = this.matriz[0].length;

        //dimensiones del canvas
        this.altoC  = this.canvas.height;
        this.anchoC = this.canvas.width;

        //dimensiones del tile
        this.altoT  =  parseInt(this.altoC/this.altoM);
        this.anchoT =  parseInt(this.anchoC/this.anchoM);
    }

    colision(x,y){
        return this.matriz[y][x]!=0;
    }

    dibuja(){
        var color;

        for (let y = 0; y < this.altoM; y++) {
            for (let x = 0; x < this.anchoM; x++) {
                if (this.matriz[y][x]== 1) {
                    color = colorPared;
                } else {
                    color = colorSuelo;
                }
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x*this.anchoT, y*this.altoT, this.anchoT, this.altoT);
            }
            
        }
    }
}