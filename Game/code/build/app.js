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
        this.speed = 5;
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
        this.image = this.loadNewImage("assets/images/flippedresizedFish.png");
        this.points = 10;
    }
}
class Game {
    constructor(canvas) {
        this.step = () => {
            this.frameIndex++;
            if (this.frameIndex % 100 === 0) {
                this.createObstacle();
            }
            this.player.move();
            this.obstacles.forEach(obstacle => {
                obstacle.move();
                if (this.player.collidesWith(obstacle)) {
                    this.totalScore += obstacle.getPoints();
                    this.removeItemFromScoringObjects(obstacle);
                }
                else if (obstacle.collidesWithLeftSideCanvas()) {
                    this.removeItemFromScoringObjects(obstacle);
                }
            });
            this.draw();
            requestAnimationFrame(this.step);
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
        this.writeTextToCanvas(ctx, "Tip: win the game!", this.canvas.width / 2, 50, 24, "#985629");
        this.drawScore(ctx);
        this.player.draw(ctx);
        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
        });
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    removeItemFromScoringObjects(item) {
        const index = this.obstacles.indexOf(item);
        this.obstacles.splice(index, 1);
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
            ctx.drawImage(this.image, this.canvas.width - 1500, this.positionY - this.image.width / 2);
        };
        this.canvas = canvas;
        this.topLane = this.canvas.height / 4;
        this.middleLane = this.canvas.height / 2;
        this.bottomLane = this.canvas.height / 4 * 3;
        this.keyListener = new KeyListener;
        this.image = this.loadNewImage("./assets/images/playerMirrored.gif");
        this.positionY = this.canvas.height / 2;
        this.positionX = this.canvas.width - 1500;
    }
    collidesWith(obstacle) {
        if (this.positionX < obstacle.getPositionX() + obstacle.getImageWidth()
            && this.positionX + this.image.width > obstacle.getPositionX()
            && this.canvas.height - 200 < obstacle.getPositionY() + obstacle.getImageHeight()
            && this.canvas.height - 200 + this.image.height > obstacle.getPositionY()) {
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
class Rock extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedRock.png");
        this.points = 5;
    }
}
class Shark extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/flippedresizedShark.png");
        this.points = 0;
    }
}
class Spikes extends Obstacle {
    constructor(canvas) {
        super(canvas);
        this.image = this.loadNewImage("assets/images/resizedSpike.png");
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