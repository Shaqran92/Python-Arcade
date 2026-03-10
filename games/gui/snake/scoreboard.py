from turtle import Turtle
import os

class ScoreBoard:
    """Manages score display and high score persistence."""
    
    def __init__(self, data_file="data.txt"):
        self.score = 0
        self.data_file = data_file
        self.high_score = self.load_high_score()
        
        # Display setup
        self.display = Turtle()
        self.display.hideturtle()
        self.display.penup()
        self.display.color("white")
        self.display.goto(0, 270)
        
        # Game over display setup
        self.game_over_display = Turtle()
        self.game_over_display.hideturtle()
        self.game_over_display.penup()
        self.game_over_display.color("red")
        
        self.update_scoreboard()

    def load_high_score(self):
        """Loads high score from file, creates file if it doesn't exist."""
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file, 'r') as file:
                    content = file.read().strip()
                    return int(content) if content else 0
            else:
                # Create file with initial high score of 0
                with open(self.data_file, 'w') as file:
                    file.write("0")
                return 0
        except (ValueError, IOError):
            return 0

    def save_high_score(self):
        """Saves the current high score to file."""
        try:
            with open(self.data_file, 'w') as file:
                file.write(str(self.high_score))
        except IOError:
            print("Error: Could not save high score.")
    
    def reset(self):
        """Resets the score and updates high score if needed."""
        if self.score > self.high_score:
            self.high_score = self.score
            self.save_high_score()
        self.score = 0
        self.update_scoreboard()
    
    def update_scoreboard(self):
        """Updates the scoreboard display."""
        self.display.clear()
        self.display.write(
            f"Score: {self.score} | High Score: {self.high_score}", 
            align="center", 
            font=("Courier", 16, "bold")
        )
    
    def increase_score(self):
        """Increases the score by 1 and updates display."""
        self.score += 1
        self.update_scoreboard()
    
    def game_over(self, restart_callback, quit_callback):
        """Displays game over message with options to restart or quit."""
        # Update high score if needed
        if self.score > self.high_score:
            self.high_score = self.score
            self.save_high_score()
            self.update_scoreboard()
        
        # Game Over title
        self.game_over_display.goto(0, 50)
        self.game_over_display.write(
            "GAME OVER!", 
            align="center", 
            font=("Courier", 32, "bold")
        )
        
        # Final score
        self.game_over_display.goto(0, 10)
        self.game_over_display.color("white")
        self.game_over_display.write(
            f"Final Score: {self.score}", 
            align="center", 
            font=("Courier", 20, "normal")
        )
        
        # New high score message
        if self.score == self.high_score and self.score > 0:
            self.game_over_display.goto(0, -20)
            self.game_over_display.color("gold")
            self.game_over_display.write(
                "🏆 NEW HIGH SCORE! 🏆", 
                align="center", 
                font=("Courier", 18, "bold")
            )
        
        # Instructions
        self.game_over_display.goto(0, -60)
        self.game_over_display.color("lightblue")
        self.game_over_display.write(
            "Press 'R' to Restart", 
            align="center", 
            font=("Courier", 16, "normal")
        )
        
        self.game_over_display.goto(0, -90)
        self.game_over_display.write(
            "Press 'Q' to Quit", 
            align="center", 
            font=("Courier", 16, "normal")
        )
    
    def hide_game_over(self):
        """Clears the game over message."""
        self.game_over_display.clear()