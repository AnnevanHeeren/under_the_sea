/// <reference path="Obstacle.ts" />

class Spikes extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedSpike.png");
        this.points = -2;
        this.name = "spikes";
        //this.question = false;
    }
}