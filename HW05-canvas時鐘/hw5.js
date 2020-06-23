var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var count = 0;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    draw(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }
  
function drawFace(ctx, radius) {
var grad;

ctx.beginPath();
ctx.arc(0, 0, radius, 0, 2 * Math.PI);
ctx.fillStyle = 'white';
ctx.fill();

grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
grad.addColorStop(0, '#333');
grad.addColorStop(0.5, 'white');
grad.addColorStop(1, '#333');
ctx.strokeStyle = grad;
ctx.lineWidth = radius*0.1;
ctx.stroke();

ctx.beginPath();
ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
ctx.fillStyle = '#333';
ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ang_second = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}


function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.75, radius*0.07);
    // second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.8, radius*0.02);
}


function draw(ctx, radius){
    count = 3
    for(num = 1; num <= 60; num++){
        if(count == 5){
            drawscale(ctx, num*Math.PI/30,radius*0.72,radius*0.05,"#000000",112  ) 
            count = 0
        }
        drawscale(ctx, num*Math.PI/30,radius*0.78,radius*0.01,"#000000",100) //#000000 //#8600FF
        
        count = count + 1
    }
    count = 3
    for(num2 = 1; num2 <= 60; num2++){
        if(count == 5){
            drawscale(ctx, num2*Math.PI/30,radius*0.68,radius*0.09,"#FFFFFF",109.1  ) 
            count = 0
        }else{
            drawscale(ctx, num2*Math.PI/30,radius*0.68,radius*0.025,"#FFFFFF",109.1  ) //#FFFFFF //#FF0000
        }
        count = count + 1
    }

}

function drawscale(ctx, pos, length, width, color, bias){
    ctx.beginPath();
    ctx.lineWidth = width; 
    ctx.lineCap = "butt";
    ctx.rotate(pos);
    ctx.moveTo(0, 0);
    ctx.lineTo(bias, -length ); //100會剛好對上刻度
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);



}
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = "#000000";
    ctx.stroke();   
    ctx.rotate(-pos);	
}

