/// <reference path="Obstacle.ts" />

class Shark extends Obstacle {

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedShark.png");
        this.points = 0;
        this.name = "shark";
        //this.question = true;
    }

    private showQuestion() {
        prompt("This is a test");
    }
}