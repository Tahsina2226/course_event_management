import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Batches from "./features/batches/Batches";
import EditBatch from "./features/batches/EditBatch";
import Routines from "./features/routines/Routines";
import Events from "./features/events/Events";
import News from "./features/news/News";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer ";

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/batches/edit/:id" element={<EditBatch />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
