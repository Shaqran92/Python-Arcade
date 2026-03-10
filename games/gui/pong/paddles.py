from turtle import Turtle

# CONSTANTS
PADDLE_WIDTH = 1
PADDLE_HEIGHT = 5
MOVE_DISTANCE = 30
SCREEN_HEIGHT = 600
PADDLE_LIMIT = SCREEN_HEIGHT//2 - 60

class Paddles(Turtle):
    def __init__(self, position):
        super().__init__()
        self.shape("square")
        self.color("white")
        self.shapesize(stretch_wid=PADDLE_HEIGHT, stretch_len=PADDLE_WIDTH)
        self.penup()
        self.goto(position)
        self.speed("fastest")
    
    def up(self):
        """Move paddle up with boundary check"""
        new_y = self.ycor() + MOVE_DISTANCE
        if new_y < PADDLE_LIMIT:
            self.goto(self.xcor(), new_y)
    
    def down(self):
        """Move paddle down with boundary check"""
        new_y = self.ycor() - MOVE_DISTANCE
        if new_y > -PADDLE_LIMIT:
            self.goto(self.xcor(), new_y)
    
    def reset_position(self):
        """Reset paddle to center"""
        self.goto(self.xcor(), 0)