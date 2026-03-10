from turtle import Turtle
import random

class Food(Turtle):
    """Manages the food appearance and repositioning."""
    
    def __init__(self):
        super().__init__()
        self.shape('circle')
        self.penup()
        self.shapesize(0.7, 0.7)
        self.color("red")
        self.speed("fastest")
        self.refresh()

    def refresh(self, snake=None):
        """
        Repositions the food to a random location.
        Avoids spawning on the snake if snake object is provided.
        """
        while True:
            x = random.randint(-260, 260)
            y = random.randint(-260, 260)
            
            # Check if food spawns on snake
            if snake:
                collision = False
                for segment in snake.snake:
                    if segment.distance(x, y) < 20:
                        collision = True
                        break
                if not collision:
                    self.goto(x, y)
                    break
            else:
                self.goto(x, y)
                break