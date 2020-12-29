const canvas = document.getElementById("reversi")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"

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
function drawStone(x, y, color){
    if(color == 1){
        ctx.fillStyle = "white";
    }else{
        ctx.fillStyle = "black";
    }
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, 2 * Math.PI);
    ctx.fill();
}

// 石ををく座標を特定する
function putStoneAt(event){
    var rect = event.target.getBoundingClientRect();
    x = event.clientX;
    y = event.clientY;

    // clientX, clientYはCanvas上からの座標ではなく、表示されているページの上部を0としている。
    // rectはevent が起きたtarget（要素）の位置を取得している。
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;

    // 20 + 40n に配置されるようにすれば良い
    // % は 余りを取得する演算子 
    // fx1. 158なら38 (158-38+20=140) 
    // fx2. 170なら１０ (170-10+20=180)
    x = x - x % 40 + 20 // キリが良い箇所に配置されるようにx座標を補正
    y = y - y % 40 + 20 // キリが良い箇所に配置されるようにy座標を補正

    // 置けるかどうか
    var check = canPutStone(x, y)
}

// 石が置けるかチェックする
function canPutStone(x ,y){
    // どこに石を置いたか
    let flg = false
    let posX = (x-20) / 40
    let posY = (y-20) / 40
    console.log({posX , posY})

    // 隣接する盤面の配置を左回りで配列化
    directionX = [-1, -1, 0, 1, 1, 1, 0, -1]
    directionY = [0, -1, -1, -1, 0, 1, 1, 1]

    // 選択した盤面に石が置かれているか
    if(playBoard[posY][posX] === 0 ){
        // 配列にしてある8方向を取り出す
        for(var int = 0; int < 8; int++){
            adjacentX = posX + directionX[int]
            adjacentY = posY + directionY[int]
            // 隣接したマスが盤面外の場合は処理を止める
            if(adjacentY < 0 ){
                continue;
            }
            if(adjacentX < 0 ){
                continue;
            }

            // 隣接したマスに石がない場合とnull（盤面外)の場合、自分の石の場合は処理を止める
            if(playBoard[adjacentY][adjacentX] === 0 || playBoard[adjacentY][adjacentX] == null || playBoard[adjacentY][adjacentX] === player ){
                continue;
            }
            
            // 隣接したマスから自分と同じに辿り着くまで、8方向にすすむ繰り返し処理
            while(playBoard[adjacentY][adjacentX]  === player){
                let changeStones = [] 
                adjacentX += directionX[int]
                adjacentY += directionY[int]
                changeStones.push({ x: adjacentX, y: adjacentY })
                if(playBoard[adjacentY][adjacentX]  === player){
                    drawStone(x, y, player)
                    playBoard[posY][posX] = player
                    console.log(playBoard)
                    changePlayer()
                }
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
    console.log("プレイヤー" + player)
}

  // 初期配置を行う関数
function initialize(){
    drawStone(140, 140, 1)
    drawStone(180, 140, 2)
    drawStone(140, 180, 2)
    drawStone(180, 180, 1)
    drawStone(220, 180, 1)
}
// 初期配置を実装
initialize()


