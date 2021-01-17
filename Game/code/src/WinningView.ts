/// <reference path="View.ts" />

class WinningView extends View {

    public constructor(canvas : HTMLCanvasElement) {
        super(canvas);
    }

    /**
     * draws winning screen
     * @param ctx 
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.drawImage(this.loadNewImage("assets/images/sky.jpg"), -100, -80);

        this.writeTextToCanvas(ctx, "Congratulations! You brought foxy to the beach!", (this.canvas.width/4)*2.45, 250, 32, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/beach.png"), 0, 220);

        ctx.drawImage(this.loadNewImage("assets/images/playerMirrored.gif"), 220, 495);
    }
}