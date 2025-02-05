const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
window.addEventListener('resize', () => {
  canvas.width = 600;
  canvas.height = 600;
  drawPanes();
});
let key = {}
let pane1 = {
  x: 10,
  y: canvas.height / 2,
  width: 10,
  height: 87,
  speed: 5.5
}
let pane2 = {
  x: canvas.width - 10,
  y: canvas.height / 2,
  width: 10,
  height: 87,
  speed: 5.5
}
function drawPanes(){
  c.fillStyle = 'white';
  c.fillRect(pane1.x, pane1.y, pane1.width, pane1.height);
  c.fillRect(pane2.x, pane2.y, pane2.width, pane2.height);
}
function lines() {
  c.fillStyle = 'white';
  c.fillRect(canvas.width / 2, 500, 5, 20);
  c.fillRect(canvas.width / 2, 400, 5, 20);
  c.fillRect(canvas.width / 2, 300, 5, 20);
  c.fillRect(canvas.width / 2, 200, 5, 20);
  c.fillRect(canvas.width / 2, 100, 5, 20);
}

let colors = ['#732002', '#0D2CD9', '#3F3CA6', '#BF349A', '#BF1F6A'];
function Ball(x, y, size, dx, dy){
  this.x = x;
  this.y = y;
  this.size = size;
  this.dx = dx;
  this.dy = dy;
  this.color = 'white';
  this.draw = function() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.fill();
  }
  this.update = function() {
    this.y += this.dy;
    this.x += this.dx;
    if(this.x + this.size >= canvas.width || this.x - this.size <= 0){
      this.dx *= -1;
    }
    if(this.y + this.size >= canvas.height || this.y - this.size <= 0){
      this.dy *= -1;
    }
    if((this.x > 0 || this.x < 0) && (this.x + this.size >= pane2.x && this.y + this.size <= pane2.y + pane2.height && this.y - this.size >= pane2.y)){
      this.dx *= -1;
    }
    if((this.x < 0 || this.x > 0) && (this.x - this.size <= pane1.x + pane1.width && this.y + this.size <= pane1.y + pane1.height && this.y - this.size >= pane1.y)){
      this.dx *= -1;
    }
   
  }
}
document.addEventListener('keydown', event => {
  key[event.key] = true;
});
document.addEventListener('keyup', event => {
  key[event.key] = false;
  });
function randomChoice() {
  return Math.random() < 0.5 ? -4 : 4;
}
let pong = new Ball(canvas.width / 2, canvas.height / 2, 10, randomChoice(), randomChoice());
function changeC() {
    if((pong.x > 0 || pong.x < 0) && (pong.x + pong.size >= pane2.x && pong.y + pong.size <= pane2.y + pane2.height && pong.y - pong.size >= pane2.y)){
      pong.color = colors[Math.floor(Math.random() * colors.length)];
    }
    if((pong.x < 0 || pong.x > 0) && (pong.x - pong.size <= pane1.x + pane1.width && pong.y + pong.size <= pane1.y + pane1.height && this.y - pong.size >= pane1.y)){
      pong.color = colors[Math.floor(Math.random() * colors.length)];
    }
}
function end(){
  if(pong.x + pong.size >= canvas.width || pong.x - pong.size <= 0){
    pong = null;
    pong = new Ball(canvas.width / 2, canvas.height / 2, 10, randomChoice(), randomChoice());
    set = false;
    tim = setTimeout(() => {
    set = true;
    int = setInterval(() => {
    if(pong.dx < 0){
      pong.dx--;
    }else {
      pong.dx++;
    }
    }, 8000);
    }, 2000);
    pane1.x = 10;
    pane2.x = canvas.width - 10;
    pane1.y = canvas.height / 2;
    pane2.y = canvas.height / 2;


  }
}
let set = false;
let int;
let tim = setTimeout(() => {
  set = true;
  int = setInterval(() => {
    if(pong.dx < 0){
      pong.dx--;
    }else {
      pong.dx++;
    }
  }, 8000);
}, 2000);
let text1 = 0;
let text2 = 0;
function text() {
  c.fillStyle = 'blue';
  c.font = '50px Arial';
  c.fillText(text1, 90, 90);
  c.fillStyle = 'red';
  c.fillText(text2, 460, 90);
}
function loop() {
  requestAnimationFrame(loop);
  c.fillStyle = 'rgba(0, 0, 0, 0.5)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  drawPanes();
  text();
  if (key.ArrowUp) {
    if(pane2.y  <= 0){
     
    }else {
      pane2.y -= pane2.speed;
    }
  }
  if(key.ArrowDown){
    if(pane2.y + pane2.height >= canvas.height){
     
    }else {
      pane2.y += pane2.speed;
    }
  }
  if(key.w){
    if(pane1.y <= 0){
     
    }else {
      pane1.y -= pane1.speed;
    }
  }
  if(key.s){
    if(pane1.y + pane1.height >= canvas.height){
     
    }else {
      pane1.y += pane1.speed;
    }
  }
  pong.draw();
  if(set){
    pong.update();
  }
  changeC();
  if(pong.x - pong.size <= 0){
    text2++;
  }
  if(pong.x + pong.size >= canvas.width){
    text1++;
  }
  end();
  //lines();
}
loop();