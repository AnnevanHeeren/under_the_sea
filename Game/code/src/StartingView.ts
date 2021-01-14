/// <reference path="View.ts" />

class StartingView extends View {
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    public draw = (ctx : CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Under the Sea", this.canvas.width / 2, 80, 52, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 200, 200);

        this.writeTextToCanvas(ctx, " +10 score", 380, 260, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/goodShark.png"), 200, 420);

        this.writeTextToCanvas(ctx, "= Question!", 380, 480, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/resizedRock.png"), 600, 200);

        this.writeTextToCanvas(ctx, " -5 score", 760, 260, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/rotatedspike.png"), 600, 420);

        this.writeTextToCanvas(ctx, " -2 score", 760, 480, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/button.png"), 950, 300);

        this.writeTextToCanvas(ctx, " START!", 1128, 372, 24, "#3486B8");

        ctx.drawImage(this.loadNewImage("assets/images/player.gif"), 1250, 350);
    }

    public isDone = (): boolean => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            return true;
        }

        return false;
    }
}