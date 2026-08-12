const pageSize = 10;
const apiEndpoint = "/api/news";

const newsList = document.querySelector(".news-list");
const statusElement = document.querySelector(".status");

function setStatus(message, tone = "info") {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.dataset.tone = tone;
}

function safeHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function truncateString(value, wordCount) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length <= wordCount ? text : `${words.slice(0, wordCount).join(" ")}…`;
}

function formatPublishedAt(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function appendText(parent, tagName, text, className) {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (className) element.className = className;
  parent.appendChild(element);
  return element;
}

function displayNews(articles) {
  if (!newsList) return;
  newsList.replaceChildren();

  const validArticles = Array.isArray(articles) ? articles.filter(Boolean) : [];
  if (validArticles.length === 0) {
    appendText(newsList, "li", "No stories are available right now.", "empty-state");
    return;
  }

  validArticles.forEach((article) => {
    const item = document.createElement("li");
    const info = document.createElement("div");
    info.className = "info";
    const author = document.createElement("div");
    author.className = "author";
    appendText(author, "span", "Author");
    appendText(author, "span", article.author || "Unknown");
    appendText(info, "div", formatPublishedAt(article.publishedAt), "published-at");
    info.prepend(author);
    item.appendChild(info);

    const imageUrl = safeHttpsUrl(article.urlToImage || "");
    if (imageUrl) {
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = article.title || "News illustration";
      image.loading = "lazy";
      image.referrerPolicy = "no-referrer";
      image.addEventListener("error", () => image.remove(), { once: true });
      item.appendChild(image);
    }

    const title = article.title || "Untitled story";
    const link = document.createElement("a");
    link.className = "title";
    link.href = safeHttpsUrl(article.url) || "#";
    link.title = title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = truncateString(title, 10) || "Untitled story";
    if (link.getAttribute("href") === "#") {
      link.addEventListener("click", (event) => event.preventDefault());
    }
    item.appendChild(link);

    appendText(item, "p", article.description || "No description is available.", "description");
    const source = document.createElement("div");
    source.className = "source";
    appendText(source, "span", "Source");
    appendText(source, "span", article.source?.name || "Unknown source");
    item.appendChild(source);
    newsList.appendChild(item);
  });
}

async function fetchNews() {
  setStatus("Loading the latest stories…");
  try {
    const response = await fetch(`${apiEndpoint}?pageSize=${pageSize}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) throw new Error(`News service returned ${response.status}.`);
    const data = await response.json();
    if (!Array.isArray(data.articles)) throw new Error("The news response was invalid.");
    displayNews(data.articles);
    setStatus(`${data.articles.length} stories loaded.`);
  } catch (error) {
    displayNews([]);
    setStatus("The live news feed is unavailable. Please try again later.", "error");
    console.error("Unable to load news", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchNews);
