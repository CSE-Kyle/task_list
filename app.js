// Define UI Variables : 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners : 
loadEventListeners();

// Load all event listeners : 
function loadEventListeners() {
    // DOM load event : 
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event : 
    form.addEventListener('submit', addTask);
    // Remove task event : 
    taskList.addEventListener('click', removeTask);
    // Clear task event : 
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event : 
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage : 
function getTasks() {
    let tasks;

    if(localStorage.getItem("tasks") === null) {
       tasks = [];
    } else {
       tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
        // Create li element :
        const li = document.createElement("li");
        // Add a class :
        li.className = "collection-item";
        // Create Text Node and append to li :
        li.appendChild(document.createTextNode(task));
        // Create new link element :
        const link = document.createElement("a");
        // Add class :
        link.className = "delete-item secondary-content";
        // Add icon html :
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li :
        li.appendChild(link);
        // Append li to ul :
        taskList.appendChild(li);
    });
}

// Add Task : 
function addTask(e) {
    if(taskInput.value === '') {
        alert('please add a task');
    }

    // Create li element : 
    const li = document.createElement('li');
    // Add a class : 
    li.className = 'collection-item';
    // Create Text Node and append to li : 
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element : 
    const link = document.createElement('a');
    // Add class : 
    link.className = 'delete-item secondary-content';
    // Add icon html : 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li : 
    li.appendChild(link);
    // Append li to ul : 
    taskList.appendChild(li);
    // Store in Local Storage : 
    storeTaskInLocalStorage(taskInput.value);
    // Clear the input : 
    taskInput.value = '';

    // console.log(li);

    e.preventDefault();
}

// Store Task : 
function storeTaskInLocalStorage(task) {
    let tasks; 

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task : 
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        // console.log(e.target);
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            // Remove from local storage : 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

// remove from local storage : 
function removeTaskFromLocalStorage(taskItem) {
    // console.log(taskItem);
    let tasks;

    if(localStorage.getItem("tasks") === null) {
       tasks = [];
    } else {
       tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task : 
function clearTasks(e) {
    // taskList.innerHTML = '';
    
    // Faster : 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from local storage : 
    clearTasksFromLocalStorage();
}

// Clear Tasks from local storage : 
function clearTasksFromLocalStorage() {
    alert('all tasks cleared');
    localStorage.clear();
}

// Filter Task : 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
    // console.log(text);
}