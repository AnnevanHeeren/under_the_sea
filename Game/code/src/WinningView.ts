/// <reference path="View.ts" />

class WinningView extends View {
    //empty

    public constructor(canvas : HTMLCanvasElement) {
        super(canvas) 

        
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "winning SCREEN", (this.canvas.width/4)*1.45, 370, 32, "#985629");
    }
}