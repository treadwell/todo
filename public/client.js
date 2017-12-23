const eInput = document.getElementById("input")
const eButton = document.getElementById("button")
const eOutput = document.getElementById("output")

eButton.addEventListener("click", () => {
  handler()
})

eInput.addEventListener("keypress", (ev) => {
  if (ev.keyCode === 13) {
    handler()
  }
})

function handler () {
  const pending = axios.post("/capitalize", { text: eInput.value })
  pending.then((resp) => {
    setOutput(resp.data.output)
  })
}

function setOutput (str) {
  eOutput.innerHTML = str
  eInput.value = ""
}

setOutput("Enter text to capitalize.")
