import React from "react";
import { useEnrollToBatchMutation } from "../enroll/enrollApi";
import { useAppSelector } from "../../redux/Hooks";
import toast from "react-hot-toast";

interface EnrollProps {
  batchId: number;
}

const Enroll: React.FC<EnrollProps> = ({ batchId }) => {
  const [enrollToBatch, { isLoading }] = useEnrollToBatchMutation();
  const userEmail = useAppSelector((state) => state.auth.email);

  const handleEnroll = async () => {
    if (!userEmail) {
      toast.error("You must be logged in to enroll");
      return;
    }

    try {
      const response = await enrollToBatch({ userEmail, batchId }).unwrap();
      toast.success(response.message || "Enrollment successful!");
    } catch (error) {
      toast.error("Enrollment failed!");
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 px-4 py-2 rounded font-semibold text-white"
    >
      {isLoading ? "Enrolling..." : "Enroll"}
    </button>
  );
};

export default Enroll;
