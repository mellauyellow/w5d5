function MovingObject (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
}

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
}

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let sum = this.radius + otherObject.radius;
  let centerDistance = Util.vectorDistance(this.pos, otherObject.pos);
  if (centerDistance < sum ) {
    return true;
  } else {
    return false;
  }
}

MovingObject.prototype.collideWith = function(otherObject) {
  this.remove();
  otherObject.remove();
}

module.exports = MovingObject;
