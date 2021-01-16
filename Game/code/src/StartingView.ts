/// <reference path="View.ts" />

class StartingView extends View {

    private button: HTMLImageElement;
    
    private buttonClicked: number;

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // add an mouse event
        document.addEventListener("click", this.mouseHandler);

        this.button = this.loadNewImage("assets/images/button.png");
        this.buttonClicked = 0;
    }

    public draw = (ctx : CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Under the Sea", this.canvas.width / 2, 80, 52, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 200, 200);

        this.writeTextToCanvas(ctx, " +10 score", 380, 260, 24, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/goodShark.png"), 200, 420);

        this.writeTextToCanvas(ctx, " +2 score", 380, 480, 24, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/resizedRock.png"), 600, 200);

        this.writeTextToCanvas(ctx, " -5 score", 760, 260, 24, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/rotatedspike.png"), 600, 420);

        this.writeTextToCanvas(ctx, "     = Game Over!", 760, 480, 24, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/button.png"), 950, 300);

        this.writeTextToCanvas(ctx, " START!", 1128, 372, 24, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/player.gif"), 1250, 350);

        this.writeTextToCanvas(ctx, "Score a 100 points and then catch a shark to win the game!",this.canvas.width / 2, 160, 24, "#2d327c");

        this.writeTextToCanvas(ctx, "All icons taken from www.flaticon.com" ,180, 700, 16, "#2d327c");

        this.writeTextToCanvas(ctx, "Press X to turn music on/off" ,480, 700, 16, "#2d327c");
    }


    /**
     * 
     */
    public isDone = (): boolean => {
        if (this.buttonClicked > 0) {
            return true;
        }
        return false;
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
            console.log("clicked");
            this.buttonClicked++;
        }
    }
}