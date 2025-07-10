import React, { useState, useEffect } from "react";
import { useEnrollUserMutation } from "./enrollApi";

interface EnrollProps {
  batchId: string;
  batchDepartment: string;
}

const Enroll: React.FC<EnrollProps> = ({ batchId, batchDepartment }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [enrollUser, { isLoading }] = useEnrollUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await enrollUser({ email, batchId }).unwrap();
      setMessage(res.message);
    } catch (error: any) {
      if (error.data && error.data.message) {
        setMessage(error.data.message);
      } else {
        setMessage("Enrollment failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (batchDepartment) {
      console.log("Batch department:", batchDepartment);
    }
  }, [batchDepartment]);

  return (
    <div>
      <h2>User Enrollment for batch {batchId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Enrolling..." : "Enroll"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Enroll;
