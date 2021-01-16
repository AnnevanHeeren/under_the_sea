class Timer {
    
    public constructor(public counter = 1) {

        let intervalId = setInterval(() => {
            this.counter = this.counter + 1;
            // console.log(this.counter);

        }, 1000)
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        if(this.counter === 1){this.writeTextToCanvas(ctx, `Time: ${this.counter} second`, 1200, 50, 26, "#2d327c");}
        if(this.counter > 1){this.writeTextToCanvas(ctx, `Time: ${this.counter} seconds`, 1200, 50, 26, "#2d327c");}
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
    ctx.font = `${fontSize}px consolas`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
}

}