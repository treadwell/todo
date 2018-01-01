const eInput = document.getElementById('add-input')
const eButton = document.getElementById('add-button')
const eList = document.getElementById('todo-list')

eButton.addEventListener('click', () => {
  handleAdd()
})

eInput.addEventListener('keypress', ev => {
  if (ev.keyCode === 13)
    handleAdd()
})

function handleAdd () {
  if (!eInput.value) return
  axios
    .post('/add-todo', { text: eInput.value })
    .then(resp => setOutput(resp.data))
}

function handleDelete (todoId) {
  axios
    .post('/delete-todo', { todoId: todoId })
    .then(resp => setOutput(resp.data))
}

function handleComplete (todoId) {
  axios
    .post('/complete-todo', { todoId: todoId })
    .then(resp => setOutput(resp.data))
}

function setOutput (list) {
  eInput.value = ''
  eList.innerHTML = list
    .map(vTodo)
    .join('')
}

function vTodo (todo) {
  return `<li>
    ${vTodoText(todo)}
    ${vTodoDelete(todo)}
    ${vTodoComplete(todo)}
  </li>`
}

function vTodoText (todo) {
  return `<span style="text-decoration: ${ todo.complete ? 'line-through' : '' }">
    ${todo.text}
  </span>`
}

function vTodoDelete (todo) {
  return `<button onclick="handleDelete('${todo._id}')">Delete</button>`
}

function vTodoComplete (todo) {
  const label = todo.complete ? 'Open' : 'Done'
  return `<button onclick="handleComplete('${todo._id}')">Mark ${label}</button>`
}

axios
  .get('/get-todos')
  .then(resp => setOutput(resp.data))
