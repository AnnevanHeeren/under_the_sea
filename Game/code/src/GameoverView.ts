/// <reference path="View.ts" />

class GameoverView extends View {

    public button: HTMLImageElement;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    /**
     * Draws images and text to gameover screen
     * @param ctx 
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Game Over!", this.canvas.width / 2, 140, 32, "#2d327c");
        this.writeTextToCanvas(ctx, "Press the space bar to try again", this.canvas.width / 2, 240, 24, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/fish.png"), 200, 200);
        ctx.drawImage(this.loadNewImage("assets/images/image.png"), 800, 250);
        ctx.drawImage(this.loadNewImage("assets/images/seaweed(1).png"), 250, 560);
        ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 1100, 120);
    }

    /**
     * reloads screen if space bar is pressed
     */
    public reload = (): boolean => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            console.log("key space");
            return true;
        }
        return false;
    }

}