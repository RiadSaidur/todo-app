// everything will bw executed after window loads
window.addEventListener('load', () => {
  // when user adds a todo
  document.querySelector('.addTodo').addEventListener('click', addTodo);

  // id for todos
  // will use this for DETAILS SECTION if user selects a todo
  let identity = 5;

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
  const markComplete = document.querySelector('.finished');
  const dlt = document.querySelector('.delete');
  const description = document.querySelector('.description');

  function refresh(){

    let todos = document.querySelectorAll('.todo p');
    // let todoList = document.querySelectorAll('.todo');

    todos.forEach(todo => {
      todo.addEventListener('click', () => {

        description.innerText = `Description: ${todo.innerText}`;
        document.querySelector('.status').innerText = `Status: ${todo.id}`;

        current.classList.remove('selected');
        todo.parentElement.parentElement.classList.add('selected');
        current = todo.parentElement.parentElement;
        currentFocus = current.id;

        markComplete.addEventListener('click', () => {
          current.classList.add('complete');
          todo.id='completed';
          document.querySelector('.status').innerText = `Status: ${todo.id}`;
          console.log(todo.id)
        });

        dlt.addEventListener('click', () => {
          current.remove();
          description.innerText = `Description: `;
          document.querySelector('.status').innerText = `Status: `;
          console.log('mouse');
        });
        
      });
    });

  }

  let currentFocus = 0;
  let nodes = [];
  let length = 0;
  let dltID = null;

  //  keyboard navigation
  document.addEventListener('keydown', e => {
    
    nodes = document.querySelector('.todo').children;
    length = nodes.length - 2;

    if(e.key == "ArrowDown"){
      nodes[currentFocus].classList.remove('selected');
      if(currentFocus >= length) currentFocus = 1;
      else{
        currentFocus++;
      }
      navigate();
    }

    else if(e.key == "ArrowUp"){
      nodes[currentFocus].classList.remove('selected');
      if(currentFocus <= 1) currentFocus = length;
      else{
        currentFocus--;
      }
      navigate();
    }

    function navigate(){
      const status = nodes[currentFocus].childNodes[0].childNodes[0].id;
      description.innerText = `Description: ${nodes[currentFocus].innerText}`;
      document.querySelector('.status').innerText = `Status: ${status}`;

      dltID = nodes[currentFocus].id;

      markComplete.addEventListener('click', () => {
        nodes[currentFocus].classList.add('complete');
      });

      dlt.addEventListener('click', () => {
        document.getElementById(dltID).remove();
        description.innerText = `Description: `;
        document.querySelector('.status').innerText = `Status: `;
        currentFocus = 1;
      });

      nodes[currentFocus].classList.add('selected');

    }

  });

  refresh();

});