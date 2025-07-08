import React, { useState, useEffect } from "react";
import { useUpdateRoutineMutation, useGetRoutinesQuery } from "./routineApi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditRoutineForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: routines } = useGetRoutinesQuery();
  const routine = routines?.find((r) => r.id === Number(id));
  const [course_name, setCourseName] = useState(routine?.course_name || "");
  const [day, setDay] = useState(routine?.day || "");
  const [time, setTime] = useState(routine?.time || "");
  const [room, setRoom] = useState(routine?.room || "");
  const [batch_id, setBatchId] = useState<number | "">(routine?.batch_id || "");
  const [updateRoutine, { isLoading }] = useUpdateRoutineMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (routine) {
      setCourseName(routine.course_name);
      setDay(routine.day);
      setTime(routine.time);
      setRoom(routine.room);
      setBatchId(routine.batch_id);
    }
  }, [routine]);

  if (!routine) {
    return <p className="text-red-500 text-center">Routine not found.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course_name || !day || !time || !room || !batch_id) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await updateRoutine({
        id: Number(id),
        data: { course_name, day, time, room, batch_id: Number(batch_id) },
      }).unwrap();
      Swal.fire("Success", "Routine updated successfully", "success");
      navigate("/routines");
    } catch (error) {
      Swal.fire("Error", "Failed to update routine", "error");
    }
  };

  return (
    <div className="bg-white shadow mx-auto p-6 rounded max-w-md">
      <h2 className="mb-4 font-bold text-2xl text-center">Edit Routine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Course Name</label>
          <input
            type="text"
            value={course_name}
            onChange={(e) => setCourseName(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Day</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Room</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="px-3 py-2 border rounded w-full"
            required
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
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-400 hover:bg-green-500 py-2 rounded w-full text-white"
        >
          {isLoading ? "Updating..." : "Update Routine"}
        </button>
      </form>
    </div>
  );
};

export default EditRoutineForm;
