// function sum(...args) {
//   let sum = 0
//   args.forEach((el) => {
//     sum += el
//   })
//   return sum
// };
//
// // console.log(sum(1, 2, 3, 4));
// // console.log(sum(1, 2, 3, 4, 5));
//
// Function.prototype.myBind = function(args) {
//
//   let args_arr = Array.from(arguments);
//   let context = args_arr.shift();
//   let func = this;
//
//   return function (arr) {
//     args_arr = args_arr.concat(Array.from(arguments))
//
//     return func.apply(context, args_arr);
//   }
// }
// //
// //
// Function.prototype.myBindArgs = function(...args) {
//
//   let context = args.shift();
//   let func = this;
//
//   return function(...arr) {
//     let args_arr = args.concat(arr);
//     return func.apply(context, args_arr);
//   }
// }
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }

// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// console.log(markov.says.myBindArgs(breakfast, "meow", "Kush")());
// // Breakfast says meow to Kush!
// // true
//
// console.log(markov.says.myBindArgs(breakfast)("meow", "a tree"));
// // Breakfast says meow to a tree!
// // true
//
// console.log(markov.says.myBindArgs(breakfast, "meow")("Markov"));
// // Breakfast says meow to Markov!
// // true
//
// const notMarkovSays = markov.says.myBindArgs(breakfast);
// console.log(notMarkovSays("meow", "me"));
// // Breakfast says meow to me!
// // true
//

function curriedSum(numArgs) {
  let numbers = [];

  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce((el, accum) => el + accum);
    } else {
      return _curriedSum;
    }
  }
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

Function.prototype.currySpread = function(numArgs) {
  let obj = this;
  let numbers = [];

  return function _curry(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return obj(...numbers);
    } else {
      return _curry;
    }
  }
}

Function.prototype.curryApply = function(numArgs) {
  let obj = this;
  let numbers = [];


  return function _curry(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return obj.apply(this, numbers)
    } else {
      return _curry;
    }
  }
}

const undo = function(...numbers){console.log(numbers);};

undo.curryApply(3)(4)(5)(6);
// const curry = currySpread(5);
