import React from 'react';
import { useGetRoutinesQuery } from './routineApi';

const Routines = () => {
  const { data: routines = [], isLoading, isError } = useGetRoutinesQuery();

  if (isLoading) return <p>Loading Routines...</p>;
  if (isError) return <p>Failed to load routines.</p>;

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="mb-4 font-bold text-2xl">Class Routines</h2>
      <ul>
        {routines.map(routine => (
          <li key={routine.id} className="mb-2 p-3 border rounded">
            <h3 className="font-semibold">{routine.course}</h3>
            <p>Time: {routine.time}</p>
            <p>Room: {routine.room}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routines;
