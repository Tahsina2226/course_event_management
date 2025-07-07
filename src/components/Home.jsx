import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      ease: "easeOut",
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const typingVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 3,
      ease: "linear",
    },
  },
};

const Home = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 shadow-xl mx-4 sm:mx-auto p-8 rounded-xl max-w-4xl min-h-[80vh] text-center"
    >
      <motion.h1
        variants={itemVariants}
        className="drop-shadow-lg mb-6 font-extrabold text-emerald-700 text-5xl sm:text-6xl cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 5, color: "#15803d" }}
        whileTap={{ scale: 0.95, rotate: -5 }}
      >
        Empower Your Academic Journey with University Course & Event Management 🎓
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mx-auto pr-2 border-emerald-600 border-r-4 max-w-2xl overflow-hidden text-gray-700 text-lg sm:text-xl leading-relaxed whitespace-nowrap"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <motion.span
          variants={typingVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="inline-block"
        >
          Streamline batch management, access comprehensive class routines, stay informed with real-time campus news, and never miss out on upcoming academic events.
        </motion.span>
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-xl text-gray-600 text-base sm:text-lg italic"
      >
        Designed for students, faculty, and administrators, our platform fosters seamless communication and efficient academic planning.
      </motion.p>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05, backgroundColor: "#15803d", color: "white", boxShadow: "0 0 15px rgba(21, 128, 61, 0.7)" }}
        whileTap={{ scale: 0.95, rotate: -3 }}
        className="bg-emerald-600 hover:bg-emerald-700 shadow-md mt-12 px-8 py-3 rounded-lg font-semibold text-white transition-colors"
      >
        Explore Now
      </motion.button>
    </motion.div>
  );
};

export default Home;
