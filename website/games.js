/* =========================================
   PYTHON ARCADE - ALL GAMES IN JAVASCRIPT
   ========================================= */

// ==========================================
// TEXT GAMES (formerly CLI)
// ==========================================

// ----- BLACKJACK -----
const BlackjackGame = {
    cards: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
    userCards: [],
    computerCards: [],
    gameOver: false,

    init(terminal) {
        this.terminal = terminal;
        this.userCards = [];
        this.computerCards = [];
        this.gameOver = false;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
     --------                   _     _            _    _            _    
    |A _  _  |                 | |   | |          | |  (_)          | |   
    | ( \\/ ).-------           | |__ | | __ _  ___| | ___  __ _  ___| | __
    |  \\  /|K  /\\   |          | '_ \\| |/ _\` |/ __| |/ / |/ _\` |/ __| |/ /
    |   \\/ |  /  \\  |          | |_) | | (_| | (__|   <| | (_| | (__|   < 
     ------|  \\  /  |          |_.__/|_|\\__,_|\\___|_|\\_\\ |\\__,_|\\___|_|\\_\\
           |   \\/  K|                                 _/ |                
            --------                                 |__/                    
`, 'cyan');
        this.dealInitialCards();
    },

    dealInitialCards() {
        this.userCards = [this.drawCard(), this.drawCard()];
        this.computerCards = [this.drawCard(), this.drawCard()];
        this.showStatus();
    },

    drawCard() {
        return this.cards[Math.floor(Math.random() * this.cards.length)];
    },

    calculateTotal(hand) {
        let total = hand.reduce((a, b) => a + b, 0);
        let aces = hand.filter(c => c === 11).length;
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }
        return total;
    },

    showStatus() {
        const userTotal = this.calculateTotal(this.userCards);
        const compTotal = this.calculateTotal(this.computerCards);

        this.terminal.writeLine(`\nYour Cards: [${this.userCards.join(', ')}] (Total: ${userTotal})`, 'green');
        this.terminal.writeLine(`Computer Cards: [${this.computerCards[0]}, ?]`, 'yellow');

        if (userTotal === 21) {
            this.terminal.writeLine('\n🎉 Blackjack! You win!', 'green');
            this.gameOver = true;
        } else if (userTotal > 21) {
            this.terminal.writeLine('\n💥 You bust! You lose!', 'red');
            this.gameOver = true;
        } else {
            this.terminal.writeLine("\nType 'draw' for another card or 'stand' to hold:", 'white');
        }
    },

    handleInput(input) {
        if (this.gameOver) {
            this.init(this.terminal);
            return;
        }

        const choice = input.toLowerCase().trim();
        if (choice === 'draw' || choice === 'd') {
            this.userCards.push(this.drawCard());
            this.showStatus();
        } else if (choice === 'stand' || choice === 's') {
            this.computerPlay();
        } else {
            this.terminal.writeLine("Type 'draw' or 'stand'", 'yellow');
        }
    },

    computerPlay() {
        let compTotal = this.calculateTotal(this.computerCards);
        while (compTotal < 17) {
            this.computerCards.push(this.drawCard());
            compTotal = this.calculateTotal(this.computerCards);
        }

        const userTotal = this.calculateTotal(this.userCards);
        this.terminal.writeLine(`\nComputer Cards: [${this.computerCards.join(', ')}] (Total: ${compTotal})`, 'yellow');

        if (compTotal > 21) {
            this.terminal.writeLine('\n🎉 Computer busts! You win!', 'green');
        } else if (compTotal > userTotal) {
            this.terminal.writeLine('\n😢 Computer wins!', 'red');
        } else if (compTotal < userTotal) {
            this.terminal.writeLine('\n🎉 You win!', 'green');
        } else {
            this.terminal.writeLine("\n🤝 It's a tie!", 'yellow');
        }
        this.gameOver = true;
        this.terminal.writeLine('\nPress Enter to play again...', 'white');
    }
};

// ----- HANGMAN -----
const HangmanGame = {
    words: ['PYTHON', 'JAVASCRIPT', 'ARCADE', 'GAMING', 'DEVELOPER', 'COMPUTER', 'KEYBOARD', 'MONITOR', 'PROGRAM', 'WEBSITE'],
    word: '',
    guessed: [],
    wrongGuesses: 0,
    maxWrong: 6,

    init(terminal) {
        this.terminal = terminal;
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessed = [];
        this.wrongGuesses = 0;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
 _                                           
| |                                            
| |__   __ _ _ __   __ _ _ __ ___   __ _ _ __  
| '_ \\ / _\` | '_ \\ / _\` | '_ \` _ \\ / _\` | '_ \\ 
| | | | (_| | | | | (_| | | | | | | (_| | | | |
|_| |_|\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_|
                    __/ |                      
                   |___/                       
`, 'cyan');
        this.showStatus();
    },

    getHangman() {
        const stages = [
            '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========',
            '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========',
            '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========',
            '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========',
            '  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========',
            '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========',
            '  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n========='
        ];
        return stages[this.wrongGuesses];
    },

    getDisplayWord() {
        return this.word.split('').map(l => this.guessed.includes(l) ? l : '_').join(' ');
    },

    showStatus() {
        this.terminal.writeLine('\n' + this.getHangman(), 'yellow');
        this.terminal.writeLine('\nWord: ' + this.getDisplayWord(), 'green');
        this.terminal.writeLine('Guessed: ' + (this.guessed.join(', ') || 'none'), 'white');
        this.terminal.writeLine(`Remaining: ${this.maxWrong - this.wrongGuesses} tries`, 'cyan');
        this.terminal.writeLine('\nGuess a letter:', 'white');
    },

    handleInput(input) {
        const letter = input.toUpperCase().trim()[0];

        if (!letter || !/[A-Z]/.test(letter)) {
            this.terminal.writeLine('Please enter a letter A-Z', 'yellow');
            return;
        }

        if (this.guessed.includes(letter)) {
            this.terminal.writeLine('Already guessed that letter!', 'yellow');
            return;
        }

        this.guessed.push(letter);

        if (this.word.includes(letter)) {
            this.terminal.writeLine('✓ Correct!', 'green');
        } else {
            this.wrongGuesses++;
            this.terminal.writeLine('✗ Wrong!', 'red');
        }

        if (this.wrongGuesses >= this.maxWrong) {
            this.terminal.writeLine('\n' + this.getHangman(), 'red');
            this.terminal.writeLine('\n💀 Game Over! The word was: ' + this.word, 'red');
            this.terminal.writeLine('\nPress Enter to play again...', 'white');
            this.word = '';
        } else if (!this.getDisplayWord().includes('_')) {
            this.terminal.writeLine('\n🎉 You won! The word was: ' + this.word, 'green');
            this.terminal.writeLine('\nPress Enter to play again...', 'white');
            this.word = '';
        } else {
            this.showStatus();
        }
    }
};

// ----- ROCK PAPER SCISSORS -----
const RockPaperScissorsGame = {
    choices: ['rock', 'paper', 'scissors'],
    score: { player: 0, computer: 0 },

    init(terminal) {
        this.terminal = terminal;
        this.score = { player: 0, computer: 0 };
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
╔═══════════════════════════════════════╗
║     ✊ ROCK  PAPER  SCISSORS ✋        ║
╚═══════════════════════════════════════╝
`, 'cyan');
        this.terminal.writeLine("Type 'rock', 'paper', or 'scissors':", 'white');
    },

    getArt(choice) {
        const art = {
            rock: `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)`,
            paper: `
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)`,
            scissors: `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)`,
        };
        return art[choice] || '';
    },

    handleInput(input) {
        const choice = input.toLowerCase().trim();
        if (!this.choices.includes(choice)) {
            this.terminal.writeLine("Type 'rock', 'paper', or 'scissors'", 'yellow');
            return;
        }

        const computer = this.choices[Math.floor(Math.random() * 3)];

        this.terminal.writeLine('\nYou chose:', 'green');
        this.terminal.writeLine(this.getArt(choice), 'green');
        this.terminal.writeLine('\nComputer chose:', 'yellow');
        this.terminal.writeLine(this.getArt(computer), 'yellow');

        if (choice === computer) {
            this.terminal.writeLine("\n🤝 It's a tie!", 'cyan');
        } else if (
            (choice === 'rock' && computer === 'scissors') ||
            (choice === 'paper' && computer === 'rock') ||
            (choice === 'scissors' && computer === 'paper')
        ) {
            this.score.player++;
            this.terminal.writeLine('\n🎉 You win!', 'green');
        } else {
            this.score.computer++;
            this.terminal.writeLine('\n😢 Computer wins!', 'red');
        }

        this.terminal.writeLine(`\nScore - You: ${this.score.player} | Computer: ${this.score.computer}`, 'white');
        this.terminal.writeLine("\nPlay again! Type 'rock', 'paper', or 'scissors':", 'white');
    }
};

// ----- TREASURE ISLAND -----
const TreasureIslandGame = {
    stage: 0,

    init(terminal) {
        this.terminal = terminal;
        this.stage = 0;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
*******************************************************************************
          |                   |                  |                     |
 _________|________________.="";=.______________|_____________________|_______
|                   |  ,-"_,=""     \`"=.|                  |
|___________________|__"=._o\`"-._        \`"=.______________|___________________
          |                \`"=._o\`"=._      _\`"=._                     |
 _________|_____________________:=._o "=._."_.-="'"=.__________________|_______
|                   |    __.--" , ; \`"=._o." ,-"""-._ ".   |
|___________________|_._"  ,. .\` \` \`\` ,  \`"-._"-._   ". '__|___________________
          |           |o\`"=._\` , "\` \`; .". ,  "-._"-._; ;              |
 _________|___________| ;\`-.o\`"=._; ." \` '.\`"\\  . "-._ /_______________|_______
|                   | |o;    \`"-.o\`"=._\`\`  '\` " ,__.--o;   |
|___________________|_| ;     (#) \`-.o \`"=.\`_.--"_o.-; ;___|___________________
____/______/______/___|o;._    "      \`".o|o_.--"    ;o;____/______/______/____
/______/______/______/_"=._o--._        ; | ;        ; ;/______/______/______/_
____/______/______/______/__"=._o--._   ;o|o;     _._;o;____/______/______/____
/______/______/______/______/____"=._o._; | ;_.--"o.--"_/______/______/______/_
____/______/______/______/______/_____"=.o|o_.--""___/______/______/______/____
*******************************************************************************
`, 'cyan');
        this.terminal.writeLine("Welcome to Treasure Island! 🏝️", 'green');
        this.terminal.writeLine("Your mission is to find the treasure.\n", 'white');
        this.showStage();
    },

    showStage() {
        if (this.stage === 0) {
            this.terminal.writeLine("You're at a crossroad. Where do you want to go?", 'white');
            this.terminal.writeLine("Type 'left' or 'right':", 'yellow');
        } else if (this.stage === 1) {
            this.terminal.writeLine("\nYou came to a lake with an island in the middle.", 'white');
            this.terminal.writeLine("Type 'wait' for a boat or 'swim' across:", 'yellow');
        } else if (this.stage === 2) {
            this.terminal.writeLine("\nYou arrive at a house with 3 doors.", 'white');
            this.terminal.writeLine("One red, one yellow, one blue.", 'white');
            this.terminal.writeLine("Which color do you choose?", 'yellow');
        }
    },

    handleInput(input) {
        const choice = input.toLowerCase().trim();

        if (this.stage === 0) {
            if (choice === 'left') {
                this.stage = 1;
                this.showStage();
            } else if (choice === 'right') {
                this.terminal.writeLine("\n💀 You fell into a hole! Game Over!", 'red');
                this.terminal.writeLine("\nPress Enter to play again...", 'white');
                this.stage = -1;
            } else {
                this.terminal.writeLine("Type 'left' or 'right'", 'yellow');
            }
        } else if (this.stage === 1) {
            if (choice === 'wait') {
                this.stage = 2;
                this.showStage();
            } else if (choice === 'swim') {
                this.terminal.writeLine("\n🦈 You got eaten by a shark! Game Over!", 'red');
                this.terminal.writeLine("\nPress Enter to play again...", 'white');
                this.stage = -1;
            } else {
                this.terminal.writeLine("Type 'wait' or 'swim'", 'yellow');
            }
        } else if (this.stage === 2) {
            if (choice === 'yellow') {
                this.terminal.writeLine("\n🎉 You found the treasure! You Win!", 'green');
                this.terminal.writeLine("\nPress Enter to play again...", 'white');
                this.stage = -1;
            } else if (choice === 'red' || choice === 'blue') {
                const msg = choice === 'red' ? "🔥 Burned by fire!" : "🐻 Eaten by bears!";
                this.terminal.writeLine("\n" + msg + " Game Over!", 'red');
                this.terminal.writeLine("\nPress Enter to play again...", 'white');
                this.stage = -1;
            } else {
                this.terminal.writeLine("Type 'red', 'yellow', or 'blue'", 'yellow');
            }
        } else {
            this.init(this.terminal);
        }
    }
};

