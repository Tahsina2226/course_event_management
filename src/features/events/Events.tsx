import { useState } from "react";
import { useGetEventsQuery } from "./eventApi";
import type { Event } from "./eventApi";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const { data: events = [], isLoading, isError } = useGetEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-4 border-4 border-emerald-500 border-t-transparent rounded-full w-16 h-16"
          />
          <p className="font-semibold text-emerald-600 text-xl">
            Loading Events...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-red-50 p-8 rounded-2xl max-w-md text-center">
          <div className="mb-4 text-5xl">⚠️</div>
          <h3 className="mb-2 font-bold text-red-700 text-2xl">Oops!</h3>
          <p className="mb-4 text-red-600">
            Failed to load events. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium text-white transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white shadow-xl mx-auto p-8 rounded-3xl max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 font-extrabold text-emerald-800 text-4xl md:text-5xl text-center tracking-wide">
          Upcoming Events
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-gray-600 text-lg md:text-xl text-center">
          Stay updated with the latest happenings and important university
          events. Don't miss out!
        </p>
      </motion.div>

      {events.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mb-6 text-6xl">📅</div>
          <h3 className="mb-2 font-bold text-gray-700 text-2xl">
            No Upcoming Events
          </h3>
          <p className="mx-auto max-w-md text-gray-500">
            Check back later for scheduled events or subscribe to our newsletter
            to get updates.
          </p>
        </div>
      ) : (
        <ul className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentEvents.map((event) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px rgba(5, 150, 105, 0.15)",
              }}
              className="flex flex-col justify-between bg-white shadow-lg hover:shadow-xl p-6 border border-emerald-100 rounded-2xl transition-all duration-300 cursor-pointer select-none"
              onClick={() => setSelectedEvent(event)}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-emerald-100 px-2.5 py-0.5 rounded-full font-medium text-emerald-800 text-xs">
                    {event.category || "General"}
                  </span>
                  <span className="font-medium text-gray-500 text-xs">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mb-3 font-bold text-emerald-900 text-xl md:text-2xl line-clamp-2">
                  {event.title}
                </h3>
                <p className="mb-4 text-gray-600 text-sm line-clamp-3">
                  {event.description}
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4 text-gray-600 text-sm">
                  <svg
                    className="mr-2 w-4 h-4 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-50 px-3 py-1 rounded-full font-medium text-emerald-600 text-xs">
                    {event.time || "All Day"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="group inline-flex items-center bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-emerald-600 hover:to-emerald-700 shadow-md px-4 py-2 rounded-lg font-medium text-white text-sm transition-all duration-300"
                  >
                    Details
                    <svg
                      className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative bg-white shadow-2xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="top-4 right-4 absolute flex space-x-2">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 text-gray-400 hover:text-emerald-600 transition"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <span className="inline-block bg-emerald-100 mb-3 px-3 py-1 rounded-full font-medium text-emerald-800 text-sm">
                  {selectedEvent.category || "Event"}
                </span>
                <h3 className="mb-2 font-extrabold text-emerald-900 text-2xl sm:text-3xl">
                  {selectedEvent.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <svg
                      className="mr-1.5 w-4 h-4 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {selectedEvent.time && ` • ${selectedEvent.time}`}
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="mr-1.5 w-4 h-4 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {selectedEvent.location}
                  </div>
                </div>
              </div>

              <div className="mb-8 max-w-none prose">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.speakers && (
                <div className="mb-8">
                  <h4 className="mb-4 font-bold text-gray-800">Speakers</h4>
                  <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                    {selectedEvent.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex justify-center items-center bg-emerald-100 mr-3 rounded-full w-10 h-10 font-bold text-emerald-600">
                          {speaker.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {speaker.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {speaker.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="inline-flex items-center bg-gradient-to-r from-emerald-600 hover:from-emerald-700 to-emerald-700 hover:to-emerald-800 shadow-lg px-6 py-2.5 rounded-lg font-medium text-white transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {events.length > itemsPerPage && (
        <div className="flex justify-center space-x-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-colors ${
              currentPage === 1
                ? "bg-emerald-200 text-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-colors ${
                currentPage === page
                  ? "bg-emerald-800 text-white shadow-lg"
                  : "bg-emerald-200 text-emerald-700 hover:bg-emerald-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-colors ${
              currentPage === totalPages
                ? "bg-emerald-200 text-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
