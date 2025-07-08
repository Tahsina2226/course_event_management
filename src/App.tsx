import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Batches from "./features/batches/Batches";
import CreateBatch from "./features/batches/CreateBatch";
import EditBatch from "./features/batches/EditBatch";
import Enroll from "./features/enroll/Enroll";
import { useAppSelector } from "./redux/Hooks";
import { Toaster } from "react-hot-toast";
import Routines from "./features/routines/Routines";
import Events from "./features/events/Events";
import News from "./features/news/News";
import Footer from "./components/Footer ";
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const EnrollWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>Batch ID not found</p>;
  const batchId = Number(id);
  return <Enroll batchId={batchId} />;
};

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/batches"
          element={
            <ProtectedRoute>
              <Batches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches/create"
          element={
            <ProtectedRoute>
              <CreateBatch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches/edit/:id"
          element={
            <ProtectedRoute>
              <EditBatch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches/enroll/:id"
          element={
            <ProtectedRoute>
              <EnrollWrapper />
            </ProtectedRoute>
          }
        />

        <Route path="/routines" element={<Routines />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
