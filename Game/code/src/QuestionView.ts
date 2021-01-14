/// <reference path="View.ts" />

class QuestionView extends View {
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "This is the question view, not the game over view!", this.canvas.width / 2, 80, 32, "#985629");

    }
}