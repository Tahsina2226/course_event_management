import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBatchMutation } from "./batchApi";
import toast from "react-hot-toast";

const CreateBatch: React.FC = () => {
  const navigate = useNavigate();
  const [addBatch, { isLoading }] = useAddBatchMutation();

  const [name, setName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [semester, setSemester] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !department || !semester) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await addBatch({ name, department, semester }).unwrap();
      toast.success("Batch added successfully");
      navigate("/batches");
    } catch (error) {
      toast.error("Failed to add batch");
    }
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded max-w-md">
      <h2 className="mb-6 font-semibold text-2xl text-center">Add New Batch</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-1 font-medium">Batch Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
          placeholder="Enter batch name"
          required
        />

        <label className="block mb-1 font-medium">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="mb-4 p-3 border rounded w-full"
          placeholder="Enter department"
          required
        />

        <label className="block mb-1 font-medium">Semester</label>
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="mb-6 p-3 border rounded w-full"
          placeholder="Enter semester"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 py-3 rounded w-full font-semibold text-white transition-colors"
        >
          {isLoading ? "Adding..." : "Add Batch"}
        </button>
      </form>
    </div>
  );
};

export default CreateBatch;
