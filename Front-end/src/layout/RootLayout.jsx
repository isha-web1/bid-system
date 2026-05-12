import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar/>
      <Outlet/>
    </div>
  );
};