from turtle import Turtle

class Ball(Turtle):
    def __init__(self):
        super().__init__()
        self.shape('circle')
        self.color("white")
        self.penup()
        self.reset_speed()
        self.x_move = 10
        self.y_move = 10
    
    def reset_speed(self):
        """Reset ball speed to initial value"""
        self.move_speed = 0.05
        self.speed_level = 1
    
    def move(self):
        """Move ball based on current direction"""
        x = self.xcor() + self.x_move
        y = self.ycor() + self.y_move
        self.goto(x, y)
    
    def bounce_y(self):
        """Bounce off top/bottom walls"""
        self.y_move *= -1
    
    def bounce_x(self):
        """Bounce off paddles and increase speed"""
        self.x_move *= -1
        # Increase speed but cap it
        if self.move_speed > 0.02:
            self.move_speed *= 0.9
            self.speed_level += 1
    
    def reset_position(self):
        """Reset ball to center after scoring"""
        self.goto(0, 0)
        self.reset_speed()
        self.bounce_x()  # Change direction
    
    def get_speed_level(self):
        """Return current speed level for display"""
        return self.speed_level