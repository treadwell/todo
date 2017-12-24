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
  pending.catch((error) => {
    setOutput(error.toString(), false)
  })
}

function setOutput (str, clear = true) {
  eOutput.innerHTML = str
  if (clear) {
    eInput.value = ""
  }
}

setOutput("Enter text to capitalize.")
