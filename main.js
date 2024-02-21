
const API_KEY = `43e023c4728c4c2191bb719a89398da5`
let newsList = [];
let keyword = "아이유";
let PAGE_SIZE = 20;

const getLastestNews = async () => {
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
        <img class="news-img-size" src=${news.urlToImage}/>
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



getLastestNews()

