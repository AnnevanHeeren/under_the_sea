/// <reference path="Obstacle.ts" />

class Rock extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedRock.png");
        this.points = -5;
        this.name = "rock";
        //this.question = false;
    }
}