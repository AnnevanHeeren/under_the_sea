/// <reference path="Obstacle.ts" />

class Jellyfish extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/jellyfish.png");
        this.points = 5;
        //this.question = true;
    }
}