var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var wall_w = 10;
var score = 0;
var live = 10;
var level = 30;
var stairs = [stick1,stick2,stick3,stick4,stick5,stick6];
var stair = 0;
var stick_x = 0;
var stick_y = 0;
var stairs_arr = [];
var stairs_arr2 = [];
var apple_arr = [];
var apple_arr2 = [];
var game = 1; //遊戲進行中 
var time = 0;
var dif = 3; //角色誤差
var G = 6.5;
var touch_count = 0;
var ceiling = new Image(); 
var jump_speed = 7;
var jump_max = 130;
var jh = 0;
var isjump = 0;
var isjump2 = 0;
var power_consume = 2;
var down_stair = 0;
var catx = 0;
var caty = 0;

ceiling.src = './ceiling.png';
var left_wall = new Image(); 
left_wall.src = './wall.png';
var right_wall = new Image(); 
right_wall.src = './wall.png';
var middle_wall = new Image(); 
middle_wall.src = './wall.png';
var stick1 = new Image(); 
stick1.src = './stick1.png';
var stick2 = new Image(); 
stick2.src = './stick2.png';
var stick3 = new Image(); 
stick3.src = './stick3.png';
var stick4 = new Image(); 
stick4.src = './stick4.png';
var stick5 = new Image(); 
stick5.src = './stick5.png';
var stick6 = new Image(); 
stick6.src = './stick6.png';
var cat = new Image(); 
cat.src = './cat1.png';
var cat_r = new Image(); 
cat_r.src = './cat1_r.png';
var cat_jump = new Image(); 
cat_jump.src = './cat1_jump.png';
var cat_l = new Image(); 
cat_l.src = './cat1_l.png';
var apple = new Image(); 
apple.src = './apple.png';
//console.log(stairs.length);


function demo() {
    alert('吃蘋果');
}
//window.onload=demo;
document.addEventListener("keydown", keyDownHandler, false); 
document.addEventListener("keyup", keyUpHandler, false);
window.addEventListener("load",loaded);

function loaded(){
    drawstage();
    init();
    var interval = setInterval(draw, level); //每10微秒執行移動一次
}
    /*
    //初始化先推一些牆壁進去
    for(var s=0; s<540/130; s++){

        stairs_arr.push(new Wall(Math.random()*410+540, Math.random()*520, parseInt(Math.random()*6))); //右
        stairs_arr2.push(new Wall(Math.random()*410, Math.random()*520, parseInt(Math.random()*6))); //左
    }
    */

function init(){
    stairs_arr = [];
    stairs_arr2 = [];
    apple_arr = [];
    apple_arr2 = [];
    cat1 = new Player();   
}

//玩家物件
class Player{
    constructor(args){
        this.cat_x = 500; //初始x座標
        this.cat_y = 45; //初始y座標
        this.cat_w = 37; //初始肥度
        this.cat_h = 45; //初始身高
        this.live = 10; //初始血量
        this.power = 10; //初始能量
        this.max_live = 10; //最大血量
        this.max_power = 10; //最大能量
        this.height = 0; //離地面高度
        this.touch = 1; //是否有觸碰到東西
        this.status = 0; //小貓的動作
        this.hurt = 0; //防止連續扣血的flag
        this.heal = 0; //防止連續補血的flag
        this.addpower = 0; //防止連續補能量的flag
    }
    draw(status){
        if(this.status == 0){
            ctx.drawImage(cat,this.cat_x,this.cat_y,this.cat_w,this.cat_h);
        }else if(this.status == 1){
            ctx.drawImage(cat_l,this.cat_x,this.cat_y,this.cat_w,this.cat_h);
        }else if(this.status == 2){
            ctx.drawImage(cat_r,this.cat_x,this.cat_y,this.cat_w,this.cat_h);
        }else if(this.status == 3){
            ctx.drawImage(cat_jump,this.cat_x,this.cat_y,this.cat_w,this.cat_h);
        }
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FF2D2D";
        ctx.fillText("Life: " + this.live, 970, 40);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FF2D2D";
        ctx.fillText("Power: " + this.power, 970, 60);
        ctx.fillStyle = "#FF2D2D";
        ctx.fillText("cat_x: " + this.cat_x, 970, 80);
        ctx.fillStyle = "#FF2D2D";
        ctx.fillText("cat_y: " + this.cat_y, 970, 100);
    }

