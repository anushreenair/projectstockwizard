import React, { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = '4e500e83c0cc47988318c670f04214cd';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=finance+stock+banking&apiKey=${API_KEY}`
        );
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      
      {loading ? (
        <p className="loading-message">Loading news...</p>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="news-image" />
                )}
                <div className="news-content">
                  <h2 className="news-heading">{article.title}</h2>
                  <p className="news-description">{article.description}</p>
                  <small className="news-source">Source: {article.source.name}</small>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;