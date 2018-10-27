//colors database
const db = ["indianRed", "indianRed", "crimson", "crimson", "hotPink", "hotPink", "deepPink", "deepPink", "coral", "coral", "orangeRed", "orangeRed", "orange", "orange", "khaki", "khaki", "darkKhaki", "darkKhaki", "indigo", "indigo", "darkOrhid", "darkOrhid", "greenYellow", "greenYellow", "forestGreen", "forestGreen", "darkOliveGreen", "darkOliveGreen", "cadetBlue", "cadetBlue", "deepSkyBlue", "deepSkyBlue", "chocolate", "chocolate", "brown", "brown"];

//Globals
let cardsAmount = document.querySelector("#cardSlider").value;
let colors = [];
let allCards;
let hiddenCards;
let startTimer;

//Functions

function timer() {
    let seconds = 0;
    let display = document.querySelector("span.time");
    return function () {
        seconds++;
        display.textContent = `${Math.floor((seconds/3600)%60) < 10 ? "0" + Math.floor((seconds/3600)%60) : Math.floor((seconds/3600)%60)}:${Math.floor((seconds/60)%60) < 10 ? "0" + Math.floor((seconds/60)%60) : Math.floor((seconds/60)%60) }:${Math.floor(seconds%60) < 10 ? "0" + Math.floor(seconds%60) : Math.floor(seconds%60)}`;
    }
}

function updateCounter(counter) {
    document.querySelector(".attempts").textContent = counter;
}

function checkPoints(points, attempts) {
    if (points >= (cardsAmount / 2)) {
        setTimeout(function () {
            clearInterval(startTimer);
            gameOver(attempts);
        }, 200);
    }
}

function gameOver(attempts) {
    document.querySelector(".endView").classList.remove("inactive");
    document.querySelector(".endView .attempts").textContent = attempts;
    document.querySelector(".endView .time").textContent = document.querySelector(".game span.time").textContent;
    document.querySelector(".restart").addEventListener("click", function () {
        location.reload();
    })
}

function drawCards(x) {
    for (let i = 0; i < x; i++) {
        colors.push(db[i]);
    }
    for (let i = 0; i < x; i++) {
        let div = document.createElement("div");
        let colorIndex = Math.floor(Math.random() * colors.length);
        div.classList.add(colors[colorIndex]);
        colors.splice(colorIndex, 1);
        document.querySelector("main").appendChild(div);
    }
}

function startGame() {
    let counter = 3;
    const counterDiv = document.createElement("div");
    counterDiv.textContent = counter;
    counterDiv.classList.add("countdown");
    document.querySelector(".game").appendChild(counterDiv);
    const countdown = setInterval(function () {
        counter--;
        if (counter == 0) {
            counterDiv.textContent = "START!";
            counterDiv.classList.add("start");
        } else if (counter < 0) {
            clearInterval(countdown);
            counterDiv.remove();
        } else {
            counterDiv.textContent = counter;
        }
    }, 1000);

    setTimeout(function () {
        allCards = document.querySelectorAll("main div");
        allCards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", showCard);
        });
        startTimer = setInterval(timer(), 1000);
    }, 3000);
}


function showCards(e) {
    let activeCards = [];
    let attempts = 0;
    let points = 0;
    return function (e) {
        e.target.classList.remove("hidden");
        hiddenCards = document.querySelectorAll(".hidden");
        e.target.removeEventListener("click", showCard);
        activeCards.push(e.target.classList.value)
        if (activeCards.length > 1) {
            hiddenCards.forEach(card => {
                card.removeEventListener("click", showCard);
            });
            if (activeCards[0] === activeCards[1]) {
                activeCards.length = 0;
                attempts++;
                updateCounter(attempts);
                points++;
                hiddenCards.forEach(card => {
                    card.addEventListener("click", showCard);
                });
                console.log(points);
            } else {
                let divs = document.querySelectorAll("." + activeCards[0]);
                setTimeout(function () {
                    divs.forEach(div => {
                        div.classList.add("hidden");
                    })
                    e.target.classList.add("hidden");
                    hiddenCards = document.querySelectorAll(".hidden");
                    hiddenCards.forEach(card => {
                        card.addEventListener("click", showCard);
                    });
                    activeCards.length = 0;
                    attempts++;
                    updateCounter(attempts);
                }, 300)
            }
        }
        checkPoints(points, attempts);
    }
}
const showCard = showCards();

function menuStart() {
    document.querySelector(".game").classList.remove("inactive");
    document.querySelector(".startView").classList.add("inactive");
    drawCards(cardsAmount);
    setTimeout(startGame, 1000);

}

function menuQuit() {
    document.querySelector(".startView").classList.add("inactive");
    setTimeout(function () {
        window.close();
    }, 1000);
}

function run() {
    document.querySelector("[data-name=start]").addEventListener("click", menuStart);
    document.querySelector("[data-name=quit]").addEventListener("click", menuQuit);

    document.querySelector(".sliderValue").textContent = cardsAmount;
    document.querySelector("#cardSlider").addEventListener("input", function () {
        cardsAmount = document.querySelector("#cardSlider").value;
        document.querySelector(".sliderValue").textContent = cardsAmount;
    });
}

//Run

run();