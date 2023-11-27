import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useState } from "react";
import {
  ArrowDownIcon,
  FolderArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowSmallDownIcon,
  InboxArrowDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export function Sidenav({ brandImg, brandName, routes,isShow }) {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  const styleAside = {
    overflowY: "scroll",
    background:'#183087',
    width:'400px',
    height:'100vh',
  };
  return (

        <aside
          className={`${sidenavTypes[sidenavType]} lg:flex ${isShow? 'translate-x-0':'translate-x-[400px]'} right-0 bottom-0 top-0 lg:translate-x-0 absolute z-40 lg:flex-col  transition-transform duration-300 h-full  bg-themeclr1 flex-col `  }
          style={styleAside}
        >
        <div
        className={`flex  justify-center items-center relative pb-4  pt-4 border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
        >
        <Link to="/" className="flex items-center flex-col gap-4 py-3 px-8">
          <Avatar src={brandImg} size="sm"  className="w-12 h-full" />
          <Typography 
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="relative  top-0"
          >
             دانشگاه علوم پزشکی مازندران
          </Typography>
          <Typography 
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="relative text-lg top-2"
          >
            پنل مدیریت  
          </Typography>
        </Link>
        </div> 
        <div className="m-4"> 
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="gyyy mx-3.5 mt-4 mb-2 ">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}

              {pages.map(({ icon, name, path }) => (
                <li className="ghhh !rounded-0" key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        sx={{  border: 1,borderColor: 'grey.500' }}
                        className="br0  flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ))}
        </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "پنل مدیریت",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;


