const eInput = document.getElementById('add-input')
const eButton = document.getElementById('add-button')
const eList = document.getElementById('todo-list')

eButton.addEventListener('click', () => {
  handler()
})

eInput.addEventListener('keypress', (ev) => {
  if (ev.keyCode === 13) {
    handler()
  }
})

function handler () {
  if (!eInput.value) return
  const pendingAdd = axios.post('/add-todo', { text: eInput.value})
  pendingAdd.then((resp) => {
    setOutput(resp.data)
  })
}

function setOutput (list) {
  eInput.value = ''
  eList.innerHTML = list
    .map(item => `<li>${item.text}</li>`)
    .join('')
}

const pendingLoad = axios.get('/get-todos')
pendingLoad.then((resp) => {
  setOutput(resp.data)
})
