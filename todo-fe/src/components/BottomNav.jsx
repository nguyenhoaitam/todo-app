import { Home, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function () {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 bg-primary w-full shadow-lg flex justify-around items-center py-2">
      <Link
        to="/dasboard"
        className={`flex flex-col items-center ${
          location.pathname === "/dashboard" ? "text-blue-900" : "text-gray"
        }`}
      >
        <Home size={28} />
        <span className="text-sm">Home</span>
      </Link>
      <Link
        to="/add"
        className="relative -mt-4 bg-button text-white p-4 rounded-full shadow-lg"
      >
        <Plus size={28} />
      </Link>

      <Link
        to="/profile"
        className={`flex flex-col items-center ${
          location.pathname === "/profile" ? "text-blue-900" : "text-gray"
        }`}
      >
        <User size={28}></User>
        <span className="text-sm">Profile</span>
      </Link>
    </div>
  );
}
