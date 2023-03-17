function startGame() {
    myGameArea.start();
    snake.start();
    food.update();
}

function updateGameArea() {
    myGameArea.clear();
    snake.update();
    food.update();
}

const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.backgroundColor = "lightgrey";
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        /*  window.addEventListener('keyup', function (e) {
              myGameArea.key = false;
          }) 
          */
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    gameOver: function () {
        clearInterval(this.interval);
        this.clear;
    }
}

const food = {
    color: "red",
    position: {},
    randomPosition: function () {
        this.position = { x: getRandomIntInclusive(0, 15) * 20, y: getRandomIntInclusive(0, 15) * 20 };
    },
    update: function () {
        if (Object.keys(this.position).length === 0) {
            this.randomPosition();
        }

        draw(this.position.x, this.position.y, this.color);
    }
}

const snake = {
    color: "green",
    head: { x: 300, y: 300 },
    bodyPieces: [],
    key: null,
    xSpeed: 20,
    ySpeed: 0,
    start: function () {
        window.addEventListener('keydown', function (e) {
            console.log(e.key);
            snake.key = e.key;
        })
        draw(this.head.x, this.head.y, this.color);
        this.bodyPieces.forEach(bodyPiece => {
            draw(bodyPiece.x, bodyPiece.y, this.color)
        });
    },
    update: function () {
        this.updateSpeed();
        this.checkCollissionWall();
        this.updatePosition();
        this.checkCollissionFood();
        this.checkCollissionSelf();
        draw(this.head.x, this.head.y, this.color);
        this.bodyPieces.forEach(bodyPiece => {
            draw(bodyPiece.x, bodyPiece.y, this.color)
        });
    },
    updatePosition: function () {
        this.bodyPieces.unshift({ x: this.head.x, y: this.head.y })
        this.bodyPieces.pop();
        this.head.x += this.xSpeed;
        this.head.y += this.ySpeed;
    },
    updateSpeed: function () {
        if (this.key === "ArrowDown" && this.ySpeed >= 0) {
            this.xSpeed = 0;
            this.ySpeed = 20;
        } else if (this.key === "ArrowUp" && this.ySpeed <= 0) {
            this.xSpeed = 0;
            this.ySpeed = -20;
        } else if (this.key === "ArrowLeft" && this.xSpeed <= 0) {
            this.xSpeed = -20;
            this.ySpeed = 0;
        } else if (this.key === "ArrowRight" && this.xSpeed >= 0) {
            this.xSpeed = 20;
            this.ySpeed = 0;
        }
    },
    checkCollissionFood: function () {
        if (this.head.x === food.position.x && this.head.y === food.position.y) {
            food.position = {};
            this.bodyPieces.push({ x: this.head.x - this.xSpeed, y: this.head.y - this.ySpeed });
        }
    },
    checkCollissionSelf: function () {
        this.bodyPieces.forEach(bodyPiece => {
            if (this.head.x === bodyPiece.x && this.head.y === bodyPiece.y) {
                myGameArea.gameOver();
            }
        })
    },
    checkCollissionWall: function () {
        if (this.head.x === 0 && this.xSpeed < 0 || this.head.x === 580 && this.xSpeed > 0 || this.head.y === 0 && this.ySpeed < 0 || this.head.y === 580 && this.ySpeed > 0) {
            myGameArea.gameOver();
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw(coordinateX, coordinateY, color) {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(coordinateX, coordinateY, 20, 20);
}

startGame();