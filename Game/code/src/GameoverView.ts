/// <reference path="View.ts" />

class GameoverView extends View {

    public button: HTMLImageElement;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // add an mouse event
        // document.addEventListener("click", this.mouseHandler);

        this.button = this.loadNewImage("assets/images/button.png");

    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Game Over!", this.canvas.width / 2, 80, 32, "#985629");

        this.writeTextToCanvas(ctx, "Your total score went below 0!", this.canvas.width / 2, 160, 24, "#985629");
    }

    // /**
    //  * Method to handle the mouse event
    //  * @param {MouseEvent} event - mouse event
    //  */
    // public mouseHandler = (event: MouseEvent) => {
    //     console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

    //     if (
    //         event.clientX >= 965 &&
    //         event.clientX < 1285 + this.button.width &&
    //         event.clientY >= 320 &&
    //         event.clientY <= 420 + this.button.height
    //     ){
    //         console.log("button clicked");
    //         new Game(document.getElementById('canvas'));
    //     }
    // }
}