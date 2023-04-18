// Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(event) {
    event.preventDefault()

    // Todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // Todo Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // Add todo to localStorage
    saveLocalTodos(todoInput.value)

    // Check Mark Button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = "<i class='fas fa-check'>c</i>"
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // Delete Button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = "<i class='fas fa-trash'>d</i>"
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // Append Child
    todoList.appendChild(todoDiv)

    // Clear Input Value
    todoInput.value = ''
}

function deleteCheck(event) {
    const item = event.target

    // Remove Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        removeLocalTodos(todo)
        todo.remove()
    }

    // Complete Todo 
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // Checking Whether there is a todo or not
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo) {
         // Todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        // Todo Li
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // Check Mark Button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = "<i class='fas fa-check'>✔</i>"
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // Delete Button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = "<i class='fas fa-trash'>❌</i>"
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        // Append Child
        todoList.appendChild(todoDiv)

    })
}

function removeLocalTodos (todo) {
    // Checking Whether there is a todo or not
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}