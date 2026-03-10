import game_data
import art
import random


def comparision():
    print(art.logo)
    score = 0
    while True:
        random_choice1 = random.choice(game_data.data)
        random_choice2 = random.choice(game_data.data)

        print("Compare A: " + random_choice1['name'] + ", a " + random_choice1['description'])
        print(art.vs)
        print("Against B: " + random_choice2['name'] + ", a " + random_choice2['description'])
        check = input("Who has the more followers? 'A' or 'B': ").lower()

        if check == 'a':
            if random_choice1['follower_count'] < random_choice2['follower_count']:
                print(f"Sorry, that's wrong. Final score: {score}.")
                break
            elif random_choice1['follower_count'] > random_choice2['follower_count']:
                score += 1
                print("\n" + "=" * 50 + "\n")
                print(art.logo)
                print(f"You're right! Current score: {score}.")
        elif check == 'b':
            if random_choice1['follower_count'] > random_choice2['follower_count']:
                print(f"Sorry, that's wrong. Final score: {score}.")
                break
            elif random_choice1['follower_count'] < random_choice2['follower_count']:
                score += 1
                print("\n" + "=" * 50 + "\n")
                print(art.logo)
                print(f"You're right! Current score: {score}.")

comparision()