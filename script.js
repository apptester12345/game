const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const apologyPopup = document.getElementById("apologyPopup");
const apologySong = document.getElementById("apologySong");

let score = 0;  
const heartsToCollect = 15; 

document.addEventListener("mousemove", (event) => {
    const basketWidth = basket.offsetWidth;
    let positionX = event.clientX - basketWidth / 2;
    positionX = Math.max(0, Math.min(positionX, window.innerWidth - basketWidth));
    basket.style.left = positionX + "px";
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    heart.style.left = Math.random() * (window.innerWidth - 30) + "px";
    heart.style.top = "0px";
    gameArea.appendChild(heart);
    fall(heart);
}

function fall(heart) {
    const fallInterval = setInterval(() => {
        const heartTop = parseInt(heart.style.top);
        heart.style.top = heartTop + 4 + "px";

        if (heartTop > window.innerHeight - 40) {
            const basketRect = basket.getBoundingClientRect();
            const heartRect = heart.getBoundingClientRect();

            if (
                heartRect.left < basketRect.right &&
                heartRect.right > basketRect.left &&
                heartRect.bottom > basketRect.top
            ) {
                score++;
                scoreDisplay.innerText = score;
                heart.remove();
                clearInterval(fallInterval);

                if (score >= heartsToCollect) {
                    showApologyMessage();
                }
            } else if (heartTop > window.innerHeight) {
                heart.remove();
                clearInterval(fallInterval);
            }
        }
    }, 20);
}

function showApologyMessage() {
    apologyPopup.style.display = "block";
    apologySong.play();
}

setInterval(createHeart, 800);