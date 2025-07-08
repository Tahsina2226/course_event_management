import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBatchesQuery, useDeleteBatchMutation } from "./batchApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../../redux/Hooks";

const Batches = () => {
  const navigate = useNavigate();
  const { data: batches = [], isLoading, isError } = useGetBatchesQuery();
  const [deleteBatch] = useDeleteBatchMutation();
  const [enrolledDepartment, setEnrolledDepartment] = useState<string | null>(
    null
  );

  const role = useAppSelector((state) => state.auth.role);
  const isAdmin = role === "admin";
  const isUser = role === "user";

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
      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Batch deleted successfully.",
        background: "#fef2f2",
        color: "#065f46",
        confirmButtonColor: "#4ade80",
      });
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete batch.",
        background: "#fef2f2",
        color: "#b91c1c",
        confirmButtonColor: "#fca5a5",
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
        icon: "error",
        title: "Enrollment Failed",
        text: `You have already enrolled in the department "${enrolledDepartment}". You cannot enroll in another department.`,
        background: "#fef2f2",
        color: "#7f1d1d",
        confirmButtonColor: "#fca5a5",
      });
      return;
    }
    setEnrolledDepartment(batchDept);
    await Swal.fire({
      icon: "success",
      title: "Enrolled!",
      text: `Successfully enrolled in ${batchName} (${batchDept})`,
      background: "#fef2f2",
      color: "#065f46",
      confirmButtonColor: "#4ade80",
    });
  };

  if (isLoading)
    return <p className="text-amber-500 text-center">Loading Batches...</p>;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load batches.</p>;

  return (
    <div className="mx-auto p-6 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-extrabold text-gray-800 text-4xl">
          All Batches
        </h1>

        {isAdmin && (
          <p className="mx-auto max-w-xl font-semibold text-green-700 text-lg">
            You are logged in as Admin. You can manage all batches here.
          </p>
        )}

        {isUser && (
          <p className="mx-auto max-w-xl font-semibold text-gray-700 text-lg">
            You are logged in as User. Browse batches and enroll in your
            department.
          </p>
        )}

        {!isAdmin && !isUser && (
          <p className="mx-auto max-w-xl text-gray-600 text-lg">
            Please log in to manage or enroll in batches.
          </p>
        )}

        {isAdmin && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/batches/create")}
              className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded font-semibold text-white"
            >
              Add New Batch
            </button>
          </div>
        )}
      </div>

      <table className="shadow-md border rounded w-full overflow-hidden">
        <thead>
          <tr className="bg-amber-100 text-gray-700">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Semester</th>
            {(isAdmin || isUser) && (
              <th className="px-4 py-2 border">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {batches.length === 0 ? (
            <tr>
              <td
                colSpan={isAdmin || isUser ? 4 : 3}
                className="py-6 text-gray-500 text-center"
              >
                No batches found.
              </td>
            </tr>
          ) : (
            batches.map((batch) => (
              <tr key={batch.id} className="even:bg-amber-50 text-center">
                <td className="px-4 py-2 border">{batch.name}</td>
                <td className="px-4 py-2 border">{batch.department}</td>
                <td className="px-4 py-2 border">{batch.semester}</td>
                {(isAdmin || isUser) && (
                  <td className="space-x-2 px-4 py-2 border text-right">
                    {isAdmin && (
                      <>
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
                      </>
                    )}
                    {isUser && (
                      <button
                        onClick={() =>
                          handleEnroll(batch.id, batch.name, batch.department)
                        }
                        className="bg-emerald-300 hover:bg-emerald-400 px-3 py-1 rounded text-gray-900"
                      >
                        Enroll
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Batches;
