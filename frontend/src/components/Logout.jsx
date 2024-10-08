import React from "react";
import { useAuth } from "../userContext/AuthContext.jsx";
import { Link } from "react-router-dom";

function Logout() {
  const { setAuthUser } = useAuth();

  const handleLogout = () => {
    setAuthUser(null);
  };
  return (
    <Link onClick={handleLogout} to="/">
      Logout
    </Link>
  );
}

export default Logout;
