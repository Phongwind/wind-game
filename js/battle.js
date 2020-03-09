var playerPicture = document.querySelector("#player-picture");
var enemyPicture = document.querySelector("#enemy-picture");
var num = 218;
var move1 = document.querySelector("#player-move-1");
var move2 = document.querySelector("#player-move-2");
var move3 = document.querySelector("#player-move-3");
var enemyStats = document.querySelector("#enemy-stats");
var playerStats = document.querySelector("#player-stats");
var enemyHpMeter = document.querySelector("#enemy-hp-meter");
var playerHpMeter = document.querySelector("#player-hp-meter");
var enemyHpCounter = document.querySelector("#enemy-hp-counter");
var playerHpCounter = document.querySelector("#player-hp-counter");
var bottomLeftText = document.querySelector("#bottom-left-textbox");
var message = document.querySelector("#message");
var damageDealt = 218;
var damageTaken = 218;

playerPicture.src =
  "/img/hero-1.png";

enemyPicture.src =
  "/img/enemy-battle.png";

function revert() {
  if (damageDealt >= 0) {
    message.style.display = "none";
    bottomLeftText.style.display = "block";
  } else {
    bottomLeftText.style.display = "none";
    message.style.display = "block";
  }
}

function doDamage(n, inc, delay) {
  for (var i = 0; i <= inc; i++) {
    (function(i) {
      setTimeout(function() {
        // Change code below here
        enemyHpMeter.style.width = n - i + "px";
        damageDealt = damageDealt - 1;
        enemyHpCounter.innerHTML = damageDealt;
        if (damageDealt === 0) {
          bottomLeftText.style.display = "none";
          enemyPicture.style.display = "none";
          enemyStats.style.display = "none";
          message.style.display = "block";
          message.innerHTML = "You have defeated bandit!";
        } else if (damageDealt <= 25) {
          enemyHpMeter.style.backgroundColor = "rgb(255, 50, 50)";
        } else if (damageDealt <= 50) {
          enemyHpMeter.style.backgroundColor = "yellow";
        } else if (damageDealt <= 100) {
          enemyHpMeter.style.backgroundColor = "orange";
        }

        // Change code above here
      }, delay * i);
    })(i);
  }
  setTimeout(function() {
    takeDamage(damageTaken, 29, 30);
  }, 850);
  return n - inc;
}

function takeDamage(n, inc, delay) {
  for (var i = 0; i <= inc; i++) {
    (function(i) {
      setTimeout(function() {
        // Change code below here
        playerHpMeter.style.width = n - i + "px";
        damageTaken -= 1;
        playerHpCounter.innerHTML = damageTaken - 0;
        if (damageTaken === 0) {
          bottomLeftText.style.display = "none";
          playerPicture.style.display = "none";
          playerStats.style.display = "none";
          message.style.display = "block";
          message.innerHTML = "You have fainted!";
        } else if (damageTaken <= 35) {
          playerHpMeter.style.backgroundColor = rgb(255, 50, 50);
        } else if (damageTaken <= 50) {
          playerHpMeter.style.backgroundColor = "yellow";
        } else if (damageTaken <= 100) {
          playerHpMeter.style.backgroundColor = "orange";
        }
        // Change code above here
      }, delay * i);
    })(i);
  }
  return n - inc;
}

function kickAttack() {
  num = doDamage(num, 30, 20);
  bottomLeftText.style.display = "none";
  message.style.display = "block";
  message.innerHTML = "You kicked!";
  setTimeout(revert, 1500);
}

function hitAttack() {
  num = doDamage(num, 50, 20);
  bottomLeftText.style.display = "none";
  message.style.display = "block";
  message.innerHTML = "You hit!";
  setTimeout(revert, 1500);
}

function swordAttack() {
  num = doDamage(num, -1, 30);
  bottomLeftText.style.display = "none";
  message.style.display = "block";
  message.innerHTML = "It did nothing!";
  setTimeout(revert, 1500);
}

move1.onclick = kickAttack;
move2.onclick = hitAttack;
move3.onclick = swordAttack;
