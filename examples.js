function plus (x, y) {
  return x + y
}

console.log(plus(1, 3))

function plusGenerator (x) {
  return function (y) {
    return x + y
  }
}

console.log(plusGenerator(2)(3))

const a = [1, 2, 3, 4]

console.log(a.map(x => x + 10))
console.log(a.map(x => plus(x, 10)))
console.log(a.map(plusGenerator(10)))
