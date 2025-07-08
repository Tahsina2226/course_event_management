import React from "react";
import { useGetNewsQuery } from "./newsApi";
import { motion } from "framer-motion";

const News = () => {
  const { data: news = [], isLoading, isError } = useGetNewsQuery();

  if (isLoading)
    return <p className="mt-10 text-amber-500 text-center">Loading News...</p>;
  if (isError)
    return (
      <p className="mt-10 text-red-500 text-center">Failed to load news.</p>
    );

  return (
    <div className="mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-10 text-center">
        <h2 className="mb-2 font-extrabold text-gray-800 text-4xl">
          📰 Latest News
        </h2>
        <p className="text-gray-500">
          Stay updated with the latest campus happenings and announcements
        </p>
      </div>

      <div className="space-y-6">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md hover:shadow-lg p-6 border border-gray-200 rounded-lg transition duration-300"
          >
            <h3 className="mb-2 font-semibold text-emerald-700 text-xl">
              {item.title}
            </h3>
            <p className="mb-2 text-gray-600">{item.description}</p>
            {item.date && (
              <p className="text-gray-500 text-sm">
                📅{" "}
                {new Date(item.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default News;
