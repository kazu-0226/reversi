const canvas = document.getElementById("reversi")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"

var playBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,2,1,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]


var displayPlayer = document.getElementById("player")
let player = 1;


// 縦の線を引く
// 横幅320を8分割(40)
for(let col = 0; col < 8; col++){
    ctx.beginPath(); 
    ctx.moveTo(40 * col, 0); //  X軸に40*col(8回)の位置に筆を下ろす
    ctx.lineTo(40 * col, 320);//  X軸に40*col(8回)の位置からy軸の最大幅(320)まで線を引く
    ctx.stroke();
}

// 横の線を引く
for(let row = 0; row < 8; row++){
    ctx.beginPath();
    ctx.moveTo(0, 40 * row);
    ctx.lineTo(320, 40 * row);
    ctx.stroke();
}

// 石を配置
function putStone(x, y, color){
    if(color == 1){
        ctx.fillStyle = "white";
    }else{
        ctx.fillStyle = "black";
    }
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, 2 * Math.PI);
    ctx.fill();
}

function putStoneAt(event){
    var rect = event.target.getBoundingClientRect();
    x = event.clientX;
    y = event.clientY;
    // console.log(rect)
    // console.log({x, y})
    // console.log(rect.left, rect.top)

    // clientX, clientYはCanvas上からの座標ではなく、表示されているページの上部を0としている。
    // rectはevent が起きたtarget（要素）の位置を取得している。
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    // console.log({x, y})

    // 20 + 40n に配置されるようにすれば良い
    // % は 余りを取得する演算子 
    // fx1. 158なら38 (158-38+20=140) 
    // fx2. 170なら１０ (170-10+20=180)
    x = x - x % 40 + 20 // キリが良い箇所に配置されるようにx座標を補正
    y = y - y % 40 + 20 // キリが良い箇所に配置されるようにy座標を補正
    

    // どこに石を置いたか
    let posX = (x-20) / 40
    let posY = (y-20) / 40
    console.log({posX , posY})

    // 隣接する盤面の配置を左回りで配列化
    directionX =[-1, -1, 0, 1, 1, 1, 0, -1]
    directionY =[0, -1, -1, -1, 0, 1, 1, 1]

    // 選択した盤面に石が置かれているか
    if(playBoard[posY][posX] === 0 ){
        // 配列にしてある8方向を取り出す
        for(var int = 0; int < 8; int++){
            adjacentX = posX + directionX[int]
            adjacentY = posY + directionY[int]
            console.log(adjacentX,adjacentY)
            if(playBoard[adjacentY][adjacentX] !== 0 && adjacentY < 0 || adjacentX < 0){
                putStone(x, y, player)
                playBoard[posY][posX] = player
                console.log(playBoard)
                changePlayer()
            }
        }
    }
}

// プレイヤーを切り替える
function changePlayer(){
    if(player == 1){
        player = 2
        displayPlayer.innerText = "黒のターンです"
    }else{
        player = 1
        displayPlayer.innerText = "白のターンです"
    }
}

  // 初期配置を行う関数
function initialize(){
    putStone(140, 140, 1)
    putStone(180, 140, 2)
    putStone(140, 180, 2)
    putStone(180, 180, 1)
}
// 初期配置を実装
initialize()