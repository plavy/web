let timerElement = document.querySelector('#timer')
let cookieElement = document.querySelector('#image')
let counterElement = document.querySelector('#counter')
let buttonElement = document.querySelector('#button')
let counter = localStorage.getItem('counter')
cookieElement.setAttribute('onclick', 'cookieClick()')
buttonElement.setAttribute('onclick', 'buttonClick()')
let start = true
let timeLeft = 10
let intervalTimer

function updateButton() {
    if(start) {
        buttonElement.textContent = 'START'
    } else {
        buttonElement.textContent = 'STOP'
    }
}

function updateCounter() {
    counterElement.textContent = counter;
}

function updateTimer() {
    timerElement.textContent = timeLeft
}

if(!counter) {counter = 0}
updateCounter()

function cookieClick() {
    counter++
    updateCounter()
    localStorage.setItem('counter', counter)
}

function buttonClick() {
    start = !start
    updateButton()
    counter = 0
    updateCounter()
    localStorage.setItem('counter', counter)
    if(!start) {startGame()}
    else {stopGame()}

}

function startGame() {
    timerElement.style.visibility = "visible";
    intervalTimer = setInterval(() => {
        timeLeft--;
        if (timeLeft < 1) {
            stopGame()
        }
        updateTimer()
    }, 1000)
}

function stopGame() {
    clearInterval(intervalTimer)
    timeLeft = 10
    updateTimer()
    timerElement.style.visibility = "hidden";
    start = true
    updateButton()
}