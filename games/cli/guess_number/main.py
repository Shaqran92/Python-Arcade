import random

print(r"""
    //   ) )                                       /__  ___/                     /|    / /                      /                        
   //                  ___      ___      ___         / /  / __      ___         //|   / /           _   __     / __      ___      __    
  //  ____  //   / / //___) ) ((   ) ) ((   ) )     / /  //   ) ) //___) )     // |  / / //   / / // ) )  ) ) //   ) ) //___) ) //  ) ) 
 //    / / //   / / //         \ \      \ \        / /  //   / / //           //  | / / //   / / // / /  / / //   / / //       //       
((____/ / ((___( ( ((____   //   ) ) //   ) )     / /  //   / / ((____       //   |/ / ((___( ( // / /  / / ((___/ / ((____   //        
""")


print("Welcome to the Number Guessing Game!")

user = input("\nEnter your name: ")

score = 0
total_score = 0
random_number = random.randint(1, 100)

def level():
    difficulty = input("\nChoose a difficultty. Type 'easy', 'medium' or 'hard': ").lower()
    return difficulty

def check(difficulty_level):
    number_of_guesses = 0
    if difficulty_level == 'easy':
        score = 100
        penalty = 10
        number_of_guesses = 10
        while number_of_guesses > 0:
            print()
            print(f"You have {number_of_guesses} attempts remaining to guess the number.")
            guess = int(input("Make a guess: "))

            if guess == random_number:
                print(f"You got it! The answer was {guess}")
                break

            elif guess > random_number:
                print("Two High.\nGuess again.")

            elif guess < random_number:
                print("Two Low.\nGuess again.")
            
            score -= penalty
            if score < 0:
                score = 0

            number_of_guesses -= 1

            if number_of_guesses == 0:
                print("\nNo attempts remaining.\n You Lost!")
    

    elif difficulty_level == 'medium':
        score = 150
        penalty = 15
        number_of_guesses = 7
        while number_of_guesses > 0:
            print()
            print(f"You have {number_of_guesses} attempts remaining to guess the number.")
            guess = int(input("Make a guess: "))

            if guess == random_number:
                print(f"You got it! The answer was {guess}")
                break

            elif guess > random_number:
                print("Two High.\nGuess again.")

            elif guess < random_number:
                print("Two Low.\nGuess again.")

            score -= penalty
            if score < 0:
                score = 0

            number_of_guesses -= 1

            if number_of_guesses == 0:
                print("\nNo attempts remaining.\n You Lost!")


    elif difficulty_level == 'hard':
        score = 200
        penalty = 20
        number_of_guesses = 5
        while number_of_guesses > 0:
            print()
            print(f"You have {number_of_guesses} attempts remaining to guess the number.")
            guess = int(input("Make a guess: "))

            if guess == random_number:
                print(f"You got it! The answer was {guess}")
                break

            elif guess > random_number:
                print("Two High.\nGuess again.")

            elif guess < random_number:
                print("Two Low.\nGuess again.")

            score -= penalty
            if score < 0:
                score = 0

            number_of_guesses -= 1

            if number_of_guesses == 0:
                print("\nNo attempts remaining.\n You Lost!")
            

    return score


play_again = "yes"
while play_again == "yes":
    random_number = random.randint(1, 100)  
    difficulty_level = level()
    final_score = check(difficulty_level)

    total_score += final_score

    print(f"\n{user}, your score this round: {final_score}\n")
    print(f"Your TOTAL score so far: {total_score}\n")

    play_again = input("Do you want to play again? (yes/no): ").lower()

print(f"\nThanks for playing, {user}! Your final score was {total_score}. Goodbye!")