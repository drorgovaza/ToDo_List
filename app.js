 
 const todoInput = document.querySelector(".todo-input");
 const todoButton = document.querySelector(".todo-btn");
 const todoList = document.querySelector(".todo-list");


 document.addEventListener("DOMContentLoaded", getTodos);
 


todoButton.addEventListener("click" , (event) => {
event.preventDefault();

const tododiv = document.createElement("div");
tododiv.classList.add("todo-result");

const newItem = document.createElement("li");
newItem.innerText = todoInput.value ;
newItem.classList.add("new-item");

saveLocalTodos(todoInput.value);


const checkBtn = document.createElement("button");
checkBtn.classList.add("checkBtn");
checkBtn.innerHTML =`<i class="fas fa-check"></i>`;


const removeBtn = document.createElement("button");
removeBtn.classList.add("removeBtn");
removeBtn.innerHTML =`<i class="fas fa-trash"></i>`;

tododiv.appendChild(newItem);
tododiv.appendChild(checkBtn);
tododiv.appendChild(removeBtn);
todoList.appendChild(tododiv);
todoInput.value = "";
})


todoList.addEventListener("click" , e =>{
const item = e.target;
if(item.classList[0] === "removeBtn"){
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
        // todo.remove(); 

      });
      todo.remove(); 

}

if(item.classList[0] === "checkBtn"){
    const todoC = item.parentElement;
    todoC.classList.toggle("completed");

}

})

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-result");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("new-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("checkBtn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("removeBtn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }

