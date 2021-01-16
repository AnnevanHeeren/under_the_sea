/// <reference path="View.ts" />

class QuestionView extends View {

    private question: string;
    private question2: string;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.question = "";
        this.question2 = "";

        this.createQuestion();
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, `${this.question}`, this.canvas.width / 2, 110, 32, "#985629");
        this.writeTextToCanvas(ctx, `${this.question2}`, this.canvas.width / 2, 150, 32, "#985629");

        this.writeTextToCanvas(ctx, "YES", (this.canvas.width/4)*1.45, 370, 32, "#985629");
        this.writeTextToCanvas(ctx, "NO", (this.canvas.width/4)*2.45, 370, 32, "#985629");
    }

    private createQuestion() {
        const random = this.randomInteger(1, 1);
        if (random === 1) {
            this.question = "Hi! Would you like to make the level easier? If so I can do this for you!";
            this.question2 =  "I just need your full name and birthday! Will you do that for me?";
            // this.answer = "Yes";
        }

        if (random === 2) {
            this.question = "Helo Im donald trump";
            this.question2 = "";
            // this.answer = "Yes";
        }
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