// ----- GUESS THE NUMBER -----
const GuessNumberGame = {
    secretNumber: 0,
    attempts: 0,
    maxAttempts: 10,

    init(terminal) {
        this.terminal = terminal;
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
╔═══════════════════════════════════════╗
║      🔢 GUESS THE NUMBER GAME 🔢      ║
╚═══════════════════════════════════════╝
`, 'cyan');
        this.terminal.writeLine("I'm thinking of a number between 1 and 100.", 'white');
        this.terminal.writeLine(`You have ${this.maxAttempts} attempts.\n`, 'yellow');
        this.terminal.writeLine("Enter your guess:", 'white');
    },

    handleInput(input) {
        const guess = parseInt(input.trim());

        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.terminal.writeLine("Please enter a number between 1 and 100", 'yellow');
            return;
        }

        this.attempts++;
        const remaining = this.maxAttempts - this.attempts;

        if (guess === this.secretNumber) {
            this.terminal.writeLine(`\n🎉 Correct! You got it in ${this.attempts} attempts!`, 'green');
            this.terminal.writeLine("\nPress Enter to play again...", 'white');
            this.secretNumber = 0;
        } else if (remaining === 0) {
            this.terminal.writeLine(`\n💀 Game Over! The number was ${this.secretNumber}`, 'red');
            this.terminal.writeLine("\nPress Enter to play again...", 'white');
            this.secretNumber = 0;
        } else if (guess < this.secretNumber) {
            this.terminal.writeLine(`📈 Too low! ${remaining} attempts left.`, 'yellow');
        } else {
            this.terminal.writeLine(`📉 Too high! ${remaining} attempts left.`, 'yellow');
        }
    }
};

// ----- HIGHER LOWER -----
const HigherLowerGame = {
    celebrities: [
        { name: 'Cristiano Ronaldo', desc: 'Footballer', followers: 500 },
        { name: 'Taylor Swift', desc: 'Singer', followers: 280 },
        { name: 'Elon Musk', desc: 'Entrepreneur', followers: 150 },
        { name: 'Ariana Grande', desc: 'Singer', followers: 380 },
        { name: 'The Rock', desc: 'Actor', followers: 390 },
        { name: 'Selena Gomez', desc: 'Singer', followers: 430 },
        { name: 'Kim Kardashian', desc: 'Reality Star', followers: 360 },
        { name: 'Lionel Messi', desc: 'Footballer', followers: 490 },
        { name: 'Beyoncé', desc: 'Singer', followers: 320 },
        { name: 'Justin Bieber', desc: 'Singer', followers: 290 }
    ],
    personA: null,
    personB: null,
    score: 0,

    init(terminal) {
        this.terminal = terminal;
        this.score = 0;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
██   ██ ██  ██████  ██   ██ ███████ ██████  
██   ██ ██ ██       ██   ██ ██      ██   ██ 
███████ ██ ██   ███ ███████ █████   ██████  
██   ██ ██ ██    ██ ██   ██ ██      ██   ██ 
██   ██ ██  ██████  ██   ██ ███████ ██   ██ 

██       ██████  ██     ██ ███████ ██████  
██      ██    ██ ██     ██ ██      ██   ██ 
██      ██    ██ ██  █  ██ █████   ██████  
██      ██    ██ ██ ███ ██ ██      ██   ██ 
███████  ██████   ███ ███  ███████ ██   ██ 
`, 'cyan');
        this.nextRound();
    },

    nextRound() {
        this.personA = this.celebrities[Math.floor(Math.random() * this.celebrities.length)];
        do {
            this.personB = this.celebrities[Math.floor(Math.random() * this.celebrities.length)];
        } while (this.personB === this.personA);

        this.terminal.writeLine(`\nCompare A: ${this.personA.name}, a ${this.personA.desc}`, 'green');
        this.terminal.writeLine('\n      VS      ', 'yellow');
        this.terminal.writeLine(`\nAgainst B: ${this.personB.name}, a ${this.personB.desc}`, 'magenta');
        this.terminal.writeLine("\nWho has more followers? Type 'A' or 'B':", 'white');
    },

    handleInput(input) {
        const choice = input.toLowerCase().trim();

        if (choice !== 'a' && choice !== 'b') {
            this.terminal.writeLine("Type 'A' or 'B'", 'yellow');
            return;
        }

        const aWins = this.personA.followers > this.personB.followers;
        const correct = (choice === 'a' && aWins) || (choice === 'b' && !aWins);

        if (correct) {
            this.score++;
            this.terminal.writeLine(`\n✓ Correct! Score: ${this.score}`, 'green');
            this.nextRound();
        } else {
            this.terminal.writeLine(`\n✗ Wrong! Final score: ${this.score}`, 'red');
            this.terminal.writeLine("\nPress Enter to play again...", 'white');
            this.score = -1;
        }
    }
};

// ----- CAESAR CIPHER -----
const CaesarCipherGame = {
    mode: 'menu',

    init(terminal) {
        this.terminal = terminal;
        this.mode = 'menu';
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
╔═══════════════════════════════════════╗
║       🔐 CAESAR CIPHER TOOL 🔐        ║
╚═══════════════════════════════════════╝
`, 'cyan');
        this.terminal.writeLine("Type 'encode' to encrypt or 'decode' to decrypt:", 'white');
    },

    handleInput(input) {
        const value = input.trim().toLowerCase();

        if (this.mode === 'menu') {
            if (value === 'encode' || value === 'decode') {
                this.mode = value;
                this.terminal.writeLine("\nEnter your message:", 'white');
            } else {
                this.terminal.writeLine("Type 'encode' or 'decode'", 'yellow');
            }
        } else if (this.mode === 'encode' || this.mode === 'decode') {
            this.message = input;
            this.mode = 'shift_' + this.mode;
            this.terminal.writeLine("Enter shift amount (1-25):", 'white');
        } else if (this.mode.startsWith('shift_')) {
            const shift = parseInt(value);
            if (isNaN(shift) || shift < 1 || shift > 25) {
                this.terminal.writeLine("Enter a number 1-25", 'yellow');
                return;
            }

            const isEncode = this.mode === 'shift_encode';
            const result = this.cipher(this.message, shift, isEncode);
            const action = isEncode ? 'Encoded' : 'Decoded';
            this.terminal.writeLine(`\n${action} message: ${result}`, 'green');
            this.terminal.writeLine("\nType 'encode' or 'decode' for another:", 'white');
            this.mode = 'menu';
        }
    },

    cipher(text, shift, encode) {
        const dir = encode ? 1 : -1;
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + dir * shift + 26) % 26) + 65);
            }
            if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + dir * shift + 26) % 26) + 97);
            }
            return char;
        }).join('');
    }
};

// ----- CALCULATOR -----
const CalculatorGame = {
    result: null,

    init(terminal) {
        this.terminal = terminal;
        this.result = null;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
     _____________________
    |  _________________  |
    | | Calculator   0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
`, 'cyan');
        this.terminal.writeLine("Enter calculation (e.g., '5 + 3' or '10 * 2'):", 'white');
    },

    handleInput(input) {
        try {
            const expr = input.replace(/x/gi, '*').replace(/÷/g, '/');
            const safeExpr = expr.replace(/[^0-9+\-*/.() ]/g, '');
            const result = Function('"use strict"; return (' + safeExpr + ')')();
            this.terminal.writeLine(`= ${result}`, 'green');
            this.result = result;
        } catch (e) {
            this.terminal.writeLine("Invalid expression. Try: 5 + 3", 'red');
        }
    }
};

// ----- PASSWORD GENERATOR -----
const PasswordGeneratorGame = {
    init(terminal) {
        this.terminal = terminal;
        this.showWelcome();
    },

    showWelcome() {
        this.terminal.writeLine(`
╔═══════════════════════════════════════╗
║      🔑 PASSWORD GENERATOR 🔑         ║
╚═══════════════════════════════════════╝
`, 'cyan');
        this.terminal.writeLine("How many characters? (8-32):", 'white');
    },

    handleInput(input) {
        const length = parseInt(input.trim());

        if (isNaN(length) || length < 8 || length > 32) {
            this.terminal.writeLine("Enter a number between 8 and 32", 'yellow');
            return;
        }

        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }

        this.terminal.writeLine(`\n🔐 Your password: ${password}`, 'green');
        this.terminal.writeLine("\nEnter length for another password:", 'white');
    }
};

