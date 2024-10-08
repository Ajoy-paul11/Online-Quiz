import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../userContext/AuthContext.jsx";
import Logout from "./Logout.jsx";

function Navbar() {
  const [menubar, setMenubar] = useState(false);
  const { authUser } = useAuth();

  const handleMenubar = () => {
    setMenubar(!menubar);
  };

  console.log(authUser);

  return (
    <div className=" w-full h-[80px] flex justify-between items-center px-4 bg-[#202829] text-[#FFFFF0]">
      <div className=" lg:pl-6">
        <Link href="/" className=" text-2xl text-gray-300 italic">
          Quiz<span className="text-blue-700">Online</span>
        </Link>
      </div>

      {/* menu */}
      <ul className=" hidden md:flex md:gap-6 md:pr-6">
        <li>
          <Link to="/results">Results</Link>
        </li>
        <li>
          <Link to="/all-quiz">Quizzes</Link>
        </li>
        <li>
          {authUser?.role === "admin" ? (
            <Link to="/quiz/create">Add-Quiz</Link>
          ) : (
            ""
          )}
        </li>
        <li>
          {authUser?.role === "admin" ? (
            <Link to="/edit-quizzes">Edit-Quizzes</Link>
          ) : (
            ""
          )}
        </li>
        <li>{authUser ? <Logout /> : <Link to="/login">Login</Link>}</li>
      </ul>

      <button
        onClick={handleMenubar}
        type="button"
        className=" md:hidden z-50 duration-300 "
      >
        {menubar ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile menu */}
      <ul
        className={
          !menubar
            ? "hidden"
            : "absolute top-0 left-0 w-full h-full z-10 bg-[#202829] opacity-100 flex flex-col justify-center items-center duration-300"
        }
      >
        <li className=" py-4 text-lg">
          <Link onClick={handleMenubar} to="/results">
            Results
          </Link>
        </li>
        <li className=" py-4 text-lg">
          {authUser?.role === "admin" ? (
            <Link to="/quiz/create" onClick={handleMenubar}>
              Add-Quiz
            </Link>
          ) : (
            ""
          )}
        </li>
        <li className=" py-4 text-lg">
          {authUser?.role === "admin" ? (
            <Link to="/edit-quizzes" onClick={handleMenubar}>
              Edit-Quizzes
            </Link>
          ) : (
            ""
          )}
        </li>
        {authUser ? <Logout /> : <Link to="/login">Login</Link>}
      </ul>
    </div>
  );
}

export default Navbar;
