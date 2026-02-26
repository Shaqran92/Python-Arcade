from turtle import Turtle

FONT = ("Courier", 60, "bold")
SMALL_FONT = ("Courier", 30, "normal")
ALIGNMENT = "center"

class ScoreBoard(Turtle):
    def __init__(self):
        super().__init__()
        self.l_score = 0
        self.r_score = 0
        self.hideturtle()
        self.penup()
        self.color("white")
        self.message_turtle = None
        self.update_scoreboard()
    
    def update_scoreboard(self):
        """Update score display"""
        self.clear()
        # Left score
        self.goto(-100, 220)
        self.write(self.l_score, align=ALIGNMENT, font=FONT)
        # Right score
        self.goto(100, 220)
        self.write(self.r_score, align=ALIGNMENT, font=FONT)
        # Instructions
        self.goto(0, -270)
        self.write("SPACE: Pause | R: Restart | ESC: Quit", 
                   align=ALIGNMENT, font=("Courier", 12, "normal"))
    
    def l_increase_score(self):
        """Increase left player score"""
        self.l_score += 1
        self.update_scoreboard()
    
    def r_increase_score(self):
        """Increase right player score"""
        self.r_score += 1
        self.update_scoreboard()
    
    def reset_scores(self):
        """Reset both scores to 0"""
        self.l_score = 0
        self.r_score = 0
        self.update_scoreboard()
    
    def show_message(self, message, y_pos):
        """Display a centered message"""
        if self.message_turtle is None:
            self.message_turtle = Turtle()
            self.message_turtle.hideturtle()
            self.message_turtle.penup()
            self.message_turtle.color("yellow")
        
        self.message_turtle.clear()
        self.message_turtle.goto(0, y_pos)
        self.message_turtle.write(message, align=ALIGNMENT, font=SMALL_FONT)
    
    def hide_message(self):
        """Clear any displayed message"""
        if self.message_turtle:
            self.message_turtle.clear()