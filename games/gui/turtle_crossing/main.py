import time
from turtle import Screen
from player import Player
from car_manager import CarManager
from scoreboard import Scoreboard

# Screen setup
screen = Screen()
screen.setup(width=600, height=600)
screen.title("Turtle Crossing Game")
screen.bgcolor("light gray")
screen.tracer(0)

# Initialize game objects
player = Player()
car_manager = CarManager()
scoreboard = Scoreboard()

# Keyboard controls
screen.listen()
screen.onkeypress(player.up, "Up")
screen.onkeypress(player.down, "Down")  # Added down movement


def play_game():
    """Main game loop"""
    game_is_on = True
    loop_counter = 0
    
    while game_is_on:
        time.sleep(0.1)
        screen.update()
        loop_counter += 1
        
        # Create and move cars
        car_manager.create_cars()
        car_manager.move_cars()
        
        # Clean up off-screen cars every 10 loops
        if loop_counter % 10 == 0:
            car_manager.remove_offscreen_cars()
        
        # Check if player reached finish line
        if player.at_finish_line():
            scoreboard.increase_level()
            car_manager.level_up()
            player.reset_position()
            # Brief pause when leveling up
            time.sleep(0.5)
        
        # Check for collision with cars
        for car in car_manager.all_cars:
            if player.distance(car) < 20:  # More precise collision detection
                scoreboard.game_over()
                game_is_on = False
                break
    
    # Ask to play again
    screen.onkeypress(restart_game, "space")


def restart_game():
    """Reset and restart the game"""
    screen.clear()
    screen.bgcolor("light gray")
    screen.tracer(0)
    
    # Recreate finish line
    finish_line = screen.getcanvas()
    finish_line.create_line(0, 40, 600, 40, width=3, fill="green", dash=(10, 5))
    
    # Reset game objects
    global player, car_manager, scoreboard
    player = Player()
    car_manager = CarManager()
    scoreboard.reset()
    
    # Re-setup controls
    screen.listen()
    screen.onkeypress(player.up, "Up")
    screen.onkeypress(player.down, "Down")
    
    play_game()


# Start message
start_message = Scoreboard()
start_message.goto(0, 0)
start_message.write("Press UP arrow to move", align="center", font=("Courier", 16, "normal"))
start_message.goto(0, -30)
start_message.write("Avoid cars and reach the top!", align="center", font=("Courier", 14, "normal"))
time.sleep(2)
start_message.clear()

# Start the game
play_game()

screen.exitonclick()