
// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
}

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //when enemy disappears from canvas, it re-appears again from the left
    if (this.x > 707) {
        this.x = -50;
    } 
    //when player collides with enemy, player's position resets
    if(player.x < this.x + 70 &&
     player.x + 50 > this.x &&
     player.y < this.y + 30 &&
     player.y + 30 > this.y) {
        player.reset();
    score -= 1;
    document.querySelector('.score').innerHTML = score;
}
}
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-cat-girl.png';
    }

    update() {
    //starts the time when player moves up for the first time
    if(this.y != startY && counterOn == 0) {
        counterOn = 1;
        counter = 0;
        startTime();
    }
    //player can't move outside canvas
    if(this.x > 600) {
        this.x = 600;
    } 
    if(this.x < 0) {
        this.x = 0;
    }
    if(this.y > 410) {
        this.y = 410;
    }
    //player scores a point when she gets to the top
    if(this.y < 0) {
        score += 1;
        document.querySelector('.score').innerHTML = score;
        setTimeout(() => {
            this.reset();
        }, 10);
    } 

     //winning module pops open
     if(score == 10) {
        playAgain();
    }
}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //instructions for moving left/right/up/down
    handleInput(key) {
        if(key == 'left' && this.x > 0) {
            this.x -= 102;
        }
        if(key == 'right' && this.x < 707) {
            this.x += 102;
        }
        if(key == 'up' && this.y > 0) {
            this.y -= 85;
        }
        if(key == 'down' && this.y < 707) {
            this.y += 85;
        }
    }

    reset() {
        this.x = startX;
        this.y = startY;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];
const enemyPosY = [60, 150, 230, 310];
let enemy;

//loop for placing 4 enemy instances into Y position
enemyPosY.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 222));
    allEnemies.push(enemy);
});

const player = new Player(startX = 300, startY = 410);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//scoring variable
let score = 0;
document.querySelector('.score').innerHTML = score;

// couter variables
let counter = 0;
let counterOn = 0;
let t;

//starts the time in seconds
function startTime() {
    counter += 1;
    document.querySelector('.counter').innerHTML = counter; 
    t = setTimeout(startTime, 1000);
}

//stops the time and resets it back to zero
function stopTime() {
    clearTimeout(t);
    counterOn = 0;
    counter = 0;
    document.querySelector('.counter').innerHTML = counter; 
}

//module to ask the user if he/she wants to play again or not
//if not the window closes
function playAgain() {
    const playAgain = confirm(`Nice! You finished the game in ${counter} seconds. Play again?`);
    if(playAgain == true){
        gameReset();
    } else {
        alert("Thanks for playing!");
        window.close();
    }
}

//resets the player position, score, time
function gameReset() {
    player.reset();
    stopTime();
    score = 0;
    document.querySelector('.score').innerHTML = score; 
}
