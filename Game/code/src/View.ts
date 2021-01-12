abstract class View {

    private canvas: HTMLCanvasElement;
    private keyListener: KeyListener;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.keyListener = new KeyListener;
    }

    public isDone(): boolean {
        return true;
    }

}