    gravity(){
        //console.log(this.touch )
        if(this.touch == 0){
            this.cat_y = this.cat_y + G; //重力下墜
        }
    }
    live_delta(d){
        this.live += d
        if (this.live > this.max_live){
          this.live = this.max_live;
        }
        if (this.live <= 0){
          this.live = 0
        }  
    }
    power_delta(d){
        this.power += d
        if (this.power > this.max_power){
          this.power = this.max_power;
        }
        if (this.power <= 0){
          this.power = 0
        }  
    }
    
}  

class Wall{
    constructor(x,y,type){
        this.wall_x = x; //初始x座標
        this.wall_y = y; //初始y座標
        this.v = 3; //移動速度
        this.width =  120; //平台寬度
        this.height = 20; //平台高度
        this.extraHeight = 0; //最高能到的邊界
        this.wall_type = type; //平台種類
        this.active = true; //是否還在遊戲畫面中
        this.touch = 0; //是否有是否有觸碰到東西
    }

    update(){ //右邊 往上跑
        this.wall_y = this.wall_y - this.v; 
        if(this.touch == 1){
            cat1.cat_y = cat1.cat_y - this.v;
        }
        if (this.wall_y < -20){
            this.active=false;
            if(this.touch == 1){ //如果消失時是有人站上面直接出局
                touch_count = 0;
                cat1.cat_y = 0;
                cat1.live_delta(-3);
            }
      }
    }
    update2(){ //左邊 往下跑
        this.wall_y = this.wall_y + this.v;
        if(this.touch == 1){
            cat1.cat_y = cat1.cat_y + this.v;
        }
        if (this.wall_y > 540){
            this.active=false;
            if(this.touch == 1){ //如果消失時是有人站上面直接出局
                alert("遊戲結束 總共得到"+String(score)+"分");
                document.location.reload();
                init(); // 重置
            }
      }
    }

    draw(){ 
        //受傷
        if (this.wall_type == 0){ //"hurt"
            ctx.drawImage(stick1,this.wall_x ,this.wall_y,this.width,this.height);
        }
        //跳跳板
        if (this.wall_type == 1){ //"jump"
            ctx.drawImage(stick2,this.wall_x ,this.wall_y,this.width,this.height);
        }
        //live普通
        if (this.wall_type == 2){ //"normal"
            ctx.drawImage(stick3,this.wall_x ,this.wall_y,this.width,this.height);
        }     
        //power普通
        if (this.wall_type == 3){ //"fade"
            ctx.drawImage(stick4,this.wall_x ,this.wall_y,this.width,this.height);
        }
        //右滑
        if (this.wall_type == 4){ //"right"
            ctx.drawImage(stick5,this.wall_x ,this.wall_y,this.width,this.height);
        }
        //左滑
        if (this.wall_type == 5){ //"left"
            ctx.drawImage(stick6,this.wall_x ,this.wall_y,this.width,this.height);
        }
    } 
    step(){
        if (this.wall_type == 0){ //受傷
            if(cat1.hurt == 0){
                cat1.live_delta(-3);
                cat1.hurt = 1;
            }
            cat1.heal = 0;
            cat1.addpower = 0;
        }
        if (this.wall_type == 1){ //跳跳板
            isjump = 1;
            isjump2 = 1; 
            //cat1.cat_y = cat1.cat_y - 120;
            cat1.hurt = 0;
            cat1.heal = 0;
            cat1.addpower = 0;
        }
        if (this.wall_type == 2){ //live普通
            if(cat1.heal == 0){
                cat1.live_delta(1);
                cat1.heal = 1;
            }
            cat1.hurt = 0;
            cat1.addpower = 0;
        } 
        if (this.wall_type == 3){ //power普通
            if(cat1.addpower == 0){
                cat1.power_delta(2);
                cat1.addpower = 1;
            }
            cat1.hurt = 0; 
            cat1.heal = 0;
        }
        if (this.wall_type == 4){ //右滑
            cat1.cat_x = cat1.cat_x + 2;
            cat1.hurt = 0;
            cat1.heal = 0;
            cat1.addpower = 0;
        }
        if (this.wall_type == 5){ //左滑
            cat1.cat_x = cat1.cat_x - 2;
            cat1.hurt = 0;
            cat1.heal = 0;
            cat1.addpower = 0;
        }
      }
  }

  class Apple{
    constructor(x,y,apple_score){
        this.apple_x = x; //初始x座標
        this.apple_y = y; //初始y座標
        this.apple_w =  30; //蘋果寬度
        this.apple_h = 30; //蘋果高度
        this.active = true; //是否有缺蘋果，預設是左右各三顆，有缺就隨機生成新的
        this.touch = 0; //是否有是否有觸碰到東西
        this.score = apple_score; //左右的蘋果分數不同
    }
    draw(){
        ctx.drawImage(apple,this.apple_x ,this.apple_y, this.apple_w, this.apple_h);
    }
    touch_detection(){
        if(cat1.cat_x + cat1.cat_w >= this.apple_x && cat1.cat_x <= this.apple_x + this.apple_w){ 
            if (cat1.cat_y + cat1.cat_h >= this.apple_y && cat1.cat_y <= this.apple_y + this.apple_h ){ 
                score = score + this.score;
                cat1.power_delta(1);
                cat1.live_delta(1);
                this.active = false;
                cat1.cat_w = cat1.cat_w + 3;
            }
        }
    }
}

