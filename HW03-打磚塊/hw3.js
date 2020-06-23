var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 50;
var vx = 2;
var vy = -2;
var r = 10;
var paddle_h = 10;
var paddle_w = 110;
var paddle_c = (canvas.width - paddle_w) / 2;
var paddle_t = canvas.height - paddle_h;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var brick_row = 3;
var brick_column = 6;
var brick_w = 135;
var brick_h = 30;
var brick_p = 40;
var brick_top = 50;
var brick_left = 35;
var bricks = [];
var score = 0;
var level = 10;
var hardness = 1
var combo = 0;
var hit = 36;
for(var bc=0; bc<brick_column; bc++) {
    bricks[bc] = [];
    if(bc%3 == 0){
        hardness = 1
    }
    if(bc%3 == 1){
        hardness = 2
    }
    if(bc%3 == 2){
        hardness = 3
    }
    for(var br=0; br<brick_row; br++) {
        bricks[bc][br] = { x: 0, y: 0, status: hardness };
    }
}

function demo() {
    alert('打磚塊遊戲，每打到一次算一分，棒子除了可以左右移動外也可以上下移動一小段距離，試著打出最佳的角度，如果可以在磚塊間連續打中則combo數會增加，碰到棒子combo數會歸零，不同顏色的磚塊代表硬度的差異，顏色越深越硬，試著打越多分越好');
}
window.onload=demo;


document.addEventListener("keydown", keyDownHandler, false); //default false
document.addEventListener("keyup", keyUpHandler, false);

function collisionDetection() {
    for(var bc=0; bc<brick_column; bc++) {
        for(var br=0; br<brick_row; br++) {
            var b = bricks[bc][br];
            if(b.status >= 1) {
                if(x > b.x && x < b.x+brick_w && y > b.y && y < b.y+brick_h) {
                    vy = - vy;
                    b.status = b.status - 1;
                    score = score + combo + 1 ;
                    combo = combo + 1 ;
                    hit = hit - 1;
                    if(hit == 0) {
                        alert("遊戲結束 總共得到"+String(score));
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}


function drawPaddle() {
    ctx.beginPath(); //canvas畫圖起手式
    ctx.rect(paddle_c, paddle_t, paddle_w, paddle_h);
    ctx.fillStyle = "#984B4B";
    ctx.fill();
    ctx.closePath(); //canvas畫圖結尾
}

function drawBall() {
    ctx.beginPath(); //canvas畫圖起手式
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = "#FF359A";
    ctx.fill();
    ctx.closePath(); //canvas畫圖結尾
}

function drawBrick() {
    for(var bc=0; bc<brick_column; bc++) {
        for(var br=0; br<brick_row; br++) {
            if(bricks[bc][br].status == 1) {
                var brick_x = (bc*(brick_w+brick_p))+brick_left;
                var brick_y = (br*(brick_h+brick_p))+brick_top;
                bricks[bc][br].x = brick_x;
                bricks[bc][br].y = brick_y;
                ctx.beginPath();
                ctx.rect(brick_x, brick_y, brick_w, brick_h);
                ctx.fillStyle = "#ACD6FF";
                ctx.fill();
                ctx.closePath();
            } 
            if(bricks[bc][br].status == 2) {
                var brick_x = (bc*(brick_w+brick_p))+brick_left;
                var brick_y = (br*(brick_h+brick_p))+brick_top;
                bricks[bc][br].x = brick_x;
                bricks[bc][br].y = brick_y;
                ctx.beginPath();
                ctx.rect(brick_x, brick_y, brick_w, brick_h);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            } 
            if(bricks[bc][br].status == 3) {
                var brick_x = (bc*(brick_w+brick_p))+brick_left;
                var brick_y = (br*(brick_h+brick_p))+brick_top;
                bricks[bc][br].x = brick_x;
                bricks[bc][br].y = brick_y;
                ctx.beginPath();
                ctx.rect(brick_x, brick_y, brick_w, brick_h);
                ctx.fillStyle = "#000079";
                ctx.fill();
                ctx.closePath();
            } 
        }
    }
}

function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#6F00D2";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawCombo() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#6F00D2";
    ctx.fillText("Combo: "+combo, 100, 20);
}

function keyDownHandler(e) { //判斷按下的鍵是哪個
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }   
}

function keyUpHandler(e) { //判斷放開的鍵是哪個
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }   
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //把原本的點刪掉
    drawBall();
    drawPaddle();
    drawBrick();
    collisionDetection();
    drawScore();
    drawCombo();

    if(x + vx > canvas.width - r || x + vx < r) { //打到左右
        vx = -vx;
    }
    if(y + vy < r) { //打到上面
        vy = -vy;
    }
    else if(y + vy > paddle_t) { //打到下面
        combo = 0;
        if(x > paddle_c && x < paddle_c + paddle_w) {
            vy = -vy;
        }
        else {
            if(y + vy > canvas.height - r){
                alert("遊戲結束 總共得到" + String(score));
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }
    }
    if(rightPressed) {
        paddle_c += 5;
        if (paddle_c + paddle_w > canvas.width){
            paddle_c = canvas.width - paddle_w;
        }
    }
    else if(leftPressed) {
        paddle_c -= 5;
        if (paddle_c < 0){
            paddle_c = 0;
        }
    }
    else if(upPressed) {
        paddle_t -= 5;
        if (paddle_t < canvas.height - paddle_h - 30){
            paddle_t = canvas.height - paddle_h - 30;
        }
    }
    else if(downPressed) {
        paddle_t += 5;
        if (paddle_t >= canvas.height - paddle_h){
            paddle_t = canvas.height - paddle_h;
        }
    }
    x += vx;
    y += vy;
}
var interval = setInterval(draw, level); //每10微秒執行移動一次


 













