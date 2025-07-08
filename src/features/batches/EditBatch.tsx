import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBatchesQuery, useUpdateBatchMutation } from "./batchApi";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

interface Batch {
  id: number;
  name: string;
  department: string;
  semester: string;
}

const EditBatch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: batches = [], isLoading, isError } = useGetBatchesQuery();
  const [updateBatch] = useUpdateBatchMutation();

  const batch: Batch | undefined = batches.find((b) => String(b.id) === id);

  const [editData, setEditData] = useState({
    name: "",
    department: "",
    semester: "",
  });

  useEffect(() => {
    if (batch) {
      setEditData({
        name: batch.name || "",
        department: batch.department || "",
        semester: batch.semester || "",
      });
    }
  }, [batch]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to update this batch?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34d399",
      cancelButtonColor: "#a3a3a3",
      confirmButtonText: "Yes, update it!",
      background: "#f9fafb",
      color: "#374151",
      customClass: {
        popup: "rounded-lg shadow-lg",
        title: "font-semibold text-lg",
        confirmButton: "py-2 px-6 rounded-md font-semibold tracking-wide",
        cancelButton:
          "py-2 px-6 rounded-md bg-gray-300 hover:bg-gray-400 font-semibold tracking-wide",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await updateBatch({ id: Number(id), data: editData }).unwrap();
      toast.success("Batch updated successfully!", {
        style: { background: "#d1fae5", color: "#065f46" },
      });
      navigate("/batches");
    } catch (err) {
      toast.error("Update failed!", {
        style: { background: "#fee2e2", color: "#991b1b" },
      });
    }
  };

  if (isLoading)
    return (
      <p className="mt-6 text-gray-500 text-center">Loading batch data...</p>
    );
  if (isError)
    return (
      <p className="mt-6 text-red-400 text-center">
        Failed to load batch data.
      </p>
    );
  if (!batch)
    return <p className="mt-6 text-gray-600 text-center">Batch not found</p>;

  return (
    <div className="bg-white shadow-lg hover:shadow-xl mx-auto mt-14 p-10 border border-gray-200 rounded-2xl max-w-lg transition-shadow duration-300">
      <Toaster position="top-center" />
      <h2 className="mb-10 font-extrabold text-gray-900 text-4xl tracking-tight">
        Edit Batch
      </h2>

      <form onSubmit={handleUpdate} className="space-y-8">
        <div>
          <label className="block mb-3 font-semibold text-gray-700 text-lg">
            Name
          </label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="shadow-sm px-5 py-4 border border-gray-300 focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 w-full text-gray-900 transition placeholder-gray-400"
            placeholder="Enter batch name"
            required
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-gray-700 text-lg">
            Department
          </label>
          <input
            type="text"
            value={editData.department}
            onChange={(e) =>
              setEditData({ ...editData, department: e.target.value })
            }
            className="shadow-sm px-5 py-4 border border-gray-300 focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 w-full text-gray-900 transition placeholder-gray-400"
            placeholder="Enter department"
          />
        </div>

        <div>
          <label className="block mb-3 font-semibold text-gray-700 text-lg">
            Semester
          </label>
          <input
            type="text"
            value={editData.semester}
            onChange={(e) =>
              setEditData({ ...editData, semester: e.target.value })
            }
            className="shadow-sm px-5 py-4 border border-gray-300 focus:border-emerald-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 w-full text-gray-900 transition placeholder-gray-400"
            placeholder="Enter semester"
            required
          />
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-400 hover:from-emerald-500 to-emerald-600 hover:to-emerald-700 shadow-lg px-8 py-4 rounded-xl font-extrabold text-white tracking-wide transition-all duration-300"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/batches")}
            className="bg-gray-200 hover:bg-gray-300 shadow-md px-8 py-4 rounded-xl font-semibold text-gray-800 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBatch;
