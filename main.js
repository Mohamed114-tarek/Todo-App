const addField = document.querySelector(".main-form__input");
const todoList = document.querySelector(".main-list");
const form = document.forms[0];
let todoArray = JSON.parse(localStorage.getItem("todos")) || [];
let counter = todoArray.length;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (addField.value.trim().length > 0) {
    addElement();
    addField.value = "";
  }
});
window.addEventListener("load", function () {
  todoArray.forEach((item) => {
    let createElement = document.createElement("li");
    let createInput = document.createElement("input");
    let createLable = document.createElement("label");
    let createBtn = document.createElement("button");
    let createSvgBox = document.createElement("span");
    let svg = `         <svg
            class="list-item__svg"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>`;
    createSvgBox.innerHTML = svg;

    createInput.type = "checkbox";
    createInput.id = `item-${item.todoId}`;
    createInput.classList.add("list-item__check");
    createElement.id = item.todoId;
    createInput.checked = item.checked;

    createInput.addEventListener("change", () => {
      item.checked = createInput.checked;
      saveLocal();
    });
    createElement.classList.add("list-item");
    createLable.setAttribute("for", `item-${item.todoId}`);
    createLable.textContent = item.todoText;
    createBtn.classList.add("delete");
    createBtn.innerHTML = `          <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>`;
    createElement.append(createInput);
    createElement.append(createSvgBox);
    createElement.append(createLable);
    createElement.append(createBtn);
    const deleteBtn = createElement.querySelector(".delete");
    deleteBtn.addEventListener("click", function () {
      createElement.remove();
      todoArray = todoArray.filter((list) => list.todoId !== item.todoId);
      saveLocal();
    });
    todoList.append(createElement);
  });
  noElements();
});
function addElement() {
  const todo = {
    todoText: addField.value.trim(),
    todoId: counter,
    checked: false,
  };

  let createElement = document.createElement("li");
  let createInput = document.createElement("input");
  let createLable = document.createElement("label");
  let createBtn = document.createElement("button");
  let createSvgBox = document.createElement("span");
  let svg = `         <svg
            class="list-item__svg"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>`;
  createSvgBox.innerHTML = svg;

  createInput.type = "checkbox";
  createInput.checked = todo.checked;

  createInput.addEventListener("change", () => {
    todo.checked = createInput.checked;
    saveLocal();
  });
  createInput.id = `item-${todo.todoId}`;
  createInput.classList.add("list-item__check");
  createElement.id = todo.todoId;
  createElement.classList.add("list-item");
  createLable.setAttribute("for", `item-${todo.todoId}`);
  createLable.textContent = todo.todoText;
  createBtn.classList.add("delete");
  createBtn.innerHTML = `          <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>`;
  createElement.append(createInput);
  createElement.append(createSvgBox);
  createElement.append(createLable);
  createElement.append(createBtn);
  const deleteBtn = createElement.querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    createElement.remove();
    todoArray = todoArray.filter((item) => item.todoId !== todo.todoId);
    saveLocal();
  });
  todoList.append(createElement);
  counter++;

  todoArray.push(todo);
  saveLocal();
}
function saveLocal() {
  let localArray = JSON.stringify(todoArray);
  localStorage.setItem("todos", localArray);
  noElements();
}
console.log(todoList.childElementCount);

function noElements() {
  const h1 = todoList.querySelector("h1");
  if (todoList.querySelectorAll(".list-item").length > 0) {
    h1.style.display = "none";
  } else {
    h1.style.display = "block";
  }
}
