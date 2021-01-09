const FIELD_WIDTH = 400
const FIELD_HEIGHT = 400
const BLOCK_SIZE = 400/8

const canvas = document.getElementById("reversi")
const ctx = canvas.getContext("2d")
ctx.lineWidth = 1;
ctx.fillStyle = "black"

// オセロの盤面の区切りを描画
drawReversiFiledLine()

function drawReversiFiledLine(){
  // 縦の線を引く
  // 横幅400を8分割(50)
  for(let col = 1; col < 8; col++){
    ctx.beginPath(); 
    ctx.moveTo(BLOCK_SIZE * col, 0); //  x軸に50*col(7回)の位置に筆を下ろす
    ctx.lineTo(BLOCK_SIZE * col, FIELD_HEIGHT);//  x軸に50*col(7回)の位置からy軸の最大幅(400)まで線を引く
    ctx.stroke();
  }

  // 横の線を引く
  // 横幅400を8分割(50)
  for(let row = 1; row < 8; row++){
    ctx.beginPath();
    ctx.moveTo(0, BLOCK_SIZE * row);
    ctx.lineTo(FIELD_WIDTH , BLOCK_SIZE * row);
    ctx.stroke();
  }
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

// 初期配置
drawStone(3, 3, "black")
drawStone(3, 4, "white")
drawStone(4, 3, "white")
drawStone(4, 4, "black")

// プレイヤー
let currentPlayer = "white"

// 石を置く関数
function drawStone(x, y, color){
  ctx.fillStyle = color
  ctx.beginPath();
  ctx.arc(25 + x * 50, 25 + y *50, 22, 0, 2 * Math.PI)
  ctx.fill();
}

function putStoneAt(event){
  var rect = event.target.getBoundingClientRect();
  mouseX = event.clientX - Math.floor(rect.left);
  mouseY = event.clientY - Math.floor(rect.top);
  console.log({ mouseX, mouseY })
 
  const posX = Math.round((mouseX -25) / 50)
  const posY = Math.round((mouseY -25) / 50)
  drawStone(posX, posY, currentPlayer)

  currentPlayer = currentPlayer === "white" ? "black" : "white"
}



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








