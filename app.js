// Pobieranie elementów DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const removeAllBtn = document.getElementById("remove-all-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Funkcja aktualizująca stan zadań
function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Renderowanie listy zadań
    taskList.innerHTML = tasks.map(({ completed, text }) => `
        <li class="task-item">
            <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
            <span class="${completed ? 'completed' : ''}">${text}</span>
            <button class="delete-task-btn">X</button>
        </li>
    `).join('');

    // Zliczanie zadań
    const completedCount = tasks.filter(task => task.completed).length;
    taskCounter.textContent = `Ilość zadań: ${tasks.length} • Ilość zadań ukończonych: ${completedCount}`;

    // Zmiana stanu zadania
    document.querySelectorAll(".task-checkbox").forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            updateTasks();
        });
    });

    document.querySelectorAll(".delete-task-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTasks();
        });
    });
}

// Funkcja dodawania nowego zadania
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ id: Date.now(), text: taskText, completed: false });
        taskInput.value = "";
        updateTasks();
    }
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Funkcja usuwania wszystkich zadań
removeAllBtn.addEventListener("click", () => {
    tasks = [];
    updateTasks();
});


updateTasks();
