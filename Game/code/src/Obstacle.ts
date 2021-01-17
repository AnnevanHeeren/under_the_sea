class Obstacle {
    
    // The canvas
    private canvas: HTMLCanvasElement;

    // The 3 lanes the obstacles can spawn in
    private topLane: number;
    private middleLane: number;
    private bottomLane: number;

    // An image of the object
    protected image: HTMLImageElement;
    
    // The starting X and Y positions of the object and the speed at which it travels
    private positionX: number;
    private positionY: number;
    private speed: number;

    // The name of the obstacle
    protected name: string;
    
    // The points an object is worth
    protected points: number;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.topLane = this.canvas.height / 4;
        this.middleLane = this.canvas.height / 2;
        this.bottomLane = this.canvas.height / 4 * 3;

        //spawns obstacles on random lanes
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionY = this.topLane;
        }
        if (random === 2) {
            this.positionY = this.middleLane;
        }
        if (random === 3) {
            this.positionY = this.bottomLane;
        }

        this.positionX = 1500;
        this.speed = 10;
    }

    /**
     * Moves the object to the left of the screen according to the object's speed
     */
    public move() {
        this.positionX -= this.speed;
    }

    /**
     * Renders the objects
     * @param ctx The CanvasRenderingContext2D of the canvas to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionX - this.image.width,
            this.positionY - this.image.width / 2
        );
    }

    /**
     * Returns true if the object collides with the left side of the canvas. False if it
     * does not collide.
     */
    public collidesWithLeftSideCanvas(): boolean {
        if (this.positionX < 0) {
            return true;
        }

        return false;
    }

    public getPositionX = () => {
        return this.positionX;
    }

    public getPositionY = () => {
        return this.positionY;
    }

    public getImageHeight = () => {
        return this.image.height;
    }

    public getImageWidth = () => {
        return this.image.width;
    }

    public getPoints = () => {
        return this.points;
    }

    public getName = () => {
        return this.name;
    }

    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    protected loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
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
}