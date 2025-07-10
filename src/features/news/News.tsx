import { useState, useEffect } from "react";
import { useGetNewsQuery } from "./newsApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiLoader,
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiBookmark,
  FiShare2,
  FiClock,
  FiHeart,
  FiEye,
} from "react-icons/fi";
import { FaBookmark, FaHeart } from "react-icons/fa";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date?: string;
  imageUrl?: string;
  category?: string;
  readTime?: string;
  views?: number;
  likes?: number;
}

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const {
    data: news = [] as NewsItem[],
    isLoading,
    isError,
  } = useGetNewsQuery();

  const categories = [
    "All",
    ...Array.from(new Set(news.map((item) => item.category).filter(Boolean))),
  ];

  const filteredNews = news
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesBookmark =
        !showBookmarksOnly || bookmarkedItems.includes(item.id);
      return matchesSearch && matchesCategory && matchesBookmark;
    })
    .sort((a, b) => {
      if (sortOption === "newest") {
        return (
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        );
      } else if (sortOption === "oldest") {
        return (
          new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
        );
      } else if (sortOption === "popular") {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption, showBookmarksOnly]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const toggleBookmark = (id: number) => {
    setBookmarkedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const shareNews = (item: NewsItem) => {
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: item.description,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Share functionality not available in your browser");
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-[300px]">
        <div className="relative">
          <FiLoader className="mb-4 text-emerald-400 text-4xl animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-300 opacity-20 blur-sm rounded-full"></div>
        </div>
        <p className="font-medium text-emerald-600 text-lg animate-pulse">
          Loading News...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-[300px]">
        <div className="relative">
          <FiAlertTriangle className="mb-4 text-red-400 text-4xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-300 opacity-20 blur-sm rounded-full"></div>
        </div>
        <p className="font-medium text-red-600 text-lg">Failed to load news</p>
        <p className="mt-2 text-gray-500">Please try again later</p>
      </div>
    );

  return (
    <div className="bg-gray-50 mx-auto px-4 sm:px-6 py-12 max-w-7xl text-gray-700">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12 text-center"
      >
        <div className="-top-10 -left-10 absolute bg-teal-200 opacity-20 blur-xl rounded-full w-32 h-32 animate-blob mix-blend-multiply filter"></div>
        <div className="-right-8 -bottom-8 absolute bg-emerald-200 opacity-20 blur-xl rounded-full w-32 h-32 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
        <h2 className="z-10 relative mb-3 font-bold text-gray-900 text-4xl md:text-5xl">
          <span className="bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 text-transparent">
            Latest News
          </span>
        </h2>
        <p className="z-10 relative mx-auto max-w-2xl text-gray-600 text-lg">
          Stay updated with campus happenings, events, and important
          announcements
        </p>
      </motion.div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-8">
        <div className="relative col-span-1 md:col-span-2">
          <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search news..."
            className="bg-white hover:shadow-md px-4 py-2 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full text-gray-700 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <FiFilter className="text-gray-400" />
          </div>
          <select
            className="bg-white hover:shadow-md px-4 py-2 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full text-gray-700 transition-all duration-300 appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            className="bg-white hover:shadow-md px-4 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full text-gray-700 transition-all duration-300"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center text-gray-600 text-sm">
          <span className="bg-emerald-200 px-3 py-1 rounded-full text-emerald-800">
            {filteredNews.length}{" "}
            {filteredNews.length === 1 ? "result" : "results"}
          </span>
        </div>
        <button
          onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            showBookmarksOnly
              ? "bg-amber-200 text-amber-800 shadow-inner"
              : "bg-gray-200 text-gray-700 hover:shadow-md"
          }`}
        >
          {showBookmarksOnly ? (
            <FaBookmark className="text-amber-600 hover:scale-110 transition-transform duration-300" />
          ) : (
            <FiBookmark className="text-gray-500 hover:scale-110 transition-transform duration-300" />
          )}
          <span className="font-medium">
            {showBookmarksOnly ? "Showing Bookmarks" : "Show Bookmarks"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {currentItems.length > 0 ? (
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item: NewsItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  delay: (index % itemsPerPage) * 0.1,
                  duration: 0.5,
                }}
                whileHover={{ scale: 1.03 }}
                className="group flex flex-col bg-white shadow-sm hover:shadow-lg border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300"
              >
                {item.imageUrl && (
                  <div className="relative rounded-t-xl h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-xl"></div>
                  </div>
                )}

                <div className="flex-grow p-6">
                  <div className="flex justify-between items-start mb-3">
                    {item.category && (
                      <span className="inline-block bg-emerald-100 shadow-sm px-3 py-1 rounded-full font-semibold text-emerald-700 text-xs uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="text-gray-400 hover:text-amber-500 hover:scale-110 transition-colors transform"
                      aria-label="Bookmark"
                    >
                      {bookmarkedItems.includes(item.id) ? (
                        <FaBookmark className="text-amber-500" />
                      ) : (
                        <FiBookmark />
                      )}
                    </button>
                  </div>

                  <h3 className="mb-3 font-semibold text-gray-800 text-xl line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mb-4 text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="px-6 pt-0 pb-6 border-gray-200 border-t">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiCalendar className="mr-2" />
                      {item.date
                        ? new Date(item.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "No date specified"}
                    </div>

                    <div className="flex space-x-4">
                      {item.readTime && (
                        <span className="flex items-center text-gray-500 text-sm">
                          <FiClock className="mr-1" /> {item.readTime}
                        </span>
                      )}
                      <button
                        onClick={() => shareNews(item)}
                        className="text-gray-500 hover:text-emerald-600 hover:scale-110 transition-colors transform"
                        aria-label="Share"
                      >
                        <FiShare2 />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-gray-200 border-t">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiEye className="mr-1" /> {item.views || 0}
                    </div>
                    <button
                      onClick={() => toggleLike(item.id)}
                      className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      {likedItems.includes(item.id) ? (
                        <FaHeart className="mr-1 text-red-500" />
                      ) : (
                        <FiHeart className="mr-1" />
                      )}
                      <span>
                        {(item.likes || 0) +
                          (likedItems.includes(item.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner py-12 rounded-xl text-center"
          >
            <div className="mx-auto max-w-md">
              <div className="flex justify-center items-center bg-gradient-to-r from-emerald-200 to-teal-200 mx-auto mb-6 rounded-full w-24 h-24">
                <FiBookmark className="text-emerald-500 text-3xl" />
              </div>
              <p className="mb-6 text-gray-600 text-lg">
                {showBookmarksOnly
                  ? "You haven't bookmarked any news yet"
                  : "No news articles match your filters"}
              </p>
              {showBookmarksOnly && (
                <button
                  onClick={() => setShowBookmarksOnly(false)}
                  className="bg-gradient-to-r from-emerald-400 hover:from-emerald-500 to-teal-400 hover:to-teal-500 hover:shadow-md px-6 py-3 rounded-lg font-medium text-white transition-all"
                >
                  Show All News
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredNews.length > itemsPerPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex sm:flex-row flex-col justify-between items-center space-y-4 sm:space-y-0 mt-12"
        >
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Items per page:</span>
            <select
              className="bg-white hover:shadow-md px-2 py-1 border border-gray-300 focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm transition-all"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-emerald-500 hover:bg-emerald-100 hover:shadow-md"
              }`}
            >
              <FiChevronLeft className="text-xl" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                    currentPage === number
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-emerald-500 hover:bg-emerald-100 hover:shadow-md"
              }`}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default News;
