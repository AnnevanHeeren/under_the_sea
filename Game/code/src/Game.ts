class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    // The screen which should be displayed
    private view: View[];

    private currentView: number;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.currentView = 0;

        // The view that we need to display
        this.view = [];

        // TODO Somehow fill this array and make sure we show the right view when we need to.
        this.view.push(new StartingView(this.canvas));
        this.view.push(new PlayingView(this.canvas));
        this.view.push(new QuestionView(this.canvas));
        this.view.push(new GameoverView(this.canvas));

        this.step();
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {

        this.move();

        this.view[this.currentView].isCollisionWithShark()

        if (this.view[this.currentView].isDone()) {
            this.currentView++;
            console.log("plus currentview");
        }

        if(this.view[this.currentView].isGameOver()) {
            //console.log("game over");
            this.currentView = 3;
        }

        if (this.view[this.currentView].reload()) {
            location.reload();
        }

        this.draw();
        
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    /**
     * Render the items on the canvas
     */
    private draw() {
        
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        //console.log("drawing view");
        this.view[this.currentView].draw(ctx);
    }


    /**
     * Move the items on the canvas
     */
    public move() {
        this.view[this.currentView].move();
    }
    
    /**
    * Writes text to the canvas
    * @param {string} text - Text to write
    * @param {number} fontSize - Font size in pixels
    * @param {number} xCoordinate - Horizontal coordinate in pixels
    * @param {number} yCoordinate - Vertical coordinate in pixels
    * @param {string} alignment - Where to align the text
    * @param {string} color - The color of the text
    */
    public writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        xCoordinate: number,
        yCoordinate: number,
        fontSize: number = 20,
        color: string = "red",
        alignment: CanvasTextAlign = "center"
    ) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    public loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}