// ----- TIC TAC TOE -----
const TicTacToeGame = {
    board: [],
    playerSymbol: 'X',
    aiSymbol: 'O',
    gameOver: false,

    init(terminal) {
        this.terminal = terminal;
        this.reset();
        this.showWelcome();
    },

    reset() {
        this.board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.gameOver = false;
    },

    showWelcome() {
        this.terminal.writeLine("╔══════════════════════════════╗", 'cyan');
        this.terminal.writeLine("║     ❌ TIC TAC TOE ⭕       ║", 'cyan');
        this.terminal.writeLine("╚══════════════════════════════╝", 'cyan');
        this.terminal.writeLine("\nYou are X, Computer is O", 'white');
        this.terminal.writeLine("Enter a number (1-9) to place your mark:\n", 'white');
        this.showBoard();
    },

    showBoard() {
        const b = this.board;
        const colorCell = (v) => v === 'X' ? `\x1b[36m${v}\x1b[0m` : v === 'O' ? `\x1b[35m${v}\x1b[0m` : `\x1b[90m${v}\x1b[0m`;
        this.terminal.writeLine(` ${this.fmt(b[0])} │ ${this.fmt(b[1])} │ ${this.fmt(b[2])} `, 'white');
        this.terminal.writeLine("───┼───┼───", 'white');
        this.terminal.writeLine(` ${this.fmt(b[3])} │ ${this.fmt(b[4])} │ ${this.fmt(b[5])} `, 'white');
        this.terminal.writeLine("───┼───┼───", 'white');
        this.terminal.writeLine(` ${this.fmt(b[6])} │ ${this.fmt(b[7])} │ ${this.fmt(b[8])} `, 'white');
    },

    fmt(v) {
        if (v === 'X') return '❌';
        if (v === 'O') return '⭕';
        return v;
    },

    handleInput(input) {
        if (this.gameOver) {
            this.reset();
            this.showWelcome();
            return;
        }

        const pos = parseInt(input) - 1;
        if (isNaN(pos) || pos < 0 || pos > 8 || this.board[pos] === 'X' || this.board[pos] === 'O') {
            this.terminal.writeLine("Invalid move! Pick an available number (1-9):", 'red');
            return;
        }

        this.board[pos] = 'X';
        if (this.checkWin('X')) {
            this.terminal.writeLine("");
            this.showBoard();
            this.terminal.writeLine("\n🎉 You WIN! Type anything to play again.", 'green');
            this.gameOver = true;
            return;
        }
        if (this.isDraw()) {
            this.terminal.writeLine("");
            this.showBoard();
            this.terminal.writeLine("\n🤝 It's a DRAW! Type anything to play again.", 'yellow');
            this.gameOver = true;
            return;
        }

        // AI move
        const aiMove = this.getBestMove();
        this.board[aiMove] = 'O';
        this.terminal.writeLine(`\nComputer plays position ${aiMove + 1}\n`, 'magenta');
        this.showBoard();

        if (this.checkWin('O')) {
            this.terminal.writeLine("\n💻 Computer WINS! Type anything to play again.", 'red');
            this.gameOver = true;
            return;
        }
        if (this.isDraw()) {
            this.terminal.writeLine("\n🤝 It's a DRAW! Type anything to play again.", 'yellow');
            this.gameOver = true;
            return;
        }

        this.terminal.writeLine("\nYour turn (1-9):", 'white');
    },

    checkWin(symbol) {
        const w = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        return w.some(([a, b, c]) => this.board[a] === symbol && this.board[b] === symbol && this.board[c] === symbol);
    },

    isDraw() {
        return this.board.every(c => c === 'X' || c === 'O');
    },

    getBestMove() {
        // Simple AI: try to win, block, or take center/corner
        const b = this.board;
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        // Try to win
        for (let [a, c2, c3] of lines) {
            const cells = [b[a], b[c2], b[c3]];
            const idxs = [a, c2, c3];
            if (cells.filter(c => c === 'O').length === 2 && cells.filter(c => c !== 'X' && c !== 'O').length === 1) {
                return idxs[cells.findIndex(c => c !== 'X' && c !== 'O')];
            }
        }
        // Block player
        for (let [a, c2, c3] of lines) {
            const cells = [b[a], b[c2], b[c3]];
            const idxs = [a, c2, c3];
            if (cells.filter(c => c === 'X').length === 2 && cells.filter(c => c !== 'X' && c !== 'O').length === 1) {
                return idxs[cells.findIndex(c => c !== 'X' && c !== 'O')];
            }
        }
        // Center
        if (b[4] !== 'X' && b[4] !== 'O') return 4;
        // Corners
        const corners = [0, 2, 6, 8].filter(i => b[i] !== 'X' && b[i] !== 'O');
        if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
        // Any
        const avail = b.map((v, i) => v !== 'X' && v !== 'O' ? i : -1).filter(i => i >= 0);
        return avail[Math.floor(Math.random() * avail.length)];
    }
};

// ----- WORD SCRAMBLE -----
const WordScrambleGame = {
    words: [
        { word: 'PYTHON', hint: 'A popular programming language 🐍' },
        { word: 'ARCADE', hint: 'A place with video games 🎮' },
        { word: 'CODING', hint: 'Writing computer programs 💻' },
        { word: 'ROCKET', hint: 'Goes to space 🚀' },
        { word: 'GUITAR', hint: 'A musical instrument 🎸' },
        { word: 'PLANET', hint: 'Earth is one 🌍' },
        { word: 'JUNGLE', hint: 'Tropical forest 🌴' },
        { word: 'CASTLE', hint: 'Medieval fortress 🏰' },
        { word: 'DRAGON', hint: 'Mythical fire-breathing creature 🐉' },
        { word: 'PIRATE', hint: 'Sails the seas for treasure 🏴‍☠️' },
        { word: 'WIZARD', hint: 'A magical person 🧙' },
        { word: 'KNIGHT', hint: 'Medieval armored warrior ⚔️' },
        { word: 'ZOMBIE', hint: 'The walking dead 🧟' },
        { word: 'BRIDGE', hint: 'Crosses over water 🌉' },
        { word: 'FROZEN', hint: 'Very cold, like ice 🥶' }
    ],
    currentWord: null,
    scrambled: '',
    score: 0,
    round: 0,
    maxRounds: 10,
    hintUsed: false,

    init(terminal) {
        this.terminal = terminal;
        this.score = 0;
        this.round = 0;
        this.showWelcome();
        this.nextWord();
    },

    showWelcome() {
        this.terminal.writeLine("╔══════════════════════════════╗", 'cyan');
        this.terminal.writeLine("║    🔤 WORD SCRAMBLE 🔤      ║", 'cyan');
        this.terminal.writeLine("╚══════════════════════════════╝", 'cyan');
        this.terminal.writeLine("\nUnscramble the word! Type 'hint' for a clue.", 'white');
    },

    scramble(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // Make sure it's actually scrambled
        if (arr.join('') === word) { [arr[0], arr[1]] = [arr[1], arr[0]]; }
        return arr.join('');
    },

    nextWord() {
        this.round++;
        if (this.round > this.maxRounds) {
            this.terminal.writeLine(`\n🎉 Game Over! Final Score: ${this.score}/${this.maxRounds}`, 'green');
            this.terminal.writeLine("Type anything to play again!", 'white');
            this.currentWord = null;
            return;
        }
        const idx = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[idx];
        this.scrambled = this.scramble(this.currentWord.word);
        this.hintUsed = false;
        this.terminal.writeLine(`\n━━━ Round ${this.round}/${this.maxRounds} ━━━  Score: ${this.score}`, 'cyan');
        this.terminal.writeLine(`\n🔀  ${this.scrambled.split('').join(' ')}`, 'yellow');
        this.terminal.writeLine("\nGuess the word (or type 'hint'):", 'white');
    },

    handleInput(input) {
        if (!this.currentWord) {
            this.score = 0;
            this.round = 0;
            this.showWelcome();
            this.nextWord();
            return;
        }

        if (input.toLowerCase() === 'hint') {
            this.hintUsed = true;
            this.terminal.writeLine(`💡 Hint: ${this.currentWord.hint}`, 'yellow');
            this.terminal.writeLine("Now guess the word:", 'white');
            return;
        }

        if (input.toUpperCase() === this.currentWord.word) {
            if (!this.hintUsed) {
                this.score++;
                this.terminal.writeLine("✅ Correct! +1 point", 'green');
            } else {
                this.terminal.writeLine("✅ Correct! (no point - hint was used)", 'yellow');
            }
            this.nextWord();
        } else {
            this.terminal.writeLine("❌ Wrong! Try again:", 'red');
        }
    }
};


// ==========================================
// ARCADE GAMES (formerly GUI) 
// ==========================================

// ----- SNAKE GAME -----
const SnakeGame = {
    canvas: null,
    ctx: null,
    snake: [],
    food: { x: 0, y: 0 },
    direction: 'right',
    nextDirection: 'right',
    score: 0,
    gameLoop: null,
    gridSize: 20,
    tileCount: 30,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = this.gridSize * this.tileCount;
        this.canvas.height = this.gridSize * this.tileCount;
        this.reset();
        this.bindKeys();
        this.start();
        return "Use Arrow Keys to move. Eat food to grow!";
    },

    reset() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.spawnFood();
    },

    spawnFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    },

    bindKeys() {
        document.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp': if (this.direction !== 'down') this.nextDirection = 'up'; break;
                case 'ArrowDown': if (this.direction !== 'up') this.nextDirection = 'down'; break;
                case 'ArrowLeft': if (this.direction !== 'right') this.nextDirection = 'left'; break;
                case 'ArrowRight': if (this.direction !== 'left') this.nextDirection = 'right'; break;
            }
        };
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 100);
    },

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        document.onkeydown = null;
    },

    update() {
        this.direction = this.nextDirection;
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Self collision
        if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.spawnFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;
        const g = this.gridSize;

        // Background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Grid
        ctx.strokeStyle = '#2a2a4e';
        for (let i = 0; i <= this.tileCount; i++) {
            ctx.beginPath();
            ctx.moveTo(i * g, 0);
            ctx.lineTo(i * g, this.canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * g);
            ctx.lineTo(this.canvas.width, i * g);
            ctx.stroke();
        }

        // Snake
        this.snake.forEach((seg, i) => {
            ctx.fillStyle = i === 0 ? '#00f5ff' : '#00c4cc';
            ctx.fillRect(seg.x * g + 1, seg.y * g + 1, g - 2, g - 2);
            ctx.shadowColor = '#00f5ff';
            ctx.shadowBlur = 10;
        });
        ctx.shadowBlur = 0;

        // Food
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(this.food.x * g + g / 2, this.food.y * g + g / 2, g / 2 - 2, 0, Math.PI * 2);
        ctx.fill();

        // Score
        ctx.fillStyle = '#00f5ff';
        ctx.font = '20px Orbitron';
        ctx.fillText(`Score: ${this.score}`, 10, 25);
    },

    gameOver() {
        this.stop();
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#ff00ff';
        ctx.font = '40px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 60);
        ctx.textAlign = 'left';
    }
};

