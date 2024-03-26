"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategoty = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

// Bắt sự kiện kích vào nút Save Settings
btnSubmit.addEventListener("click", function () {
  if (validate()) {
    //Cập nhật lại currentUser
    currentUser.pageSize = Number.parseInt(inputPageSize.value);
    currentUser.category = inputCategoty.value;

    // Lưu currentUser vào local storage
    saveToStorage("currentUser", currentUser);

    // Cập nhật lại userArr
    const index = userArr.findIndex((e) => e.username === currentUser.username);
    userArr[index] = currentUser;
    // console.log(index);
    // console.log(userArr);
    //Lưu userArr vào local storage
    saveToStorage("userArr", userArr);

    alert("Cài đặt thành công!");

    // Reset lại form nhập
    inputPageSize.value = "";
    inputCategoty.value = "General";
  }
});

// Hàm validate dữ liệu
function validate() {
  let isValidate = true;
  // Không để trống page size
  if (isNaN(Number.parseInt(inputPageSize.value))) {
    alert("Vui lòng nhập News per page! ");
    isValidate = false;
  }
  // Không để trống category
  if (inputCategoty.value === "General") {
    alert("Vui lòng nhập News Category!");
    isValidate = false;
  }
  return isValidate;
}
