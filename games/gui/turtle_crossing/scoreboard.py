from turtle import Turtle

FONT = ("Courier", 18, "normal")
LEVEL_POSITION = (-280, 270)
CENTER_POSITION = (0, 0)


class Scoreboard(Turtle):
    def __init__(self):
        super().__init__()
        self.penup()
        self.hideturtle()
        self.color("black")
        self.level = 1
        self.high_score = 0
        self.update_scoreboard()
    
    def update_scoreboard(self):
        """Update the level and high score display"""
        self.clear()
        self.goto(LEVEL_POSITION)
        self.write(f"Level: {self.level}", align="left", font=FONT)
        self.goto(280, 270)
        self.write(f"High: {self.high_score}", align="right", font=FONT)
    
    def increase_level(self):
        """Increase level and update high score if needed"""
        self.level += 1
        if self.level > self.high_score:
            self.high_score = self.level
        self.update_scoreboard()
    
    def game_over(self):
        """Display game over message"""
        self.goto(CENTER_POSITION)
        self.write("GAME OVER", align="center", font=("Courier", 24, "bold"))
        self.goto(0, -30)
        self.write(f"Final Level: {self.level}", align="center", font=FONT)
    
    def reset(self):
        """Reset level but keep high score"""
        self.level = 1
        self.update_scoreboard()