// ----- PONG GAME -----
const PongGame = {
    canvas: null,
    ctx: null,
    ball: { x: 300, y: 300, vx: 5, vy: 3 },
    paddle1: { y: 250, score: 0 },
    paddle2: { y: 250, score: 0 },
    paddleHeight: 100,
    paddleWidth: 10,
    keys: {},
    gameLoop: null,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.reset();
        this.bindKeys();
        this.start();
        return "Player 1: W/S keys | Player 2: Up/Down arrows";
    },

    reset() {
        this.ball = { x: 300, y: 200, vx: 5 * (Math.random() > 0.5 ? 1 : -1), vy: 3 };
        this.paddle1 = { y: 150, score: this.paddle1?.score || 0 };
        this.paddle2 = { y: 150, score: this.paddle2?.score || 0 };
    },

    bindKeys() {
        document.onkeydown = (e) => { this.keys[e.key] = true; };
        document.onkeyup = (e) => { this.keys[e.key] = false; };
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        document.onkeydown = null;
        document.onkeyup = null;
    },

    update() {
        // Paddle movement
        if (this.keys['w'] || this.keys['W']) this.paddle1.y = Math.max(0, this.paddle1.y - 8);
        if (this.keys['s'] || this.keys['S']) this.paddle1.y = Math.min(this.canvas.height - this.paddleHeight, this.paddle1.y + 8);
        if (this.keys['ArrowUp']) this.paddle2.y = Math.max(0, this.paddle2.y - 8);
        if (this.keys['ArrowDown']) this.paddle2.y = Math.min(this.canvas.height - this.paddleHeight, this.paddle2.y + 8);

        // Ball movement
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Top/bottom bounce
        if (this.ball.y <= 0 || this.ball.y >= this.canvas.height) {
            this.ball.vy *= -1;
        }

        // Paddle collision
        if (this.ball.x <= 20 && this.ball.y >= this.paddle1.y && this.ball.y <= this.paddle1.y + this.paddleHeight) {
            this.ball.vx = Math.abs(this.ball.vx);
        }
        if (this.ball.x >= 570 && this.ball.y >= this.paddle2.y && this.ball.y <= this.paddle2.y + this.paddleHeight) {
            this.ball.vx = -Math.abs(this.ball.vx);
        }

        // Scoring
        if (this.ball.x < 0) {
            this.paddle2.score++;
            this.reset();
        }
        if (this.ball.x > this.canvas.width) {
            this.paddle1.score++;
            this.reset();
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Center line
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = '#2a2a4e';
        ctx.beginPath();
        ctx.moveTo(this.canvas.width / 2, 0);
        ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Paddles
        ctx.fillStyle = '#00f5ff';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 15;
        ctx.fillRect(10, this.paddle1.y, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = '#ff00ff';
        ctx.shadowColor = '#ff00ff';
        ctx.fillRect(580, this.paddle2.y, this.paddleWidth, this.paddleHeight);
        ctx.shadowBlur = 0;

        // Ball
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Scores
        ctx.fillStyle = '#00f5ff';
        ctx.font = '48px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(this.paddle1.score, 150, 60);
        ctx.fillStyle = '#ff00ff';
        ctx.fillText(this.paddle2.score, 450, 60);
        ctx.textAlign = 'left';
    }
};

// ----- TURTLE CROSSING -----
const TurtleCrossingGame = {
    canvas: null,
    ctx: null,
    player: { x: 285, y: 570 },
    cars: [],
    level: 1,
    gameLoop: null,
    carSpeed: 3,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.reset();
        this.bindKeys();
        this.start();
        return "Use Up Arrow to move forward. Avoid the cars!";
    },

    reset() {
        this.player = { x: 285, y: 570 };
        this.cars = [];
        this.level = 1;
        this.carSpeed = 3;
        for (let i = 0; i < 10; i++) {
            this.spawnCar();
        }
    },

    spawnCar() {
        const lanes = [100, 160, 220, 280, 340, 400, 460];
        this.cars.push({
            x: Math.random() * 800 - 100,
            y: lanes[Math.floor(Math.random() * lanes.length)],
            width: 60 + Math.random() * 40,
            speed: (this.carSpeed + Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
            color: ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff'][Math.floor(Math.random() * 5)]
        });
    },

    bindKeys() {
        document.onkeydown = (e) => {
            if (e.key === 'ArrowUp') {
                this.player.y -= 30;
            } else if (e.key === 'ArrowDown') {
                this.player.y = Math.min(this.canvas.height - 30, this.player.y + 30);
            } else if (e.key === 'ArrowLeft') {
                this.player.x = Math.max(0, this.player.x - 30);
            } else if (e.key === 'ArrowRight') {
                this.player.x = Math.min(this.canvas.width - 30, this.player.x + 30);
            }
        };
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        document.onkeydown = null;
    },

    update() {
        // Move cars
        this.cars.forEach(car => {
            car.x += car.speed;
            if (car.x > 650) car.x = -100;
            if (car.x < -100) car.x = 650;
        });

        // Check collision
        const px = this.player.x, py = this.player.y;
        for (let car of this.cars) {
            if (px + 15 > car.x && px - 15 < car.x + car.width &&
                py + 15 > car.y && py - 15 < car.y + 30) {
                this.gameOver();
                return;
            }
        }

        // Level up
        if (this.player.y < 50) {
            this.level++;
            this.carSpeed += 0.5;
            this.player.y = 570;
            this.spawnCar();
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;

        // Background - road
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Safe zones
        ctx.fillStyle = '#228B22';
        ctx.fillRect(0, 0, this.canvas.width, 60);
        ctx.fillRect(0, 540, this.canvas.width, 60);

        // Road lines
        ctx.strokeStyle = '#fff';
        ctx.setLineDash([20, 20]);
        for (let y = 90; y < 540; y += 60) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(600, y);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Cars
        this.cars.forEach(car => {
            ctx.fillStyle = car.color;
            ctx.fillRect(car.x, car.y, car.width, 30);
            ctx.fillStyle = '#222';
            ctx.fillRect(car.x + 5, car.y + 5, 15, 20);
            ctx.fillRect(car.x + car.width - 20, car.y + 5, 15, 20);
        });

        // Player (turtle)
        ctx.fillStyle = '#00f5ff';
        ctx.beginPath();
        ctx.arc(this.player.x, this.player.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#008888';
        ctx.beginPath();
        ctx.arc(this.player.x, this.player.y - 8, 6, 0, Math.PI * 2);
        ctx.fill();

        // Level
        ctx.fillStyle = '#fff';
        ctx.font = '20px Orbitron';
        ctx.fillText(`Level: ${this.level}`, 10, 35);
    },

    gameOver() {
        this.stop();
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#ff00ff';
        ctx.font = '40px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`Level Reached: ${this.level}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 60);
        ctx.textAlign = 'left';
    }
};

// ----- TURTLE RACING -----
const TurtleRacingGame = {
    canvas: null,
    ctx: null,
    turtles: [],
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
    bet: null,
    racing: false,
    winner: null,
    gameLoop: null,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.reset();
        return "Click on a turtle color to bet, then watch the race!";
    },

    reset() {
        this.turtles = this.colors.map((color, i) => ({
            color: color,
            x: 30,
            y: 50 + i * 55,
            speed: 0
        }));
        this.bet = null;
        this.racing = false;
        this.winner = null;
        this.draw();
        this.showBetting();
    },

    showBetting() {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(150, 120, 300, 160);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '24px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('Place Your Bet!', 300, 160);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click a turtle to bet on it', 300, 200);
        ctx.fillText('Then click Start Race', 300, 230);
        ctx.textAlign = 'left';

        // Add click handler
        this.canvas.onclick = (e) => this.handleClick(e);
    },

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        // Scale mouse coords to internal canvas resolution
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        if (!this.racing && !this.winner) {
            // Check if clicked on a turtle
            for (let turtle of this.turtles) {
                if (x >= turtle.x - 20 && x <= turtle.x + 20 &&
                    y >= turtle.y - 20 && y <= turtle.y + 20) {
                    this.bet = turtle.color;
                    this.draw();
                    this.showBetConfirm();
                    return;
                }
            }
        }
    },

    showBetConfirm() {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(150, 150, 300, 100);
        ctx.fillStyle = this.bet;
        ctx.font = '20px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(`You bet on ${this.bet.toUpperCase()}!`, 300, 190);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '16px Rajdhani';
        ctx.fillText('Press SPACE to start the race!', 300, 220);
        ctx.textAlign = 'left';

        document.onkeydown = (e) => {
            if (e.code === 'Space' && this.bet && !this.racing) {
                this.startRace();
            }
        };
    },

    startRace() {
        this.racing = true;
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        document.onkeydown = null;
        this.canvas.onclick = null;
    },

    update() {
        // Random movement
        this.turtles.forEach(t => {
            t.speed = Math.random() * 4;
            t.x += t.speed;
        });

        // Check winner
        for (let turtle of this.turtles) {
            if (turtle.x >= 550) {
                this.winner = turtle.color;
                this.racing = false;
                clearInterval(this.gameLoop);
                this.showResult();
                return;
            }
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Lanes
        this.colors.forEach((_, i) => {
            ctx.fillStyle = i % 2 === 0 ? '#2a2a4e' : '#222244';
            ctx.fillRect(0, 35 + i * 55, this.canvas.width, 50);
        });

        // Finish line
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 8; i++) {
            ctx.fillRect(550, i * 50, 25, 25);
            ctx.fillRect(575, 25 + i * 50, 25, 25);
        }

        // Turtles
        this.turtles.forEach(turtle => {
            ctx.fillStyle = turtle.color;
            ctx.beginPath();
            ctx.arc(turtle.x, turtle.y, 20, 0, Math.PI * 2);
            ctx.fill();

            // Highlight bet
            if (turtle.color === this.bet) {
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.lineWidth = 1;
            }
        });

        // Labels
        ctx.font = '14px Orbitron';
        this.turtles.forEach(turtle => {
            ctx.fillStyle = '#fff';
            ctx.fillText(turtle.color.toUpperCase(), 5, turtle.y + 5);
        });
    },

    showResult() {
        const ctx = this.ctx;
        this.draw();
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(100, 130, 400, 140);
        ctx.textAlign = 'center';

        if (this.winner === this.bet) {
            ctx.fillStyle = '#00ff00';
            ctx.font = '32px Orbitron';
            ctx.fillText('🎉 YOU WIN! 🎉', 300, 180);
        } else {
            ctx.fillStyle = '#ff0000';
            ctx.font = '32px Orbitron';
            ctx.fillText('YOU LOSE!', 300, 180);
        }

        ctx.fillStyle = this.winner;
        ctx.font = '20px Orbitron';
        ctx.fillText(`${this.winner.toUpperCase()} won the race!`, 300, 220);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', 300, 255);
        ctx.textAlign = 'left';
    }
};

