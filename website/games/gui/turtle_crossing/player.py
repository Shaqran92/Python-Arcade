from turtle import Turtle

STARTING_POSITION = (0, -280)
MOVE_DISTANCE = 10
FINISH_LINE_Y = 280
SCREEN_BOUNDARY_Y = -290


class Player(Turtle):
    def __init__(self):
        super().__init__()
        self.penup()
        self.shape("turtle")
        self.color("dark green")
        self.goto(STARTING_POSITION)
        self.setheading(90)
        
    def up(self):
        """Move player up if not at top boundary"""
        if self.ycor() < FINISH_LINE_Y + 10:
            self.forward(MOVE_DISTANCE)
    
    def down(self):
        """Move player down if not at bottom boundary"""
        if self.ycor() > SCREEN_BOUNDARY_Y:
            self.backward(MOVE_DISTANCE)
    
    def at_finish_line(self):
        """Check if player reached the finish line"""
        return self.ycor() >= FINISH_LINE_Y
    
    def reset_position(self):
        """Reset player to starting position"""
        self.goto(STARTING_POSITION)