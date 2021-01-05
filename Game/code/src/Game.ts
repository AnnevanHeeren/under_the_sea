class Game{
    
    // The canvas
    private canvas: HTMLCanvasElement;
    private frameIndex: number;
    private levels: Levels[];
    private currentLevel: number;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

         // Create level
         this.levels = [
            new Level1(this.canvas),
            new Level2(this.canvas),
            new Level3(this.canvas),
        ];
    }

    
}