// ----- BREAKOUT GAME -----
const BreakoutGame = {
    canvas: null,
    ctx: null,
    paddle: { x: 250, width: 100, height: 12 },
    ball: { x: 300, y: 450, vx: 4, vy: -4, radius: 8 },
    bricks: [],
    score: 0,
    lives: 3,
    gameLoop: null,
    keys: {},
    brickRows: 6,
    brickCols: 10,
    started: false,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 500;
        this.reset();
        this.bindKeys();
        this.start();
        return "Use Arrow Keys or Mouse to move paddle. Break all bricks!";
    },

    reset() {
        this.paddle = { x: 250, width: 100, height: 12 };
        this.ball = { x: 300, y: 450, vx: 4, vy: -4, radius: 8 };
        this.score = 0;
        this.lives = 3;
        this.started = false;
        this.createBricks();
    },

    createBricks() {
        this.bricks = [];
        const colors = ['#ff0055', '#ff4400', '#ffaa00', '#00ff88', '#00aaff', '#aa44ff'];
        for (let r = 0; r < this.brickRows; r++) {
            for (let c = 0; c < this.brickCols; c++) {
                this.bricks.push({
                    x: 10 + c * 58,
                    y: 40 + r * 28,
                    width: 54,
                    height: 22,
                    color: colors[r],
                    alive: true
                });
            }
        }
    },

    bindKeys() {
        document.onkeydown = (e) => { this.keys[e.key] = true; if (e.key === ' ') this.started = true; };
        document.onkeyup = (e) => { this.keys[e.key] = false; };
        this.canvas.onmousemove = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            this.paddle.x = (e.clientX - rect.left) * scaleX - this.paddle.width / 2;
        };
        this.canvas.onclick = () => { this.started = true; };
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) { clearInterval(this.gameLoop); this.gameLoop = null; }
        document.onkeydown = null;
        document.onkeyup = null;
        if (this.canvas) this.canvas.onmousemove = null;
        if (this.canvas) this.canvas.onclick = null;
    },

    update() {
        // Paddle movement
        if (this.keys['ArrowLeft']) this.paddle.x -= 8;
        if (this.keys['ArrowRight']) this.paddle.x += 8;
        this.paddle.x = Math.max(0, Math.min(this.canvas.width - this.paddle.width, this.paddle.x));

        if (!this.started) { this.draw(); return; }

        // Ball movement
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Wall bounce
        if (this.ball.x <= this.ball.radius || this.ball.x >= this.canvas.width - this.ball.radius) this.ball.vx *= -1;
        if (this.ball.y <= this.ball.radius) this.ball.vy *= -1;

        // Paddle bounce
        if (this.ball.y + this.ball.radius >= this.canvas.height - 30 &&
            this.ball.x >= this.paddle.x && this.ball.x <= this.paddle.x + this.paddle.width &&
            this.ball.vy > 0) {
            this.ball.vy = -Math.abs(this.ball.vy);
            const hitPos = (this.ball.x - this.paddle.x) / this.paddle.width - 0.5;
            this.ball.vx = hitPos * 8;
        }

        // Bottom — lose life
        if (this.ball.y > this.canvas.height) {
            this.lives--;
            if (this.lives <= 0) { this.gameOver(false); return; }
            this.ball = { x: 300, y: 450, vx: 4, vy: -4, radius: 8 };
            this.started = false;
        }

        // Brick collision
        for (let brick of this.bricks) {
            if (!brick.alive) continue;
            if (this.ball.x + this.ball.radius > brick.x && this.ball.x - this.ball.radius < brick.x + brick.width &&
                this.ball.y + this.ball.radius > brick.y && this.ball.y - this.ball.radius < brick.y + brick.height) {
                brick.alive = false;
                this.ball.vy *= -1;
                this.score += 10;
            }
        }

        // Win check
        if (this.bricks.every(b => !b.alive)) { this.gameOver(true); return; }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Bricks
        for (let brick of this.bricks) {
            if (!brick.alive) continue;
            ctx.fillStyle = brick.color;
            ctx.shadowColor = brick.color;
            ctx.shadowBlur = 8;
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        }
        ctx.shadowBlur = 0;

        // Paddle
        const grad = ctx.createLinearGradient(this.paddle.x, 0, this.paddle.x + this.paddle.width, 0);
        grad.addColorStop(0, '#00f5ff');
        grad.addColorStop(1, '#ff00ff');
        ctx.fillStyle = grad;
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 15;
        ctx.fillRect(this.paddle.x, this.canvas.height - 30, this.paddle.width, this.paddle.height);
        ctx.shadowBlur = 0;

        // Ball
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // HUD
        ctx.fillStyle = '#00f5ff';
        ctx.font = '18px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 10, 25);
        ctx.textAlign = 'right';
        ctx.fillText(`Lives: ${'❤️'.repeat(this.lives)}`, this.canvas.width - 10, 25);
        ctx.textAlign = 'left';

        if (!this.started) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, this.canvas.height / 2 - 25, this.canvas.width, 50);
            ctx.fillStyle = '#00f5ff';
            ctx.font = '20px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('Click or press SPACE to launch', this.canvas.width / 2, this.canvas.height / 2 + 7);
            ctx.textAlign = 'left';
        }
    },

    gameOver(won) {
        this.stop();
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.textAlign = 'center';
        ctx.font = '40px Orbitron';
        ctx.fillStyle = won ? '#00ff88' : '#ff00ff';
        ctx.fillText(won ? 'YOU WIN!' : 'GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 25);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 60);
        ctx.textAlign = 'left';
    }
};

// ----- SPACE INVADERS -----
const SpaceInvadersGame = {
    canvas: null,
    ctx: null,
    player: { x: 280, width: 40, height: 20 },
    bullets: [],
    enemies: [],
    enemyBullets: [],
    enemyDir: 1,
    enemySpeed: 1,
    score: 0,
    lives: 3,
    gameLoop: null,
    keys: {},
    lastShot: 0,
    wave: 1,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.reset();
        this.bindKeys();
        this.start();
        return "Arrow Keys to move, SPACE to shoot. Destroy all aliens!";
    },

    reset() {
        this.player = { x: 280, width: 40, height: 20 };
        this.bullets = [];
        this.enemyBullets = [];
        this.score = 0;
        this.lives = 3;
        this.wave = 1;
        this.enemyDir = 1;
        this.enemySpeed = 1;
        this.lastShot = 0;
        this.createEnemies();
    },

    createEnemies() {
        this.enemies = [];
        const types = ['👾', '👽', '🛸'];
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 10; c++) {
                this.enemies.push({
                    x: 50 + c * 50,
                    y: 50 + r * 42,
                    width: 32,
                    height: 32,
                    alive: true,
                    type: types[Math.min(r, 2)],
                    points: (5 - r) * 10
                });
            }
        }
    },

    bindKeys() {
        document.onkeydown = (e) => { this.keys[e.key] = true; e.preventDefault(); };
        document.onkeyup = (e) => { this.keys[e.key] = false; };
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) { clearInterval(this.gameLoop); this.gameLoop = null; }
        document.onkeydown = null;
        document.onkeyup = null;
    },

    update() {
        const now = Date.now();
        // Player movement
        if (this.keys['ArrowLeft']) this.player.x = Math.max(0, this.player.x - 5);
        if (this.keys['ArrowRight']) this.player.x = Math.min(this.canvas.width - this.player.width, this.player.x + 5);

        // Shooting
        if (this.keys[' '] && now - this.lastShot > 300) {
            this.bullets.push({ x: this.player.x + this.player.width / 2, y: this.canvas.height - 50 });
            this.lastShot = now;
        }

        // Move bullets
        this.bullets = this.bullets.filter(b => { b.y -= 8; return b.y > 0; });
        this.enemyBullets = this.enemyBullets.filter(b => { b.y += 5; return b.y < this.canvas.height; });

        // Move enemies
        let moveDown = false;
        const aliveEnemies = this.enemies.filter(e => e.alive);
        for (let e of aliveEnemies) {
            e.x += this.enemyDir * this.enemySpeed;
            if (e.x <= 5 || e.x + e.width >= this.canvas.width - 5) moveDown = true;
        }
        if (moveDown) {
            this.enemyDir *= -1;
            for (let e of aliveEnemies) e.y += 15;
        }

        // Enemy shooting
        if (aliveEnemies.length > 0 && Math.random() < 0.02) {
            const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
            this.enemyBullets.push({ x: shooter.x + shooter.width / 2, y: shooter.y + shooter.height });
        }

        // Bullet-enemy collision
        for (let b of this.bullets) {
            for (let e of this.enemies) {
                if (!e.alive) continue;
                if (b.x > e.x && b.x < e.x + e.width && b.y > e.y && b.y < e.y + e.height) {
                    e.alive = false;
                    b.y = -10;
                    this.score += e.points;
                }
            }
        }

        // Enemy bullet-player collision
        for (let b of this.enemyBullets) {
            if (b.x > this.player.x && b.x < this.player.x + this.player.width &&
                b.y > this.canvas.height - 45 && b.y < this.canvas.height - 25) {
                this.lives--;
                b.y = this.canvas.height + 10;
                if (this.lives <= 0) { this.gameOver(); return; }
            }
        }

        // Enemy reaches bottom
        for (let e of aliveEnemies) {
            if (e.y + e.height >= this.canvas.height - 50) { this.gameOver(); return; }
        }

        // Wave complete
        if (aliveEnemies.length === 0) {
            this.wave++;
            this.enemySpeed = Math.min(this.enemySpeed + 0.5, 4);
            this.createEnemies();
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Stars
        ctx.fillStyle = '#ffffff22';
        for (let i = 0; i < 50; i++) {
            const sx = (i * 137 + 50) % this.canvas.width;
            const sy = (i * 199 + 30) % this.canvas.height;
            ctx.fillRect(sx, sy, 2, 2);
        }

        // Enemies
        ctx.font = '28px serif';
        for (let e of this.enemies) {
            if (!e.alive) continue;
            ctx.fillText(e.type, e.x, e.y + 28);
        }

        // Player ship
        ctx.fillStyle = '#00f5ff';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(this.player.x + this.player.width / 2, this.canvas.height - 45);
        ctx.lineTo(this.player.x, this.canvas.height - 25);
        ctx.lineTo(this.player.x + this.player.width, this.canvas.height - 25);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Bullets
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        for (let b of this.bullets) {
            ctx.fillRect(b.x - 2, b.y, 4, 12);
        }
        ctx.fillStyle = '#ff4444';
        ctx.shadowColor = '#ff4444';
        for (let b of this.enemyBullets) {
            ctx.fillRect(b.x - 2, b.y, 4, 10);
        }
        ctx.shadowBlur = 0;

        // HUD
        ctx.fillStyle = '#00f5ff';
        ctx.font = '18px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 10, 25);
        ctx.fillText(`Wave: ${this.wave}`, 250, 25);
        ctx.textAlign = 'right';
        ctx.fillText(`Lives: ${'❤️'.repeat(this.lives)}`, this.canvas.width - 10, 25);
        ctx.textAlign = 'left';
    },

    gameOver() {
        this.stop();
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff00ff';
        ctx.font = '40px Orbitron';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`Score: ${this.score}  |  Wave: ${this.wave}`, this.canvas.width / 2, this.canvas.height / 2 + 15);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 55);
        ctx.textAlign = 'left';
    }
};

