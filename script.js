function startGame() {
    myGameArea.start();
    snake.update();
}

function updateGameArea() {
    myGameArea.clear();
    snake.update();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 200);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var snake = {
    color: "green",
    head: { x: 300, y: 300 },
    bodyPieces: [{ x: 300, y: 280 }],
    xVelocity: 20,
    yVelocity: 0,
    draw: function (coordinateX, coordinateY) {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.outlineColor;
        ctx.fillRect(coordinateX, coordinateY, 20, 20);

    },
    update: function () {
        this.updatePosition();
        this.draw(this.head.x, this.head.y);
        this.bodyPieces.forEach(bodyPiece => {
            this.draw(bodyPiece.x, bodyPiece.y)
        });
    },
    updatePosition: function () {
        this.bodyPieces.unshift({ x: this.head.x, y: this.head.y })
        this.bodyPieces.pop();
        this.head.x += this.xVelocity;
        this.head.y += this.yVelocity;
    }
}



startGame();