// ===== JEU DU PENDU =====
const words = ['JAVASCRIPT', 'PROGRAMMATION', 'ORDINATEUR', 'DÉVELOPPEUR', 'INTERNET', 'TECHNOLOGIE', 'VACANCES', 'AVENTURE', 'DÉCOUVERTE', 'PROJET'];
let currentWord = '';
let guessedLetters = [];
let incorrectGuesses = [];
let attempts = 6;
let gameOver = false;
let gameWon = false;

// Initialiser le jeu du pendu
function initHangman() {
    const letterBtns = document.querySelectorAll('.letter-btn');
    if (letterBtns.length > 0) {
        // On est sur la page jeux
        currentWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        incorrectGuesses = [];
        attempts = 6;
        gameOver = false;
        gameWon = false;
        
        letterBtns.forEach(btn => {
            btn.disabled = false;
            btn.style.backgroundColor = 'white';
            btn.style.color = '#1976d2';
            btn.addEventListener('click', guessLetter);
        });

        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                initHangman();
            });
        }

        updateHangmanDisplay();
    }
}

function guessLetter(e) {
    if (gameOver || gameWon) return;

    const letter = e.target.dataset.letter;
    if (guessedLetters.includes(letter) || incorrectGuesses.includes(letter)) return;

    e.target.disabled = true;

    if (currentWord.includes(letter)) {
        guessedLetters.push(letter);
        e.target.style.backgroundColor = '#4caf50';
        e.target.style.color = 'white';
    } else {
        incorrectGuesses.push(letter);
        attempts--;
        e.target.style.backgroundColor = '#d32f2f';
        e.target.style.color = 'white';
    }

    checkGameStatus();
    updateHangmanDisplay();
}

function updateHangmanDisplay() {
    const display = currentWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    const hangmanDisplay = document.getElementById('hangmanDisplay');
    if (hangmanDisplay) {
        hangmanDisplay.textContent = display;
    }

    const attemptsLeft = document.getElementById('attemptsLeft');
    if (attemptsLeft) {
        attemptsLeft.textContent = attempts;
    }

    const guessedLettersEl = document.getElementById('guessedLetters');
    if (guessedLettersEl) {
        guessedLettersEl.textContent = [...guessedLetters, ...incorrectGuesses].join(', ') || 'Aucune';
    }
}

function checkGameStatus() {
    const isWordGuessed = currentWord
        .split('')
        .every(letter => guessedLetters.includes(letter));

    const messageEl = document.getElementById('gameMessage');
    
    if (isWordGuessed) {
        gameWon = true;
        gameOver = true;
        if (messageEl) {
            messageEl.textContent = '🎉 Gagné! Le mot était: ' + currentWord;
            messageEl.classList.add('success');
        }
        disableAllButtons();
    } else if (attempts <= 0) {
        gameOver = true;
        if (messageEl) {
            messageEl.textContent = '☠️ Perdu! Le mot était: ' + currentWord;
            messageEl.classList.remove('success');
        }
        disableAllButtons();
    }
}

function disableAllButtons() {
    document.querySelectorAll('.letter-btn').forEach(btn => {
        btn.disabled = true;
    });
}

// ===== GALERIE PHOTOS VACANCES =====
function initVacancesGallery() {
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById('photo' + i);
        const placeholder = document.querySelector(`.photo-card:nth-child(${i}) .photo-placeholder`);
        
        if (input && placeholder) {
            placeholder.addEventListener('click', () => input.click());
            
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        // Créer une image
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        
                        // Vider le placeholder
                        placeholder.innerHTML = '';
                        placeholder.appendChild(img);
                        placeholder.style.cursor = 'pointer';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le jeu du pendu si on est sur la page jeux
    if (document.getElementById('hangmanDisplay')) {
        initHangman();
    }
    
    // Initialiser la galerie photos si on est sur la page vacances
    if (document.getElementById('photo1')) {
        initVacancesGallery();
    }

    // Ajouter la classe active au lien de navigation correspondant
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
