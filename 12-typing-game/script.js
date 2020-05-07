const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

/* async function getWords() {
    const res = await fetch(`https://random-word-api.herokuapp.com/word?number=10&swear=0`);
    const data = await res.json();
    return data.push(words);
}
getWords();
console.log(words); */

// List of words for game
const words = [
    'sign',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'helmet',
    'badger',
    'dependent',
    'interface',
    'steering',
    'silver',
    'happiness',
    'superficial',
    'curry',
    'eight',
    'armpit',
    'attempt',
    'computer',
    'admits',
    'dragged',
    'loving',
    'radio',
    'habitat',
    'generous',
    'freedom',
    'gloves',
    'gown',
    'dressing',
    'glasses',
    'waterfall',
    'westworld',
    'journey',
    'fiddle',
    'pianist',
    'chocolate'
];

// Initialise word
let randomWord;

// Initialise score
let score = 0;

// Initialise time
let time =10;

// Initialise difficulty - set to value from localStorage or medium as default
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on the text field on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update the score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update the time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        // End game
        gameOver();
    }
}

// Game over - show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score was ${score}</p>
        <button onclick="window.location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        // Clear text field
        e.target.value = '';
        if (difficulty === 'hard') {
            time += 1;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }
        updateTime();
    }
});
// Settings event listeners
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});