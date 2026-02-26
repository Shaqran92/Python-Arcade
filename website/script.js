/* =========================================
   PYTHON ARCADE - MAIN SCRIPT
   ========================================= */

// Game Data
const games = [
    // Text Games (formerly CLI)
    {
        id: 'blackjack',
        name: 'Blackjack',
        icon: '🎴',
        type: 'text',
        description: 'Classic card game - beat the dealer by getting closer to 21!'
    },
    {
        id: 'hangman',
        name: 'Hangman',
        icon: '📝',
        type: 'text',
        description: 'Guess the hidden word letter by letter before time runs out!'
    },
    {
        id: 'rock_paper_scissors',
        name: 'Rock Paper Scissors',
        icon: '✊',
        type: 'text',
        description: 'Classic hand game - Rock beats Scissors, Scissors beats Paper!'
    },
    {
        id: 'treasure_island',
        name: 'Treasure Island',
        icon: '🏝️',
        type: 'text',
        description: 'Text adventure - make the right choices to find the treasure!'
    },
    {
        id: 'guess_number',
        name: 'Guess the Number',
        icon: '🔢',
        type: 'text',
        description: 'Guess the secret number between 1 and 100!'
    },
    {
        id: 'higher_lower',
        name: 'Higher Lower',
        icon: '📊',
        type: 'text',
        description: 'Guess which celebrity has more followers!'
    },
    {
        id: 'caesar_cipher',
        name: 'Secret Encoder',
        icon: '🔐',
        type: 'text',
        description: 'Encrypt and decrypt secret messages!'
    },
    {
        id: 'calculator',
        name: 'Calculator',
        icon: '🧮',
        type: 'text',
        description: 'A fully functional calculator for all your math needs!'
    },
    {
        id: 'password_generator',
        name: 'Password Generator',
        icon: '🔑',
        type: 'text',
        description: 'Generate super secure random passwords!'
    },
    {
        id: 'tic_tac_toe',
        name: 'Tic Tac Toe',
        icon: '❌',
        type: 'text',
        description: 'Classic X and O - play against a smart computer opponent!'
    },
    {
        id: 'word_scramble',
        name: 'Word Scramble',
        icon: '🔤',
        type: 'text',
        description: 'Unscramble the letters to find the hidden word!'
    },
    // Arcade Games (formerly GUI)
    {
        id: 'snake',
        name: 'Snake',
        icon: '🐍',
        type: 'arcade',
        description: 'Classic snake game - eat food to grow, avoid walls and yourself!'
    },
    {
        id: 'pong',
        name: 'Pong',
        icon: '🏓',
        type: 'arcade',
        description: 'Two-player paddle game - bounce the ball past your opponent!'
    },
    {
        id: 'turtle_crossing',
        name: 'Road Crossing',
        icon: '🐢',
        type: 'arcade',
        description: 'Help the turtle cross the busy road without getting hit!'
    },
    {
        id: 'turtle_racing',
        name: 'Turtle Racing',
        icon: '🏁',
        type: 'arcade',
        description: 'Bet on a turtle and watch the exciting race!'
    },
    {
        id: 'breakout',
        name: 'Breakout',
        icon: '🧱',
        type: 'arcade',
        description: 'Smash all the bricks with a bouncing ball and paddle!'
    },
    {
        id: 'space_invaders',
        name: 'Space Invaders',
        icon: '👾',
        type: 'arcade',
        description: 'Defend Earth from waves of descending alien invaders!'
    },
    {
        id: 'flappy_bird',
        name: 'Flappy Bird',
        icon: '🐤',
        type: 'arcade',
        description: 'Tap to fly through pipe gaps - how far can you go?'
    },
    {
        id: 'tetris',
        name: 'Tetris',
        icon: '🟦',
        type: 'arcade',
        description: 'Stack and clear falling blocks in this timeless classic!'
    },
    {
        id: 'asteroids',
        name: 'Asteroids',
        icon: '☄️',
        type: 'arcade',
        description: 'Pilot your ship through space, dodge and blast asteroids!'
    },
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        icon: '💣',
        type: 'arcade',
        description: 'Reveal safe cells and flag mines - don\'t get blown up!'
    },
    {
        id: 'memory_match',
        name: 'Memory Match',
        icon: '🃏',
        type: 'arcade',
        description: 'Flip cards and find matching pairs to clear the board!'
    }
];

// DOM Elements
const gamesGrid = document.getElementById('gamesGrid');
const textGamesGrid = document.getElementById('textGamesGrid');
const arcadeGamesGrid = document.getElementById('arcadeGamesGrid');
const gameModal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const terminalContainer = document.getElementById('terminalContainer');
const gameCanvasContainer = document.getElementById('gameCanvasContainer');
const closeModal = document.getElementById('closeModal');
const restartGame = document.getElementById('restartGame');
const filterTabs = document.querySelectorAll('.tab');
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const gameCanvas = document.getElementById('gameCanvas');
const gameInstructions = document.getElementById('gameInstructions');

// Current game state
let currentGame = null;
let currentGameInstance = null;

// Terminal helper class
class Terminal {
    constructor(outputEl, inputEl) {
        this.output = outputEl;
        this.input = inputEl;
    }

