class Game {
    
    // The canvas
    private canvas: HTMLCanvasElement;
    
    // The player on the canvas
    private player: Player;

    // The screen which should be displayed
    private currentScreen: View[];
    
    // The obstacles on the canvas (Does this need to be here or in Levels???)
    private obstacles: Obstacle[];

    // Score
    private totalScore: number;
   
    // Current frame number
    private frameIndex: number;
    
    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Create obstacles
        this.obstacles = [];

        // TODO Create a function which fills this array with the obstacles we want

        // The view that we need to display
        this.currentScreen = [];

        // TODO Somehow fill this array and make sure we show the right view when we need to.

        // Set the player on the canvas (TODO: in the middle row)
        this.player = new Player(this.canvas);

        // Score is zero at the start
        this.totalScore = 0;

        // FrameIndex is also zero at the start
        this.frameIndex = 0;

        // Start the animation
        console.log("Started the animation");
        requestAnimationFrame(this.step);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {

        this.frameIndex++;

        if(this.frameIndex % 100 === 0){
            this.createObstacle();
        }

        this.player.move();

        this.obstacles.forEach(obstacle => {
            obstacle.move();
            console.log(obstacle.getName());

            if (this.player.collidesWith(obstacle)) {
                this.totalScore += obstacle.getPoints();
                this.removeItemFromScoringObjects(obstacle);
            } else if (obstacle.collidesWithLeftSideCanvas()) {
                this.removeItemFromScoringObjects(obstacle);
            }

        });
        
        this.draw();
        
        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    /**
     * Render the items on the canvas
     */
    private draw() {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Tip: win the game!", this.canvas.width / 2, 50, 24, "#985629");

        this.drawScore(ctx);

        this.player.draw(ctx);

        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
            });
    }

    /**
     * Draws the current score to the screen
     * @param ctx 
     */
    private drawScore = (ctx: CanvasRenderingContext2D) => {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, 130, 50, 26, "black");
    }

    private createObstacle = () => {
        const random = this.randomInteger(1, 4);

        if (random === 1) {
            this.obstacles.push(new Spikes(this.canvas));
        }

        if (random === 2) {
            this.obstacles.push(new Rock(this.canvas));
        }

        if (random === 3) {
            this.obstacles.push(new Shark(this.canvas));
        }

        if (random === 4) {
            this.obstacles.push(new Fish(this.canvas));
        }
    }

    /**
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    private randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
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
     * Removes an item from the this.obstacles array.
     * Could also be written using a filter
     * @param item To be removed
     */
    private removeItemFromScoringObjects(item: Obstacle): void {
        const index = this.obstacles.indexOf(item);
        this.obstacles.splice(index, 1);
    }
}