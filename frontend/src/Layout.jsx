import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import { Footer } from "./components";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
