const Util = require('./utils.js');
window.Util = Util;
const MovingObject = require('./moving_object.js');
window.MovingObject = MovingObject;
const Asteroid = require('./asteroid.js');
window.Asteroid = Asteroid;
// window.Bullet = require('./bullet.js');
// window.Ship = require('./ship.js');
const Game = require('./game.js');
window.Game = Game;
const GameView = require('./game_view.js');
window.GameView = GameView;

addEventListener('DOMContentLoaded', () => {
  let canvas_element = document.getElementById('game-canvas')
  let ctx = canvas_element.getContext('2d')
  let game_view = new GameView(new Game(), ctx);
  game_view.start();
})
