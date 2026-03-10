from turtle import Turtle
import random

COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'cyan', 'magenta']
STARTING_MOVE_DISTANCE = 5
MOVE_INCREMENT = 2
CAR_SPAWN_X = 320
SCREEN_LEFT_EDGE = -320


class CarManager:
    def __init__(self):
        self.all_cars = []
        self.car_speed = STARTING_MOVE_DISTANCE
        self.spawn_probability = 6  # Higher number = less frequent spawning
        
    def create_cars(self):
        random_chance = random.randint(1, self.spawn_probability)
        if random_chance == 1:
            new_car = Turtle()
            new_car.shape("square")
            new_car.color(random.choice(COLORS))
            new_car.shapesize(stretch_wid=1, stretch_len=2)
            new_car.penup()
            # Cars spawn at random heights but avoid the very top and bottom
            random_y = random.randint(-230, 230)
            new_car.goto(CAR_SPAWN_X, random_y)
            self.all_cars.append(new_car)
    
    def move_cars(self):
        for car in self.all_cars:
            car.backward(self.car_speed)
    
    def remove_offscreen_cars(self):
        """Remove cars that have gone off the left edge to prevent memory leak"""
        self.all_cars = [car for car in self.all_cars 
                        if car.xcor() > SCREEN_LEFT_EDGE - 50]
    
    def level_up(self):
        """Increase car speed and spawn rate"""
        self.car_speed += MOVE_INCREMENT
        # Make cars spawn more frequently at higher levels (minimum spawn_probability of 3)
        if self.spawn_probability > 3:
            self.spawn_probability -= 1
    
    def reset_cars(self):
        """Clear all cars from screen"""
        for car in self.all_cars:
            car.hideturtle()
        self.all_cars.clear()