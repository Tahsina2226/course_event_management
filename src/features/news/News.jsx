import React from 'react';
import { useGetNewsQuery } from './newsApi';

const News = () => {
  const { data: news = [], isLoading, isError } = useGetNewsQuery();

  if (isLoading) return <p>Loading News...</p>;
  if (isError) return <p>Failed to load news.</p>;

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="mb-4 font-bold text-2xl">Latest News</h2>
      <ul>
        {news.map(item => (
          <li key={item.id} className="mb-2 p-3 border rounded">
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
