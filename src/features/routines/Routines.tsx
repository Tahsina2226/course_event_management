import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { useGetRoutinesQuery, useDeleteRoutineMutation } from "./routineApi";
import { useAppSelector } from "../../redux/Hooks";
import { useNavigate } from "react-router-dom";

interface Routine {
  id: number;
  course_name: string;
  day: string;
  time: string;
  room: string;
  batch_id: number;
}

const Routines: React.FC = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.role);
  const department = useAppSelector((state) => state.auth.department);
  const isAdmin = role === "admin";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const deptParam = isAdmin || !department?.trim() ? undefined : department;

  const {
    data: routines = [],
    isLoading,
    isError,
    isFetching,
  } = useGetRoutinesQuery(deptParam);
  const [deleteRoutine] = useDeleteRoutineMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(routines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRoutines = routines.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleViewDetails = (routine: Routine) => {
    Swal.fire({
      title: `<strong class="text-emerald-600">${routine.course_name}</strong>`,
      html: `
        <div class="space-y-2 text-left">
          <p><span class="font-semibold text-gray-600">Day:</span> ${routine.day}</p>
          <p><span class="font-semibold text-gray-600">Time:</span> ${routine.time}</p>
          <p><span class="font-semibold text-gray-600">Room:</span> ${routine.room}</p>
          <p><span class="font-semibold text-gray-600">Batch ID:</span> ${routine.batch_id}</p>
        </div>
      `,
      icon: "info",
      background: "#f8fafc",
      confirmButtonColor: "#34d399",
      confirmButtonText: "Close",
      color: "#1e293b",
    });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34d399",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it!",
      background: "#f8fafc",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRoutine(id).unwrap();
      Swal.fire({
        title: "Deleted!",
        text: "The routine has been deleted.",
        icon: "success",
        confirmButtonColor: "#34d399",
        background: "#f8fafc",
      });
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while deleting.",
        icon: "error",
        confirmButtonColor: "#34d399",
        background: "#f8fafc",
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="border-4 border-emerald-400 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          <p className="font-semibold text-emerald-500">Loading Routines...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="bg-red-50 shadow-sm p-6 border-4 border-emerald-200 rounded-xl max-w-md text-center">
          <div className="mb-3 text-emerald-400 text-5xl">⚠️</div>
          <h3 className="mb-2 font-semibold text-emerald-600 text-xl">
            Failed to load routines
          </h3>
          <p className="mb-4 text-gray-500">
            There was an error fetching the routines. Please try again later.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-emerald-50 hover:bg-emerald-100 px-2 py-1 border-4 border-emerald-200 rounded-lg font-semibold text-emerald-600 text-sm transition"
          >
            Retry
          </motion.button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 text-center"
      >
        <h2 className="mb-3 font-bold text-emerald-600 text-3xl sm:text-4xl">
          📚 Class Routines
        </h2>
        <p className="mx-auto max-w-2xl text-gray-500">
          {isAdmin
            ? "Manage all academic class routines and schedules"
            : "View your class schedule and stay organized"}
        </p>
      </motion.div>

      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-end mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/routines/create")}
            className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 border-4 border-emerald-200 rounded-lg font-semibold text-emerald-600 text-sm transition"
          >
            <span>➕</span>
            <span>Add New Routine</span>
          </motion.button>
        </motion.div>
      )}

      {isFetching && (
        <div className="flex justify-center mb-4">
          <div className="flex items-center text-emerald-400 text-sm">
            <svg
              className="mr-2 -ml-1 w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Updating...
          </div>
        </div>
      )}

      {routines.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-amber-50 shadow-sm p-8 border-4 border-amber-200 rounded-xl text-center"
        >
          <div className="mb-4 text-amber-400 text-5xl">📅</div>
          <h3 className="mb-2 font-semibold text-amber-600 text-xl">
            No Routines Found
          </h3>
          <p className="text-amber-500">
            {isAdmin
              ? "Create your first routine to get started"
              : "No schedules available for your department yet"}
          </p>
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/routines/create")}
              className="bg-emerald-50 hover:bg-emerald-100 mt-4 px-2 py-1 border-4 border-emerald-200 rounded-lg font-semibold text-emerald-600 text-sm transition"
            >
              Create Routine
            </motion.button>
          )}
        </motion.div>
      ) : (
        <>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {currentRoutines.map((routine: Routine) => (
                <motion.li
                  key={routine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white shadow-md hover:shadow-lg border-4 border-emerald-200 rounded-xl overflow-hidden transition-all"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-emerald-600 text-lg truncate">
                        {routine.course_name}
                      </h3>
                      <span className="bg-emerald-50 px-2.5 py-0.5 border-4 border-emerald-200 rounded-full font-semibold text-emerald-500 text-xs">
                        Batch {routine.batch_id}
                      </span>
                    </div>

                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2 text-emerald-400">📅</span>
                        <span>{routine.day}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-emerald-400">⏰</span>
                        <span>{routine.time}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-emerald-400">🏫</span>
                        <span>{routine.room}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewDetails(routine)}
                        className="flex flex-1 justify-center items-center bg-emerald-50 hover:bg-emerald-100 px-2 py-1 border-4 border-emerald-200 rounded-lg font-semibold text-emerald-600 text-sm transition"
                      >
                        View Details
                      </motion.button>

                      {isAdmin && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(`/routines/edit/${routine.id}`)
                            }
                            className="flex flex-1 justify-center items-center bg-emerald-50 hover:bg-emerald-100 px-2 py-1 border-4 border-emerald-200 rounded-lg font-semibold text-emerald-600 text-sm transition"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(routine.id)}
                            className="flex flex-1 justify-center items-center bg-emerald-50 hover:bg-emerald-100 px-2 py-1 border-4 border-emerald-200 rounded-lg font-semibold text-emerald-600 text-sm transition"
                          >
                            Delete
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <motion.button
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 text-sm rounded-lg font-semibold transition border-4 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100"
                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200"
                }`}
              >
                Prev
              </motion.button>
              {[...Array(totalPages)].map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToPage(idx + 1)}
                  className={`px-2 py-1 text-sm rounded-lg font-semibold transition border-4 ${
                    currentPage === idx + 1
                      ? "bg-emerald-500 text-white shadow-md border-emerald-600"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200"
                  }`}
                >
                  {idx + 1}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 text-sm rounded-lg font-semibold transition border-4 ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100"
                    : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200"
                }`}
              >
                Next
              </motion.button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Routines;
