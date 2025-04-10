import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNews = async () => {
      try {
        const apiKey = "74c4fd2e8ff0b1ce9940a38230522328";
        if (!apiKey) {
          throw new Error("API key is missing. Check your .env file.");
        }

        let url = `https://gnews.io/api/v4/top-headlines?country=in&apikey=${apiKey}`

        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error("No articles found");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    };

    fetchNews();

    return () => controller.abort(); // Cleanup on unmount

  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {error && <p className="text-center text-danger">Error: {error}</p>}

      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.image}
            url={news.url}
          />
        ))
      ) : (
        !error && <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default NewsBoard;
