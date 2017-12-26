const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const TODOS = 'public/todos.json'

app.use(bodyParser.json())
app.use("/", express.static("public"))
app.use("/lib", express.static("node_modules"))

app.get("/hello", (req, res) => {
  res.send("hello world")
})

app.post("/capitalize", (req, res) => {
  console.log(req.body)
  if (Math.random() <= 0.9) {
    res.send({ output: req.body.text.toUpperCase() })
  } else {
    res.status(500)
    res.end()
  }
})

app.get("/get-todos", (req, res) =>
  modify()
    .then(send(res)))

app.post("/add-todo", (req, res) =>
  modify(addTodo(req.body))
    .then(send(res)))

app.post("/delete-todo", (req, res) =>
  modify(deleteTodo(req.body.index))
    .then(send(res)))

app.post("/complete-todo", (req, res) =>
  modify(completeTodo(req.body.index))
    .then(send(res)))

app.listen(3000)

function addTodo (newTodo) {
  return todos => todos.push(newTodo)
}

function deleteTodo (index) {
  return todos => todos.splice(index, 1)
}

function completeTodo (index) {
  return todos => todos[index].complete = !todos[index].complete
}

function send (res) {
  return todos => res.send(todos)
}

function modify (fn) {
  return fn
    ? modifyTodos(fn)
    : readTodos()
}

function modifyTodos (fn) {
  return readTodos()
    .then(wrap(fn))
    .then(writeTodos)
}

function wrap (fn) {
  return todos => {
    fn(todos)
    return todos
  }
}

function readTodos () {
  return new Promise((resolve) =>
    fs.readFile(TODOS, (err, contents) =>
      resolve(err ? [] : JSON.parse(contents))))
}

function writeTodos (todos) {
  return new Promise((resolve, reject) =>
    fs.writeFile(TODOS, JSON.stringify(todos), (err) =>
      err ? reject(err) : resolve(todos)))
}
