import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetBatchesQuery, useDeleteBatchMutation } from "./batchApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../../redux/Hooks";

const ITEMS_PER_PAGE = 9;

const Batches = () => {
  const navigate = useNavigate();
  const {
    data: batches = [],
    isLoading,
    isError,
    isFetching,
  } = useGetBatchesQuery();
  const [deleteBatch] = useDeleteBatchMutation();

  const [enrolledDepartment, setEnrolledDepartment] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const role = useAppSelector((state) => state.auth.role);
  const isAdmin = role === "admin";
  const isUser = role === "user";

  useEffect(() => {
    const storedDept = localStorage.getItem("enrolledDepartment");
    if (storedDept) {
      setEnrolledDepartment(storedDept);
    }
  }, []);

  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || batch.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredBatches.length / ITEMS_PER_PAGE);
  const paginatedBatches = filteredBatches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const departments = [
    "all",
    ...new Set(batches.map((batch) => batch.department)),
  ];

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      html: `
        <div class="text-left">
          <p class="mb-3 text-gray-600">This will permanently delete the batch record.</p>
          <p class="text-gray-500 text-sm">This action cannot be undone.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Delete Permanently",
      cancelButtonText: "Cancel",
      background: "#f8fafc",
      customClass: {
        popup: "rounded-xl shadow-2xl border border-gray-300",
      },
      showClass: {
        popup: "animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut animate__faster",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBatch(id).unwrap();
      await Swal.fire({
        title: "Successfully Deleted",
        text: "The batch has been removed from the system.",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "#f8fafc",
        customClass: {
          popup: "rounded-xl shadow-2xl border border-gray-300",
        },
        showClass: {
          popup: "animate__animated animate__fadeIn animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut animate__faster",
        },
      });
    } catch {
      await Swal.fire({
        title: "Deletion Failed",
        text: "There was an error deleting the batch. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#f8fafc",
        customClass: {
          popup: "rounded-xl shadow-2xl border border-gray-300",
        },
        showClass: {
          popup: "animate__animated animate__fadeIn animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut animate__faster",
        },
      });
    }
  };

  const handleEnroll = async (
    batchId: number,
    batchName: string,
    batchDept: string
  ) => {
    if (enrolledDepartment && enrolledDepartment !== batchDept) {
      await Swal.fire({
        title: "Cannot Enroll",
        html: `
          <div class="text-left">
            <p class="text-gray-600">You're already enrolled in <span class="font-semibold">${enrolledDepartment}</span>.</p>
            <p class="mt-2 text-gray-500 text-sm">Students can only enroll in one department at a time.</p>
          </div>
        `,
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#f8fafc",
        customClass: {
          popup: "rounded-xl shadow-2xl border border-gray-300",
        },
        showClass: {
          popup: "animate__animated animate__fadeIn animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut animate__faster",
        },
      });
      return;
    }

    localStorage.setItem("enrolledDepartment", batchDept);
    setEnrolledDepartment(batchDept);

    await Swal.fire({
      title: "Enrollment Confirmed",
      html: `
        <div class="text-center">
          <div class="flex justify-center items-center bg-emerald-100 mx-auto mb-4 rounded-full w-16 h-16">
            <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p class="text-gray-600">You are now enrolled in:</p>
          <p class="mt-1 font-semibold text-emerald-600">${batchName}</p>
          <p class="mt-1 text-gray-500 text-sm">${batchDept} Department</p>
        </div>
      `,
      confirmButtonColor: "#10b981",
      background: "#f8fafc",
      customClass: {
        popup: "rounded-xl shadow-2xl border border-gray-300",
      },
      showClass: {
        popup: "animate__animated animate__fadeIn animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut animate__faster",
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="border-4 border-emerald-500 border-t-transparent rounded-full w-14 h-14"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-medium text-emerald-600 text-lg"
          >
            Loading Batches...
          </motion.div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-[70vh]">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white shadow-sm p-8 border border-red-300 rounded-xl max-w-md text-center"
        >
          <div className="flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="mb-2 font-bold text-gray-800 text-xl">
            Loading Error
          </h3>
          <p className="mb-6 text-gray-600">
            We couldn't load the batches data. Please check your connection and
            try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg px-6 py-2 rounded-lg font-medium text-white transition"
          >
            Retry Loading
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="mb-2 font-bold text-gray-800 text-3xl sm:text-4xl">
              Batch Management
            </h1>
            <p className="text-gray-600">
              {isAdmin
                ? "Manage all academic batches and departments"
                : "Browse and enroll in available batches"}
            </p>
          </div>

          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/batches/create")}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg px-5 py-2.5 rounded-lg font-medium text-white transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <span>New Batch</span>
            </motion.button>
          )}
        </div>

        <div className="bg-white shadow-sm p-4 border border-gray-300 rounded-xl">
          <div className="flex sm:flex-row flex-col gap-3">
            <div className="relative flex-1">
              <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search batches..."
                className="py-2.5 pr-4 pl-10 border border-gray-300 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-gray-300 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {isFetching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center mb-4"
        >
          <div className="flex items-center bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-full">
            <svg
              className="mr-2 -ml-1 w-4 h-4 text-emerald-500 animate-spin"
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
            <span className="font-medium text-gray-600 text-sm">
              Updating data...
            </span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-sm border-2 border-gray-300 rounded-xl overflow-hidden"
      >
        {paginatedBatches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-16 text-center"
          >
            <div className="flex justify-center items-center bg-emerald-50 mx-auto mb-4 rounded-full w-20 h-20">
              <svg
                className="w-10 h-10 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="mb-2 font-medium text-gray-700 text-xl">
              No Matching Batches Found
            </h3>
            <p className="mx-auto mb-6 max-w-md text-gray-500">
              {searchTerm || selectedDepartment !== "all"
                ? "Try adjusting your search or filter criteria"
                : "There are currently no batches available"}
            </p>
            {isAdmin && (
              <button
                onClick={() => navigate("/batches/create")}
                className="bg-emerald-500 hover:bg-emerald-600 shadow-md hover:shadow-lg px-6 py-2 rounded-lg font-medium text-white transition"
              >
                Create First Batch
              </button>
            )}
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="border-2 border-gray-300 rounded-lg divide-y divide-gray-300 min-w-full">
              <thead className="bg-gray-50 border-gray-300 border-b-2">
                <tr>
                  <th className="px-6 py-3 border-gray-300 border-r font-medium text-gray-700 text-xs text-left uppercase tracking-wider">
                    Batch Details
                  </th>
                  <th className="px-6 py-3 border-gray-300 border-r font-medium text-gray-700 text-xs text-left uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 border-gray-300 border-r font-medium text-gray-700 text-xs text-left uppercase tracking-wider">
                    Semester
                  </th>
                  {(isAdmin || isUser) && (
                    <th className="px-6 py-3 font-medium text-gray-700 text-xs text-right uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white border-gray-300 border-t divide-y divide-gray-300">
                <AnimatePresence>
                  {paginatedBatches.map((batch) => (
                    <motion.tr
                      key={batch.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 border-gray-300 border-r whitespace-nowrap">
                        <div className="font-semibold text-gray-800 text-sm">
                          {batch.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {batch.code}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-gray-300 border-r font-medium text-gray-700 text-sm whitespace-nowrap">
                        {batch.department}
                      </td>
                      <td className="px-6 py-4 border-gray-300 border-r font-medium text-gray-700 text-sm whitespace-nowrap">
                        {batch.semester}
                      </td>
                      {(isAdmin || isUser) && (
                        <td className="space-x-2 px-6 py-4 font-medium text-sm text-right whitespace-nowrap">
                          {isAdmin && (
                            <>
                              <button
                                onClick={() =>
                                  navigate(`/batches/edit/${batch.id}`)
                                }
                                className="inline-flex items-center gap-1 bg-white hover:bg-gray-50 shadow-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:ring-offset-1 focus:ring-offset-white text-gray-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(batch.id)}
                                className="inline-flex items-center gap-1 bg-white hover:bg-red-50 shadow-sm px-2 py-1 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 focus:ring-offset-1 focus:ring-offset-white text-red-600"
                              >
                                Delete
                              </button>
                            </>
                          )}
                          {isUser && (
                            <button
                              onClick={() =>
                                handleEnroll(
                                  batch.id,
                                  batch.name,
                                  batch.department
                                )
                              }
                              className="bg-emerald-500 hover:bg-emerald-600 shadow-sm px-4 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 focus:ring-offset-white font-semibold text-white transition"
                            >
                              Enroll
                            </button>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-3 mt-6 select-none">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md border border-gray-300 ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } transition`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Batches;
