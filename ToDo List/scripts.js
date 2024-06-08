document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const themeToggle = document.getElementById('theme-toggle');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const darkMode = localStorage.getItem('darkMode') === 'enabled';

    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = 'task';
            if (task.completed) {
                taskElement.classList.add('completed');
            }

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const taskPriority = document.createElement('span');
            taskPriority.className = 'task-priority';
            taskPriority.textContent = task.priority ? '!' : '';

            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';

            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.addEventListener('click', () => editTask(index));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener('click', () => deleteTask(index));

            const completeButton = document.createElement('button');
            completeButton.className = 'complete-button';
            completeButton.innerHTML = task.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
            completeButton.addEventListener('click', () => toggleComplete(index));

            taskButtons.append(editButton, deleteButton, completeButton);

            taskElement.append(taskPriority, taskText, taskButtons);
            taskList.appendChild(taskElement);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            text: taskText,
            completed: false,
            priority: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
        themeToggle.innerHTML = darkModeEnabled ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', toggleTheme);
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});
