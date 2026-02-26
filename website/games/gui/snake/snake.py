from turtle import Turtle

# Constants
MOVE_DISTANCE = 20
UP = 90
DOWN = 270
LEFT = 180
RIGHT = 0
STARTING_POSITIONS = [(0, 0), (-20, 0), (-40, 0)]

class Snake:
    """Manages the snake's behavior, movement, and appearance."""
    
    def __init__(self):
        self.snake = []
        self.create_snake()
        self.head = self.snake[0]

    def create_snake(self):
        """Creates the initial snake with starting positions."""
        for position in STARTING_POSITIONS:
            self.add_segment(position)

    def add_segment(self, position):
        """Adds a new segment to the snake at the given position."""
        segment = Turtle("square")
        segment.color("white")
        segment.penup()
        segment.goto(position)
        self.snake.append(segment)
    
    def reset(self):
        """Resets the snake to initial state after game over."""
        # Move old segments off screen and clear
        for segment in self.snake:
            segment.goto(1000, 1000)
        self.snake.clear()
        
        # Create new snake
        self.create_snake()
        self.head = self.snake[0]
    
    def extend(self):
        """Extends the snake by adding a segment at the tail."""
        self.add_segment(self.snake[-1].position())
                        
    def move(self):
        """Moves the snake forward by one step."""
        # Move each segment to the position of the one in front
        for seg_num in range(len(self.snake) - 1, 0, -1):
            new_x = self.snake[seg_num - 1].xcor()
            new_y = self.snake[seg_num - 1].ycor()
            self.snake[seg_num].goto(new_x, new_y)
        
        # Move the head forward
        self.head.forward(MOVE_DISTANCE)

    def up(self):
        """Changes direction to up if not currently moving down."""
        if self.head.heading() != DOWN:
            self.head.setheading(UP)

    def down(self):
        """Changes direction to down if not currently moving up."""
        if self.head.heading() != UP:
            self.head.setheading(DOWN)

    def left(self):
        """Changes direction to left if not currently moving right."""
        if self.head.heading() != RIGHT:
            self.head.setheading(LEFT)

    def right(self):
        """Changes direction to right if not currently moving left."""
        if self.head.heading() != LEFT:
            self.head.setheading(RIGHT)