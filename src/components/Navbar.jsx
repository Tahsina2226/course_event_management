import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="flex justify-between bg-gray-800 p-4 text-white">
    <h1 className="font-bold text-xl">University</h1>
    <div className="space-x-4">
      <Link to="/">Home</Link>
      <Link to="/batches">Batches</Link>
      <Link to="/routine">Routine</Link>
      <Link to="/events">Events</Link>
      <Link to="/news">News</Link>
    </div>
  </nav>
);

export default Navbar;
