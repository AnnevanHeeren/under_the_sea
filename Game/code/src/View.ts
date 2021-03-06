abstract class View {

    protected canvas: HTMLCanvasElement;
    protected keyListener: KeyListener;

    protected audio : HTMLAudioElement;

    public constructor(canvas: HTMLCanvasElement) {

        //assigns file to audio
        this.audio = new Audio("assets/audio/song.mp3");

        this.canvas = canvas;

        this.keyListener = new KeyListener;

    }

    public isDone = (): boolean => {
        return false;
    }

    public isCollisionWithShark = (): boolean => {
        return false;
    }

    public isGameOver = (): boolean => {
        return false;
    }

    public reload = (): boolean => {
        return false;
    }

    public checkUserInput = () => {
        
    }

    public isTip = () => {
        return false;
    }


    /**
     * Empty so we can overwrite this with subclasses
     */
    public draw = (ctx: CanvasRenderingContext2D) => {

    }

    /**
     * Empty so we can overwrite this with subclasses
     */
    public move = () => {

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
        alignment: CanvasTextAlign = "center",
    ) {
        ctx.font = `${fontSize}px consolas`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * Makes music play when X is pressed by user
     */
    public music = () => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_X)) {
            this.playAudio();
            console.log("play audio");
        }
    }

    /**
     * plays audio
     */
    public playAudio = ()=> {
        this.audio.play();
    }

}