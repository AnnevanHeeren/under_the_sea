/// <reference path="View.ts" />

class StartingView extends View {
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    public draw = (ctx : CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Title screen", this.canvas.width / 2, 80, 32, "#985629");
    }

    public isDone = (): boolean => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            return true;
        }

        return false;
    }
}