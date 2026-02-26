alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

def encoded(shift_amount, word):
    new_word = ''
    for letters in word:
        if letters in alphabet:
            position = alphabet.index(letters)
            new_position = (position + shift_amount) % len(alphabet)
            new_word += alphabet[new_position]
        else:
            new_word += letters
    
    print(f"The encoded word is: '{new_word}'")

def decoded(shift_amount, word):
    new_word = ''
    for letters in word:
        if letters in alphabet:
            position = alphabet.index(letters)
            new_position = (position - shift_amount) % len(alphabet)
            new_word += alphabet[new_position]
        else:
            new_word += letters

    print(f"The decoded word is: '{new_word}'")

decision = ''

while decision != 'no':
    direction = input("Type 'encode' to encrypt, type 'decode' to decrypt: ")
    text = input("Enter the message: ").lower()
    shift = int(input("Type the shift number: "))

    if direction == 'encode':
        encoded(shift, text)
    elif direction == "decode":
        decoded(shift, text)
    else:
        print("Invalid Input.")

    decision = input("\nIf you want to go again enter 'Yes', Otherwise enter 'No'\n").lower()