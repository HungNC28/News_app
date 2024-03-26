"use strict";

const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// bắt sự kiện ấn vào nút Rigister
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu nhập vào
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );

  // Check validate
  const isValidate = validate(user);

  if (isValidate) {
    //Thêm user vào mảng
    userArr.push(user);

    //Lưu vào local storage
    saveToStorage("userArr", userArr);

    // Thông báo đăng ký thành công
    alert("Đăng ký thành công!");

    // Chuyển sang trang login
    window.location.href = "../pages/login.html";
  }
});

// Check validate
function validate(user) {
  let isValidate = true;

  // First Name bị bỏ trống
  if (user.firstName.trim() === "") {
    alert("Vui lòng nhập First Name!");
    isValidate = false;
  }

  // Last Name bị bỏ trống
  if (user.lastName.trim() === "") {
    alert("Vui lòng nhập Last Name!");
    isValidate = false;
  }

  // Username bị bỏ trống
  if (user.username.trim() === "") {
    alert("Vui lòng nhập Username!");
    isValidate = false;
  }

  // Password bị bỏ trống
  if (user.password === "") {
    alert("Vui lòng nhập Password!");
    isValidate = false;
  }

  // Confirm Password bị bỏ trống
  if (inputPasswordConfirm.value === "") {
    alert("Vui lòng nhập Confirm Password!");
    isValidate = false;
  }

  // Username không được trùng với Username của các người dùng trước đó
  for (let i = 0; i < userArr.length; i++) {
    if (user.username === userArr[i].username) {
      alert("Username đã tồn tại!");
      isValidate = false;
      break;
    }
  }

  // Password và Confirm Password phải giống nhau
  if (user.password !== inputPasswordConfirm.value) {
    alert("Password và Confirm Password phải giống nhau!");
    isValidate = false;
  }

  // Password phải có nhiều hơn 8 ký tự
  if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự!");
    isValidate = false;
  }

  return isValidate;
}
