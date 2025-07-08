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
    <div className="bg-white shadow mx-auto p-6 rounded max-w-md">
      <h2 className="mb-4 font-bold text-2xl text-center">Create Routine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Course Name</label>
          <input
            type="text"
            value={course_name}
            onChange={(e) => setCourseName(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            placeholder="e.g. Math 101"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Day</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            placeholder="e.g. Monday"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            placeholder="e.g. 9:00 AM - 10:00 AM"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Room</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            placeholder="e.g. Room 204"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Batch ID</label>
          <input
            type="number"
            value={batch_id}
            onChange={(e) =>
              setBatchId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="px-3 py-2 border rounded w-full"
            placeholder="e.g. 1"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-500 hover:bg-emerald-600 py-2 rounded w-full text-white"
        >
          {isLoading ? "Creating..." : "Create Routine"}
        </button>
      </form>
    </div>
  );
};

export default CreateRoutineForm;
