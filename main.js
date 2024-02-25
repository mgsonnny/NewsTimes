
const API_KEY = `43e023c4728c4c2191bb719a89398da5`
let newsList = [];
// let keyword = "아이유";
let PAGE_SIZE = 20;
const menus = document.querySelectorAll(".menus button, .side-menu-list button"); // ".side-menu-list button", 
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
let url = new URL (`https://mgson-news-times.netlify.app/top-headlines?&country=kr&pageSize=${PAGE_SIZE}`);
let totalResults = 0
let page = 1
const pageSize=10
const groupSize=5


const getNews = async () =>{
    try{
      url.searchParams.set("page",page) // =>&page = page
      url.searchParams.set("pageSize", pageSize);
      const response = await fetch(url)
      const data = await response.json();
      if (response.status === 200){
        if(data.articles.length === 0){
          throw new Error("No result for this search")
        }
        newsList = data.articles;
        totalResults = data.totalResults
        render();
        paginationRender();
      } else {
        throw new Error(data.message);
      }
    }catch(error){
      errorRender(error.message)

    }
    
}

const getLatestNews = async () => {
    url = new URL (`https://mgson-news-times.netlify.app/top-headlines?&country=kr&pageSize=${PAGE_SIZE}`);
    // const url = new URL (`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    // console.log("uuu", url)
    getNews()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    console.log("Category", category)
    url = new URL (`https://mgson-news-times.netlify.app/top-headlines?&country=kr&category=${category}&pageSize=${PAGE_SIZE}`);
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
    getNews()
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value
    url = new URL (`https://mgson-news-times.netlify.app/top-headlines?&country=kr&q=${keyword}&pageSize=${PAGE_SIZE}`);
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
    getNews()
}

const render = ()=>{
    const newsHTML = newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src=${news.urlToImage} alt="뉴스 이미지" class="news-img-size" onerror="imgError(this)" />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`).join('')


    document.getElementById("news-board").innerHTML=newsHTML
}

const imgError = (image) => {
	image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML
}
const paginationRender=()=>{
  //totalResult
  //page
  //pageSize
  //totalpage
  const totalPages = Math.ceil(totalResults/pageSize)
  //pageGroup
  const pageGroup = Math.ceil(page/groupSize)
  //groupSize
  //lastPage
  const lastPage = pageGroup * groupSize
  //마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totalpage
  if (lastPage > totalPages){
    lastPage = totalPages;
  }
  //firstPage'
  const firstPage = lastPage - (groupSize - 1)<=0? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``

  if (page !== 1) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${1})">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>`;
  }
  

  if (page !== 1) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link" href="#">Previous</a></li>`;
  }

  for (let i = firstPage;i<=lastPage;i++){
    paginationHTML += `<li class="page-item ${i===page ? "active":''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }

  if (page !== totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})"><a class="page-link" href="#">Next</a></li>`;
  }

  if (page !== totalPages) {
  paginationHTML += `<li class="page-item" onclick="moveToPage(${totalPages})">
  <a class="page-link" href="#" aria-label="Next">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`
  }
  document.querySelector(".pagination").innerHTML = paginationHTML


  // <nav aria-label="Page navigation example">
  //           <ul class="pagination">
  //             <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //             <li class="page-item"><a class="page-link" href="#">1</a></li>
  //             <li class="page-item"><a class="page-link" href="#">2</a></li>
  //             <li class="page-item"><a class="page-link" href="#">3</a></li>
  //             <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //           </ul>
  //         </nav>

}
const moveToPage = (pageNum) => {
  console.log("page", pageNum)
  page = pageNum
  getNews()

}

getLatestNews()

//1. 버튼들에 클릭이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기





