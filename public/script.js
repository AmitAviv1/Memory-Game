//Features to Add:
// Timer: Add a timer to track how long the player takes to complete the game.
// Score: Track the number of moves or attempts.
// Restart Button: Provide a way to restart the game.
// Different Levels: Vary the grid size for more difficulty.

const gameBoard = document.querySelector('.game-board');

const startGameDiv = document.getElementById('startGameDiv');
const resetBtn = document.getElementById('resetBtn');

const timerDisplay = document.getElementById('timer');
// Start the timer from 0 seconds
let timeElapsed = 0;

let matches = 0;
let totalPairs = 0;

const cardsArray6X6 = [
    '🍎', '🍎', '🍌', '🍌',
    '🍇', '🍇', '🍒', '🍒',
    '🍓', '🍓', '🍑', '🍑',
    '🍍', '🍍', '🥝', '🥝',
    '🥦', '🥦', '🥑', '🥑',
    '🥕', '🥕', '🍉', '🍉',
    '🥭', '🥭', '🌽', '🌽',
    '🍋', '🍋', '🥒', '🥒',
    '🧅', '🧅', '🧄', '🧄'
];

const cardsArray4X4 = [
    '🍎', '🍎', '🍌', '🍌',
    '🍇', '🍇', '🍒', '🍒',
    '🍓', '🍓', '🍑', '🍑',
    '🍍', '🍍', '🥝', '🥝'
];

let cardsArray;



let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function createBoard() {
    cardsArray.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
        matches++;
        if(matches == totalPairs){
            finishGame();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function changeBoardSize(gameSize) {

    gameBoard.style.gridTemplateColumns = `repeat(${gameSize}, 100px)`;
    
    if(gameSize == 4)
        cardsArray = cardsArray4X4;
    if(gameSize == 6)
        cardsArray = cardsArray6X6;

    totalPairs = cardsArray.length / 2; // Total pairs in the game
}

function StartGame(gameSize) {
    // hide buttons
    startGameDiv.style.display = "none";

    gameBoard.style.display = "grid";
    resetBtn.style.display = "block";

    timerDisplay.style.display = "block";
    timeElapsed = 0;
    updateTimer();

    changeBoardSize(gameSize);

    // Shuffle the cards array
    cardsArray.sort(() => 0.5 - Math.random());

    createBoard();
}

function ResetGame(){
    startGameDiv.style.display = "block";

    gameBoard.style.display = "none";
    resetBtn.style.display = "none";

    timerDisplay.style.display = "none";
    timeElapsed = 0;
    updateTimer();

    gameBoard.innerHTML = '';

    matches = 0;
}

function finishGame(){
    window.alert(timerDisplay.innerHTML);
    ResetGame();
}


// Function to update the timer every second
function updateTimer() {
    let minutes = Math.floor(timeElapsed / 60);
    let seconds = timeElapsed % 60;

    // Add leading zero if seconds/minutes are less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Update the timer display
    timerDisplay.textContent = `${minutes}:${seconds}`;

    // Increment the time elapsed
    timeElapsed++;
}

// Call updateTimer every second
setInterval(updateTimer, 1000);