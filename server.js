const mongo = require("mongodb")
const express = require("express")
const bodyParser = require("body-parser")

// FIXME: Use 'mongodb' v2.2.30. Currently we have v3.0.1
mongo.MongoClient.connect('mongodb://127.0.0.1:27017/todoapp')
  .catch(err => console.log(`There was an error connecting: ${err.getMessage()}`))
  .then(db => {

    const app = express()
    const Todos = db.collection('todos')

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
      getTodoArray()
        .then(send(res)))

    app.post("/add-todo", (req, res) =>
      Todos.insert(req.body)
        .then(getTodoArray())
        .then(send(res)))

    app.post("/delete-todo", (req, res) =>
      Todos.deleteOne({ _id: req.body.todoId })
        .then(getTodoArray())
        .then(send(res)))

    app.post("/complete-todo", (req, res) =>
      Todos.findOne({ _id: req.body.todoId })
        .then(todo => Todos.updateOne({ _id: req.body.todoId }, { $set: { complete: !todo.complete } }))
        .then(getTodoArray())
        .then(send(res)))

    app.listen(3000)

    function getTodoArray () {
      return Todos.find()
        .then(cursor => cursor.toArray())
    }

    function send (res) {
      return todos => res.send(todos)
    }

  })
