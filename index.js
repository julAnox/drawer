const canvas = document.getElementById("canvas");
const high_btn = document.getElementById("high");
const low_btn = document.getElementById("low");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");

let size = 15;
updateSizeOnScreen();
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;

function updateSizeOnScreen() {
  if (size < 1) {
    size = 1;
  } else if (size > 30) {
    size = 30;
  }
  sizeEl.innerText = size;
}

canvas.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    isPressed = true;
    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    isPressed = false;
    x = undefined;
    y = undefined;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const rect = canvas.getBoundingClientRect();
    const x2 = e.clientX - rect.left;
    const y2 = e.clientY - rect.top;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

high_btn.addEventListener("click", (e) => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

low_btn.addEventListener("click", (e) => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}
