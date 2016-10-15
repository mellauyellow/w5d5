const Util = {
  inherits(childClass, parentClass) {
    function Surrogate () {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  vectorDistance(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
  },

  vectorNorm(pos) {
    return this.vectorDistance([0,0], pos);
  },

  randomVec(length) {
    let x = Math.floor(((Math.round(Math.random()) * 2 - 1)* Math.random()) * length/1.5);
    let y = Math.floor(((Math.round(Math.random()) * 2 - 1)* Math.random()) * length/1.5);
    return [x, y];
  }
}

module.exports = Util;
