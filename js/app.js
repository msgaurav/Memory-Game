/*
 * Create a list that holds all of your cards
 */

const icons = [
    "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle",
    "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"
];

const cardsDeck = document.querySelector(".deck");

let opened = [];
let matched = [];

/*
 * Initializing
 */

function init() {

    const array = shuffle(icons);   // Shuffling the cards

    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsDeck.appendChild(card);
        click(card);    // Adding click event to each Card
    }

}


/*
 * Clicking Event
 */

let firstClick = true;

function click(card) {

    card.addEventListener("click", function () {

        if (firstClick) {
            startTimer();   // Timer start when first click on any card
            firstClick = false;
        }

        const currentCard = this;
        const previousCard = opened[0];

        // Had existing opened cards
        if (opened.length === 1) {
            card.classList.add("open", "show", "disable");
            opened.push(this);
            compare(currentCard, previousCard);
        } else {
            // No opened cards
            currentCard.classList.add("open", "show", "disable");
            opened.push(this);
        }

    });
}


/*
 * Comparing the cards
 */

function compare(currentCard, previousCard) {

    if (currentCard.innerHTML === previousCard.innerHTML) {
        // Matcing cards
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matched.push(currentCard, previousCard);

        opened = [];

        gameOver();
    } else {
        // Time delay of 500ms
        setTimeout(function () {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
        }, 500);

        opened = [];

    }

    addMove();
}



/*
* Calculating the Moves
*/

let movesValue = document.querySelector(".moves");
let moves = 0;
movesValue.innerHTML = 0;
function addMove() {
    moves++;
    movesValue.innerHTML = moves;

    rating();
}

/*
 * Calculating the stars for Rating
 */

let starsRating = document.querySelector(".stars");
let star = `<li><i class="fa fa-star"></i></li>`;
let starValue = 0;
starsRating.innerHTML = star + star + star;
function rating() {

    if (moves < 11) {
        starsRating.innerHTML = star + star + star;
        starValue = 3;
    } else if (moves < 16) {
        starsRating.innerHTML = star + star;
        starValue = 2;
    } else {
        starsRating.innerHTML = star;
        starValue = 1;
    }

}


/*
 * Calculating the time of play
*/

let timerDisplay = document.querySelector(".timer");
let time,
    min = 0;
    sec = 0;

timerDisplay.innerHTML = min + ' Min ' + sec + ' Sec';


function startTimer() {
    time = setInterval(function () {
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        timerDisplay.innerHTML = min + ' Min ' + sec + ' Sec';
    }, 1000);
}

/*
 * Is the game over?
 */

function gameOver() {

    if (matched.length === icons.length) {

        stopTimer();
        showModal();

    }
}

function stopTimer() {
    clearInterval(time);
}

/*
* Working of the Modal Box
*/

function showModal() {

    let modal = $("#modal-box");
    modal.css("display", "block");
    
    let takenTime = document.querySelector('.timer').innerText;

    // Modal Box message
    let winning = document.querySelector('.message');
    winning.innerHTML = `CONGRATULATIONS, YOU WON!
    \nYou finished the game with ${moves} moves and got ${starValue} star rating.
    \nTime Taken : ${takenTime}`;
    console.log(winning);

    // Replaying the game when button clicked
    let replay = document.querySelector('.play-again');
    replay.onclick = function () {
        window.location.reload();
    };
    
}

/*
 * Restarting the Game
 */

let restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
    // Delete all the cards
    cardsDeck.innerHTML = "";

    // Creates new cards
    init();

    // Resets
    reset();

});


/*
 * Resetting the whole game
 */

function reset() {

    matched = [];

    // Reset moves
    moves = 0;
    movesValue.innerHTML = moves;

    // Reset rating
    starsRating.innerHTML = star + star + star;

    
    // Reset timer
    stopTimer();
    firstClick = true;
    sec = 0;
    timerDisplay.innerHTML = min + ' Min ' + sec + ' Sec';
}


// Starting the Game
init();

// Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
