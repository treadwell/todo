// fs.exists('todos.json', (err, itExists) => {
//   if (itExists) {
//     fs.readFile('todos.json', (err, contents) => {
//       const newContents = fn(contents)
//       fs.writeFile('todos.js', newContents, (err) => {
//       })
//     })
//   }
// })

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
