const MAP_W = 500
const MAP_H = 500
const BIRD_W = 50
const BIRD_H = 50

const randomRange = function (minV, maxV) {
    return minV + Math.random() * (maxV - minV)
}
let bird_left = randomRange(0, 400)
let bird_top = randomRange(0, 400)

let direction = "right" 
let speed_x = 1

let score = 0
let timerId

const initGame = function () {
    map.style.width = `${MAP_W}px`
    map.style.height = `${MAP_H}px`
}
const startBird = function () {
    bird.style.transition = `0s`;
    let bird_left = randomRange(0, 400)
    let bird_top = randomRange(0, 400)
    updateBirdStyle()
    timerId = setInterval(moveBird, 20)
}
const moveBird = function () {
    //HW add logic to this function
    //so if the bird hits the bottom
    // -stop the timer
    // - #result < "GAME OVER"
    // - #result <button onclick="???">Play Again</button>
     bird_left += speed_x
    if(bird_left >= MAP_W - BIRD_W) { 
        speed_x *= -1
        direction = "left"
        //hw1 make the drop randomish 10 ..30px
        bird_top += randomRange(10,30)
        speed_x *= 1.05
    }
    if(bird_left <= 0) {
        speed_x *= -1
        direction = "right"
        bird_top += randomRange(10,30)
        speed_x *= 1.05
    }
     updateBirdStyle()
}

const updateBirdStyle = function () {
    bird.style.transform = `
    translateY(${bird_top}px)
    translateX(${bird_left}px) scaleX(${direction == "left" ? -1 : 1})`
}
const shoot = function () {
    let cx = event.layerX + BIRD_W / 2
    let cy = event.layerY + BIRD_H / 2

    let bcx = bird_left + BIRD_W / 2
    let bcy = bird_top + BIRD_H / 2
 
    if (Math.abs(cx - 10 - bcx) <= 10 && Math.abs(cy - 10 - bcy) <= 10) {
        score += 5
        result.innerHTML = `SCORE: ${score}`
        clearInterval(timerId)

        bird.style.transition = `1s`;
        bird.style.transform = `
            translateX(${bird_left}px)
            translateY(${MAP_H}px) 
            scaleX(${direction == "left" ? -1 : 1})
            rotate(3turn)`
        setTimeout(startBird, 2000)
    }
}
// startBird()