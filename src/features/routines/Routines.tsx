import React from "react";
import Swal from "sweetalert2";
import { useGetRoutinesQuery } from "./routineApi";

interface Routine {
  id: number;
  course_name: string;
  day: string;
  time: string;
  room: string;
}

const Routines: React.FC = () => {
  const { data: routines = [], isLoading, isError } = useGetRoutinesQuery();

  const handleViewDetails = (routine: Routine) => {
    Swal.fire({
      title: `<strong>${routine.course_name}</strong>`,
      html: `
        <p><strong>Day:</strong> ${routine.day}</p>
        <p><strong>Time:</strong> ${routine.time}</p>
        <p><strong>Room:</strong> ${routine.room}</p>
      `,
      icon: "info",
      background: "#fefce8",
      confirmButtonColor: "#84cc16",
      confirmButtonText: "Close",
      color: "#374151",
    });
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
        Stay updated with your academic class schedule.
      </p>

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
            <button
              onClick={() => handleViewDetails(routine)}
              className="inline-block bg-lime-300 hover:bg-lime-400 shadow mt-4 px-4 py-2 rounded text-gray-800 transition duration-200"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routines;
