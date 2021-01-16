/// <reference path="View.ts" />

class TipView extends View {


public constructor (canvas: HTMLCanvasElement) {
    super(canvas);
}

public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.writeTextToCanvas(ctx, "Wrong Answer | Game Over", (this.canvas.width/2), 150, 32, "#2d327c");
    this.writeTextToCanvas(ctx, "THIS IS NOT SAFE", (this.canvas.width/2), 200, 32, "#2d327c");
    this.writeTextToCanvas(ctx, "Never share your personal details with strangers or a game on the internet,", (this.canvas.width/2), 350, 32, "#2d327c");
    this.writeTextToCanvas(ctx, "it's none of their business!", (this.canvas.width/2), 390, 32, "#2d327c");

    this.writeTextToCanvas(ctx, "press the space bar to reload", (this.canvas.width/2), 450, 25, "#2d327c");

    ctx.drawImage(this.loadNewImage("assets/images/fish.png"), 200, 160);
    ctx.drawImage(this.loadNewImage("assets/images/seaweed(1).png"), 250, 560);
    ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 1100, 120);
}

    /**
     * 
     */
    public reload = (): boolean => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            console.log("key space")
            return true;
        }
        return false;
    }

}
