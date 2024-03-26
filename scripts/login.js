"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// Bắt sự kiện vào nút Login
btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    const user = userArr.find(
      (e) =>
        e.username === inputUsername.value && e.password === inputPassword.value
    );

    if (user) {
      alert("Đăng nhập thành công!");

      // Lưu thông tin vào user đăng nhập
      saveToStorage("currentUser", user);

      // Chuyển hướng về trang Home
      window.location.href = "../index.html";
    } else {
      alert("Thông tin không đúng, vui lòng kiểm tra lại!");
    }
  }
});

// Check validate
function validate() {
  let isValidate = true;

  // Username bị bỏ trống
  if (inputUsername.value.trim() === "") {
    alert("Vui lòng nhập Username!");
    isValidate = false;
  }

  // Password bị bỏ trống
  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password!");
    isValidate = false;
  }
  return isValidate;
}
