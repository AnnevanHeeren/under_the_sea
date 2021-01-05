abstract class Levels {
    
    // The canvas
    private canvas: HTMLCanvasElement;
    
    // The player in the level
    private player: Player;

    // The obstacles in the level
    private obstacles: Obstacle[];

    // Score
    private score: number;

    // The rate at which the objects spawn (Not the questions though?)
    private spawnRate: number;

    // Check if they answered all questions
    private allQuestionsAnswered: boolean;
    
    public constructor(canvas: HTMLCanvasElement, spawnRate: number) {
        this.canvas = canvas;
        
        // Score is zero at the start
        this.score = 0;

        // Spawnrate of the obstacles
        this.spawnRate = spawnRate;

        // At the start no question have been answered
        this.allQuestionsAnswered = false;
    }

    // public update(frame: number) {
    //     if(frame % this.spawnRate === 0) {
    //         this.createRandomScoringObject();
    //     }
    //     this.draw();
    // }

    private isCompleted(): boolean {
        if (this.allQuestionsAnswered = true) {
            return true;
        } else {
            return false;
            }
        }

    // private draw(): void {
    //     const ctx = this.canvas.getContext('2d');
    //     // Clear the entire canvas
    //     ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //     this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);

    //     this.writeTextToCanvas(ctx, Score: `${this.score}`, this.canvas.width / 2, 80, 16);

    //     this.player.draw(ctx);
    //     //ctx.canvas.innerHTML.
        
    //     // Could also be a regular for loop
    //     this.scoringObjects.forEach(scoringObject => {
    //         scoringObject.draw(ctx);
    //     });
    // }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    // private writeTextToCanvas(
    //     ctx: CanvasRenderingContext2D,
    //     text: string,
    //     xCoordinate: number,
    //     yCoordinate: number,
    //     fontSize: number = 20,
    //     color: string = "red",
    //     alignment: CanvasTextAlign = "center"

    // ) {
    //     ctx.font = `${fontSize}px sans-serif`;
    //     ctx.fillStyle = color;
    //     ctx.textAlign = alignment;
    //     ctx.fillText(text, xCoordinate, yCoordinate);
    //    // ctx.canvas.style.color = "green";
    // }

    // /*
    // * Generates a random integer number between min and max
    // *
    // * @param {number} min - minimal time
    // * @param {number} max - maximal time
    // */
    // private randomInteger(min: number, max: number): number {
    //     return Math.round(Math.random() * (max - min) + min);
    // }
}
