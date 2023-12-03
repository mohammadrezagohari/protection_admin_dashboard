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
