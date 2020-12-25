const canvas = document.getElementById("reversi")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"

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