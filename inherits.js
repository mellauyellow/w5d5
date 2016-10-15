
Function.prototype.inherits = function(parent) {
  function Surrogate () {};
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
}

function Animal() {
}

Animal.prototype.speak = function() {
  console.log("meow");
}

function Cat() {

  this.purr = function() {
    console.log("purr");
  }
}

Cat.inherits(Animal);
const cat = new Cat();
cat.speak();
cat.purr();
