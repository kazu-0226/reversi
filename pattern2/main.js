const FIELD_WIDTH = 400;
const FIELD_HEIGHT = 400;
const BLOCK_SIZE = 400/8;
const WHITE = 1;
const BLACK = 2;

const canvas = document.getElementById("reversi");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
ctx.fillStyle = "black";

// プレイヤー
let currentPlayer = "white";

// 盤面の状態を配列に表す
var playBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,2,1,2,0,0],
  [0,0,0,1,2,1,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

playBoard.reflesh = () => {
  for(let x=0; x<8; x++){
    for(let y=0; y<8; y++){
      if(playBoard[y][x] === 1){
        drawStone(x, y, "white")
      }else if(playBoard[y][x] === 2){
        drawStone(x, y, "black")
      }
    }
  }
}

playBoard.reflesh()

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
  canPutStone(posX, posY, currentPlayer)
  drawStone(posX, posY, currentPlayer)

  currentPlayer = currentPlayer === "white" ? "black" : "white"
}

// 石を置けるかの判定
// 1.隣接したブロックに自分の石ではない色の石が置いてある
// 2.石がなければそこで調べるのを止める
// 3.終端まで行った場合は調べるのを止める

// 8方向の座標
const directions = [
  { name: "上方向", x: 0, y: -1 },
  { name: "下方向", x: 0, y: 1 },
  { name: "左方向", x: -1, y: 0 },
  { name: "右方向", x: 1, y: 0 },
  { name: "左上方向", x: -1, y: -1 },
  { name: "左下方向", x: -1, y: 1 },
  { name: "右下方向", x: 1, y: 1 },
  { name: "右上方向", x: 1, y: -1 },
];

function canPutStone(originX, originY, color) {
  const canReverse = false; // ひっくり返せるかのフラグ
  const reverseStoneColor = color === WHITE ? BLACK : WHITE

  // 石を置きたい場所の八方向それぞれについて石がどのように配置されているか調べる
  directions.forEach((direction) => {
    let x = originX;
    let y = originY;

    let stones = [];
    stones.push({y, x, color})

    
    // console.log("方向: " + direction.name);
    // 最大7回繰り返す
    for (let i = 0; i < 7; i++) {
      x += direction.x;
      y += direction.y;
      if (x > 7 || x < 0 || y > 7 || y < 0) {
        break; // ループ処理を抜ける
      }
      if (playBoard [y][x] === 0) {
        break; // ループ処理を抜ける
      }
      stones.push({y, x, color}) // 配列に追加
      if (playBoard [y][x] === color) {
        break; // 先頭以外で、自分の色が出たらループ処理を抜ける
      }
    }
    console.log("stones:"+ stones)


    // 配列の2番目が相手の石の色でない場合、ひっくり返せない
    if(stones[1] === reverseStoneColor){
      return
    }

    // 末尾の石の色が自分と同じ色である場合、ひっくり返せる
    let lastIndex = stones.length - 1
    if(stones[lastIndex] === color) {
      console.log("x:" + originX + " y:" + originY + " は" + direction.name + "には、ひっくり返せる")
      return
    }

    console.log("----- ----- -----")
  });
}


// // 初期配置
// drawStone(3, 3, "black")
// drawStone(3, 4, "white")
// drawStone(4, 3, "white")
// drawStone(4, 4, "black")


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



