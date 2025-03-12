const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;

let gravity = 0.6;
const h1 = document.getElementById("h1");
let bird = {
  x: 100,
  y: canvas.height / 2,
  dy: 1,
  width: 15,
  height: 15,
  gameOver: false,
  fall() {
    if (this.y + this.height + this.dy >= canvas.height) {
      this.gameOver = true;
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw();
  },
  draw() {
    c.fillStyle = "yellow";
    c.fillRect(this.x, this.y, this.width, this.height);
  },
};
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === " " || e.key === "w") {
    bird.dy = -10;
  }
});
document.addEventListener("touchstart", () => {
  bird.dy = -10;
});

class Pole {
  constructor() {
    this.x = canvas.width;
    this.y = 0;
    this.width = 50;
    this.height = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
    this.gap = Math.floor(Math.random() * (160 - 130 + 1)) + 130;
    this.sy = canvas.height;
    this.sheight = -canvas.height + this.height + this.gap;
    this.dx = 3;
  }
  draw() {
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillRect(this.x, this.sy, this.width, this.sheight);
  }
  update() {
    this.x -= this.dx;
    this.draw();
  }
}
let poleArray = [];
let count = 0;
function spawn() {
  for (let i = 0; i < poleArray.length; i++) {
    if (poleArray[i].x + poleArray[i].width < 0) {
      poleArray.splice(i, 1);
      i--;
    } else {
      poleArray[i].update();
      poleArray.forEach((p) => {
        if (
          (bird.x <= p.x + p.width &&
            bird.x + bird.width >= p.x &&
            bird.y <= p.y + p.height) ||
          (bird.x <= p.x + p.width &&
            bird.x + bird.width >= p.x &&
            bird.y + bird.height >= p.sy + p.sheight)
        ) {
          bird.gameOver = true;
        }
      });
    }
  }
  if (count % 90 === 0) {
    poleArray.push(new Pole());
  }
}
function gm() {
  if (bird.gameOver) {
    c.fillStyle = "red";
    c.font = "30px Arial";
    c.fillText("GAMER OVER", canvas.width / 2 - 100, canvas.height / 2);
    h1.textContent = "Click To Play Again";
  } else {
    c.fillStyle = "rgba(0, 0, 0, 0.3)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    bird.fall();
    spawn();
    count++;
  }
}
function reset(e) {
  if (bird.gameOver === true && e) {
    bird.y = canvas.height / 2;
    bird.dy = 1;
    poleArray = [];
    count = 0;
    bird.gameOver = false;
    h1.textContent = "";
  }
}
document.addEventListener("click", (e) => {
  reset(e);
});
function loop() {
  requestAnimationFrame(loop);
  gm();
}
loop();
