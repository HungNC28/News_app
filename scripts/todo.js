"use strict";

const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const inputTask = document.getElementById("input-task");

// Hiển thị todo list
displayTodo();

// Bắt sự kiện kích vào nút Add
btnAdd.addEventListener("click", function () {
  // Không được để Title trống
  if (inputTask.value.trim() === "") {
    alert("Vui lòng nhập nhiệm vụ!");
  } else {
    // Lấy dữ liệu nhập vào
    const task = new TodoTask(inputTask.value, currentUser.username, false);

    // Thêm task mới vào todoArr
    todoArr.push(task);

    // Lưu vào localstorage
    saveToStorage("todoArr", todoArr);

    // Hiển thị todo list
    displayTodo();

    // Reset form nhập
    inputTask.value = "";
  }
});

// Hàm hiển thị todo list
function displayTodo() {
  let html = "";

  todoArr
    .filter((e) => e.owner === currentUser.username) // lọc ra todo list của user đang đăng nhập từ todoArr
    .forEach(function (e) {
      html += `
      <li class="${e.isDone ? "checked" : ""}">${
        e.task
      }<span class="close">×</span></li>
      `;
    });

  todoList.innerHTML = html;

  toggleTask();
  deleteTask();
}

// Bắt sự kiện Toggle Task
function toggleTask() {
  document.querySelectorAll("li").forEach(function (li) {
    li.addEventListener("click", function (e) {
      // kích tránh nút X
      if (e.target !== li.children[0]) {
        li.classList.toggle("checked");
        // Tìm task vừa kích vào
        const todo = todoArr.find(
          (e) =>
            e.owner === currentUser.username &&
            // console.log(li.textContent);
            e.task === li.textContent.slice(0, -1) // lấy nội dung trừ nút X
        );
        // trả giá trị isDone
        todo.isDone = li.classList.contains("checked") ? true : false;
        // Lưu vào localstorage
        saveToStorage("todoArr", todoArr);
      }
    });
  });
}

// Delete Task
function deleteTask() {
  document.querySelectorAll(".close").forEach(function (e) {
    e.addEventListener("click", function () {
      if (confirm("Bạn chắc chắn muốn xóa chứ?")) {
        // console.log(e.parentElement.textContent.slice(0, -1));
        // Tìm task cần xóa trong todoArr
        const index = todoArr.findIndex(
          (index) =>
            index.owner === currentUser.username &&
            index.task === e.parentElement.textContent.slice(0, -1)
        );

        // Xóa task đó ra khỏi mảng
        todoArr.splice(index, 1);
        // Lưu vào localstorage
        saveToStorage("todoArr", todoArr);
        // Hiển thị todo list
        displayTodo();
      }
    });
  });
}
