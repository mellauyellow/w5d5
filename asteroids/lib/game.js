const Asteroid = require('./asteroid.js')

function Game(x = 400, y = 400, num_asteroids = 5) {
  this.DIM_X = x;
  this.DIM_Y = y;
  this.NUM_ASTEROIDS = num_asteroids;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function(){
  for (let i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}))
  }
}

Game.prototype.randomPosition = function(){
  let x = Math.floor(Math.random() * this.DIM_X)
  let y = Math.floor(Math.random() * this.DIM_Y)

  return [x, y];
}

Game.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(el => el.draw(ctx))
}

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(el => el.move());
}

Game.prototype.wrap = function(pos){
  let new_pos = pos;
  if(pos[0] >= this.DIM_X) {
    new_pos[0] = 0;
  } else if(pos[0] < 0) {
    new_pos[0] = this.DIM_X;
  }

  if(pos[1] >= this.DIM_Y) {
    new_pos[1] = 0;
  } else if(pos[1] < 0) {
    new_pos[1] = this.DIM_Y;
  }

  return new_pos;
}

Game.prototype.checkCollisions = function() {
  this.asteroids.forEach((el1) => {
    this.asteroids.forEach((el2) => {
      if( el1.isCollidedWith(el2) && el1 !== el2) {
        el1.collideWith(el2);
      }
    })
  })
}

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function(asteroid) {
  let index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1)
}


module.exports = Game;
