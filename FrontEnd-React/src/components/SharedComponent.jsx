import { Outlet } from "react-router-dom";
import Header from "./nav";
import Side from "@/pages/sides/side";

const SharedComponent = () => {
  return (
    <div>
      {/* Header at the top */}
      <Header />

      {/* Sidebar and Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Side />

        {/* Main content */}
        <div className="w-full md:pl-64 pt-20">
          {/* This is where all child routes like Home, Drivers, Buses, etc., will be rendered */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SharedComponent;
