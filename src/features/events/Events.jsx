import React from 'react';
import { useGetEventsQuery } from './eventApi';

const Events = () => {
  const { data: events = [], isLoading, isError } = useGetEventsQuery();

  if (isLoading) return <p>Loading Events...</p>;
  if (isError) return <p>Failed to load events.</p>;

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="mb-4 font-bold text-2xl">Upcoming Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id} className="mb-2 p-3 border rounded">
            <h3 className="font-semibold">{event.name}</h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
