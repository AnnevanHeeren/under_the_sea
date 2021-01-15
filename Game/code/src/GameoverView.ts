/// <reference path="View.ts" />

class GameoverView extends View {

    public button: HTMLImageElement;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // //add an mouse event
        // document.addEventListener("click", this.mouseHandler);

        // this.button = this.loadNewImage("assets/images/button.png");

    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Game Over!", this.canvas.width / 2, 80, 32, "#985629");

        this.writeTextToCanvas(ctx, "Your total score went below 0!", this.canvas.width / 2, 160, 24, "#985629");
        this.writeTextToCanvas(ctx, "Press the space button to try again", this.canvas.width / 2, 240, 24, "#985629");

        ctx.drawImage(this.loadNewImage("assets/images/fish.png"), 200, 200);
        ctx.drawImage(this.loadNewImage("assets/images/image.png"), 800, 250);
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
    //         console.log("button clicked gameOver");
    //         new Game(document.getElementById('canvas'));
    //     }
    // }
}