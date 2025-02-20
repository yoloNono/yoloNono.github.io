const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = 659;
canvas.height = 523;

let bird = {
  x: 100,
  y: canvas.height / 2,
  size: 12,
  dy: 0.8,
  fall: function() {
    if(bird.y + bird.size + bird.dy >= canvas.height){
      bird.dy = 0;
    }else {
      bird.dy += gravity;
    }
    bird.y += bird.dy;
  },
  gameOver: false
}
const gravity = 0.6;
document.addEventListener('keydown', e => {
  if(e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w'){
    bird.dy = -11;
  }
});
document.addEventListener('click', () => {
  bird.dy = -11;
});

function draw() {
  c.beginPath();
  c.fillStyle = 'yellow';
  c.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
  c.fill();
  bird.fall();
}
class Pole {
  constructor() {
    this.x = canvas.width;
    this.y = 0;;
    this.sy = canvas.height;
    this.width = 50;
    this.height = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    this.sheight = -canvas.height + this.height + 150;
    this.color = 'green';
    this.dx = 3;
  }
  draw() {
    c.fillStyle = this.color;;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillRect(this.x, this.sy, this.width, this.sheight);
  }
  update() {
    this.x -= this.dx;
    this.draw();
  }
}
let count = 0;
let poleArray = [];
poleArray.push(new Pole());

function spawn() {
 for(let i = 0; i < poleArray.length; i++){
  if(poleArray[i].x + poleArray[i].width < 0){
    poleArray.splice(i, 1);
    i--;
  }else {
    poleArray[i].update();
    poleArray.forEach(p => {
      if(bird.x + bird.size >= p.x &&
         bird.x - bird.size <= p.x + p.width &&
         bird.y + bird.size <= p.y + p.height &&
         bird.y - bird.size >= p.y
         ||
        bird.x + bird.size >= p.x &&
        bird.x - bird.size <= p.x + p.width &&
        bird.y + bird.size >= p.sy - p.height &&
        bird.y - bird.size <= p.sy
        ||
        bird.y + bird.size + bird.dy >= canvas.height
      ){
        bird.gameOver = true;
      }
    });
  }
 }
  if(count % 90 === 0 && count !== 0){
    poleArray.push(new Pole());
    count = 0;
  }
}
function cl() {
  if(bird.gameOver){
    c.fillStyle = 'red';
    c.font = '40px Arial';
    c.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
  }else {
    draw();
    spawn();
    count++;
  }
}

function loop() {
  requestAnimationFrame(loop);
  c.fillStyle = 'rgba(0, 0, 0, 0.45)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  cl();
}
loop();
