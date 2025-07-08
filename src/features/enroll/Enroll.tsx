import React from "react";
import Swal from "sweetalert2";
import { useEnrollToBatchMutation } from "./enrollApi";
import { useAppSelector } from "../../redux/Hooks";

interface EnrollProps {
  batchId: number;
  batchDepartment: string;
}

const Enroll: React.FC<EnrollProps> = ({ batchId, batchDepartment }) => {
  const [enrollToBatch, { isLoading }] = useEnrollToBatchMutation();
  const userEmail = useAppSelector((state) => state.auth.email);

  const handleEnroll = async () => {
    if (!userEmail) {
      await Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please log in to enroll.",
        confirmButtonColor: "#f87171",
        background: "#fef2f2",
        color: "#7f1d1d",
      });
      return;
    }

    const existingDept = localStorage.getItem("enrolledDepartment");
    if (existingDept && existingDept !== batchDepartment) {
      await Swal.fire({
        icon: "error",
        title: "Already Enrolled",
        text: `You're already enrolled in the ${existingDept} department.`,
        confirmButtonColor: "#f87171",
        background: "#fef2f2",
        color: "#7f1d1d",
      });
      return;
    }

    try {
      const response = await enrollToBatch({ userEmail, batchId }).unwrap();
      localStorage.setItem("enrolledDepartment", batchDepartment);
      await Swal.fire({
        icon: "success",
        title: "Enrollment Successful",
        text: response.message || `You are now enrolled in ${batchDepartment}`,
        confirmButtonColor: "#4ade80",
        background: "#f0fdf4",
        color: "#064e3b",
      });
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Enrollment Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#fca5a5",
        background: "#fef2f2",
        color: "#7f1d1d",
      });
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={isLoading}
      className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 px-4 py-2 rounded font-semibold text-white transition-all"
    >
      {isLoading ? "Enrolling..." : "Enroll"}
    </button>
  );
};

export default Enroll;