// ----- FLAPPY BIRD -----
const FlappyBirdGame = {
    canvas: null,
    ctx: null,
    bird: { x: 80, y: 300, vy: 0, radius: 15 },
    pipes: [],
    score: 0,
    gameLoop: null,
    started: false,
    dead: false,
    gravity: 0.45,
    flapForce: -7.5,
    pipeGap: 150,
    pipeWidth: 55,
    frameCount: 0,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 600;
        this.reset();
        this.bindKeys();
        this.start();
        return "Press SPACE or Click to flap. Fly through the gaps!";
    },

    reset() {
        this.bird = { x: 80, y: 300, vy: 0, radius: 15 };
        this.pipes = [];
        this.score = 0;
        this.started = false;
        this.dead = false;
        this.frameCount = 0;
    },

    bindKeys() {
        const flap = (e) => {
            if (this.dead) return;
            if (e.type === 'keydown' && e.code !== 'Space') return;
            e.preventDefault();
            this.started = true;
            this.bird.vy = this.flapForce;
        };
        document.onkeydown = flap;
        this.canvas.onclick = flap;
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) { clearInterval(this.gameLoop); this.gameLoop = null; }
        document.onkeydown = null;
        if (this.canvas) this.canvas.onclick = null;
    },

    update() {
        if (!this.started) { this.draw(); return; }
        if (this.dead) return;

        this.frameCount++;
        this.bird.vy += this.gravity;
        this.bird.y += this.bird.vy;

        // Generate pipes
        if (this.frameCount % 90 === 0) {
            const gapY = 100 + Math.random() * (this.canvas.height - 250);
            this.pipes.push({ x: this.canvas.width, gapY: gapY, scored: false });
        }

        // Move pipes
        for (let p of this.pipes) {
            p.x -= 3;
            // Score
            if (!p.scored && p.x + this.pipeWidth < this.bird.x) {
                this.score++;
                p.scored = true;
            }
        }
        this.pipes = this.pipes.filter(p => p.x > -this.pipeWidth);

        // Collision
        if (this.bird.y + this.bird.radius > this.canvas.height || this.bird.y - this.bird.radius < 0) {
            this.gameOver();
            return;
        }
        for (let p of this.pipes) {
            if (this.bird.x + this.bird.radius > p.x && this.bird.x - this.bird.radius < p.x + this.pipeWidth) {
                if (this.bird.y - this.bird.radius < p.gapY || this.bird.y + this.bird.radius > p.gapY + this.pipeGap) {
                    this.gameOver();
                    return;
                }
            }
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;
        // Sky gradient
        const grad = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, '#0c0c2e');
        grad.addColorStop(1, '#1a1a3e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Pipes
        for (let p of this.pipes) {
            // Top pipe
            const topGrad = ctx.createLinearGradient(p.x, 0, p.x + this.pipeWidth, 0);
            topGrad.addColorStop(0, '#00aa55');
            topGrad.addColorStop(0.5, '#00ff88');
            topGrad.addColorStop(1, '#00aa55');
            ctx.fillStyle = topGrad;
            ctx.fillRect(p.x, 0, this.pipeWidth, p.gapY);
            ctx.fillRect(p.x - 4, p.gapY - 20, this.pipeWidth + 8, 20);

            // Bottom pipe
            ctx.fillStyle = topGrad;
            ctx.fillRect(p.x, p.gapY + this.pipeGap, this.pipeWidth, this.canvas.height);
            ctx.fillRect(p.x - 4, p.gapY + this.pipeGap, this.pipeWidth + 8, 20);
        }

        // Bird
        ctx.fillStyle = '#ffcc00';
        ctx.shadowColor = '#ffcc00';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.bird.x, this.bird.y, this.bird.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Eye
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.bird.x + 6, this.bird.y - 4, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.bird.x + 7, this.bird.y - 4, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Beak
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.moveTo(this.bird.x + 14, this.bird.y);
        ctx.lineTo(this.bird.x + 24, this.bird.y + 3);
        ctx.lineTo(this.bird.x + 14, this.bird.y + 6);
        ctx.closePath();
        ctx.fill();

        // Score
        ctx.fillStyle = '#fff';
        ctx.font = '48px Orbitron';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 5;
        ctx.fillText(this.score, this.canvas.width / 2, 70);
        ctx.shadowBlur = 0;
        ctx.textAlign = 'left';

        if (!this.started) {
            ctx.fillStyle = '#00f5ff';
            ctx.font = '22px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('Tap to Start', this.canvas.width / 2, this.canvas.height / 2);
            ctx.textAlign = 'left';
        }
    },

    gameOver() {
        this.dead = true;
        this.stop();
        const ctx = this.ctx;
        this.draw();
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff00ff';
        ctx.font = '36px Orbitron';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '28px Orbitron';
        ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 15);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 55);
        ctx.textAlign = 'left';
    }
};

// ----- TETRIS -----
const TetrisGame = {
    canvas: null,
    ctx: null,
    board: [],
    cols: 10,
    rows: 20,
    cellSize: 28,
    piece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    gameLoop: null,
    dropTimer: 0,
    dropInterval: 1000,
    lastTime: 0,
    gameActive: true,

    pieces: [
        { shape: [[1, 1, 1, 1]], color: '#00f5ff' },           // I
        { shape: [[1, 1], [1, 1]], color: '#ffcc00' },          // O
        { shape: [[0, 1, 0], [1, 1, 1]], color: '#aa44ff' },      // T
        { shape: [[1, 0], [1, 0], [1, 1]], color: '#ff8800' },    // L
        { shape: [[0, 1], [0, 1], [1, 1]], color: '#4444ff' },    // J
        { shape: [[0, 1, 1], [1, 1, 0]], color: '#00ff88' },      // S
        { shape: [[1, 1, 0], [0, 1, 1]], color: '#ff0055' }       // Z
    ],

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = this.cols * this.cellSize + 140;
        this.canvas.height = this.rows * this.cellSize;
        this.reset();
        this.bindKeys();
        this.lastTime = performance.now();
        this.startLoop();
        return "Arrow Keys to move/rotate. Clear lines to score!";
    },

    reset() {
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropInterval = 1000;
        this.gameActive = true;
        this.nextPiece = this.randomPiece();
        this.spawnPiece();
    },

    randomPiece() {
        const p = this.pieces[Math.floor(Math.random() * this.pieces.length)];
        return { shape: p.shape.map(r => [...r]), color: p.color, x: 3, y: 0 };
    },

    spawnPiece() {
        this.piece = this.nextPiece;
        this.piece.x = Math.floor((this.cols - this.piece.shape[0].length) / 2);
        this.piece.y = 0;
        this.nextPiece = this.randomPiece();
        if (this.collides(this.piece.shape, this.piece.x, this.piece.y)) {
            this.gameActive = false;
            this.gameOver();
        }
    },

    collides(shape, px, py) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (!shape[r][c]) continue;
                const bx = px + c, by = py + r;
                if (bx < 0 || bx >= this.cols || by >= this.rows) return true;
                if (by >= 0 && this.board[by][bx]) return true;
            }
        }
        return false;
    },

    rotatePiece() {
        const shape = this.piece.shape;
        const rotated = shape[0].map((_, i) => shape.map(row => row[i]).reverse());
        if (!this.collides(rotated, this.piece.x, this.piece.y)) {
            this.piece.shape = rotated;
        }
    },

    lockPiece() {
        for (let r = 0; r < this.piece.shape.length; r++) {
            for (let c = 0; c < this.piece.shape[r].length; c++) {
                if (!this.piece.shape[r][c]) continue;
                const by = this.piece.y + r;
                if (by < 0) continue;
                this.board[by][this.piece.x + c] = this.piece.color;
            }
        }
        this.clearLines();
        this.spawnPiece();
    },

    clearLines() {
        let cleared = 0;
        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.board[r].every(cell => cell !== null)) {
                this.board.splice(r, 1);
                this.board.unshift(Array(this.cols).fill(null));
                cleared++;
                r++;
            }
        }
        if (cleared > 0) {
            const points = [0, 100, 300, 500, 800];
            this.score += (points[cleared] || 800) * this.level;
            this.lines += cleared;
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 80);
        }
    },

    bindKeys() {
        document.onkeydown = (e) => {
            if (!this.gameActive) return;
            switch (e.key) {
                case 'ArrowLeft':
                    if (!this.collides(this.piece.shape, this.piece.x - 1, this.piece.y)) this.piece.x--;
                    break;
                case 'ArrowRight':
                    if (!this.collides(this.piece.shape, this.piece.x + 1, this.piece.y)) this.piece.x++;
                    break;
                case 'ArrowDown':
                    if (!this.collides(this.piece.shape, this.piece.x, this.piece.y + 1)) {
                        this.piece.y++;
                        this.score += 1;
                    }
                    break;
                case 'ArrowUp':
                    this.rotatePiece();
                    break;
                case ' ':
                    while (!this.collides(this.piece.shape, this.piece.x, this.piece.y + 1)) {
                        this.piece.y++;
                        this.score += 2;
                    }
                    this.lockPiece();
                    break;
            }
            e.preventDefault();
        };
    },

    startLoop() {
        if (this.gameLoop) cancelAnimationFrame(this.gameLoop);
        const loop = (time) => {
            if (!this.gameActive) return;
            const dt = time - this.lastTime;
            this.lastTime = time;
            this.dropTimer += dt;
            if (this.dropTimer >= this.dropInterval) {
                this.dropTimer = 0;
                if (!this.collides(this.piece.shape, this.piece.x, this.piece.y + 1)) {
                    this.piece.y++;
                } else {
                    this.lockPiece();
                }
            }
            this.draw();
            this.gameLoop = requestAnimationFrame(loop);
        };
        this.gameLoop = requestAnimationFrame(loop);
    },

    stop() {
        this.gameActive = false;
        if (this.gameLoop) { cancelAnimationFrame(this.gameLoop); this.gameLoop = null; }
        document.onkeydown = null;
    },

    draw() {
        const ctx = this.ctx;
        const cs = this.cellSize;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Board border
        ctx.strokeStyle = '#00f5ff33';
        ctx.strokeRect(0, 0, this.cols * cs, this.rows * cs);

        // Grid
        ctx.strokeStyle = '#1a1a3e';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                ctx.strokeRect(c * cs, r * cs, cs, cs);
            }
        }

        // Placed blocks
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c]) {
                    ctx.fillStyle = this.board[r][c];
                    ctx.fillRect(c * cs + 1, r * cs + 1, cs - 2, cs - 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.15)';
                    ctx.fillRect(c * cs + 1, r * cs + 1, cs - 2, 4);
                }
            }
        }

        // Current piece
        if (this.piece) {
            ctx.fillStyle = this.piece.color;
            ctx.shadowColor = this.piece.color;
            ctx.shadowBlur = 8;
            for (let r = 0; r < this.piece.shape.length; r++) {
                for (let c = 0; c < this.piece.shape[r].length; c++) {
                    if (this.piece.shape[r][c]) {
                        ctx.fillRect((this.piece.x + c) * cs + 1, (this.piece.y + r) * cs + 1, cs - 2, cs - 2);
                    }
                }
            }
            ctx.shadowBlur = 0;
        }

        // Side panel
        const panelX = this.cols * cs + 10;
        ctx.fillStyle = '#00f5ff';
        ctx.font = '14px Orbitron';
        ctx.fillText('NEXT', panelX, 25);

        // Next piece preview
        if (this.nextPiece) {
            ctx.fillStyle = this.nextPiece.color;
            for (let r = 0; r < this.nextPiece.shape.length; r++) {
                for (let c = 0; c < this.nextPiece.shape[r].length; c++) {
                    if (this.nextPiece.shape[r][c]) {
                        ctx.fillRect(panelX + c * 20, 35 + r * 20, 18, 18);
                    }
                }
            }
        }

        ctx.fillStyle = '#00f5ff';
        ctx.font = '12px Orbitron';
        ctx.fillText(`SCORE`, panelX, 140);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Orbitron';
        ctx.fillText(`${this.score}`, panelX, 160);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '12px Orbitron';
        ctx.fillText(`LEVEL`, panelX, 200);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Orbitron';
        ctx.fillText(`${this.level}`, panelX, 220);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '12px Orbitron';
        ctx.fillText(`LINES`, panelX, 260);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Orbitron';
        ctx.fillText(`${this.lines}`, panelX, 280);
    },

    gameOver() {
        this.stop();
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff00ff';
        ctx.font = '36px Orbitron';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '20px Orbitron';
        ctx.fillText(`Score: ${this.score}  Level: ${this.level}`, this.canvas.width / 2, this.canvas.height / 2 + 15);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 55);
        ctx.textAlign = 'left';
    }
};

