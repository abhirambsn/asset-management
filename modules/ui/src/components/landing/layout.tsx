import { Fragment } from "react";
import LandingNavbar from "./navbar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <Fragment>
      <LandingNavbar />
      <main className="w-full p-3">
        <Outlet />
      </main>
    </Fragment>
  );
};

export default LandingLayout;
