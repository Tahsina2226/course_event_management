import React, { useState } from "react";
import { useCreateRoutineMutation } from "./routineApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateRoutineForm: React.FC = () => {
  const [course_name, setCourseName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [batch_id, setBatchId] = useState<number | "">("");
  const [createRoutine, { isLoading }] = useCreateRoutineMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course_name || !day || !time || !room || !batch_id) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await createRoutine({
        course_name,
        day,
        time,
        room,
        batch_id: Number(batch_id),
      }).unwrap();
      Swal.fire("Success", "Routine created successfully", "success");
      navigate("/routines");
    } catch (error) {
      Swal.fire("Error", "Failed to create routine", "error");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-4 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <h2 className="font-bold text-2xl text-center">Create New Routine</h2>
          <p className="mt-1 text-emerald-100 text-center">
            Fill in the details to schedule a new class
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="space-y-1">
            <label className="block font-medium text-gray-700 text-sm">
              Course Name
            </label>
            <input
              type="text"
              value={course_name}
              onChange={(e) => setCourseName(e.target.value)}
              className="px-4 py-2 border border-gray-300 focus:border-emerald-500 rounded-lg focus:ring-2 focus:ring-emerald-500 w-full transition"
              placeholder="e.g. Mathematics 101"
            />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="space-y-1">
              <label className="block font-medium text-gray-700 text-sm">
                Day
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:border-emerald-500 rounded-lg focus:ring-2 focus:ring-emerald-500 w-full transition"
              >
                <option value="">Select Day</option>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-medium text-gray-700 text-sm">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:border-emerald-500 rounded-lg focus:ring-2 focus:ring-emerald-500 w-full transition"
              />
            </div>
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="space-y-1">
              <label className="block font-medium text-gray-700 text-sm">
                Room
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:border-emerald-500 rounded-lg focus:ring-2 focus:ring-emerald-500 w-full transition"
                placeholder="e.g. Room 204"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-medium text-gray-700 text-sm">
                Batch ID
              </label>
              <select
                value={batch_id}
                onChange={(e) =>
                  setBatchId(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="px-4 py-2 border border-gray-300 focus:border-emerald-500 rounded-lg focus:ring-2 focus:ring-emerald-500 w-full transition"
              >
                <option value="">Select Batch</option>
                {[...Array(100)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Batch {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
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
                </span>
              ) : (
                "Create Routine"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoutineForm;
