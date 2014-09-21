/**
 * MyoFighter
 *
 * Written by Sasha Heinen, Sam Tang, Angela Zhou at Hack the North 2014
 * This app works as an interface for the user, displaying status info
 */
//var jq = require('jquery');
//var fb = require('firebase');
//var data = new fb.Firebase('https://rootbeerfighter.firebaseio.com');

/*
$.getScript('https://cdn.firebase.com/v0/firebase.js', function() {

  var fb = new Firebase('https://rootbeerfighter.firebaseio.com');
  console.log(fb.child('Hello'));

});
*/




var gameSpace = new function() {
  var UI = require('ui');
  var Vector2 = require('vector2');
  var Vibe = require('ui/vibe');
  var ajax = require('ajax');
  
  var playerIndex = 0;
  var oppIndex = 0;
  
  setInterval(function () {getData()}, 10);
  function getData() {
    ajax(
      {
        url: 'https://rootbeerfighter.firebaseio.com/.json',
        type: 'json'
      },
      function(data) {
        console.log(data.player1.curentLife);
        updateHealth(data);
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    );
  }
  
  function updateHealth(data) {
    var p1 = data.player1;
    var p2 = data.player2;
    if(p1.count != playerIndex) {
      Vibe.vibrate('short');
      reduceHealth(playerHealth, p1.currentLife);
      showIcon(p1.mostRecentAttack);
      playerIndex++;
    }
    if(p2.count != oppIndex) {
      Vibe.vibrate('short');
      reduceHealth(opponentHealth, p2.currentLife);
      oppIndex++;
    }
  }
  
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
    image: 'images/shield_pebble.png'
  });
  
  /*
  mainWindow.on('click', 'select', function(e) {
    console.log('key pressed');
    
    Vibe.vibrate('short');
    reduceHealth(opponentHealth, 5);
    //showIcon(magicIcon);
    
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
  */
  
  function reduceHealth(playerHealth, health) {
    var newHealth = new Vector2(health, 5);
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
  
  function showIcon(iconIndex) {
    var iconName;
    switch (iconIndex) {
      case 0:
        iconName = punchIcon;
        break;
      case 1:
        iconName = magicIcon;
        break;
      case 2:
        iconName = shieldIcon;
        break;
    }
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
}();

