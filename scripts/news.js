"use strict";

const btnPrev = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");

// Khai báo biến tính số news trả về từ API
let totalResults = 0;

getDataNews("us", 1);

// Hàm lấy dữ liệu data News từ API
async function getDataNews(country, page) {
  try {
    // lấy giá trị currentUser từ local storage
    let currentUser = getFromStorage("currentUser")
      ? getFromStorage("currentUser")
      : null;
    // console.log(getFromStorage("currentUser"));

    // Lấy dữ liệu từ API
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${currentUser.pageSize}&category=${currentUser.category}&page=${page}&apiKey=97fe24aa2d874e80bba6b0787f3ed8e5`
    );
    const data = await res.json();
    console.log(data);
    console.log(res);
    // Gọi hàm hiển thị list News
    displayNews(data);
  } catch (err) {
    // Thông báo lỗi
    alert(err.message);
  }
}

// Hàm hiển thị list News
function displayNews(data) {
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
  getDataNews("us", --pageNum.textContent);
});

// Bắt sự kiện khi kích vào nút Next
btnNext.addEventListener("click", function () {
  // Lấy dữ liệu và hiển thị trang sau đó
  getDataNews("us", ++pageNum.textContent);
});
