const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul')
let missed = 0;
let match = null;

// starts the game on click

const reset = document.querySelector('.btn__reset');
reset.addEventListener('click', (e) => {
    overlay.style.display = 'none';
    addPhraseToDisplay(phraseArray);
});

// holds phrases to be guessed

let phrases = [
    'Sylvester Stallone',
    'Talia Shire',
    'Burt Young',
    'Carl Weathers',
    'Burgess Meredith',
    'Tony Burton',
    'Dolph Lundgren',
    'Brigitte Nielsen'
]

// randomly selects phrase and converts it to array of letters and spaces

const phraseArray = getRandomPhraseAsArray(phrases)

function getRandomPhraseAsArray(arr) {
    let randomNum = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNum];
    return phrase.split('');
}

// converts phrase array to list of li nodes and displays it on the page

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${arr[i]}`;
        if (arr[i] === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        ul.appendChild(li);  
    }
}

// checks if letter clicked matches any of the letters in the phrase

function checkLetter(clicked) {
    const letters = document.querySelectorAll('.letter')
    let match = null;
    for (let i = 0; i < letters.length; i ++) {
        if (clicked.textContent === letters[i].textContent.toLowerCase()) {
            letters[i].classList.add('show');
            match = letters[i].textContent;
        }
    }
    return match;
}

// replaces the full heart image with a lost heart when player clicks a letter not in the phrase

function changeHeart() {
    let hearts = document.querySelectorAll('#scoreboard li');
    hearts[missed - 1].innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`
}

// checks if player has won or run out of lives and displays the corresponding overlay

function checkWin() {
    let letters = document.querySelectorAll('.letter');
    let shownLetters = document.querySelectorAll('.show');
    let headline = document.querySelector('.title');
    if (letters.length === shownLetters.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        headline.innerText = `Congratulations, you won!`;
    } else if (missed > 4) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        headline.innerText = `Sorry, you lost!`;
    }
}

// listens for player click

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') { 
        e.target.classList.add('chosen');
        let letterFound = checkLetter(e.target);
        if (letterFound === null) {
            missed += 1;
            console.log(missed);
            changeHeart();
        }
    }
    checkWin();
})
