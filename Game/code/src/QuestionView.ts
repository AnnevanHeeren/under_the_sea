/// <reference path="View.ts" />

class QuestionView extends View {

    private question: string;
    private question2: string;

    private answer: string;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.question = "";
        this.question2 = "";

        this.answer = "";

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
            this.question = "Hi there! Can you send us all your personal details? Then we can send you a prize!";
            this.question2 =  "I just need your full name, age and adress! Will you do that for me?";
            // this.answer = "Yes";
        }

        // if (random === 2) {
        //     this.question = "Helo Im donald trump";
        //     this.question2 = "";
        //     // this.answer = "Yes";
        // }
    }

    public checkUserInput = () => {
        if (this.keyListener.isKeyDown(KeyListener.KEY_Y)) {
            this.answer = "Yes";
            console.log("Yes");
            
        }

        if (this.keyListener.isKeyDown(KeyListener.KEY_N)) {
            this.answer = "No";
            console.log(this.answer);
        }

    }

    public isDone = () => {
        if (this.answer === "No") {
            return true;
        }
        return false;
    }

    public isTip = () => {
       if (this.answer === "Yes") {
           return true;
       }
       return false;
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