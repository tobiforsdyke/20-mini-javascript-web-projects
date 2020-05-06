const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalPara = document.getElementById('final-para');

const figureParts = document.querySelectorAll('.figure-part');
const eyes = document.querySelectorAll('.figure-part-eye');

const words = ['application', 'beautiful', 'hangman', 'noose', 'actually', 'xylophone', 'instrument', 'poodle', 'pianist', 'hexadecimal', 'monster', 'dinosaur', 'bicycle', 'generator', 'cemetary', 'television', 'microwave', 'hamster', 'grandmother', 'jacket', 'jaguar', 'tree', 'quizzical', 'fruit'];

// const words = ['tree'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];



// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // Display body parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost!';
        finalPara.innerText = '';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});


// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
            )
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        // finalMessage.innerText = 'Congratulations! You Won...';
        finalMessage.innerText = 'Congratulations!';
        finalPara.innerText = 'You Won...';
        popup.style.display = 'flex';
    }
}

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //  Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
  
    selectedWord = words[Math.floor(Math.random() * words.length)];
  
    displayWord();
  
    updateWrongLettersEl();
  
    popup.style.display = 'none';
  });

displayWord();