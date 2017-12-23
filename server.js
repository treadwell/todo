const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use("/", express.static("public"))
app.use("/lib", express.static("node_modules"))

app.get("/hello", (req, res) => {
  res.send("hello world")
})

app.post("/capitalize", (req, res) => {
  console.log(req.body)
  res.send({ output: req.body.text.toUpperCase() })
})

app.listen(3000)
