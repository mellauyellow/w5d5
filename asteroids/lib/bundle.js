/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1);
	window.Util = Util;
	const MovingObject = __webpack_require__(2);
	window.MovingObject = MovingObject;
	const Asteroid = __webpack_require__(3);
	window.Asteroid = Asteroid;
	// window.Bullet = require('./bullet.js');
	// window.Ship = require('./ship.js');
	const Game = __webpack_require__(4);
	window.Game = Game;
	const GameView = __webpack_require__(5);
	window.GameView = GameView;

	addEventListener('DOMContentLoaded', () => {
	  let canvas_element = document.getElementById('game-canvas')
	  let ctx = canvas_element.getContext('2d')
	  let game_view = new GameView(new Game(), ctx);
	  game_view.start();
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(1);
	const MovingObject = __webpack_require__(2);

	function Asteroid(options) {
	  this.COLOR = 'red';
	  this.RADIUS = 10;
	  this.pos = options.pos;
	  this.game = options.game;

	  MovingObject.call(this, { radius: this.RADIUS, color: this.COLOR, pos: this.pos, vel: Util.randomVec(10), game: this.game });

	}

	Util.inherits(Asteroid, MovingObject);
	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3)

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function GameView (game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  window.setInterval(() => {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }, 20);
	}


	module.exports = GameView;


/***/ }
/******/ ]);