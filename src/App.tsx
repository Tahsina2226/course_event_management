import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Batches from "./features/batches/Batches";
import Footer from "./components/Footer ";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batches" element={<Batches />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
