const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const todos = []

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

app.get("/get-todos", (req, res) => {
  res.send(todos)
})

app.post("/add-todo", (req, res) => {
  todos.push(req.body)
  res.send(todos)
})

app.post("/delete-todo", (req, res) => {
  todos.splice(req.body.index, 1)
  res.send(todos)
})

app.post("/complete-todo", (req, res) => {
  todos[req.body.index].complete = !todos[req.body.index].complete
  res.send(todos)
})

app.listen(3000)
