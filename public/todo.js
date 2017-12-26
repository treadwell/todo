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

function handleDelete (idx) {
  axios
    .post('/delete-todo', { index: idx })
    .then(resp => setOutput(resp.data))
}

function handleComplete (idx) {
  axios
    .post('/complete-todo', { index: idx })
    .then(resp => setOutput(resp.data))
}

function setOutput (list) {
  eInput.value = ''
  eList.innerHTML = list
    .map(vItem)
    .join('')
}

function vItem (item, idx) {
  return `<li>
    ${vItemText(item)}
    ${vItemDelete(idx)}
    ${vItemComplete(item, idx)}
  </li>`
}

function vItemText (item) {
  return `<span style="text-decoration: ${ item.complete ? 'line-through' : '' }">
    ${item.text}
  </span>`
}

function vItemDelete (idx) {
  return `<button onclick="handleDelete(${idx})">Delete</button>`
}

function vItemComplete (item, idx) {
  const label = item.complete ? 'Open' : 'Done'
  return `<button onclick="handleComplete(${idx})">Mark ${label}</button>`
}

axios
  .get('/get-todos')
  .then(resp => setOutput(resp.data))