function keyDownHandler(e) { //判斷按下的鍵是哪個
    if(e.key == "Right" || e.key == "ArrowRight") {
        cat1.status = 2;
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        cat1.status = 1;
        leftPressed = true;
    }
    else if(e.key == "Space" || e.key == "ArrowUp") {
        cat1.status = 3;
        upPressed = true;
    }
}

function keyUpHandler(e) { //判斷放開的鍵是哪個
    if(e.key == "Right" || e.key == "ArrowRight") {
        cat1.status = 0;
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        cat1.status = 0;
        leftPressed = false;
    }
    else if(e.key == "Space" || e.key == "ArrowUp") {
        cat1.status = 0;
        down_stair = 0;
        upPressed = false;
    }
}

function drawstage() {
    ctx.drawImage(ceiling,0,0,1080,15);
    ctx.drawImage(left_wall,0,0,wall_w,540);
    ctx.drawImage(right_wall,1070,0,wall_w,540);
    ctx.drawImage(middle_wall,510,100,wall_w * 3,20);
    ctx.drawImage(middle_wall,510,470,wall_w * 3,20);
}

function drawscore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "#E6CAFF";
    ctx.fillText("Score: " + score, 8, 40);
}

function GGdetection(){
    if(cat1.live == 0 || cat1.cat_y >= 550 - cat1.cat_h){
        alert("遊戲結束 總共得到"+String(score)+"分");
        document.location.reload();
        init(); // 重置
    }
}

function jump(){
    if(isjump == 1){
        if(cat1.power >= 3){
            if(jh < jump_max ){
                jh += jump_speed;
                cat1.cat_y = cat1.cat_y - G - jump_speed - 3;
                if(cat1.cat_y < 0 && cat1.hurt == 0){
                    cat1.cat_y = 0;
                    cat1.live_delta(-3);
                    cat1.hurt = 1;
                }
            }else{
                isjump = 0;
                if(isjump2 == 0){
                    cat1.power = cat1.power - power_consume;
                }

                jh = 0;
            }
        }
        else{
            isjump = 0;
        }
    }
}