// ----- ASTEROIDS -----
const AsteroidsGame = {
    canvas: null,
    ctx: null,
    ship: { x: 300, y: 300, angle: 0, vx: 0, vy: 0 },
    bullets: [],
    asteroids: [],
    particles: [],
    score: 0,
    lives: 3,
    gameLoop: null,
    keys: {},
    level: 1,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.reset();
        this.bindKeys();
        this.start();
        return "Arrow Keys to thrust/turn, SPACE to shoot. Destroy asteroids!";
    },

    reset() {
        this.ship = { x: 300, y: 300, angle: -Math.PI / 2, vx: 0, vy: 0 };
        this.bullets = [];
        this.particles = [];
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.spawnAsteroids(5);
    },

    spawnAsteroids(count) {
        this.asteroids = [];
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Math.random() * this.canvas.width;
                y = Math.random() * this.canvas.height;
            } while (Math.hypot(x - this.ship.x, y - this.ship.y) < 100);
            this.asteroids.push(this.createAsteroid(x, y, 40));
        }
    },

    createAsteroid(x, y, radius) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        const vertices = [];
        const numVerts = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < numVerts; i++) {
            const a = (i / numVerts) * Math.PI * 2;
            const r = radius * (0.7 + Math.random() * 0.3);
            vertices.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
        }
        return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, radius, vertices };
    },

    bindKeys() {
        document.onkeydown = (e) => { this.keys[e.key] = true; e.preventDefault(); };
        document.onkeyup = (e) => { this.keys[e.key] = false; };
    },

    start() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / 60);
    },

    stop() {
        if (this.gameLoop) { clearInterval(this.gameLoop); this.gameLoop = null; }
        document.onkeydown = null;
        document.onkeyup = null;
    },

    update() {
        // Ship controls
        if (this.keys['ArrowLeft']) this.ship.angle -= 0.06;
        if (this.keys['ArrowRight']) this.ship.angle += 0.06;
        if (this.keys['ArrowUp']) {
            this.ship.vx += Math.cos(this.ship.angle) * 0.15;
            this.ship.vy += Math.sin(this.ship.angle) * 0.15;
        }

        // Shooting
        if (this.keys[' '] && this.bullets.length < 8) {
            this.keys[' '] = false;
            this.bullets.push({
                x: this.ship.x + Math.cos(this.ship.angle) * 20,
                y: this.ship.y + Math.sin(this.ship.angle) * 20,
                vx: Math.cos(this.ship.angle) * 8,
                vy: Math.sin(this.ship.angle) * 8,
                life: 50
            });
        }

        // Move ship
        this.ship.x += this.ship.vx;
        this.ship.y += this.ship.vy;
        this.ship.vx *= 0.99;
        this.ship.vy *= 0.99;

        // Wrap around
        const w = this.canvas.width, h = this.canvas.height;
        if (this.ship.x < 0) this.ship.x = w;
        if (this.ship.x > w) this.ship.x = 0;
        if (this.ship.y < 0) this.ship.y = h;
        if (this.ship.y > h) this.ship.y = 0;

        // Move bullets
        this.bullets = this.bullets.filter(b => {
            b.x += b.vx; b.y += b.vy; b.life--;
            if (b.x < 0) b.x = w; if (b.x > w) b.x = 0;
            if (b.y < 0) b.y = h; if (b.y > h) b.y = 0;
            return b.life > 0;
        });

        // Move asteroids
        for (let a of this.asteroids) {
            a.x += a.vx; a.y += a.vy;
            if (a.x < -a.radius) a.x = w + a.radius;
            if (a.x > w + a.radius) a.x = -a.radius;
            if (a.y < -a.radius) a.y = h + a.radius;
            if (a.y > h + a.radius) a.y = -a.radius;
        }

        // Particles
        this.particles = this.particles.filter(p => { p.x += p.vx; p.y += p.vy; p.life--; return p.life > 0; });

        // Bullet-asteroid collision
        for (let b of this.bullets) {
            for (let i = this.asteroids.length - 1; i >= 0; i--) {
                const a = this.asteroids[i];
                if (Math.hypot(b.x - a.x, b.y - a.y) < a.radius) {
                    b.life = 0;
                    this.score += Math.round(100 / a.radius * 10);
                    // Explosion particles
                    for (let j = 0; j < 8; j++) {
                        const angle = Math.random() * Math.PI * 2;
                        this.particles.push({ x: a.x, y: a.y, vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3, life: 20 });
                    }
                    // Split
                    if (a.radius > 15) {
                        this.asteroids.push(this.createAsteroid(a.x, a.y, a.radius * 0.6));
                        this.asteroids.push(this.createAsteroid(a.x, a.y, a.radius * 0.6));
                    }
                    this.asteroids.splice(i, 1);
                    break;
                }
            }
        }

        // Ship-asteroid collision
        for (let a of this.asteroids) {
            if (Math.hypot(this.ship.x - a.x, this.ship.y - a.y) < a.radius + 12) {
                this.lives--;
                this.ship = { x: 300, y: 300, angle: -Math.PI / 2, vx: 0, vy: 0 };
                if (this.lives <= 0) { this.gameOver(); return; }
                break;
            }
        }

        // Level complete
        if (this.asteroids.length === 0) {
            this.level++;
            this.spawnAsteroids(4 + this.level);
        }

        this.draw();
    },

    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Stars
        ctx.fillStyle = '#ffffff22';
        for (let i = 0; i < 80; i++) {
            ctx.fillRect((i * 137 + 50) % this.canvas.width, (i * 199 + 30) % this.canvas.height, 1.5, 1.5);
        }

        // Asteroids
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        for (let a of this.asteroids) {
            ctx.beginPath();
            ctx.moveTo(a.x + a.vertices[0].x, a.y + a.vertices[0].y);
            for (let v of a.vertices) ctx.lineTo(a.x + v.x, a.y + v.y);
            ctx.closePath();
            ctx.stroke();
        }

        // Ship
        ctx.save();
        ctx.translate(this.ship.x, this.ship.y);
        ctx.rotate(this.ship.angle);
        ctx.strokeStyle = '#00f5ff';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(-12, -12);
        ctx.lineTo(-6, 0);
        ctx.lineTo(-12, 12);
        ctx.closePath();
        ctx.stroke();
        // Thrust flame
        if (this.keys['ArrowUp']) {
            ctx.strokeStyle = '#ff8800';
            ctx.shadowColor = '#ff8800';
            ctx.beginPath();
            ctx.moveTo(-6, -5);
            ctx.lineTo(-18 - Math.random() * 8, 0);
            ctx.lineTo(-6, 5);
            ctx.stroke();
        }
        ctx.restore();
        ctx.shadowBlur = 0;

        // Bullets
        ctx.fillStyle = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        for (let b of this.bullets) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Particles
        for (let p of this.particles) {
            ctx.fillStyle = `rgba(255, ${100 + p.life * 7}, 0, ${p.life / 20})`;
            ctx.fillRect(p.x, p.y, 3, 3);
        }

        // HUD
        ctx.fillStyle = '#00f5ff';
        ctx.font = '18px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.score}`, 10, 25);
        ctx.fillText(`Level: ${this.level}`, 250, 25);
        ctx.textAlign = 'right';
        ctx.fillText(`Lives: ${'▲'.repeat(this.lives)}`, this.canvas.width - 10, 25);
        ctx.textAlign = 'left';
    },

    gameOver() {
        this.stop();
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff00ff';
        ctx.font = '40px Orbitron';
        ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);
        ctx.fillStyle = '#00f5ff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`Score: ${this.score}  |  Level: ${this.level}`, this.canvas.width / 2, this.canvas.height / 2 + 15);
        ctx.font = '16px Rajdhani';
        ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 55);
        ctx.textAlign = 'left';
    }
};

