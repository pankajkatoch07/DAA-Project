// Task array to hold the tasks
let tasks = [];

// Task constructor function
function Task(description, priority) {
    this.description = description;
    this.priority = priority;
}

// Quick Sort function to sort tasks based on priority
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivot = arr[0];
    let left = arr.slice(1).filter(task => task.priority <= pivot.priority);
    let right = arr.slice(1).filter(task => task.priority > pivot.priority);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Add task to the task array
document.getElementById('addTaskBtn').addEventListener('click', function () {
    let description = document.getElementById('taskDescription').value;
    let priority = parseInt(document.getElementById('taskPriority').value);

    if (description && priority) {
        tasks.push(new Task(description, priority));
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskPriority').value = '';
        displayTasks();
    }
});

// Function to display the tasks in the task list
function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear current list
    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = `${task.description} (Priority: ${task.priority})`;

        // Edit button
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', function () {
            editTask(index);
        });

        // Delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            deleteTask(index);
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to display sorted tasks
function displaySortedTasks(sortedTasks) {
    let sortedTaskList = document.getElementById('sortedTaskList');
    sortedTaskList.innerHTML = '';  // Clear current sorted list
    sortedTasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = `${task.description} (Priority: ${task.priority})`;
        sortedTaskList.appendChild(li);
    });
}

// Sort button functionality
document.getElementById('sortBtn').addEventListener('click', function () {
    let sortedTasks = quickSort(tasks);
    displaySortedTasks(sortedTasks);
});

// Edit a task
function editTask(index) {
    let newDescription = prompt("Edit task description:", tasks[index].description);
    let newPriority = prompt("Edit task priority:", tasks[index].priority);

    if (newDescription && newPriority) {
        tasks[index].description = newDescription;
        tasks[index].priority = parseInt(newPriority);
        displayTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}