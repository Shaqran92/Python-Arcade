rock = '''
    _______
---'  _____)
     (______)
      (______)
      (_____)
---'__(___)          
'''

paper = ''''
    _______
---'  _____)_____
           ______)
           _______)
        _________)
---'____________) 
'''

scissors = '''
    ________
---'    ____)____
           ______)
         _________)
        (____)
---'___(___) 
'''


import random

choices = ['Rock', 'Paper', 'Scissors']

computer_choice = random.choice(choices)
user_choice = input("What do you want to choose? (Rock, Paper, Scissors) ").lower()

if computer_choice.lower() == 'rock' and user_choice.lower() == 'scissors':
    print(f"Computer choice\n{rock}")
    print(f"Your Choice\n{scissors}")
    print("\nComputer Win's.")
elif computer_choice.lower() == 'paper' and user_choice.lower() == 'rock':
    print(f"Computer choice\n{paper}")
    print(f"Your Choice\n{rock}")
    print("\nComputer Win's.")
elif computer_choice.lower() == 'scissors' and user_choice.lower() == 'paper':
    print(f"Computer choice\n{scissors}")
    print(f"Your Choice\n{paper}")
    print("\nComputer Win's.")
elif computer_choice.lower() == 'rock' and user_choice.lower() == 'paper':
    print(f"Computer choice\n{rock}")
    print(f"Your Choice\n{paper}")
    print("\nYou Win's.")
elif computer_choice.lower() == 'paper' and user_choice.lower() == 'scissors':
    print(f"Computer choice\n{paper}")
    print(f"Your Choice\n{scissors}")
    print("\nYou Win's.")
elif computer_choice.lower() == 'scissors' and user_choice.lower() == 'rock':
    print(f"Computer choice\n{scissors}")
    print(f"Your Choice\n{rock}")
    print("\nYou Win's.")