// ----- MINESWEEPER -----
const MinesweeperGame = {
    canvas: null,
    ctx: null,
    grid: [],
    revealed: [],
    flagged: [],
    rows: 12,
    cols: 12,
    mines: 20,
    cellSize: 40,
    gameActive: true,
    firstClick: true,
    minesLeft: 20,
    startTime: 0,
    timer: null,
    elapsed: 0,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = this.cols * this.cellSize;
        this.canvas.height = this.rows * this.cellSize + 50;
        this.reset();
        this.bindEvents();
        this.draw();
        return "Left-click to reveal, Right-click to flag. Find all mines!";
    },

    reset() {
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.revealed = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
        this.flagged = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
        this.gameActive = true;
        this.firstClick = true;
        this.minesLeft = this.mines;
        this.elapsed = 0;
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    },

    placeMines(safeR, safeC) {
        let placed = 0;
        while (placed < this.mines) {
            const r = Math.floor(Math.random() * this.rows);
            const c = Math.floor(Math.random() * this.cols);
            if (this.grid[r][c] === -1) continue;
            if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
            this.grid[r][c] = -1;
            placed++;
        }
        // Calculate numbers
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c] === -1) continue;
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.grid[nr][nc] === -1) count++;
                    }
                }
                this.grid[r][c] = count;
            }
        }
    },

    bindEvents() {
        this.canvas.oncontextmenu = (e) => e.preventDefault();
        this.canvas.onmousedown = (e) => {
            if (!this.gameActive) return;
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY - 50;
            const c = Math.floor(x / this.cellSize);
            const r = Math.floor(y / this.cellSize);
            if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return;

            if (e.button === 2) {
                // Right click — flag
                if (!this.revealed[r][c]) {
                    this.flagged[r][c] = !this.flagged[r][c];
                    this.minesLeft += this.flagged[r][c] ? -1 : 1;
                }
            } else {
                // Left click — reveal
                if (this.flagged[r][c]) return;
                if (this.firstClick) {
                    this.firstClick = false;
                    this.placeMines(r, c);
                    this.startTime = Date.now();
                    this.timer = setInterval(() => { this.elapsed = Math.floor((Date.now() - this.startTime) / 1000); this.draw(); }, 1000);
                }
                if (this.grid[r][c] === -1) {
                    this.revealAll();
                    this.gameActive = false;
                    if (this.timer) clearInterval(this.timer);
                    this.draw();
                    this.showMessage('BOOM! 💥', '#ff0055');
                    return;
                }
                this.reveal(r, c);
                if (this.checkWin()) {
                    this.gameActive = false;
                    if (this.timer) clearInterval(this.timer);
                    this.draw();
                    this.showMessage('YOU WIN! 🎉', '#00ff88');
                    return;
                }
            }
            this.draw();
        };
    },

    reveal(r, c) {
        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return;
        if (this.revealed[r][c] || this.flagged[r][c]) return;
        this.revealed[r][c] = true;
        if (this.grid[r][c] === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    this.reveal(r + dr, c + dc);
                }
            }
        }
    },

    revealAll() {
        for (let r = 0; r < this.rows; r++)
            for (let c = 0; c < this.cols; c++)
                this.revealed[r][c] = true;
    },

    checkWin() {
        for (let r = 0; r < this.rows; r++)
            for (let c = 0; c < this.cols; c++)
                if (this.grid[r][c] !== -1 && !this.revealed[r][c]) return false;
        return true;
    },

    stop() {
        if (this.timer) { clearInterval(this.timer); this.timer = null; }
        if (this.canvas) { this.canvas.onmousedown = null; this.canvas.oncontextmenu = null; }
    },

    draw() {
        const ctx = this.ctx;
        const cs = this.cellSize;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // HUD
        ctx.fillStyle = '#00f5ff';
        ctx.font = '18px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(`💣 ${this.minesLeft}`, 10, 35);
        ctx.textAlign = 'right';
        ctx.fillText(`⏱ ${this.elapsed}s`, this.canvas.width - 10, 35);
        ctx.textAlign = 'left';

        const numColors = ['', '#00aaff', '#00cc66', '#ff4444', '#aa00ff', '#cc6600', '#00cccc', '#333', '#888'];

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const x = c * cs, y = r * cs + 50;
                if (this.revealed[r][c]) {
                    ctx.fillStyle = '#1a1a2e';
                    ctx.fillRect(x + 1, y + 1, cs - 2, cs - 2);
                    if (this.grid[r][c] === -1) {
                        ctx.fillStyle = '#ff0055';
                        ctx.font = '22px serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('💣', x + cs / 2, y + cs / 2 + 7);
                    } else if (this.grid[r][c] > 0) {
                        ctx.fillStyle = numColors[this.grid[r][c]];
                        ctx.font = 'bold 18px Orbitron';
                        ctx.textAlign = 'center';
                        ctx.fillText(this.grid[r][c], x + cs / 2, y + cs / 2 + 6);
                    }
                } else {
                    ctx.fillStyle = '#2a2a4a';
                    ctx.fillRect(x + 1, y + 1, cs - 2, cs - 2);
                    ctx.fillStyle = '#3a3a5a';
                    ctx.fillRect(x + 1, y + 1, cs - 2, 3);
                    if (this.flagged[r][c]) {
                        ctx.font = '20px serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('🚩', x + cs / 2, y + cs / 2 + 7);
                    }
                }
                ctx.strokeStyle = '#0a0a1a';
                ctx.strokeRect(x, y, cs, cs);
            }
        }
        ctx.textAlign = 'left';
    },

    showMessage(text, color) {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
        ctx.fillStyle = color;
        ctx.font = '28px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2 + 8);
        ctx.textAlign = 'left';
    }
};

// ----- MEMORY MATCH -----
const MemoryMatchGame = {
    canvas: null,
    ctx: null,
    cards: [],
    flipped: [],
    matched: [],
    cols: 6,
    rows: 4,
    cardWidth: 80,
    cardHeight: 100,
    padding: 10,
    score: 0,
    moves: 0,
    canFlip: true,
    gameLoop: null,
    symbols: ['🎮', '🚀', '🐍', '🎯', '🌟', '🔥', '💎', '🎸', '🌈', '🎲', '🏆', '⚡'],

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = this.cols * (this.cardWidth + this.padding) + this.padding;
        this.canvas.height = this.rows * (this.cardHeight + this.padding) + this.padding + 50;
        this.reset();
        this.bindEvents();
        this.startLoop();
        return "Click cards to flip them. Match all pairs to win!";
    },

    reset() {
        const totalPairs = (this.cols * this.rows) / 2;
        const chosen = this.symbols.slice(0, totalPairs);
        const deck = [...chosen, ...chosen];
        // Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        this.cards = deck;
        this.flipped = [];
        this.matched = new Set();
        this.score = 0;
        this.moves = 0;
        this.canFlip = true;
    },

    bindEvents() {
        this.canvas.onclick = (e) => {
            if (!this.canFlip) return;
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY - 50;

            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const idx = r * this.cols + c;
                    const x = this.padding + c * (this.cardWidth + this.padding);
                    const y = this.padding + r * (this.cardHeight + this.padding);
                    if (mx >= x && mx <= x + this.cardWidth && my >= y && my <= y + this.cardHeight) {
                        this.flipCard(idx);
                        return;
                    }
                }
            }
        };
    },

    flipCard(idx) {
        if (this.matched.has(idx) || this.flipped.includes(idx)) return;
        this.flipped.push(idx);

        if (this.flipped.length === 2) {
            this.moves++;
            this.canFlip = false;
            const [a, b] = this.flipped;
            if (this.cards[a] === this.cards[b]) {
                this.matched.add(a);
                this.matched.add(b);
                this.score++;
                setTimeout(() => {
                    this.flipped = [];
                    this.canFlip = true;
                    if (this.matched.size === this.cards.length) {
                        this.gameWon();
                    }
                }, 400);
            } else {
                setTimeout(() => {
                    this.flipped = [];
                    this.canFlip = true;
                }, 800);
            }
        }
    },

    startLoop() {
        if (this.gameLoop) cancelAnimationFrame(this.gameLoop);
        const loop = () => {
            this.draw();
            this.gameLoop = requestAnimationFrame(loop);
        };
        this.gameLoop = requestAnimationFrame(loop);
    },

    stop() {
        if (this.gameLoop) { cancelAnimationFrame(this.gameLoop); this.gameLoop = null; }
        if (this.canvas) this.canvas.onclick = null;
    },

    draw() {
        const ctx = this.ctx;
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // HUD
        ctx.fillStyle = '#00f5ff';
        ctx.font = '18px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(`Pairs: ${this.score}/${this.cards.length / 2}`, 10, 35);
        ctx.textAlign = 'right';
        ctx.fillText(`Moves: ${this.moves}`, this.canvas.width - 10, 35);
        ctx.textAlign = 'left';

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const idx = r * this.cols + c;
                const x = this.padding + c * (this.cardWidth + this.padding);
                const y = this.padding + r * (this.cardHeight + this.padding) + 50;
                const isFlipped = this.flipped.includes(idx) || this.matched.has(idx);

                if (this.matched.has(idx)) {
                    // Matched — glowing green
                    ctx.fillStyle = '#0a2a1a';
                    ctx.shadowColor = '#00ff88';
                    ctx.shadowBlur = 8;
                    this.roundRect(ctx, x, y, this.cardWidth, this.cardHeight, 8);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.font = '32px serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(this.cards[idx], x + this.cardWidth / 2, y + this.cardHeight / 2 + 10);
                } else if (isFlipped) {
                    // Flipped — show symbol
                    ctx.fillStyle = '#1a1a3e';
                    ctx.strokeStyle = '#00f5ff';
                    ctx.lineWidth = 2;
                    this.roundRect(ctx, x, y, this.cardWidth, this.cardHeight, 8);
                    ctx.fill();
                    ctx.stroke();
                    ctx.font = '32px serif';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#fff';
                    ctx.fillText(this.cards[idx], x + this.cardWidth / 2, y + this.cardHeight / 2 + 10);
                } else {
                    // Face-down
                    const grad = ctx.createLinearGradient(x, y, x, y + this.cardHeight);
                    grad.addColorStop(0, '#2a2a5a');
                    grad.addColorStop(1, '#1a1a3a');
                    ctx.fillStyle = grad;
                    this.roundRect(ctx, x, y, this.cardWidth, this.cardHeight, 8);
                    ctx.fill();
                    ctx.strokeStyle = '#4a4a7a';
                    ctx.lineWidth = 1;
                    this.roundRect(ctx, x, y, this.cardWidth, this.cardHeight, 8);
                    ctx.stroke();
                    ctx.fillStyle = '#4a4a7a';
                    ctx.font = '28px serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('?', x + this.cardWidth / 2, y + this.cardHeight / 2 + 10);
                }
            }
        }
        ctx.textAlign = 'left';
    },

    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    },

    gameWon() {
        setTimeout(() => {
            const ctx = this.ctx;
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#00ff88';
            ctx.font = '36px Orbitron';
            ctx.fillText('YOU WIN!', this.canvas.width / 2, this.canvas.height / 2 - 20);
            ctx.fillStyle = '#00f5ff';
            ctx.font = '20px Orbitron';
            ctx.fillText(`Completed in ${this.moves} moves`, this.canvas.width / 2, this.canvas.height / 2 + 20);
            ctx.font = '16px Rajdhani';
            ctx.fillText('Click Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 55);
            ctx.textAlign = 'left';
        }, 500);
    }
};

// Export all games
window.TextGames = {
    blackjack: BlackjackGame,
    hangman: HangmanGame,
    rock_paper_scissors: RockPaperScissorsGame,
    treasure_island: TreasureIslandGame,
    guess_number: GuessNumberGame,
    higher_lower: HigherLowerGame,
    caesar_cipher: CaesarCipherGame,
    calculator: CalculatorGame,
    password_generator: PasswordGeneratorGame,
    tic_tac_toe: TicTacToeGame,
    word_scramble: WordScrambleGame
};

window.ArcadeGames = {
    snake: SnakeGame,
    pong: PongGame,
    turtle_crossing: TurtleCrossingGame,
    turtle_racing: TurtleRacingGame,
    breakout: BreakoutGame,
    space_invaders: SpaceInvadersGame,
    flappy_bird: FlappyBirdGame,
    tetris: TetrisGame,
    asteroids: AsteroidsGame,
    minesweeper: MinesweeperGame,
    memory_match: MemoryMatchGame
};
