/// <reference path="Obstacle.ts" />

class Shark extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/goodShark.png");
        this.points = 2;
        this.name = "shark";
    }
}