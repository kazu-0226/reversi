const canvas = document.getElementById("reversi")
const ctx = canvas.getContext("2d")

for(i=0; i < 100; i++){
  const size = randomSize()
  const pos = randomPotision()
  ctx.fillStyle = randomColor()
  ctx.fillRect(pos.x, pos.y, size.width, size.height)
}

function randomPotision(){
  const x = Math.random()*400
  const y = Math.random()*400
  return {x: x, y: y}
}

function randomSize(){
  const width = Math.floor(Math.random() *100)
  const height = Math.floor(Math.random() *100)
  return{ width, height}
}

function randomColor() {
  // Math.random() // 0 - 1未満の数値が返ってくる
  // Math.floor(Math.random() * 256) // 0 - 255 の整数が返る
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
