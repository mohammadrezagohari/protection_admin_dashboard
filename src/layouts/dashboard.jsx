import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useState } from "react";
import { AuthProvider } from "@/gard/context/AuthContext";
import { useLocalStorage } from "@/gard/storage/useLocalStorage";

export function Dashboard({ children }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const [isShow, setIsShow] = useState(false);

  const showMenuHandler = () => {
    setIsShow((prev) => !prev);
    console.log("is hsow: ", isShow);
  };
  return (
    <>
      <div className="flex ">
        <div
          onClick={showMenuHandler}
          style={{ borderRadius: "8px" }}
          className=" absolute top-4  right-8 z-50 flex h-10 w-10 cursor-pointer items-center justify-center bg-themeclr1 md:hidden lg:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6797 18.9751L8 18.9981"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.6875 5.76758H12.9916"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.6797 12.2549H4.31969"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{ borderRadius: "8px" }}
          className=" absolute top-4 left-8 z-50  flex h-10 w-max cursor-pointer items-center justify-center bg-themeclr1 p-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
            aria-hidden="true"
            className="h-5 w-5 text-inherit"
          >
            <path
              fillRule="evenodd"
              d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
          خروج
        </div>
        <div className="h-10 w-10 bg-blue-gray-800 md:hidden lg:hidden">
          <img src="/img/لوگو دانشگاه 1.png" width="50" alt="menu icon" />
        </div>
        <Sidenav
          isShow={isShow}
          routes={routes}
          brandImg={
            sidenavType === "dark"
              ? "/img/لوگو دانشگاه 1.png"
              : "/img/pelogo.png"
          }
        />
        <div
          className={`absolute left-0 h-screen w-full overflow-scroll p-4 lg:w-[70%] `}
        >
          {children}
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
