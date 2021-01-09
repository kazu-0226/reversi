const canvas = document.getElementById("reversi")
const ctx = canvas.getContext("2d")

ctx.fillStyle = "black"

// 縦の線を引く
// 横幅400を8分割(50)
for(let col = 0; col < 8; col++){
  ctx.beginPath(); 
  ctx.moveTo(50 * col, 0); //  X軸に40*col(8回)の位置に筆を下ろす
  ctx.lineTo(50 * col, 400);//  X軸に40*col(8回)の位置からy軸の最大幅(320)まで線を引く
  ctx.stroke();
}

// 横の線を引く
for(let row = 0; row < 8; row++){
  ctx.beginPath();
  ctx.moveTo(0, 50 * row);
  ctx.lineTo(400, 50 * row);
  ctx.stroke();
}



var playBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,2,1,1,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]


var displayPlayer = document.getElementById("player")
let player = 2; //  先行は黒

const movesDirection = [
    { x: 0, y: 1 },   // 上
    { x: 0, y: -1 },  // 下
    { x: 1, y: 0 },   // 右
    { x: 1, y: 1 },   // 右下
    { x: 1, y: -1 },  // 右上
    { x: -1, y: 0 },  // 左
    { x: -1, y: 1 },  // 左下
    { x: -1, y: -1 }  // 左上
  ]








