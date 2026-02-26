from turtle import Screen
from snake import Snake
from food import Food
from scoreboard import ScoreBoard
import time

# Constants
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600
WALL_BOUNDARY = 280
FOOD_COLLISION_DISTANCE = 15
SELF_COLLISION_DISTANCE = 10
GAME_SPEED = 0.1

# Screen setup
screen = Screen()
screen.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
screen.bgcolor("black")
screen.title("🐍 Snake Game")
screen.tracer(0)

# Game objects
snake = Snake()
food = Food()
scoreboard = ScoreBoard()

# Game state
game_is_on = True
is_paused = False

def restart_game():
    """Restarts the game after game over."""
    global game_is_on, is_paused
    scoreboard.hide_game_over()
    scoreboard.reset()
    snake.reset()
    food.refresh(snake)
    is_paused = False

def quit_game():
    """Quits the game."""
    global game_is_on
    game_is_on = False

# Controls
screen.listen()
screen.onkeypress(snake.up, "Up")
screen.onkeypress(snake.down, "Down")
screen.onkeypress(snake.left, "Left")
screen.onkeypress(snake.right, "Right")

# Game loop
while game_is_on:
    screen.update()
    time.sleep(GAME_SPEED)
    
    if not is_paused:
        snake.move()

        # Detect collision with food
        if snake.head.distance(food) < FOOD_COLLISION_DISTANCE:
            food.refresh(snake)
            snake.extend()
            scoreboard.increase_score()

        # Detect collision with wall
        if (snake.head.xcor() > WALL_BOUNDARY or 
            snake.head.xcor() < -WALL_BOUNDARY or 
            snake.head.ycor() > WALL_BOUNDARY or 
            snake.head.ycor() < -WALL_BOUNDARY):
            is_paused = True
            scoreboard.game_over(restart_game, quit_game)
            screen.onkeypress(restart_game, "r")
            screen.onkeypress(quit_game, "q")

        # Detect collision with tail
        for segment in snake.snake[1:]:
            if snake.head.distance(segment) < SELF_COLLISION_DISTANCE:
                is_paused = True
                scoreboard.game_over(restart_game, quit_game)
                screen.onkeypress(restart_game, "r")
                screen.onkeypress(quit_game, "q")

screen.bye()