const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul')
let missed = 0;
let match = null;

const reset = document.querySelector('.btn__reset');
reset.addEventListener('click', (e) => {
    ul.innerHTML = ``;
    phraseArray.innerHTML = ``;
    overlay.style.display = 'none';
    addPhraseToDisplay(phraseArray);
});

let phrases = [
    'Sylvester Stallone',
    'Talia Shire',
    'Burt Young',
    'Carl Weathers',
    'Burgess Meredith'
]

function getRandomPhraseAsArray(arr) {
    let randomNum = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNum];
    return phrase.split('');
}

const phraseArray = getRandomPhraseAsArray(phrases)

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

function checkLetter(clicked) {
    const letters = document.querySelectorAll('.letter')
    for (let i = 0; i < letters.length; i ++) {
        if (clicked.textContent === letters[i].textContent.toLowerCase()) {
            letters[i].classList.add('show');
            match += letters[i].textContent;
        }
    }
    return match;
}

function createLostHeart() {
    let lostHeart = document.createElement('li');
    lostHeart.className = 'tries';
    lostHeart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`
    return lostHeart;
}

function changeHeart() {
    let hearts = document.querySelector('#scoreboard ol');
    hearts.removeChild(hearts.children[4]);
    hearts.insertBefore(createLostHeart(), hearts.children[0])
}

function checkWin() {
    let letters = document.querySelectorAll('.letter')
    let shownLetters = document.querySelectorAll('.show')
    if (letters.length === shownLetters.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
    } else if (missed > 4) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
    }
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') { 
        e.target.classList.add('chosen');
        let letterFound = checkLetter(e.target);
        if (letterFound.innerText === 'null') {
            missed += 1;
            changeHeart();
        }
    }
    checkWin();
})