    writeLine(text, color = 'white') {
        const line = document.createElement('div');
        line.style.color = this.getColor(color);
        line.style.whiteSpace = 'pre-wrap';
        line.style.fontFamily = "'Courier New', monospace";
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    getColor(color) {
        const colors = {
            white: '#ffffff',
            cyan: '#00f5ff',
            green: '#00ff00',
            red: '#ff4444',
            yellow: '#ffff00',
            magenta: '#ff00ff'
        };
        return colors[color] || color;
    }

    clear() {
        this.output.innerHTML = '';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    setupEventListeners();
    setupSmoothScroll();
    setupNavHighlight();
});

// Render all game cards
function renderGames() {
    gamesGrid.innerHTML = games.map(game => createGameCard(game)).join('');

    const textGames = games.filter(g => g.type === 'text');
    textGamesGrid.innerHTML = textGames.map(game => createGameCard(game)).join('');

    const arcadeGames = games.filter(g => g.type === 'arcade');
    arcadeGamesGrid.innerHTML = arcadeGames.map(game => createGameCard(game)).join('');
}

// Create a game card
function createGameCard(game) {
    const typeLabel = game.type === 'text' ? 'TEXT' : 'ARCADE';
    return `
        <div class="game-card" data-type="${game.type}" data-id="${game.id}">
            <div class="game-card-header">
                <span class="game-icon">${game.icon}</span>
                <span class="game-type ${game.type}">${typeLabel}</span>
            </div>
            <div class="game-card-body">
                <h3 class="game-title">${game.name}</h3>
                <p class="game-description">${game.description}</p>
            </div>
            <div class="game-card-footer">
                <button class="btn btn-primary play-btn" onclick="openGame('${game.id}')">
                    ▶ Play Now
                </button>
            </div>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    closeModal.addEventListener('click', closeGameModal);

    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameModal.classList.contains('active')) {
            closeGameModal();
        }
    });

    restartGame.addEventListener('click', () => {
        if (currentGame) {
            startGame(currentGame);
        }
    });

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterGames(tab.dataset.filter);
        });
    });

    // Terminal input handler
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value;
            terminalInput.value = '';

            if (currentGameInstance && currentGameInstance.handleInput) {
                currentGameInstance.handleInput(input);
            }
        }
    });
}

// Filter games
function filterGames(filter) {
    const cards = gamesGrid.querySelectorAll('.game-card');
    cards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open game modal
function openGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    currentGame = game;
    modalTitle.textContent = game.icon + ' ' + game.name;

    gameModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    startGame(game);
}

// Resize game canvas to fill available space (CSS only, keep internal resolution)
function resizeGameCanvas() {
    // Wait a frame so the container has its layout dimensions
    requestAnimationFrame(() => {
        const container = gameCanvasContainer;
        const instructions = gameInstructions;

        // Get container dimensions
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Account for instructions height + some padding
        const instructionsHeight = instructions.offsetHeight || 0;
        const availableHeight = containerHeight - instructionsHeight - 20;
        const availableWidth = containerWidth - 20;

        // Respect the canvas's actual aspect ratio (not all games are square)
        const canvasRatio = gameCanvas.width / gameCanvas.height;
        let displayWidth, displayHeight;

        if (availableWidth / availableHeight > canvasRatio) {
            // Container is wider than canvas ratio — fit by height
            displayHeight = availableHeight;
            displayWidth = displayHeight * canvasRatio;
        } else {
            // Container is taller than canvas ratio — fit by width
            displayWidth = availableWidth;
            displayHeight = displayWidth / canvasRatio;
        }

        if (displayWidth > 0 && displayHeight > 0) {
            // Only scale via CSS — do NOT change canvas.width/height
            gameCanvas.style.width = displayWidth + 'px';
            gameCanvas.style.height = displayHeight + 'px';
        }
    });
}

// Re-resize canvas on window resize
window.addEventListener('resize', () => {
    if (currentGame && currentGame.type === 'arcade') {
        resizeGameCanvas();
    }
});

// Start a game
function startGame(game) {
    // Stop any existing game
    if (currentGameInstance && currentGameInstance.stop) {
        currentGameInstance.stop();
    }

    if (game.type === 'text') {
        // Text-based game
        terminalContainer.style.display = 'flex';
        gameCanvasContainer.style.display = 'none';
        terminalOutput.innerHTML = '';
        terminalInput.value = '';
        terminalInput.focus();

        const terminal = new Terminal(terminalOutput, terminalInput);
        currentGameInstance = window.TextGames[game.id];
        currentGameInstance.init(terminal);

    } else {
        // Arcade game
        terminalContainer.style.display = 'none';
        gameCanvasContainer.style.display = 'flex';

        // Resize canvas to fill available space
        resizeGameCanvas();

        currentGameInstance = window.ArcadeGames[game.id];
        const instructions = currentGameInstance.init(gameCanvas);
        gameInstructions.textContent = instructions || '';
    }
}

// Close game modal
function closeGameModal() {
    gameModal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Stop current game
    if (currentGameInstance && currentGameInstance.stop) {
        currentGameInstance.stop();
    }

    currentGame = null;
    currentGameInstance = null;
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navigation highlight
function setupNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
