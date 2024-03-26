"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();
// Hàm hiển thị trang Home
function displayHome() {
  if (currentUser) {
    // Ẩn trang đăng nhập
    loginModal.style.display = "none";

    // Hiện main content khi có người đăng nhập
    mainContent.style.display = "block";

    // Hiển thị thông điệp chào mừng
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;

    // Nếu không ai đăng nhập
  } else {
    // Hiện trang đăng nhập
    loginModal.style.display = "block";

    // Ẩn main content khi có người đăng nhập
    mainContent.style.display = "none";
  }
}

// bắt sự kiện vào nút Logout
btnLogout.addEventListener("click", function () {
  if (confirm("Bạn chắc chắn muốn Logout?")) {
    // Xóa phần tử currentUser khỏi localstorgae
    localStorage.removeItem("currentUser");
    // Hiển thị Home
    displayHome();
  }
});
