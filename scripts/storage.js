"use strict";

//  Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu userArr từ localstorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// console.log(users);

// Chuyển đổi về class instance
const userArr = users.map((user) => parseUser(user));
// console.log(userArr);
// console.log(userArr);

// hàm chuyển từ JS Object sang Class Instance của User
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}

// lấy dữ liệu người dùng đã đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

// Lấy dữ liệu todoArr từ localstorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Chuyền đổi về class Instance
const todoArr = todos.map((todo) => parseTask(todo));

// hàm chuyển từ JS Object sang Class Instance của Task
function parseTask(taskData) {
  const task = new TodoTask(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
