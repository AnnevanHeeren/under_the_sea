/// <reference path="View.ts" />

class PlayingView extends View {

    // The player on the canvas
    private player: Player;

    // The obstacles on the canvas (Does this need to be here or in Levels???)
    private obstacles: Obstacle[];

    // Score
    private totalScore: number;

    // Current frame number
    private frameIndex: number;

    private collisionWithShark: string;

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // Set the player on the canvas (TODO: in the middle row)
        this.player = new Player(this.canvas);

        // Create obstacles
        this.obstacles = [];

        // Score is zero at the start
        this.totalScore = 0;

        // FrameIndex is also zero at the start
        this.frameIndex = 0;

        this.collisionWithShark = "";
    }

    //draws animation
    public draw = () => {
        
        this.frameIndex++;

        if (this.frameIndex % 40 === 0 && this.totalScore >= 0) {
            this.createObstacle();
        }
        
        this.player.move();

        this.obstacles.forEach(obstacle => {

            if (this.player.collidesWith(obstacle)) {
                this.totalScore += obstacle.getPoints();
                this.removeItemFromScoringObjects(obstacle);
            } else if (obstacle.collidesWithLeftSideCanvas()) {
                this.removeItemFromScoringObjects(obstacle);
            }

        });

        console.log(this.totalScore);
        
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "Tip: win the game!", this.canvas.width / 2, 50, 24, "#2d327c");

        this.drawScore(ctx);



        this.player.draw(ctx);

        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
        });
        
    }

    //moves obstacles from right to left
    public move = () => {
        this.obstacles.forEach(obstacle => {
            obstacle.move();
        });
    }

    /**
     * Draws the current score to the screen
     * @param ctx 
     */
    private drawScore = (ctx: CanvasRenderingContext2D) => {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, 130, 50, 26, "#2d327c");
    }

    //creates obstacles in array
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
     * Removes an item from the this.obstacles array.
     * Could also be written using a filter
     * @param item To be removed
     */
    private removeItemFromScoringObjects(item: Obstacle): void {
        const index = this.obstacles.indexOf(item);
        this.obstacles.splice(index, 1);
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
     *Checks if view should go to questionView
     */
    public isCollisionWithShark = (): boolean => {
        this.obstacles.some(obstacle => {
            if (this.player.collidesWith(obstacle) && obstacle.getName() === "shark" && this.totalScore >= 100) {
                console.log("caught shark"); 
                this.collisionWithShark = "yes";
            }
            return false;
        });
        return false;
    }

    /**
     * Checks if view is done
     */
    public isDone = (): boolean => {
        if (this.collisionWithShark === "yes") {
            this.collisionWithShark = "";
            return true;
        }
        return false;
    }
    
    /**
     * Checks if score is less than 0 
     */
    public isGameOver = (): boolean => {
        return this.totalScore < 0;
    }
}