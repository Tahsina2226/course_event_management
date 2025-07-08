import React from "react";
import Swal from "sweetalert2";
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
  const { data: routines = [], isLoading, isError } = useGetRoutinesQuery();
  const [deleteRoutine] = useDeleteRoutineMutation();
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.role);
  const isAdmin = role === "admin";

  const handleViewDetails = (routine: Routine) => {
    Swal.fire({
      title: `<strong>${routine.course_name}</strong>`,
      html: `
        <p><strong>Day:</strong> ${routine.day}</p>
        <p><strong>Time:</strong> ${routine.time}</p>
        <p><strong>Room:</strong> ${routine.room}</p>
        <p><strong>Batch ID:</strong> ${routine.batch_id}</p>
      `,
      icon: "info",
      background: "#fefce8",
      confirmButtonColor: "#84cc16",
      confirmButtonText: "Close",
      color: "#374151",
    });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Routine?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it!",
      background: "#fef2f2",
    });
    if (!result.isConfirmed) return;

    try {
      await deleteRoutine(id).unwrap();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Routine deleted successfully.",
        background: "#fef2f2",
        confirmButtonColor: "#4ade80",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not delete routine.",
        background: "#fef2f2",
        confirmButtonColor: "#f87171",
      });
    }
  };

  if (isLoading)
    return <p className="text-amber-500 text-center">Loading Routines...</p>;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load routines.</p>;

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="mb-2 font-bold text-emerald-600 text-3xl text-center">
        📘 Class Routines
      </h2>
      <p className="mb-6 text-gray-600 text-center">
        {isAdmin
          ? "Manage all academic class routines."
          : "Stay updated with your academic class schedule."}
      </p>

      {isAdmin && (
        <div className="mb-4 text-right">
          <button
            onClick={() => navigate("/routines/create")}
            className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded text-white"
          >
            ➕ Add Routine
          </button>
        </div>
      )}

      <ul className="gap-4 grid sm:grid-cols-2">
        {routines.map((routine: Routine) => (
          <li
            key={routine.id}
            className="bg-amber-50 shadow-sm hover:shadow-md p-4 border border-gray-200 rounded-lg transition"
          >
            <h3 className="mb-2 font-semibold text-emerald-700 text-lg">
              {routine.course_name}
            </h3>
            <p>
              <span className="font-medium text-gray-700">Day:</span>{" "}
              {routine.day}
            </p>
            <p>
              <span className="font-medium text-gray-700">Time:</span>{" "}
              {routine.time}
            </p>
            <p>
              <span className="font-medium text-gray-700">Room:</span>{" "}
              {routine.room}
            </p>
            <p>
              <span className="font-medium text-gray-700">Batch ID:</span>{" "}
              {routine.batch_id}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => handleViewDetails(routine)}
                className="bg-lime-300 hover:bg-lime-400 px-3 py-1 rounded text-gray-900"
              >
                View
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => navigate(`/routines/edit/${routine.id}`)}
                    className="bg-blue-300 hover:bg-blue-400 px-3 py-1 rounded text-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(routine.id)}
                    className="bg-rose-400 hover:bg-rose-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routines;
