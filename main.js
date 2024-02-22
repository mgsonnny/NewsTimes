
const API_KEY = `43e023c4728c4c2191bb719a89398da5`
let newsList = [];
let keyword = "아이유";
let PAGE_SIZE = 20;

const getLatestNews = async () => {
    const url = new URL (`https://mgson-news-times.netlify.app/top-headlines?${keyword}&country=kr&pageSize=${PAGE_SIZE}`);
    // const url = new URL (`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    // console.log("uuu", url)
    const response = await fetch (url)
    const data = await response.json()
    newsList = data.articles;
    render();
    console.log("ddd", newsList);
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


getLatestNews()





