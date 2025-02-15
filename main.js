const tasks = [
  {
    title: "Design website",
    completed: false,
  },
  {
    title: "Coding website",
    completed: true,
  },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const render = () => {
  const htmls = tasks.map(
    (task, index) => `
  <li class="task-item ${
    task.completed ? "completed" : ""
  }" data-index =${index}>
          <span class="task-title">${task.title}</span>
          <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${
              task.completed ? "Mark as undone" : "Mark as done"
            }</button>
            <button class="task-btn delete">Delete</button>
          </div>
        </li>
  `
  );
  taskList.innerHTML = htmls.join("");
};

const addTask = (e) => {
  e.preventDefault();
  const newTitle = capitalizeFirstLetter(todoInput.value.trim());
  const isDuplicate = tasks.some(
    (task) => task.title.toLowerCase() === newTitle.toLowerCase()
  );
  console.log(isDuplicate);

  if (!newTitle) return alert("Không được để trống!");
  if (isDuplicate) return alert("Công việc đã tồn tại, vui lòng nhập khác :))");

  const newTask = {
    title: newTitle,
    completed: false,
  };
  tasks.push(newTask);
  render();
  todoInput.value = "";
};

todoForm.addEventListener("submit", addTask);
// taskList.addEventListener("click", handleTaskList);

render();
