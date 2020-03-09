/**
 * Pokemon HTML5 canvas game
 * @version 1.0.0
 * @author Panagiotis Vourtsis <vourtsis_pan@hotmail.com>
 */
window.onload = function() {
  'use strict';

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var w = document.getElementById('canvas').offsetWidth;
  var h = document.getElementById('canvas').offsetHeight;
  var terrainImageLoaded = false,
    houseImageLoaded = false,
    enemy2ImageLoaded = false,
    gateImageLoaded = false,
    playerImageLoaded = false;
    var objectSizes = 66;
    var speed = 100;
    var modifier = 100;
    var score = 0;
    let battleScreen = false;
    let lostItem = false;
    let result = false;


  //terrain image
  var terrainImage = new Image();
  terrainImage.onload = function() {
    terrainImageLoaded = true;
    assetsLoaded();
  };
  terrainImage.src = "/img/back3.png";

  //house image
  var houseImage = new Image();
  houseImage.onload = function() {
    houseImageLoaded = true;
    assetsLoaded();
  };
  houseImage.src = "/img/house.png";

  //gate image
  var gateImage = new Image();
  gateImage.onload = function() {
    gateImageLoaded = true;
    assetsLoaded();
  };
  gateImage.src = "/img/gate.png";

  //main sound
  var mainTheme = new Audio("/sound/theme song.mp3");
  mainTheme.loop = true;
  mainTheme.volume = 0.2;
  mainTheme.play();

  //enemy2-selection
  var pokePick = new Audio("/sound/pick-axe.wav");
  pokePick.volume = 0.8;

  //thieft-selection
  var thieftPick = new Audio("/sound/violindanger.wav");
  thieftPick.volume = 0.8;

  //thieft-selection
  var winPick = new Audio("/sound/electro-win-sound.wav");
  winPick.volume = 0.8;

  //die-selection
  var diePick = new Audio("/sound/game-die.mp3");
  diePick.volume = 0.8;

  //player image
  var playerImage = new Image();
  playerImage.onload = function() {
    enemy2ImageLoaded = true;
    assetsLoaded();
  };
  playerImage.src = "/img/hero.png";

      //enemy1 image
      var enemy1Image = new Image();
      enemy1Image.onload = function() {
        playerImageLoaded = true;
        assetsLoaded();
      };
      enemy1Image.src = "/img/enemy-1.png";

  //enemy2 image
  var enemy2Image = new Image();
  enemy2Image.onload = function() {
    playerImageLoaded = true;
    assetsLoaded();
  };
  enemy2Image.src = "/img/enemy-2.png";

    //item1 image
    var item1Image = new Image();
    item1Image.onload = function() {
      playerImageLoaded = true;
      assetsLoaded();
    };
    item1Image.src = "/img/item-1.png";

    //item2 image
    var item2Image = new Image();
    item2Image.onload = function() {
      playerImageLoaded = true;
      assetsLoaded();
    };
    item2Image.src = "/img/item-2.png";

    //item3 image
    var item3Image = new Image();
    item3Image.onload = function() {
      playerImageLoaded = true;
      assetsLoaded();
    };
    item3Image.src = "/img/item-3.png";


  /**
   * It will hold all the pockeball data like x and y axis position
   * sprite position and item distance is for determine which item is selected from the sprite - @todo future use for knowing on score which one player picked
   * Also hold the generate position function that generates random positions if there is no collision.
   * @Object
   * @name enemy2
   */
  var enemy2 = {
    x: 0,
    y: 0,
    spritePosition: 0,
    spriteItemDistance: 40,
  };
  enemy2.generatePosition = function() {
    do {
      enemy2.x = Math.floor(Math.random() * 12) + 1;
      enemy2.y = Math.floor(Math.random() * 6) + 4;
    } while (check_collision(enemy2.x, enemy2.y));

    // enemy2.spritePosition = Math.floor(Math.random() * 4) + 0; // get position from 0-4
  };

  var enemy1 = {
    x: 5,
    y: 11,
//   spritePosition: 0,
//   spriteItemDistance: 40,
// };
// enemy1.generatePosition = function() {
//   do {
//     enemy1.x = Math.floor(Math.random() * 12) + 1;
//     enemy1.y = Math.floor(Math.random() * 6) + 4;
//   } while (check_collision(enemy1.x, enemy1.y));

  // enemy1.spritePosition = Math.floor(Math.random() * 4) + 0; // get position from 0-4
};

  var item1 = {
    x: 4,
    y: 0,
}

var item2 = {
    x: 0,
    y: 6,
}

var item3 = {
    x: 10,
    y: 10,
}

  /**
   * Holds all the player's info like x and y axis position, his current direction (facing).
   * I have also incuded an object to hold the sprite position of each movement so i can call them
   * I also included the move function in order to move the player - all the functionality for the movement is in there
   * @Object
   * @name enemy2
   */
  var player = {
    x: Math.round((w / objectSizes) - 3 ),
    y: Math.round((w / objectSizes) - 9 ),
    currentDirection: 'stand',
    direction: {
      stand: {
        x: 0,
        y: 0,
      },
      'down-1': {
        x: 56,
        y: 0,
      },
      'down-2': {
        x: 111,
        y: 0,
      },

      'up-1': {
        x: 408,
        y: 0,
      },
      'up-2': {
        x: 475,
        y: 0,
      },
      'left-1': {
        x: 220,
        y: 0,
      },
      'left-2': {
        x: 270,
        y: 0,
      },
      'right-1': {
        x: 580,
        y: 0,
      },
      'right-2': {
        x: 650,
        y: 0,
      },
    },
  };
  player.move = function(direction) {
    /**
     * A temporary object to hold the current x, y so if there is a collision with the new coordinates to fallback here
     */
    var hold_player = {
      x: player.x,
      y: player.y,
    };

    /**
     * Decide here the direction of the user and do the neccessary changes on the directions
     */
    switch (direction) {
      case 'left':
        player.x -= speed / modifier;
        if (player.currentDirection == 'stand') {
          player.currentDirection = 'left-1';
        } else if (player.currentDirection == 'left-1') {
          player.currentDirection = 'left-2';
        } else if (player.currentDirection == 'left-2') {
          player.currentDirection = 'left-1';
        } else {
          player.currentDirection = 'left-1';
        }
        break;
      case 'right':
        player.x += speed / modifier;
        if (player.currentDirection == 'stand') {
          player.currentDirection = 'right-1';
        } else if (player.currentDirection == 'right-1') {
          player.currentDirection = 'right-2';
        } else if (player.currentDirection == 'right-2') {
          player.currentDirection = 'right-1';
        } else {
          player.currentDirection = 'right-1';
        }
        break;
      case 'up':
        player.y -= speed / modifier;

        if (player.currentDirection == 'stand') {
          player.currentDirection = 'up-1';
        } else if (player.currentDirection == 'up-1') {
          player.currentDirection = 'up-2';
        } else if (player.currentDirection == 'up-2') {
          player.currentDirection = 'up-1';
        } else {
          player.currentDirection = 'up-1';
        }

        break;
      case 'down':
        player.y += speed / modifier;

        if (player.currentDirection == 'stand') {
          player.currentDirection = 'down-1';
        } else if (player.currentDirection == 'down-1') {
          player.currentDirection = 'down-2';
        } else if (player.currentDirection == 'down-2') {
          player.currentDirection = 'down-1';
        } else {
          player.currentDirection = 'down-1';
        }

        break;
    }

    /**
     * if there is a collision just fallback to the temp object i build before while not change back the direction so we can have a movement
     */
    if (check_collision(player.x, player.y)) {
      player.x = hold_player.x;
      player.y = hold_player.y;
    }

    /**
     * If player finds the coordinates of enemy2 the generate new one, play the sound and update the score
     */
    if (player.x == enemy2.x && player.y == enemy2.y && item1.x > 20 && item1.y > 20 && item2.x > 20 && item2.y > 20 && item3.x > 20 && item3.y > 20) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      alert("A theft take your item!Please collecte again!");
      item1.x = item1.x -50;
      item1.y = item1.y - 70;
      item2.x = item2.x -50;
      item2.y = item2.y - 70;
      item3.x = item3.x - 50;
      item3.y = item3.y - 70;
      enemy2.generatePosition();
    }
    
    
    
     if (player.x == enemy2.x && player.y == enemy2.y && item1.x > 20 && item1.y > 20 && item2.x > 20 && item2.y > 20) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      alert("A theft take your item!Please collecte again!");
      item1.x = item1.x -50;
      item1.y = item1.y - 70;
      item2.x = item2.x - 50;
      item2.y = item2.y - 70;
      enemy2.generatePosition();
    }

    if (player.x == enemy2.x && player.y == enemy2.y && item1.x > 20 && item1.y > 20 && item3.x > 20 && item3.y > 20) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      alert("A theft take your item!Please collecte again!");
      item1.x = item1.x -50;
      item1.y = item1.y - 70;
      item3.x = item3.x - 50;
      item3.y = item3.y - 70;
      enemy2.generatePosition();
    }

    if (player.x == enemy2.x && player.y == enemy2.y && item2.x > 20 && item2.y > 20 && item3.x > 20 && item3.y > 20) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      alert("A theft take your item!Please collecte again!");
      item2.x = item2.x -50;
      item2.y = item2.y - 70;
      item3.x = item3.x - 50;
      item3.y = item3.y - 70;
      enemy2.generatePosition();
    }


   
     if (player.x == enemy2.x && player.y == enemy2.y && item1.x > 20 && item1.y > 20) {
      // found a enemy2 !! create a new one
      console.log('found a enemy2 of ' + enemy2.spritePosition + '! Bravo! ');
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      alert("A theft take your item!Please collecte again!");
      item1.x = item1.x -50;
      item1.y = item1.y - 70;
      // item3.x = item3.x - 50;
      // item3.y = item3.y - 70;
      enemy2.generatePosition();
      
    } 
    
    if (player.x == enemy2.x && player.y == enemy2.y && item2.x > 20 && item2.y > 20) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      alert("A theft take your item!Please collecte again!");
      item2.x = item2.x - 50;
      item2.y = item2.y - 70;
      enemy2.generatePosition();
    }

    if (player.x == enemy2.x && player.y == enemy2.y && item3.x > 20 && item3.y > 20) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      
      alert("Unfortunately, a theft take your item!Please collecte again!");
      item3.x = item3.x - 50;
      item3.y = item3.y - 70;
      enemy2.generatePosition();
    }

    if (player.x == enemy2.x && player.y == enemy2.y) {
      thieftPick.pause();
      thieftPick.currentTime = 0;
      thieftPick.play();
      
      alert("Unfortunately, you meet a thieft!");
      enemy2.generatePosition();
    }

    

    if (player.x == item1.x && player.y == item1.y) {
      console.log ('Find a item');
      pokePick.pause();
      pokePick.currentTime = 0;
      pokePick.play();
      score +=1;
      item1.x = item1.x + 50;
      item1.y = item1.y + 70;
  } else if (player.x == item2.x && player.y == item2.y) {
    console.log ('Find a item');
    pokePick.pause();
      pokePick.currentTime = 0;
      pokePick.play();
    score +=1;
    item2.x = item2.x + 50;
    item2.y = item2.y + 70;
  } else if (player.x == item3.x && player.y == item3.y) {
    console.log ('Find a item');
    pokePick.pause();
      pokePick.currentTime = 0;
      pokePick.play();
    score +=1;
    item3.x = item3.x + 50;
    item3.y = item3.y + 70;
  }

  if (player.x == enemy1.x && player.y == enemy1.y && score > 3 && item1.x > 20 && item1.y > 20 && item2.x > 20 && item2.y > 20 && item3.x > 20 && item3.y > 20) {
    // found a enemy1 !! create a new one
    diePick.pause();
      diePick.currentTime = 0;
      diePick.play();
    console.log('find enemy ');
    player.x = 6;
    player.y = 11;
    // pokePick.pause();
    // pokePick.currentTime = 0;
    // pokePick.play();
    result = true;
  }
  
  if (player.x == enemy1.x && player.y == enemy1.y && score < 3) {
    // found a enemy1 !! create a new one
    diePick.pause();
      diePick.currentTime = 0;
      diePick.play();
    console.log('find enemy ');
    player.x = 6;
    player.y = 11;
    // pokePick.pause();
    // pokePick.currentTime = 0;
    // pokePick.play();
    result = true;

    
    
    
  } else if (player.x == enemy1.x && player.y == enemy1.y && item1.x > 20 && item1.y > 20 && item2.x > 20 && item2.y > 20 && item3.x > 20 && item3.y > 20) {
    // found a enemy1 !! create a new one
    winPick.pause();
      winPick.currentTime = 0;
      winPick.play();
    console.log('find enemy ');
    player.x = 6;
    player.y = 11;
    // pokePick.pause();
    // pokePick.currentTime = 0;
    // pokePick.play();
    battleScreen = true;

    
  }

    update();
  };

  /**
   * Handle all the updates of the canvas and creates the objects
   * @function
   * @name update
   */
  function update() {
    ctx.drawImage(terrainImage, 0, 0);
    ctx.drawImage(houseImage, 480, 10);

    // //Genboard
    // board();

   //enemy1
   ctx.drawImage(
    enemy1Image,
    enemy1.x * objectSizes,
    enemy1.y * objectSizes,
    objectSizes,
    objectSizes
  );

    //enemy2
    ctx.drawImage(
      enemy2Image,
      enemy2.spritePosition * enemy2.spriteItemDistance,
      0,
      objectSizes,
      objectSizes,
      enemy2.x * objectSizes,
      enemy2.y * objectSizes,
      objectSizes,
      objectSizes
    );

    //item1
    ctx.drawImage(
      item1Image,
      item1.x * objectSizes,
      item1.y * objectSizes,
      objectSizes,
      objectSizes
    );

    //item2
    ctx.drawImage(
      item2Image,
      item2.x * objectSizes,
      item2.y * objectSizes,
      objectSizes,
      objectSizes
    );

    //item3
    ctx.drawImage(
      item3Image,
      item3.x * objectSizes,
      item3.y * objectSizes,
      objectSizes,
      objectSizes
    );

    //player
    console.log('y:', (player.y * objectSizes) / objectSizes);
    console.log('x', (player.x * objectSizes) / objectSizes);
    ctx.drawImage(
      playerImage,
      player.direction[player.currentDirection].x,
      player.direction[player.currentDirection].y,
      objectSizes - 2,
      objectSizes,
      player.x * objectSizes,
      player.y * objectSizes,
      objectSizes,
      objectSizes
    );

    // gate
    ctx.drawImage(gateImage, 190, 125);

    if (result) {
      ctx.fillRect(50, 50, canvas.width-100, canvas.height-100);
      ctx.fillStyle = "white";
      ctx.fillText('YOU DIE!!!', canvas.width / 2, canvas.height / 2);
      ctx.fillText('Hit reset button to try again', canvas.width / 2, canvas.height / 2 + 50);

      ctx.font = "10pt Courier";
      ctx.textAlign = "center";
    }

    else if (battleScreen) {
      ctx.fillRect(50, 50, canvas.width-100, canvas.height-100);
      ctx.fillStyle = "white";
      ctx.fillText('YOU WIN', canvas.width / 2, canvas.height / 2);
      

      ctx.font = "20pt Courier";
      ctx.textAlign = "center";
    }

    
  }

  
  function check_collision(x, y) {
    var foundCollision = false;

    if ((x >= 8 && x < 12 && y == 2)) {
      //collision on house
      console.log('on house');
      foundCollision = true;
    }

    if (
      x < 0 ||
      x > 11 ||
      y < 0 ||
      y > 11 ||
      (x > 6 && x < 12 && (y == 4 || y == 5)) || //right corner
      (y > 6 && y <= 10 && x == 11) ||
      (y > 7 && y < 9 && x == 10) ||
      (x == 9 && y == 8) ||
      (y >= 0 && y < 2 && (x == 6 || x == 7)) ||
      (x == 5 && y == 0) ||
      (x < 4 && y == 0 ) ||
      (x < 4 && (y == 4 || y == 5)) ||
      (y > 8 && x == 0 ) ||
      (x < 3 && (y == 11 || y == 10 )) ||
      (x == 7 && y == 11) ||
      (x == 4 && y == 10) ||
      (x < 2 && y <= 2) ||
      (x < 5 && (y == 7 || y == 8)) //left corner
      // (y > 18 && (x == 2 || x == 3)) || //left corner
      // (x > 17 && (y == 19 || y == 20)) || //left corner
      // (x > 19 && (y == 17 || y == 18)) //left corner 2
    ) {
      console.log('lost on the bamboos');
      foundCollision = true;
    }

    return foundCollision;
  }

 
  // function board() {
  //   ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  //   ctx.fillRect(w - 100, h - 70, 100, 70);

  //   ctx.font = '18px Arial';
  //   ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  //   ctx.fillText('You Found', w - 93, h - 45);

  //   ctx.font = '14px Arial';
  //   ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  //   ctx.fillText(score + ' poketballs', w - 85, h - 25);

  
  // }


  function assetsLoaded() {
    if  (
      terrainImageLoaded == true &&
      houseImageLoaded == true &&
      enemy2ImageLoaded == true &&
      playerImageLoaded == true &&
      gateImageLoaded == true
    ) {
      enemy2.generatePosition();
      update();
    }
    
  

    
  }

  /**
   * Assign of the arrow keys to call the player move
   */
  document.onkeydown = function(e) {
    e = e || window.event;

    if (e.keyCode == '37') player.move('left');
    else if (e.keyCode == '38') player.move('up');
    else if (e.keyCode == '39') player.move('right');
    else if (e.keyCode == '40') player.move('down');
  };
};
