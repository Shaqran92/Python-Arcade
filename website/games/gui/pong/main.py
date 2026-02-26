from turtle import Screen
from paddles import Paddles
from ball import Ball
from scoreboard import ScoreBoard
import time

# CONSTANTS
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
WINNING_SCORE = 5

class PingPongGame:
    def __init__(self):
        self.setup_screen()
        self.score = ScoreBoard()
        self.right_paddle = Paddles((SCREEN_WIDTH//2 - 25, 0))
        self.left_paddle = Paddles((-SCREEN_WIDTH//2 + 15, 0))
        self.ball = Ball()
        self.game_paused = False
        self.game_running = True
        self.setup_controls()
        self.draw_middle_line()
    
    def setup_screen(self):
        self.sc = Screen()
        self.sc.bgcolor("black")
        self.sc.setup(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.sc.title("🏓 Ping Pong Game")
        self.sc.tracer(0)
    
    def draw_middle_line(self):
        """Draw center line for visual appeal"""
        from turtle import Turtle
        line = Turtle()
        line.color("white")
        line.penup()
        line.hideturtle()
        line.goto(0, SCREEN_HEIGHT//2)
        line.setheading(270)
        
        for _ in range(15):
            line.pendown()
            line.forward(20)
            line.penup()
            line.forward(20)
    
    def setup_controls(self):
        self.sc.listen()
        # Right paddle
        self.sc.onkeypress(self.right_paddle.up, "Up")
        self.sc.onkeypress(self.right_paddle.down, "Down")
        # Left paddle
        self.sc.onkeypress(self.left_paddle.up, "w")
        self.sc.onkeypress(self.left_paddle.down, "s")
        # Game controls
        self.sc.onkeypress(self.toggle_pause, "space")
        self.sc.onkeypress(self.restart_game, "r")
        self.sc.onkeypress(self.quit_game, "Escape")
    
    def toggle_pause(self):
        self.game_paused = not self.game_paused
        if self.game_paused:
            self.score.show_message("PAUSED", 0)
        else:
            self.score.hide_message()
    
    def restart_game(self):
        self.score.reset_scores()
        self.ball.reset_position()
        self.game_paused = False
        self.game_running = True
        self.score.hide_message()
    
    def quit_game(self):
        self.game_running = False
    
    def check_wall_collision(self):
        """Check if ball hits top or bottom wall"""
        if self.ball.ycor() > SCREEN_HEIGHT//2 - 20 or self.ball.ycor() < -SCREEN_HEIGHT//2 + 20:
            self.ball.bounce_y()
    
    def check_paddle_collision(self):
        """Improved paddle collision detection"""
        # Right paddle
        if (self.ball.xcor() > SCREEN_WIDTH//2 - 50 and 
            self.ball.xcor() < SCREEN_WIDTH//2 - 30 and
            self.ball.distance(self.right_paddle) < 60):
            self.ball.bounce_x()
        
        # Left paddle
        elif (self.ball.xcor() < -SCREEN_WIDTH//2 + 50 and 
              self.ball.xcor() > -SCREEN_WIDTH//2 + 30 and
              self.ball.distance(self.left_paddle) < 60):
            self.ball.bounce_x()
    
    def check_score(self):
        """Check if someone scored"""
        # Right side scores (left player missed)
        if self.ball.xcor() > SCREEN_WIDTH//2 + 20:
            self.score.l_increase_score()
            self.ball.reset_position()
            return True
        
        # Left side scores (right player missed)
        elif self.ball.xcor() < -SCREEN_WIDTH//2 - 20:
            self.score.r_increase_score()
            self.ball.reset_position()
            return True
        
        return False
    
    def check_winner(self):
        """Check if someone won the game"""
        if self.score.l_score >= WINNING_SCORE:
            self.score.show_message("LEFT PLAYER WINS!", 0)
            self.game_paused = True
            return True
        elif self.score.r_score >= WINNING_SCORE:
            self.score.show_message("RIGHT PLAYER WINS!", 0)
            self.game_paused = True
            return True
        return False
    
    def run(self):
        """Main game loop"""
        while self.game_running:
            self.sc.update()
            time.sleep(self.ball.move_speed)
            
            if not self.game_paused:
                self.ball.move()
                self.check_wall_collision()
                self.check_paddle_collision()
                
                if self.check_score():
                    self.check_winner()
        
        self.sc.bye()


if __name__ == "__main__":
    game = PingPongGame()
    game.run()