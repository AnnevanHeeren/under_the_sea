/// <reference path="View.ts" />

class QuestionView extends View {

    //fist line of question
    private question: string;
    //second line of question so it fits on canvas
    private question2: string;

    //answer given by user
    private answer: string;
    
    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.question = "";
        this.question2 = "";

        this.answer = "";

        //creates question on screen
        this.createQuestion();
    }

    /**
     * draws question and images on screen
     * @param ctx 
     */
    public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, `${this.question}`, this.canvas.width / 2, 150, 32, "#2d327c");
        this.writeTextToCanvas(ctx, `${this.question2}`, this.canvas.width / 2, 190, 32, "#2d327c");

        this.writeTextToCanvas(ctx, "Press Y for YES", (this.canvas.width/4)*1.45, 370, 32, "#2d327c");
        this.writeTextToCanvas(ctx, "Press N for NO", (this.canvas.width/4)*2.45, 370, 32, "#2d327c");

        ctx.drawImage(this.loadNewImage("assets/images/seaweed(1).png"), 250, 560);
        ctx.drawImage(this.loadNewImage("assets/images/seaweed(1).png"), 850, 560);
        ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 900, 580);
        ctx.drawImage(this.loadNewImage("assets/images/resizedFish.png"), 200, 400);
        ctx.drawImage(this.loadNewImage("assets/images/seaweed(1).png"), 950, 560);
    }

    //generates question
    private createQuestion() {
        const random = this.randomInteger(1, 1);
        if (random === 1) {
            this.question = "Hi there! Can you send us all your personal details? Then we can send you a prize!";
            this.question2 =  "I just need your full name, age and adress! Will you do that for me?";
            // this.answer = "Yes";
        }
    }

    /**
     * Records user input
     */
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

    /**
     * Checks if answer is right to progress to win screen
     */
    public isDone = () => {
        if (this.answer === "No") {
            return true;
        }
        return false;
    }

    /**
     * checks if answer is wrong to progress to tip screen
     */
    public isTip = () => {
       if (this.answer === "Yes") {
           return true;
       }
       return false;
    }

   /**
    * Generates a random integer number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    private randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
    }
}