import React, { useState } from "react";
import { useGetEventsQuery } from "./eventApi";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const { data: events = [], isLoading, isError } = useGetEventsQuery();
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (isLoading)
    return (
      <p className="mt-8 font-semibold text-emerald-600 text-center">
        Loading Events...
      </p>
    );
  if (isError)
    return (
      <p className="mt-8 font-semibold text-red-600 text-center">
        Failed to load events.
      </p>
    );

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white shadow-xl mx-auto p-8 rounded-3xl max-w-6xl">
      <h2 className="mb-2 font-extrabold text-emerald-800 text-4xl text-center tracking-wide">
        Upcoming Events
      </h2>
      <p className="mx-auto mb-12 max-w-3xl text-gray-600 text-lg text-center">
        Stay updated with the latest happenings and important university events.
        Don’t miss out!
      </p>
      <ul className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <motion.li
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3)",
            }}
            className="flex flex-col justify-between bg-white shadow-md p-6 rounded-2xl cursor-pointer select-none"
            onClick={() => setSelectedEvent(event)}
          >
            <div>
              <h3 className="font-bold text-emerald-900 text-2xl">
                {event.title}
              </h3>
              <p className="mt-3 text-gray-700 text-sm line-clamp-4">
                {event.description}
              </p>
            </div>
            <div className="flex flex-col space-y-1 mt-6 font-medium text-gray-600 text-sm">
              <p>
                📅{" "}
                <span className="font-semibold">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </p>
              <p>
                📍 <span className="font-semibold">{event.location}</span>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(event);
              }}
              className="self-start bg-emerald-500 hover:bg-emerald-600 shadow-md mt-5 px-4 py-2 rounded-xl font-semibold text-white transition duration-300"
            >
              View Details
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="relative bg-white shadow-2xl p-8 rounded-3xl w-full max-w-xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-6 font-extrabold text-emerald-900 text-3xl">
                {selectedEvent.title}
              </h3>
              <p className="mb-6 text-gray-800 leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
              <p className="mb-2 font-semibold text-gray-700">
                Date:{" "}
                <span className="font-normal">
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </span>
              </p>
              <p className="mb-8 font-semibold text-gray-700">
                Location:{" "}
                <span className="font-normal">{selectedEvent.location}</span>
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="top-4 right-4 absolute text-gray-500 hover:text-emerald-600 transition"
                aria-label="Close modal"
              >
                ✕
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="bg-emerald-600 hover:bg-emerald-700 shadow-lg px-8 py-3 rounded-2xl font-bold text-white transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
