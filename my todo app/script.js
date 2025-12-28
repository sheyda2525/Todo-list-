let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#todoList");
const filterBtns = document.querySelectorAll(".filter-btn");
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderTodos();
  });
});
function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text: text, completed: false });
  saveTodos();
  renderTodos();
  input.value = "";
}
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}
function getFilteredTodos() {
  if (currentFilter === "active")
    return todos.filter((todo) => !todo.completed);
  if (currentFilter === "completed")
    return todos.filter((todo) => todo.completed);
  return todos;
}
function renderTodos() {
  list.innerHTML = "";
  const filteredTodos = getFilteredTodos();
  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `list-group-item ${todo.completed ? "completed" : ""}`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });
    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "todo-text";
    const actions = document.createElement("div");
    actions.className = "todo-actions d-flex";
    const edit = document.createElement("i");
    edit.className = "bi bi-pencil edit-btn";
    edit.addEventListener("click", (e) => {
      e.stopPropagation();
      const newText = prompt("Edit your task:", todo.text);
      if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
      }
    });
    const del = document.createElement("i");
    del.className = "bi bi-x delete-btn";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    });
    actions.append(edit, del);
    li.append(checkbox, span, actions);
    list.appendChild(li);
  });
}
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
renderTodos();
