class Obstacle {
    constructor(canvas) {
        this.getPositionX = () => {
            return this.positionX;
        };
        this.getPositionY = () => {
            return this.positionY;
        };
        this.getImageHeight = () => {
            return this.image.height;
        };
        this.getImageWidth = () => {
            return this.image.width;
        };
        this.getPoints = () => {
            return this.points;
        };
        this.getName = () => {
            return this.name;
        };
        this.canvas = canvas;
        this.topLane = this.canvas.height / 4;
        this.middleLane = this.canvas.height / 2;
        this.bottomLane = this.canvas.height / 4 * 3;
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
    move() {
        this.positionX -= this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width, this.positionY - this.image.width / 2);
    }
    collidesWithLeftSideCanvas() {
        if (this.positionX < 0) {
            return true;
        }
        return false;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Fish extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/goodFish.png");
        this.points = 10;
        this.name = "fish";
    }
}
class Game {
    constructor(canvas) {
        this.step = () => {
            this.move();
            this.view[this.currentView].isCollisionWithShark();
            if (this.view[this.currentView].isDone()) {
                this.currentView++;
                console.log("plus currentview");
            }
            if (this.view[this.currentView].isGameOver()) {
                this.currentView = 4;
            }
            if (this.view[this.currentView].reload()) {
                location.reload();
            }
            this.draw();
            this.view[this.currentView].checkUserInput();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.currentView = 0;
        this.view = [];
        this.view.push(new StartingView(this.canvas));
        this.view.push(new PlayingView(this.canvas));
        this.view.push(new QuestionView(this.canvas));
        this.view.push(new WinningView(this.canvas));
        this.view.push(new GameoverView(this.canvas));
        this.view.push(new TipView(this.canvas));
        this.step();
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        this.view[this.currentView].draw(ctx);
    }
    move() {
        this.view[this.currentView].move();
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class View {
    constructor(canvas) {
        this.isDone = () => {
            return false;
        };
        this.isCollisionWithShark = () => {
            return false;
        };
        this.isGameOver = () => {
            return false;
        };
        this.reload = () => {
            return false;
        };
        this.checkUserInput = () => {
        };
        this.isTip = () => {
            return false;
        };
        this.draw = (ctx) => { };
        this.move = () => { };
        this.canvas = canvas;
        this.keyListener = new KeyListener;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px consolas`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class GameoverView extends View {
    constructor(canvas) {
        super(canvas);
        this.draw = (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, "Game Over!", this.canvas.width / 2, 80, 32, "#985629");
            this.writeTextToCanvas(ctx, "Your total score went below 0!", this.canvas.width / 2, 160, 24, "#985629");
            this.writeTextToCanvas(ctx, "Press the space button to try again", this.canvas.width / 2, 240, 24, "#985629");
            ctx.drawImage(this.loadNewImage("assets/images/fish.png"), 200, 200);
            ctx.drawImage(this.loadNewImage("assets/images/image.png"), 800, 250);
            ctx.drawImage(this.loadNewImage("assets/images/seaweed(1).png"), 250, 560);
            ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 1100, 120);
        };
        this.reload = () => {
            if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
                console.log("key space");
                return true;
            }
            return false;
        };
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class Player {
    constructor(canvas) {
        this.move = () => {
            if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionY !== this.topLane) {
                this.positionY = this.topLane;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionY !== this.middleLane) {
                this.positionY = this.middleLane;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN) && this.positionY !== this.bottomLane) {
                this.positionY = this.bottomLane;
            }
        };
        this.draw = (ctx) => {
            ctx.drawImage(this.image, this.positionX, this.positionY - this.image.width / 2);
        };
        this.canvas = canvas;
        this.topLane = this.canvas.height / 4;
        this.middleLane = this.canvas.height / 2;
        this.bottomLane = this.canvas.height / 4 * 3;
        this.keyListener = new KeyListener;
        this.image = this.loadNewImage("./assets/images/characterBubble.png");
        this.positionY = this.canvas.height / 2;
        this.positionX = 36;
    }
    collidesWith(obstacle) {
        if (this.positionX < obstacle.getPositionX() + obstacle.getImageWidth()
            && this.positionX + this.image.width > obstacle.getPositionX()
            && this.positionY < obstacle.getPositionY() + obstacle.getImageHeight()
            && this.positionY + this.image.height > obstacle.getPositionY()) {
            return true;
        }
        return false;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class PlayingView extends View {
    constructor(canvas) {
        super(canvas);
        this.draw = () => {
            this.frameIndex++;
            if (this.frameIndex % 40 === 0 && this.totalScore >= 0) {
                this.createObstacle();
            }
            this.player.move();
            this.obstacles.forEach(obstacle => {
                if (this.player.collidesWith(obstacle)) {
                    this.totalScore += obstacle.getPoints();
                    this.removeItemFromScoringObjects(obstacle);
                }
                else if (obstacle.collidesWithLeftSideCanvas()) {
                    this.removeItemFromScoringObjects(obstacle);
                }
            });
            console.log(this.totalScore);
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, "Tip: win the game!", this.canvas.width / 2, 50, 24, "#985629");
            this.drawScore(ctx);
            this.player.draw(ctx);
            this.timer.draw(ctx);
            this.obstacles.forEach(obstacle => {
                obstacle.draw(ctx);
            });
        };
        this.move = () => {
            this.obstacles.forEach(obstacle => {
                obstacle.move();
            });
        };
        this.drawScore = (ctx) => {
            this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, 130, 50, 26, "black");
        };
        this.createObstacle = () => {
            const random = this.randomInteger(1, 4);
            if (random === 1) {
                this.obstacles.push(new Spikes(this.canvas));
            }
            if (random === 2) {
                this.obstacles.push(new Rock(this.canvas));
            }
            if (random === 3) {
                this.obstacles.push(new Shark(this.canvas));
            }
            if (random === 4) {
                this.obstacles.push(new Fish(this.canvas));
            }
        };
        this.isCollisionWithShark = () => {
            this.obstacles.some(obstacle => {
                if (this.player.collidesWith(obstacle) && obstacle.getName() === "shark" && this.totalScore >= 10) {
                    console.log("caught shark");
                    this.collisionWithShark = "yes";
                }
                return false;
            });
            return false;
        };
        this.isDone = () => {
            if (this.collisionWithShark === "yes") {
                this.collisionWithShark = "";
                return true;
            }
            return false;
        };
        this.isGameOver = () => {
            return this.totalScore < 0;
        };
        this.player = new Player(this.canvas);
        this.obstacles = [];
        this.totalScore = 10;
        this.frameIndex = 0;
        this.timer = new Timer;
        this.collisionWithShark = "";
    }
    removeItemFromScoringObjects(item) {
        const index = this.obstacles.indexOf(item);
        this.obstacles.splice(index, 1);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class QuestionView extends View {
    constructor(canvas) {
        super(canvas);
        this.draw = (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, `${this.question}`, this.canvas.width / 2, 110, 32, "#985629");
            this.writeTextToCanvas(ctx, `${this.question2}`, this.canvas.width / 2, 150, 32, "#985629");
            this.writeTextToCanvas(ctx, "YES", (this.canvas.width / 4) * 1.45, 370, 32, "#985629");
            this.writeTextToCanvas(ctx, "NO", (this.canvas.width / 4) * 2.45, 370, 32, "#985629");
        };
        this.checkUserInput = () => {
            if (this.keyListener.isKeyDown(KeyListener.KEY_Y)) {
                this.answer = "Yes";
                console.log("Yes");
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_N)) {
                this.answer = "No";
                console.log(this.answer);
            }
        };
        this.isDone = () => {
            if (this.answer === "No") {
                return true;
            }
            return false;
        };
        this.isTip = () => {
            if (this.answer === "Yes") {
                return true;
            }
            return false;
        };
        this.question = "";
        this.question2 = "";
        this.answer = "";
        this.createQuestion();
    }
    createQuestion() {
        const random = this.randomInteger(1, 1);
        if (random === 1) {
            this.question = "Hi there! Can you send us all your personal details? Then we can send you a prize!";
            this.question2 = "I just need your full name, age and adress! Will you do that for me?";
        }
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Rock extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedRock.png");
        this.points = -5;
        this.name = "rock";
    }
}
class Shark extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/goodShark.png");
        this.points = 2;
        this.name = "shark";
    }
}
class Spikes extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/rotatedspike.png");
        this.points = -100;
        this.name = "spikes";
    }
}
class StartingView extends View {
    constructor(canvas) {
        super(canvas);
        this.draw = (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, "Under the Sea", this.canvas.width / 2, 80, 52, "#985629");
            ctx.drawImage(this.loadNewImage("assets/images/goodFish.png"), 200, 200);
            this.writeTextToCanvas(ctx, " +10 score", 380, 260, 24, "#985629");
            ctx.drawImage(this.loadNewImage("assets/images/goodShark.png"), 200, 420);
            this.writeTextToCanvas(ctx, "= +2 score", 380, 480, 24, "#985629");
            ctx.drawImage(this.loadNewImage("assets/images/resizedRock.png"), 600, 200);
            this.writeTextToCanvas(ctx, " -5 score", 760, 260, 24, "#985629");
            ctx.drawImage(this.loadNewImage("assets/images/rotatedspike.png"), 600, 420);
            this.writeTextToCanvas(ctx, "     = Game Over!", 760, 480, 24, "#985629");
            ctx.drawImage(this.loadNewImage("assets/images/button.png"), 950, 300);
            this.writeTextToCanvas(ctx, " START!", 1128, 372, 24, "#3486B8");
            ctx.drawImage(this.loadNewImage("assets/images/player.gif"), 1250, 350);
            this.writeTextToCanvas(ctx, "Score a 100 points and then catch a shark to win the game!", this.canvas.width / 2, 600, 24, "#985629");
        };
        this.isDone = () => {
            if (this.buttonClicked > 0) {
                return true;
            }
            return false;
        };
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            if (event.clientX >= 965 &&
                event.clientX < 1285 + this.button.width &&
                event.clientY >= 320 &&
                event.clientY <= 420 + this.button.height) {
                console.log("clicked");
                this.buttonClicked++;
            }
        };
        document.addEventListener("click", this.mouseHandler);
        this.button = this.loadNewImage("assets/images/button.png");
        this.buttonClicked = 0;
    }
}
class Timer {
    constructor(counter = 1) {
        this.counter = counter;
        this.draw = (ctx) => {
            if (this.counter === 1) {
                this.writeTextToCanvas(ctx, `Time: ${this.counter} second`, 1200, 50, 26, "black");
            }
            if (this.counter > 1) {
                this.writeTextToCanvas(ctx, `Time: ${this.counter} seconds`, 1200, 50, 26, "black");
            }
        };
        let intervalId = setInterval(() => {
            this.counter = this.counter + 1;
        }, 1000);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px consolas`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class TipView extends View {
    constructor(canvas) {
        super(canvas);
        this.draw = (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, "TIPS SCREEN", (this.canvas.width / 4) * 1.45, 370, 32, "#985629");
        };
    }
}
class WinningView extends View {
    constructor(canvas) {
        super(canvas);
        this.draw = (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, "winning SCREEN", (this.canvas.width / 4) * 1.45, 370, 32, "#985629");
        };
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map