import React, { useState } from 'react';
import { useGetBatchesQuery, useAddBatchMutation } from './batchApi';

const BatchList = () => {
  const { data: batches = [], isLoading, isError } = useGetBatchesQuery();
  const [addBatch] = useAddBatchMutation();
  const [form, setForm] = useState({ name: '', department: '', semester: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBatch(form);
    setForm({ name: '', department: '', semester: '' });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-red-500 text-center">Error loading batches</p>;

  return (
    <div className="mx-auto p-4 max-w-2xl">
      <h2 className="mb-4 font-bold text-2xl">Batch List</h2>
      <ul className="mb-6">
        {batches.map((batch) => (
          <li key={batch.id} className="mb-2 p-3 border rounded">
            {batch.name} ({batch.department}) - Semester {batch.semester}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Batch Name"
          className="p-2 border rounded w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          className="p-2 border rounded w-full"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          type="text"
          placeholder="Semester"
          className="p-2 border rounded w-full"
          value={form.semester}
          onChange={(e) => setForm({ ...form, semester: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
          Add Batch
        </button>
      </form>
    </div>
  );
};

export default BatchList;
