import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold ">
          Lost Ark Info
        </Link>
      </div>
    </header>
  );
}
