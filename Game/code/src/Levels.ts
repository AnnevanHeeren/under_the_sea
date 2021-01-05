abstract class Levels{
    private canvas: HTMLCanvasElement;
    private player: Player;
    private scoreToProgress: number;
    private score: number;
    private spawnRate: number;
    private scoringObjects: Obstacle[];

    public constructor(canvas: HTMLCanvasElement, 
                       scoreToProgress: number, 
                       spawnRate: number) {
        this.canvas = canvas;
        this.score = 0;
        this.scoreToProgress = scoreToProgress;
        this.spawnRate = spawnRate;
    }

    public update(frame: number) {
        if(frame % this.spawnRate === 0) {
            this.createRandomScoringObject();
        }
        this.move();
        this.draw();
    }

    step = () => {

        this.frameIndex++;

        if (this.levels[this.currentLevel].isCompleted()) {
            // TODO fix bug where currentLevel is higher than the length of this.levels
            this.currentLevel++;
            this.frameIndex = 1;

        }

        this.levels[this.currentLevel].update(this.frameIndex);

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    public isCompleted():boolean {
        return this.score >= this.scoreToProgress;
    }

    private move(): void {
        this.player.move();

        // Could also be a regular for loop
        this.scoringObjects.forEach(scoringObject => {
            scoringObject.move();

            if (this.player.collidesWith(scoringObject)) {
                this.score += scoringObject.getPoints();
                this.removeItemFromScoringObjects(scoringObject);
            } else if (scoringObject.collidesWithCanvasBottom()) {
                this.removeItemFromScoringObjects(scoringObject);
            }
        });
    }

    private draw(): void {
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);

        this.writeTextToCanvas(ctx, Score: `${this.score}`, this.canvas.width / 2, 80, 16);

        this.player.draw(ctx);
        //ctx.canvas.innerHTML.
        // Could also be a regular for loop
        this.scoringObjects.forEach(scoringObject => {
            scoringObject.draw(ctx);
        });
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
    private writeTextToCanvas(
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
       // ctx.canvas.style.color = "green";
    }

    /*
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    private randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /*
     * Removes an item from the this.scoringObjects array.
     * Could also be written using a filter
     * @param item To be removed
     */
    private removeItemFromScoringObjects(item: Obstacle): void {
        const index = this.scoringObjects.indexOf(item);
        this.scoringObjects.splice(index, 1);
    }

    /**
     * Create a random scoring object and clear the other scoring objects by setting them to null.
     */
    private createRandomScoringObject(): void {
        const random = this.randomInteger(1, 4);

        if (random === 1) {
            this.scoringObjects.push(new Rock(this.canvas));
        }

        if (random === 2) {
            this.scoringObjects.push(new Spikes(this.canvas));
        }

        if (random === 3) {
            this.scoringObjects.push(new Jellyfish(this.canvas));
        }

        if (random === 4) {
            this.scoringObjects.push(new Shark(this.canvas));
        }
    }
}
