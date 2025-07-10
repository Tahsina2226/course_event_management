import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBatchMutation } from "./batchApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUniversity,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

const CreateBatch: React.FC = () => {
  const navigate = useNavigate();
  const [addBatch, { isLoading }] = useAddBatchMutation();

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    semester: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.department || !formData.semester) {
      toast.error("Please fill all fields", {
        style: {
          background: "#fee2e2",
          color: "#dc2626",
        },
      });
      return;
    }

    try {
      await addBatch(formData).unwrap();
      toast.success("Batch created successfully!", {
        style: {
          background: "#dcfce7",
          color: "#16a34a",
        },
      });
      navigate("/batches");
    } catch (error) {
      toast.error("Failed to create batch", {
        style: {
          background: "#fee2e2",
          color: "#dc2626",
        },
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-md"
      >
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="hover:bg-emerald-400 p-2 rounded-full transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="flex-1 font-bold text-2xl text-center">
                Create New Batch
              </h2>
              <div className="w-5"></div> {/* Spacer for alignment */}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-4">
              {/* Batch Name */}
              <div>
                <label className="block flex items-center mb-2 font-medium text-gray-700 text-sm">
                  <FaUsers className="mr-2 text-emerald-600" />
                  Batch Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                    placeholder="e.g., Computer Science 2023"
                    required
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block flex items-center mb-2 font-medium text-gray-700 text-sm">
                  <FaUniversity className="mr-2 text-emerald-600" />
                  Department
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>

              {/* Semester */}
              <div>
                <label className="block flex items-center mb-2 font-medium text-gray-700 text-sm">
                  <FaCalendarAlt className="mr-2 text-emerald-600" />
                  Semester
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 focus:border-emerald-500 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 w-full transition"
                    placeholder="e.g., 1st Semester"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                isLoading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md"
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="mr-2 -ml-1 w-4 h-4 text-white animate-spin"
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
                  Creating...
                </div>
              ) : (
                "Create Batch"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBatch;
