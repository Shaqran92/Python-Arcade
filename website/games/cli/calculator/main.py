print("""
     _____________________
    |  _________________  |
    | |Pythonist     0. | |
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
""")

def addition(num1, num2):
    return num1 + num2

def subtraction(num1, num2):
    return num1 - num2

def multiplication(num1, num2):
    return num1 * num2

def division(num1, num2):
    div = num1 / num2
    return round(div, 2)


while True:
    further = ''
    number1 = float(input("Enter the first number: "))
    print("+\n-\n*\n/")
    while further != 'n':
        operator = input("Choose an operator: ")    
        number2 = float(input("Enter the second number: "))

        match operator:
            case '+':
                result = addition(number1, number2)
            case '-':
                result = subtraction(number1, number2)
            case '*':
                result = multiplication(number1, number2)
            case '/':
                result = division(number1, number2)
            case _:
                print("Invalid. Input")
        
        print(f"{number1} {operator} {number2} = {result}")
        
        further = input(f"Type 'y' to continue calculation with {result}, or type 'n' to start a new calculation: ").lower()
        number1 = result
        if further == 'n':
            print("\n" + "=" * 50 + "\n")
            break