"use strict";

// 1. Tạo Class User
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    pageSize = 10,
    category = "sport"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

class TodoTask {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
