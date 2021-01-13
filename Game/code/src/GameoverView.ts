/// <reference path="View.ts" />

class GameoverView extends View {

    public button: HTMLImageElement;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // add an mouse event
        document.addEventListener("click", this.mouseHandler);

        this.button = this.loadNewImage("assets/images/button.png");

    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Game Over!", this.canvas.width / 2, 80, 32, "#985629");

        this.writeTextToCanvas(ctx, "Your total score went below 0!", this.canvas.width / 2, 160, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 200, 200);

        this.writeTextToCanvas(ctx, " +10 score", 380, 260, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/goodShark.png"), 200, 420);

        this.writeTextToCanvas(ctx, "= Question!", 380, 480, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/resizedRock.png"), 600, 200);

        this.writeTextToCanvas(ctx, " -5 score", 760, 260, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/rotatedspike.png"), 600, 420);

        this.writeTextToCanvas(ctx, " -2 score", 760, 480, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/button.png"), 950, 300);

        this.writeTextToCanvas(ctx, " TRY AGAIN", 1128, 372, 24, "#3486B8");
    }

    /**
     * Method to handle the mouse event
     * @param {MouseEvent} event - mouse event
     */
    public mouseHandler = (event: MouseEvent) => {
        console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

        if (
            event.clientX >= 965 &&
            event.clientX < 1285 + this.button.width &&
            event.clientY >= 320 &&
            event.clientY <= 420 + this.button.height
        ){
            console.log("button clicked");
            new Game(document.getElementById('canvas'));
        }
    }
}