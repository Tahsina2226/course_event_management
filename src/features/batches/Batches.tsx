import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetBatchesQuery, useDeleteBatchMutation } from "./batchApi";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Batches = () => {
  const { data: batches = [], isLoading, isError } = useGetBatchesQuery();
  const [deleteBatch] = useDeleteBatchMutation();
  const navigate = useNavigate();

  if (isLoading)
    return <p className="text-amber-500 text-center">Loading Batches...</p>;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load batches.</p>;

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "This batch will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fca5a5",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it!",
      background: "#fef2f2",
      color: "#7f1d1d",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBatch(id).unwrap();
      toast.success("Batch deleted successfully!");
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  return (
    <div className="mx-auto p-6 max-w-5xl">
      <Toaster position="top-center" />
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-extrabold text-gray-800 text-4xl">
          All Batches
        </h1>
        <p className="mx-auto max-w-xl text-gray-600 text-lg">
          Manage and update your university batches with ease.
        </p>
      </div>

      <table className="shadow-md border rounded w-full overflow-hidden">
        <thead>
          <tr className="bg-amber-100 text-gray-700">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Semester</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id} className="even:bg-amber-50 text-center">
              <td className="px-4 py-2 border">{batch.name}</td>
              <td className="px-4 py-2 border">{batch.department}</td>
              <td className="px-4 py-2 border">{batch.semester}</td>
              <td className="space-x-2 px-4 py-2 border">
                <button
                  onClick={() => navigate(`/batches/edit/${batch.id}`)}
                  className="bg-lime-300 hover:bg-lime-400 px-3 py-1 rounded text-gray-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(batch.id)}
                  className="bg-rose-300 hover:bg-rose-400 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Batches;
