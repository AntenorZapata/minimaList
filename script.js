// elements
const olList = document.querySelector('#lista-tarefas');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnAddTodo = document.querySelector('#criar-tarefa');
const inputTodo = document.querySelector('#texto-tarefa');
const btnDeleteAll = document.querySelector('#apaga-tudo');
const btnDeleteFinished = document.querySelector('#remover-finalizados');
const btnDeleteSelects = document.querySelector('#remover-selecionado');
const btnSaveTask = document.querySelector('#salvar-tarefas');
const childs = olList.children;
const bgColor = 'rgb(128, 128, 128, 0.3)';
const fas = document.querySelector('.fas');

window.onload = () => {
  const todos = localStorage.getItem('todos');
  if (todos) olList.innerHTML = todos;
};

// generate random colors

const generateRandom = () => {
  const [firstColor, secondColor, thirdColor] = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];

  return [firstColor, secondColor, thirdColor];
};

// Mark as finished

const checkTodo = (task) => {
  task.addEventListener('dblclick', (e) => {
    fa = document.createElement('i');
    fa.classList = 'fas fa-check';

    if (e.target.children.length > 0) {
      task.removeChild(e.target.firstElementChild);
    } else if (
      e.target.className === 'task' ||
      e.target.className === 'task selected'
    ) {
      task.appendChild(fa);
    }
  });
};

// add to-dos

const addTodo = (e) => {
  const [firstColor, secondColor, thirdColor] = generateRandom();

  const task = document.createElement('li');
  task.innerText = inputTodo.value;
  task.className = 'task';

  checkTodo(task);

  task.style.backgroundColor =
    'rgba(' +
    firstColor +
    ',' +
    secondColor +
    ',' +
    thirdColor +
    ',' +
    0.2 +
    ')';
  if (inputTodo.value) {
    olList.appendChild(task);
    inputTodo.value = '';
  } else {
    null;
  }
};

btnAddTodo.addEventListener('click', addTodo);
inputTodo.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) addTodo();
});

// select to-dos

const taskSelect = (e) => {
  const tasks = document.querySelectorAll('.task');

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i] === e.target) {
      tasks[i].classList.add('selected');
    } else {
      tasks[i].classList.remove('selected');
    }
  }
};

olList.addEventListener('click', taskSelect);

// moveUp to-dos

const moveUp = () => {
  for (let i = 0; i < childs.length; i += 1) {
    const index = Array.prototype.indexOf;
    if (
      childs[i].classList.contains('selected') &&
      index.call(childs, childs[i]) > 0
    ) {
      olList.insertBefore(childs[i], childs[i].previousElementSibling);
      console.log(childs[i]);
    }
  }
};

btnMoveUp.addEventListener('click', moveUp);

// moveDown to-dos

const moveDown = () => {
  for (let i = childs.length - 2; i >= 0; i -= 1) {
    if (childs[i].classList.contains('selected')) {
      olList.insertBefore(childs[i].nextElementSibling, childs[i]);
    }
  }
};

btnMoveDown.addEventListener('click', moveDown);

// delete All to-dos

const deleteAllTodos = () => {
  const tasks = document.querySelectorAll('.task');
  for (let i = 0; i < tasks.length; i += 1) {
    olList.removeChild(tasks[i]);
  }
};

btnDeleteAll.addEventListener('click', deleteAllTodos);

// delete select to-dos

const tasks = document.querySelectorAll('.task');

const deleteSelectTodos = (e) => {
  e.preventDefault();
  for (let i = 0; i < childs.length; i += 1) {
    if (childs[i].nodeName === 'LI' && childs[i] === e.target) {
      olList.removeChild(childs[i]);
    }
  }
};

olList.addEventListener('contextmenu', deleteSelectTodos);

// save to-dos

const saveTask = () => {
  localStorage.setItem('todos', olList.innerHTML);
};

btnSaveTask.addEventListener('click', saveTask);
