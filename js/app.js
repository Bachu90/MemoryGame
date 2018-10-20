//colors database
const db = ["indianRed", "indianRed", "crimson", "crimson", "hotPink", "hotPink", "deepPink", "deepPink", "coral", "coral", "orangeRed", "orangeRed", "orange", "orange", "khaki", "khaki", "darkKhaki", "darkKhaki", "indigo", "indigo", "darkOrhid", "darkOrhid", "greenYellow", "greenYellow", "forestGreen", "forestGreen", "darkOliveGreen", "darkOliveGreen", "cadetBlue", "cadetBlue", "deepSkyBlue", "deepSkyBlue", "chocolate", "chocolate", "brown", "brown"];

//Settings
const cardsAmount = 36;

//Globals
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
            alert("Wygrałeś! Twój czas to: " + document.querySelector("span.time").textContent + ". Ilość prób: " + attempts);
            location.reload();
        }, 200);
    }
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
    setTimeout(function () {
        allCards = document.querySelectorAll("main div");
        allCards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", showCard);
        });
        startTimer = setInterval(timer(), 1000);
    }, 2000);
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

//Run

drawCards(cardsAmount);
startGame();