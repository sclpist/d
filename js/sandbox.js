const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
	document.addEventListener("DOMContentLoaded", getTasks);

	form.addEventListener("submit", addTask);

	taskList.addEventListener("click", removeTask);

	clearBtn.addEventListener("click", clearTasks);

	filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		const li = document.createElement("li");

		li.className = "collection-item";

		li.appendChild(document.createTextNode(task));

		const link = document.createElement("a");

		link.className = "delete-item secondary-content";

		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link);

		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if (taskInput.value === "") {
		alert("Add a task");
	}

	const li = document.createElement("li");

	li.className = "collection-item";

	li.appendChild(document.createTextNode(taskInput.value));

	const link = document.createElement("a");

	link.className = "delete-item secondary-content";

	link.innerHTML = '<i class="fa fa-remove"></i>';

	li.appendChild(link);

	taskList.appendChild(li);

	storeTaskInLocalStorage(taskInput.value);

	taskInput.value = "";

	e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are You Sure?")) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskFromLocalStorage(
				e.target.parentElement.parentElement,
			);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from LS
	localStorage.clear();
}

// Clear Tasks from LS

function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
