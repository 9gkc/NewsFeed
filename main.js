const apiKey = "8081316aa54f4c089a535493ba66b964";
const pageSize = 10;

function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=${pageSize}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.articles);
      displayNews(data.articles);
    })
    .catch((error) => console.log(error));
}

function displayNews(articles) {
  const newsList = document.querySelector(".news-list");
  newsList.innerHTML = "";
  articles.forEach((article) => {
    console.log(article);
    const truncatedTitle = truncateString(article.title, 10);
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="info">
        <div class="author">
          <span>Author</span> 
          ${article.author || "Unknown"}
        </div>
        <div class="published-at">${new Date(article.publishedAt).toDateString()}</div>
      </div>
      <img src="${article.urlToImage}" alt="${article.title}">
      <a class="title" href="${article.url}" title="${article.title}" target="_blank">${truncatedTitle}</a>
      <p class="description">${article.description || "No Description"}</p>
      <div class="source">
        <span>[Source]</span>
        ${article.source.name}
      </div>
    `;
    newsList.appendChild(listItem);
  });
}

function truncateString(str, numWords) {
  const words = str.split(" ");
  if (words.length <= numWords) {
    return str;
  } else {
    return words.slice(0, numWords).join(" ") + "...";
  }
}

window.onload = fetchNews;
