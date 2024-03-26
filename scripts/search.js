"use strict";

const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const navPageNum = document.getElementById("nav-page-num");
const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");

// Ẩn thanh điều hướng khi chưa search
navPageNum.style.display = "none";

// Khai báo biến tính số news trả về từ API
let totalResults = 0;
// Khai báo biến keywords
let keywords = "";

// Bắt sự kiện kích vào nút Search
btnSubmit.addEventListener("click", function () {
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";

  // Không được để trống ô keywords
  if (inputQuery.value.trim() === "") {
    // Ẩn thanh điều hướng khi chưa nhập keywords
    navPageNum.style.display = "none";
    alert("Vui lòng nhập keywords!");
  } else {
    keywords = inputQuery.value;

    // Hàm lấy dữ liệu data News từ API bằng từ khóa nhập và
    getDataKeyWords(keywords, 1);
  }
});

// Hàm lấy dữ liệu data News từ API bằng từ khóa nhập và
async function getDataKeyWords(keywords, page) {
  try {
    // lấy giá trị currentUser từ local storage
    let currentUser = getFromStorage("currentUser")
      ? getFromStorage("currentUser")
      : null;
    // console.log(getFromStorage("currentUser"));

    // Lấy dữ liệu từ API
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${keywords}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=97fe24aa2d874e80bba6b0787f3ed8e5`
    );
    const data = await res.json();

    // Nếu không có kết quả nào trả về từ API
    if (data.totalResults == 0) {
      // Ẩn thanh điều hướng khi Không có kết quả nào trả về
      navPageNum.style.display = "none";
      alert("Không có kết quả nào phù hợp với từ khóa bạn tìm kiếm !");
    } else {
      // Hiện thanh điều hướng khi có kết quả
      navPageNum.style.display = "block";
      // Gọi hàm hiển thị list News khi nhập từ khóa
      displayNewsKeywords(data);
    }
  } catch (err) {
    // Thông báo lỗi
    alert(err.message);
  }
}

//Hàm hiển thị News khi nhập keywords
function displayNewsKeywords(data) {
  let html = "";

  // Ẩn hiện nút prev và Next
  hidePrev();
  hideNext();

  // Lấy giá trị cho biến totalResults
  totalResults = data.totalResults;

  // console.log(data.articles);
  data.articles.forEach(function (e) {
    html += `
    <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src="${e.urlToImage}"
									class="card-img"
									alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${e.title}</h5>
									<p class="card-text">${e.description}</p>
									<a href="${e.url}" target="_blank" class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`;
  });
  newsContainer.innerHTML = html;
}

// Hàm ẩn Previous khi Page là 1
function hidePrev() {
  if (pageNum.textContent === "1") {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}

// Hàm ẩn nút Next khi ở trang cuối
function hideNext() {
  //số trang = (số tin tức trả về từ API / số tin tức hiện trên 1 trang) làm tròn
  if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}

// Bắt sự kiện khi kích vào nút Previous
btnPrev.addEventListener("click", function () {
  // Lấy dữ liệu và hiển thị trang trước đó
  getDataKeyWords("us", --pageNum.textContent);
});

// Bắt sự kiện khi kích vào nút Next
btnNext.addEventListener("click", function () {
  // Lấy dữ liệu và hiển thị trang sau đó
  getDataKeyWords("us", ++pageNum.textContent);
});
