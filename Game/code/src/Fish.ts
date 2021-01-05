/// <reference path="Obstacle.ts" />

class Fish extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/fish.png");
        this.points = 5;
        //this.question = false;
    }
}