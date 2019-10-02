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

    const todoElement = createNewTodoElement(todo.value);
    
    const todoContainer = document.querySelector('.todo');
    const bound = document.querySelector('.bound');

    todoContainer.insertBefore(todoElement, bound);

    todo.value = 'New Todo ' + identity;

    console.log('add todo');
  }

  // creates a new element
  function createNewTodoElement(todo){
    let newDiv = document.createElement('div');
    newDiv.innerHTML = todo;

    let newLink = document.createElement('a');
    newLink.setAttribute('href', '#details');
    newLink.setAttribute('id', identity);
    newLink.appendChild(newDiv);

    let newTodo = document.createElement('li');
    newTodo.appendChild(newLink);

    identity++;

    console.log(newLink);

    // need this to return element for LOAD-TODOS function from LINE 52
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

  // currently inactive
  document.querySelector('.finished').addEventListener('click', () => {

    console.log('finished');

  });

});