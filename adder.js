function plus (a, b, next) {
  const c = a + b
  next(c)
}

plus(1, 2, (plusResult) => {
  console.log(plusResult)
})

function multiply (a, b, next) {
  const c = a * b
  next(c)
}

plus(1, 2, (plusResult) =>

  multiply(3, plusResult, (multResult) =>

    console.log(multResult)))

function plusPromise (a, b) {
  return new Promise((next) => {
    next(a + b)
  })
}

function multiplyPromise (a, b) {
  return new Promise((resolve, reject) => {
    next(a * b)
  })
}

function myFsExists (file) {
  return new Promise((resolve, reject) => {
    fs.exists(file, (err, itExists) => {
      if (err) return reject(err)
      else resolve(itExists)
    })
  })
}

const itExists = await myFsExists('hello.txt')
const something = await use(itExists)


const pendingPlusResult = plus(1, 2)

const pendingMultResult = pendingPlusResult
  .then(plusResult => multiply(3, plusResult))

pendingPlusResult.then(multResult => {
  console.log(multResult)
})
