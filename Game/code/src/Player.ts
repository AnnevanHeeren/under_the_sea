class Player {
    
    private hearts: number;
    private score: number;
    private bubble: number;
    
    // The image of the player
    private image: HTMLImageElement;
    
    // The position of the player on the canvas
    private positionY: number;

    // The canvas
    private canvas: HTMLCanvasElement;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.hearts = 3;
        this.score = 0;
        this.bubble = 100;
        
        this.image = this.loadNewImage("./assets/images/player.gif");
        this.positionY = this.canvas.height / 2;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionY - this.image.width / 2,
            this.canvas.height - 150
        );
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
}
