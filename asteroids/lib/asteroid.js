const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid(options) {
  this.COLOR = 'red';
  this.RADIUS = 10;
  this.pos = options.pos;
  this.game = options.game;

  MovingObject.call(this, { radius: this.RADIUS, color: this.COLOR, pos: this.pos, vel: Util.randomVec(10), game: this.game });

}

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
