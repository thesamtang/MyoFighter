/**
 * MyoFighter
 *
 * Written by Sasha Heinen, Sam Tang, Angela Zhou at Hack the North 2014
 * This app works as an interface for the user, displaying status info
 */

var UI = require('ui');
var Vector2 = require('vector2');

/*
var healthWindow = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

healthWindow.show();
*/
var mainWindow = new UI.Window({
  fullscreen: true
});

var playerBkgd = new UI.Rect({
  backgroundColor: "white",
  position: new Vector2(0, 0),
  size: new Vector2(144, 84)
});

//var playerHealth; //get from iOS
var playerHealthBar = new UI.Text({
  position: new Vector2(0, 21),
  size: new Vector2(144, 84),
  font: 'bitham-42-medium-numbers',
  color: 'black',
  text: '100', //playerHealth,
  textAlign: 'center'
});

//var opponentHealth; //get from iOS
var opponentHealthBar = new UI.Text({
  position: new Vector2(0, 105),
  size: new Vector2(144, 84),
  font: 'bitham-42-medium-numbers',
  color: 'white',
  text: '100', //opponentHealth,
  textAlign: 'center'
});

mainWindow.add(playerBkgd);
mainWindow.add(playerHealthBar);
mainWindow.add(opponentHealthBar);
mainWindow.show();