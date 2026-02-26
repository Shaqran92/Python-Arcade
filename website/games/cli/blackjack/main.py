import random

print(r'''
     --------                   _     _            _    _            _    
    |A _  _  |                 | |   | |          | |  (_)          | |   
    | ( \/ ).-------           | |__ | | __ _  ___| | ___  __ _  ___| | __
    |  \  /|K  /\   |          | '_ \| |/ _` |/ __| |/ / |/ _` |/ __| |/ /
    |   \/ |  /  \  |          | |_) | | (_| | (__|   <| | (_| | (__|   < 
     ------|  \  /  |          |_.__/|_|\__,_|\___|_|\_\ |\__,_|\___|_|\_\
           |   \/  K|                                 _/ |                
            --------                                 |__/                    
''')

cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

def calculate_total(hand):
    total = sum(hand)
    while total > 21 and 11 in hand:
        hand[hand.index(11)] = 1 
        total = sum(hand)
    return total

user_cards = random.choices(cards, k=2)
computer_cards = random.choices(cards, k=2)

while True:
    total_of_user_cards = calculate_total(user_cards)
    total_of_computer_cards = calculate_total(computer_cards)

    print(f"\nUser Cards: {user_cards} (Total: {total_of_user_cards})")
    print(f"Computer Cards: {computer_cards} (Total: {total_of_computer_cards})")

    if total_of_user_cards == 21:
        print("Blackjack! You win!")
        break
    elif total_of_user_cards > 21:
        print("You bust! You lose!")
        break
    elif total_of_computer_cards == 21:
        print("Computer got Blackjack! You lose!")
        break
    elif total_of_computer_cards > 21:
        print("Computer busts! You win!")
        break

    stand_or_draw = input("Do you want to 'Draw' a card or 'Stand' with these cards: ").lower()
    if stand_or_draw == 'stand':
        break
    elif stand_or_draw == 'draw':
        user_cards.append(random.choice(cards))
    else:
        print("Invalid input. Please type 'Draw' or 'Stand'.")

while total_of_computer_cards < 17:
    computer_cards.append(random.choice(cards))
    total_of_computer_cards = calculate_total(computer_cards)

print(f"\nFinal User Cards: {user_cards} (Total: {total_of_user_cards})")
print(f"Final Computer Cards: {computer_cards} (Total: {total_of_computer_cards})")

if total_of_user_cards > total_of_computer_cards and total_of_user_cards <= 21:
    print("You win!")
elif total_of_user_cards < total_of_computer_cards and total_of_computer_cards <= 21:
    print("You lose!")
elif total_of_user_cards == total_of_computer_cards and total_of_computer_cards <= 21:
    print("It's a tie!")
