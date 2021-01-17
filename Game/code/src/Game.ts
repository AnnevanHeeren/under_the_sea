class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    // The screen which should be displayed
    private view: View[];

    //the view currently on screen
    public currentView: number;

    //rate at which the timer goes up in seconds
    public counter: number;

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
        this.view.push(new WinningView(this.canvas));
        this.view.push(new GameoverView(this.canvas));
        this.view.push(new TipView(this.canvas));

        this.step();

        this.counter = 1;

        //timer counting in seconds
        let intervalId = setInterval(() => {
            if(this.currentView === 1){
                this.counter = this.counter + 1;}
        }, 1000)
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {

        //plays audio
        this.view[this.currentView].music();

        //moves items on screen
        this.move();

        //checks if object collision is shark
        this.view[this.currentView].isCollisionWithShark()

        //checks if screen should go to the next one in the array
        if (this.view[this.currentView].isDone()) {
            this.currentView++;
            console.log("plus currentview");
        }

        //checks if its game over
        if(this.view[this.currentView].isGameOver()) {
            console.log("game over");
            this.currentView = 4;
        }

        //reloads screen
        if (this.view[this.currentView].reload()) {
            location.reload();
        }

         this.draw();

         //checks user answer in questionView
        this.view[this.currentView].checkUserInput();

        //screen goes to the false answer screen
        if (this.view[this.currentView].isTip()) {
            this.currentView = 5;
        }
        
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    /**
     * Render the items on the canvas
     */
    private draw() {
        
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');

        //draws screen
        this.view[this.currentView].draw(ctx);

        //puts timer on the playing screen
        this.drawTimer(ctx);

    }

    /**
     * Method to draw timer on playing screen
     * @param ctx 
     */
    public drawTimer = (ctx: CanvasRenderingContext2D) => {
        if(this.currentView === 1){
        if(this.counter === 1){this.writeTextToCanvas(ctx, `Time: ${this.counter} second`, 1200, 50, 26, "#2d327c");}
        if(this.counter > 1){this.writeTextToCanvas(ctx, `Time: ${this.counter} seconds`, 1200, 50, 26, "#2d327c");}
        }
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
        color: string = "#2d327c",
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