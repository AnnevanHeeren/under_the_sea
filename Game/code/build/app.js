class Obstacle {
    constructor(canvas) {
        this.canvas = canvas;
        this.topLane = this.canvas.height / 4;
        this.middleLane = this.canvas.height / 2;
        this.bottomLane = this.canvas.height / 4 * 3;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.topLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.bottomLane;
        }
        this.positionY = 60;
        this.speed = 5;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
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
        this.image = this.loadNewImage("assets/images/fish.png");
        this.points = 5;
    }
}
class Game {
    constructor(canvas) {
        this.step = () => {
            this.frameIndex++;
            this.draw();
            this.player.draw(this.ctx);
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.obstacles = [];
        this.currentScreen = [];
        this.player = new Player(this.canvas);
        this.totalScore = 0;
        this.frameIndex = 0;
        console.log("Started the animation");
        requestAnimationFrame(this.step);
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "Move up or down to move your character!", this.canvas.width / 2, 40, 44);
        this.player.draw(ctx);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
class Jellyfish extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/jellyfish.png");
        this.points = 5;
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
class Levels {
    constructor(canvas, spawnRate) {
        this.canvas = canvas;
        this.score = 0;
        this.spawnRate = spawnRate;
        this.allQuestionsAnswered = false;
    }
    isCompleted() {
        if (this.allQuestionsAnswered = true) {
            return true;
        }
        else {
            return false;
        }
    }
}
class Level3 extends Levels {
}
class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.hearts = 3;
        this.score = 0;
        this.bubble = 100;
        this.image = this.loadNewImage("./assets/images/player.gif");
        this.positionY = this.canvas.height / 2;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionY - this.image.width / 2, this.canvas.height - 150);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Rock extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/Rock.png");
        this.points = 5;
    }
}
class Shark extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/shark.png");
        this.points = 0;
    }
}
class Spikes extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/spikes.png");
        this.points = -2;
    }
}
class View {
    constructor() {
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map