function touch(eachwall){
    
    if(touch_count == 1){ //目前已在某平台上
        if(eachwall.touch == 1){
            if(cat1.cat_x >= 510 - cat1.cat_w && cat1.cat_x <=510 + wall_w * 3 ){ //x座標是否在初始平台範圍內
                if (cat1.cat_y + cat1.cat_h <= 100 && cat1.cat_y + cat1.cat_h >= 100 - G - eachwall.v){  //ｙ座標是否離初始平台面算接觸
                    cat1.cat_y = 100 - cat1.cat_h ;
                    cat1.touch = 1;

                }else if(cat1.cat_y + cat1.cat_h <= 470 && cat1.cat_y + cat1.cat_h >= 470 - G ){ //ｙ座標是否離中下平台面算接觸
                    cat1.cat_y = 470 - cat1.cat_h ;
                    cat1.touch = 1;
                    down_stair = 1;

                }else{ //確定不在中間兩個固定平台
                    console.log(3);
                    cat1.touch = 0;
                    eachwall.touch = 0;
                    touch_count = 0;

                }
            }else if (cat1.cat_x >= eachwall.wall_x - cat1.cat_w && cat1.cat_x <= eachwall.wall_x + eachwall.width ){ //x座標是否在平台範圍內
              if (cat1.cat_y + cat1.cat_h <= eachwall.wall_y && cat1.cat_y + cat1.cat_h >= eachwall.wall_y - G - eachwall.v){ //y座標
                cat1.cat_y = eachwall.wall_y - cat1.cat_h ;
                cat1.touch = 1;
                eachwall.touch = 1;
                touch_count = 1;
                eachwall.step();

              }else{ //在平台x座標範圍但高度不對
                cat1.touch = 0; 
                eachwall.touch = 0;
                touch_count = 0;
              }
            }else{ //不在平台x座標範圍也不在中柱
                cat1.touch = 0; 
                eachwall.touch = 0;
                touch_count = 0;
            }
        }
    }else if(touch_count == 0){ //目前不在任何平台上 剩下的與上面部分邏輯相同
        //因為角色下半身窄 加上誤差看起來比較合理 
        if(cat1.cat_x >= 510 - cat1.cat_w  && cat1.cat_x <=510 + wall_w * 3 ){ 
            if (cat1.cat_y + cat1.cat_h <= 100 && cat1.cat_y + cat1.cat_h >= 100 - G ){ 
                cat1.cat_y = 100 - cat1.cat_h ;
                cat1.touch = 1;

            }else if(cat1.cat_y + cat1.cat_h <= 470 && cat1.cat_y + cat1.cat_h >= 470 - G ){
                cat1.cat_y = 470 - cat1.cat_h ;
                cat1.touch = 1;
                down_stair = 1;
            
            }else{
                cat1.touch = 0;
                eachwall.touch = 0;
            
            }
        }else if (cat1.cat_x >= eachwall.wall_x - cat1.cat_w  && cat1.cat_x <= eachwall.wall_x + eachwall.width){
        if (cat1.cat_y + cat1.cat_h <= eachwall.wall_y && cat1.cat_y + cat1.cat_h >= eachwall.wall_y - G){ 
            cat1.cat_y = eachwall.wall_y - cat1.cat_h ;
            cat1.touch = 1;
            eachwall.touch = 1;
            touch_count = 1;
            eachwall.step();

        }else{
            cat1.touch = 0; 
            eachwall.touch = 0;
            //console.log(cat1.cat_x)
            //console.log(cat1.cat_y)
        }
        }else{
            cat1.touch = 0; 
            eachwall.touch = 0;
            //console.log(cat1.cat_x)
            //console.log(cat1.cat_y)
        }
    }

}

function update(){
    //console.log(cat1.cat_y);
    time++;
    cat1.draw(cat1.status);
    if (time%40 == 0){ //推入新的地板
        stairs_arr.push(new Wall(Math.random()*410 + 540, 540, parseInt(Math.random()*6))); //右
        stairs_arr2.push(new Wall(Math.random()*380, 0, parseInt(Math.random()*6))) //左
    }
    if (time%60 == 0){ //出現新蘋果
        if(apple_arr.length < 3){
            apple_arr.push(new Apple(Math.random()*410 + 540, Math.random()*260 + 70, 1)); //右
        }
        if(apple_arr2.length < 3){
            apple_arr2.push(new Apple(Math.random()*380, Math.random()*300 + 70, 2)) //左
        }
    }
    cat1.gravity();
    GGdetection();
}

function draw() {
    //ctx.clearRect(cat_x,cat_y,cat_w+10,cat_h);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //把原本的點刪掉
    drawstage();
    drawscore();
    update();
    jump();
    console.log(touch_count)
    apple_arr = apple_arr.filter(apple=>apple.active);
    apple_arr.forEach(apple=>apple.draw());
    apple_arr.forEach(apple=>apple.touch_detection());
    apple_arr2 = apple_arr2.filter(apple=>apple.active);
    apple_arr2.forEach(apple=>apple.draw());
    apple_arr2.forEach(apple=>apple.touch_detection());
    //鍵盤操作
    if(rightPressed) {
        cat1.cat_x += 5;
        if (cat1.cat_x + cat1.cat_w > canvas.width - wall_w){
            cat1.cat_x = canvas.width - cat1.cat_w - wall_w;
        }
    }
    else if(leftPressed) {
        cat1.cat_x -= 5;
        if (cat1.cat_x < 0 + wall_w){
            cat1.cat_x = 0 + wall_w;
        }
    }
    if(upPressed) {
        if(touch_count == 1 || down_stair == 1){ //down_stair是指下面的小平台
            isjump = 1;
            isjump2 = 0;
            down_stair = 0;
        }
    }
    stairs_arr = stairs_arr.filter(wall=>wall.active); //把已經出界的去掉
    stairs_arr.forEach(wall=>wall.update());
    stairs_arr.forEach(wall=>wall.draw());
    stairs_arr.forEach(wall=>touch(wall));

    stairs_arr2 = stairs_arr2.filter(wall=>wall.active);
    stairs_arr2.forEach(wall=>wall.update2());
    stairs_arr2.forEach(wall=>wall.draw());
    stairs_arr2.forEach(wall=>touch(wall));

}   
