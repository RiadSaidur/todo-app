// everything will bw executed after window loads
window.addEventListener('load', () => {
  // when user adds a todo
  document.querySelector('.addTodo').addEventListener('click', addTodo);

  // id for todos
  // will use this for DETAILS SECTION if user selects a todo
  let identity = 1;

  // function to add a new todo
  function addTodo(){
    const todo = document.querySelector('.todoItem');

    if(todo.value){

      const todoElement = createNewTodoElement(todo.value);
    
      const todoContainer = document.querySelector('.todo');
      const bound = document.querySelector('.bound');

      todoContainer.insertBefore(todoElement, bound);

      refresh();

      todo.value = '';

    }

    else alert('New Todo can not be empty');
  }

  // creates a new element
  function createNewTodoElement(todo){
    let newDiv = document.createElement('p');
    newDiv.setAttribute('id', 'pending');
    newDiv.innerHTML = todo;

    let newLink = document.createElement('a');
    newLink.setAttribute('href', '#details');    
    newLink.appendChild(newDiv);

    let newTodo = document.createElement('li');
    newTodo.setAttribute('id', identity);
    newTodo.appendChild(newLink);

    identity++;

    return newTodo;
  }

  // loads todo from local storage
  // currently inactive
  function loadTodos(){
    if(localStorage.Todos){
      const src = localStorage.Todos;
      const todos = JSON.parse(src);

      const todoContainer = document.querySelector('.todo');
      const bound = document.querySelector('.bound');
      
      // creates todo element for each todo in localStorage
      todos.forEach(todo => {
        const todoElement = createNewTodoElement(todo);
        todoContainer.insertBefore(todoElement, bound);
      });

      console.log('load todo if');
    }

    console.log('load todo');
  }

  let current = document.querySelector('.selected');

  function refresh(){

    let todos = document.querySelectorAll('.todo p');
    let todoList = document.querySelectorAll('.todo');

    todos.forEach(todo => {
      todo.addEventListener('click', () => {

        let description = document.querySelector('.description');
        description.innerText = `Description: ${todo.innerText}`;
        document.querySelector('.status').innerText = `Status: ${todo.id}`;

        current.classList.remove('selected');
        todo.parentElement.parentElement.classList.add('selected');
        current = todo.parentElement.parentElement;

        document.querySelector('.finished').addEventListener('click', () => {
          current.classList.remove('selected');
          current.classList.add('complete');

        });

        document.querySelector('.delete').addEventListener('click', () => {
          current.remove();
          description.innerText = `Description: `;
          document.querySelector('.status').innerText = `Status: `;
        });
        
      });
    });

  }

  refresh();

});