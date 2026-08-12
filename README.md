# Latest News Application 📰

<div align="center">
  <img src="https://img.shields.io/github/last-commit/9gkc/NewsFeed?style=for-the-badge&label=Last%20Update&color=58A6FF" alt="Last Update">
  <img src="https://img.shields.io/github/stars/9gkc/NewsFeed?style=for-the-badge&color=58A6FF" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/9gkc/NewsFeed?style=for-the-badge&color=58A6FF" alt="GitHub Forks">
</div>


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Overview 🌍

This is a simple **Latest News Application** built with vanilla HTML, CSS, and JavaScript. It fetches and displays the latest news headlines from around the world using the NewsAPI. This project demonstrates how to integrate with a third-party API to dynamically load content into a web page. 🚀

## Features 🌟

*   **Fetch Latest News**: Displays current top headlines from a specified country (default: US).
*   **Dynamic Content Loading**: News articles are fetched and rendered dynamically using JavaScript.
*   **Article Details**: Each news item includes the author, publication date, an image, a truncated title, a description, and the source.
*   **External Links**: Clickable titles use HTTPS-only URLs and open with `noopener` protection.
*   **Responsive Design**: A clean and intuitive user interface that works well on various screen sizes.
*   **Safe Rendering**: Article content is rendered with DOM APIs rather than injecting remote HTML.
*   **Clear States**: Loading, empty, and service-error states are announced to assistive technologies.

## How to Run Locally 💻

Follow these simple steps to get the Latest News Application up and running on your local machine:

1.  **Clone the Repository** (Once it's on GitHub):
    ```bash
    git clone <repository-url>
    cd latest-news-application
    ```
2.  **Configure a server-side proxy**: `main.js` requests `/api/news?pageSize=10`. Configure that endpoint on your server to call [NewsAPI](https://newsapi.org/) with `NEWSAPI_KEY` kept in a server-side environment variable. Never place the key in browser JavaScript or commit it to Git.
3.  **Serve the project over HTTP**: Run the static files behind the proxy endpoint. Opening `index.html` directly will show the error state because browsers cannot provide the `/api/news` route without a server.

The application intentionally shows a clear unavailable state when the proxy is not configured; it does not expose or require an API key in the client.
