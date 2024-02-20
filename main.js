
const API_KEY = `43e023c4728c4c2191bb719a89398da5`
let news = [];

const getLastestNews = async () => {
    const url = new URL (`https://mgson-news-times.netlify.app/top-headlines?${keyword}&country=kr&pageSize=${PAGE_SIZE}`);
    // console.log("uuu", url)
    const response = await fetch (url)
    const data = await response.json()
    news = data.articles;
    console.log("ddd", data.articles)
}

getLastestNews()

https://mgson-news-times.netlify.app/