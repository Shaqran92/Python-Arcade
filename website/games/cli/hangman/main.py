import random

words = ['Abandon','Blanket','Captain','Diamond','Example','Fantasy','Gateway','Horizon','Instant','Journey','Ketchup','Lantern','Magnetic','Neutral','Opulent','Passion','Quibble','Respect','Sandbox','Trivial','Unicorn','Vulture','Warrior','Xylitol','Zeniths','Algebra','Balloon','Charity','Dynasty','Excited']

hangman = '''
 _                                           
| |                                            
| |__   __ _ _ __   __ _ _ __ ___   __ _ _ __  
| '_ \ / _` | '_ \ / _` | '_ ` _ \ / _` | '_ \ 
| | | | (_| | | | | (_| | | | | | | (_| | | | |
|_| |_|\__,_|_| |_|\__, |_| |_| |_|\__,_|_| |_|
                    __/ |                      
                   |___/                       
'''


def random_pick():
    random_word = ''
    word = random.choice(words)
    random_word += word
    return random_word

def check_word(random_word):
    word = random_word
    guesses = 0
    max_guesses = len(word)
    display = "_" * (len(word))
    print("The word is: ", display)
    while guesses < (len(word)+1) :
        letter = input("\nPlease Enter Your guess letter: ")
        print("\n" + "=" * 40 + "\n")  # Visual separator instead of clear
        if letter not in word.lower():
            guesses += 1
            guess = (max_guesses - guesses)
            print("You got it incorrect, you have: ", guess , " Additional    trials")
            if guess == 0:
                if guess == 0:
                    print('''
                            ___________
                                 |/    |
                                 |    (_)
                                 |    /|\\
                                 |     |
                                 |    /|\\
                                 |
                            _____|_____
                        ''')
                print("\nYou loss the Game!")
                return
            if guess == 6:
                print('''
                        ___________
                             |/    |
                             |    (_)
                             |    
                             |    
                             |    
                             |
                        _____|_____
                      ''')
            elif guess == 5:
                print('''
                        ___________
                             |/    |
                             |    (_)
                             |     |
                             |    
                             |    
                             |
                        _____|_____
                      ''')
            elif guess == 4:
                print('''
                        ___________
                             |/    |
                             |    (_)
                             |    /|
                             |    
                             |    
                             |
                        _____|_____
                      ''')
            elif guess == 3:
                print('''
                        ___________
                             |/    |
                             |    (_)
                             |    /|\\
                             |    
                             |    
                             |
                        _____|_____
                      ''')
            elif guess == 2:
                print('''
                        ___________
                             |/    |
                             |    (_)
                             |    /|\\
                             |     |
                             |    
                             |
                        _____|_____
                      ''')
            elif guess == 1:
                print('''
                        ___________
                             |/    |
                             |    (_)
                             |    /|\\
                             |     |
                             |    /|
                             |
                        _____|_____
                      ''')
        else:
            print("Right guess!")
            new_display = ''
            for w, l in zip(word, display):
                if letter.lower() == w.lower():
                    new_display += w
                else:
                    new_display += l
            display = new_display
            print(display)
            if not '_' in display:
                print("\nYou won the Game!")
                return

def main():
    print(hangman)

    while True:        
        word = random_pick()

        check_word(word)

        replay = input("\nDo you want to play again? (yes/no): ").lower()
        if replay != 'yes':
            print("\nThank you for playing! Goodbye!")
            break

main()