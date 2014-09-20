/**
 * MyoFighter
 *
 * Written by Sasha Heinen, Sam Tang, Angela Zhou at Hack the North 2014
 * This app works as an interface for the user, displaying status info
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var mainWindow = new UI.Window({
  fullscreen: true
});

// Player 1
var playerHealth = new UI.Rect({
  backgroundColor: "white",
  position: new Vector2(22, 38),
  size: new Vector2(100, 5)
});
var playerName = new UI.Text({
  position: new Vector2(22, 10),
  size: new Vector2(100, 20),
  font: 'gothic-24-bold',
  color: 'white',
  text: 'YOU',
  textAlign: 'left'
});

// Opponent player
var opponentHealth = new UI.Rect({
  backgroundColor: "white",
  position: new Vector2(22, 131),
  size: new Vector2(100, 5)
});
var opponentName = new UI.Text({
  position: new Vector2(22, 131),
  size: new Vector2(100, 18),
  font: 'gothic-24-bold',
  color: 'white',
  text: 'THEM',
  textAlign: 'left'
});

mainWindow.on('click', 'select', function(e) {
  console.log('key pressed');
  
  var punchIcon = new UI.Image({
    position: new Vector2(37, 52),
    size: new Vector2(70, 70),
    backgroundColor: 'clear',
    image: 'images/punch_pebble.png'
  });
  var magicIcon = new UI.Image({
    position: new Vector2(37, 52),
    size: new Vector2(70, 70),
    backgroundColor: 'clear',
    image: 'images/magic_pebble.png'
  });
  var shieldIcon = new UI.Image({
    position: new Vector2(37, 52),
    size: new Vector2(70, 70),
    backgroundColor: 'clear',
    image: 'images/sheild_pebble.png'
  });
  
  Vibe.vibrate('short');
  reduceHealth(opponentHealth, 5);
  
  var rand = Math.floor(Math.random()*3);
  switch(rand) {
    case 0:
      showIcon(punchIcon);
      console.log('punch');
      break;
    case 1:
      showIcon(magicIcon);
      console.log('magic');
      break;
    case 2:
      showIcon(shieldIcon);
      console.log('shield');
      break;
  }
  
});

function reduceHealth(playerHealth, amount) {
  var reduce = new Vector2(-amount, 0);
  var curSize = playerHealth.size();
  var newHealth = curSize.addSelf(reduce);
  playerHealth.animate({size: newHealth});
  
  var compare = new Vector2(0, 5);
  if (newHealth.equals(compare)) {
    var winScreen = new UI.Card({
      title: 'YOU WIN!',
      subtitle: 'yeeeeee'
    });
    winScreen.show();
  }
}

function showIcon(iconName) {
  mainWindow.add(iconName);
  iconName.animate({position: iconName.position()}, 200)
  .queue(function(next) {
    mainWindow.remove(iconName);
    next();
  });
}

mainWindow.add(playerHealth);
mainWindow.add(opponentHealth);
mainWindow.add(playerName);
mainWindow.add(opponentName);
mainWindow.show();
