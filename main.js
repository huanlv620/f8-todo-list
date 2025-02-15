const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const isDuplicate = (title, excludeIndex = -1) => {
  return tasks.some((task, index) => {
    console.log(task);
    console.log(index);
    return (
      task.title.toLowerCase() === title.toLowerCase() && excludeIndex !== index
    );
  });
};

const renderTask = () => {
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
  const isDup = isDuplicate(newTitle);

  if (!newTitle) return alert("Không được để trống!");
  if (isDup) return alert("Công việc đã tồn tại, vui lòng nhập khác :))");

  const newTask = {
    title: newTitle,
    completed: false,
  };
  tasks.push(newTask);
  saveTask();
  renderTask();
  todoInput.value = "";
};

const handleTaskList = (e) => {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = taskItem.dataset.index;
  const taskCurrent = tasks[taskIndex];

  console.log(taskCurrent);

  if (e.target.closest(".edit")) {
    const newTitle = prompt(`Hãy chỉnh sửa theo ý mình đi!`, taskCurrent.title);

    if (!newTitle) return;

    const isDuplicate = tasks.some(
      (task, index) =>
        task.title.toUpperCase() === newTitle.toUpperCase() &&
        task !== taskCurrent
    );

    console.log(isDuplicate);

    if (isDuplicate) return alert("Không được để giống nhau!");

    taskCurrent.title = newTitle;
    saveTask();
    renderTask();
    return;
  }

  if (e.target.closest(".done")) {
    taskCurrent.completed = !taskCurrent.completed;
    saveTask();
    renderTask();
    return;
  }

  if (e.target.closest(".delete")) {
    const author = confirm(`Bạn có muốn xóa ${taskCurrent.title}!`);
    if (author) {
      tasks.splice(taskIndex, 1);
      saveTask();
      renderTask();
      return;
    }
  }
};

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskList);

renderTask();
