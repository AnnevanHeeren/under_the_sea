class Player {
    
    // The canvas
    private canvas: HTMLCanvasElement;
    
    // The 3 lanes the player can be in
    private topLane: number;
    private middleLane: number;
    private bottomLane: number;

    // Keylistener so you can move the player
    private keyListener: KeyListener;
    
    // The image of the player
    private image: HTMLImageElement;
    
    // The position of the player on the canvas
    private positionY: number;
    private positionX: number;
    
    // Not sure about these 3 properties yet!
    private hearts: number;
    private score: number;
    private bubble: number;
    
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.topLane = this.canvas.height / 4;
        this.middleLane = this.canvas.height / 2;
        this.bottomLane = this.canvas.height / 4 * 3;
        
        this.keyListener = new KeyListener;
        
        this.image = this.loadNewImage("./assets/images/smallerPlayer.gif");
        this.positionY = this.canvas.height / 2;
        this.positionX = this.canvas.width -1500;
    }

    /**
     * Be able to move the player between the 3 lanes
     */
    public move = () => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionY !== this.topLane) {
            this.positionY = this.topLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionY !== this.middleLane) {
            this.positionY = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN) && this.positionY !== this.bottomLane) {
            this.positionY = this.bottomLane;
        }

        //console.log(this.positionY);
    }
    
    /**
     * Draw the player to the canvas
     * @param ctx 
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(
            this.image,
            this.canvas.width - 1500,
            // Center the image in the lane with the y coordinates
            this.positionY - this.image.width / 2
        );
    }

    /**
     * Collision detection of a scoring object and player
     * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
     */
    public collidesWith(obstacle: Obstacle): boolean {
        if (this.positionX < obstacle.getPositionX() + obstacle.getImageWidth()
            && this.positionX + this.image.width > obstacle.getPositionX()
            && this.positionY < obstacle.getPositionY() + obstacle.getImageHeight() 
            && this.positionY + this.image.height > obstacle.getPositionY()
        ) {
            return true;
        }

        return false;
    }

    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
  //hello mic check
}
