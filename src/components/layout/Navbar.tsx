import logoremove from "../../assets/logo-nutridiary-removebg-preview.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === "/") {
    return (
      <header className="w-full p-5 flex bg-green-700 shadow-md top-0 left-0 z-50">
        <Link
          to="/about"
          className="text-white hover:text-green-300 hover:scale-110 transition duration-300 text-lg ml-auto mr-10"
        >
          ¿Qué es NutriDiary?
        </Link>
      </header>
    );
  }

  if (
    ["/about", "/login", "/register", "/dashboard", "/create-profile"].includes(
      currentPath
    )
  ) {
    return (
      <header className="w-full p-0 flex top-0 left-0 z-50">
        <Link
          to="/"
          className="text-white hover:text-green-300 hover:scale-110 transition duration-300 text-lg ml-auto mr-10"
        >
          <img src={logoremove} alt="" className="w-40" />
        </Link>
      </header>
    );
  }
}

export default Navbar;
