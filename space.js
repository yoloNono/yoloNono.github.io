const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 600;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let player = {
  x: canvas.width / 2,
  y: canvas.height - 80,
  width: 60,
  height: 60,
  speed: 5,
};
let health = {
    x: 20,
    y: canvas.height / 2,
    width: 20,
    height: -200,
    hDeduct: 10
}
let death = false;
function draw() {
  c.fillStyle = "red";
  c.fillRect(player.x, player.y, player.width, player.height);
  c.strokeStyle = 'white';
  c.lineWidth = 2;
  c.fillStyle = 'red';
  c.fillRect(health.x, health.y, health.width, health.height);
  c.strokeRect(health.x, health.y, health.width, -200);
}
class Bullet {
  constructor() {
    this.x = player.x + 27;
    this.y = player.y - 20;
    this.width = 5;
    this.height = 15;
    this.dy = 3;
  }
  draw() {
    c.fillStyle = "white";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y -= this.dy;
    this.draw();
  }
}
class Ship {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = -55;
    this.width = 40;
    this.height = 40;
    this.dy = 2;
  }
  draw() {
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += this.dy;
    this.draw();
  }
}
let key = {};
document.addEventListener("keydown", (event) => {
  key[event.key] = true;
});
document.addEventListener("keyup", (event) => {
  key[event.key] = false;
});
let bullets = [];
let ships = [];
function spawn() {
  if (key.a || key.ArrowLeft) {
   if(player.x <= 10){

   }else {
    player.x -= player.speed;
   }
  }
  if (key.d || key.ArrowRight) {
    if(player.x >= canvas.width - 70){

    }else {
        player.x += player.speed;
    }
    }
  if (bullets.length > 0) {
    bullets.forEach((b, index) => {
      b.update();
      if (b.y + b.height <= 0) {
        bullets.splice(index, 1);
      }
      ships.forEach((s, sindex) => {
        if(b.x < s.x + s.width &&
            b.x + b.width > s.x &&
            b.y < s.y + s.height &&
            b.y + b.height > s.y
        ){
            bullets.splice(index, 1);
            ships.splice(sindex, 1);
            text++;
        }
      });
    });
  }
  if (ships.length > 0) {
    ships.forEach((s, index) => {
      s.update();
      if(s.x + s.width > canvas.width){
        ships.splice(index, 1);
      }
      if (s.y >= canvas.height) {
        ships.shift();
        health.height = health.height + health.hDeduct;
        if(health.height >= 0){
          death = true;
        }
      }
    });
  }
}
let text = 0;
function loop() {
  requestAnimationFrame(loop);
  c.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  spawn();
  if(death){
    document.write('GAME OVER!!.....');
    death = false;
    bullets = [];
    ships = [];
    clearInterval(shoot);
    clearInterval(sail);
  }
  c.fillStyle = "white";
  c.font = "30px Arial";
  c.fillText(text, canvas.width / 2, 40);
}
loop();
let shoot = setInterval(function () {
  bullets.push(new Bullet());
}, 400);
let sail = setInterval(function () {
  ships.push(new Ship());
}, 2000);
