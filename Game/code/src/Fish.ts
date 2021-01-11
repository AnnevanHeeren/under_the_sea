/// <reference path="Obstacle.ts" />

class Fish extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedFish.png");
        this.points = 10;
        //this.question = false;
    }
}