import random

letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
numbers = ['1','2','3','4','5','6','7','8','9','0']
symbols = ['!','@','#','$','%','^','&','*','(',')']

letter = int(input("How many letters would you like in you password?\n"))
number = int(input("How many numbers would you like in you password?\n"))
symbol = int(input("How many symbols would you like in you password?\n"))

password = ''

for letter_password in range(0, letter):
    random_letters = random.choice(letters)
    password += str(random_letters)
for number_password in range(0, number):
    random_numbers = random.choice(numbers)
    password += str(random_numbers)
for symbol_password in range(0, symbol):
    random_symbols = random.choice(symbols)
    password += str(random_symbols)

print(f"Here is your password: {password}")