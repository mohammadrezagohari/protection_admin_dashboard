import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon,

} from "@heroicons/react/24/solid";
// import { HiNewspaper } from 'react-icons/hi2';

import {Profile, Notifications} from "@/pages/dashboard";
import {SignIn} from "@/pages/auth";
import Register from "./pages/auth/register";
import Forget from "./pages/auth/forget";
import Category from "./pages/dashboard/category/category";
import About from "./pages/dashboard/about/about";
import Tutorials from "./pages/dashboard/Tutorials/Tutorials";
import DashboardBody from "./pages/dashboard/DashboardBody/DashboardBody";
import EducationCovers from "./pages/dashboard/poster/poster";
import SystemBenefit from "./pages/dashboard/systemBenefit/systemBenefit";
import PatientContent from "./pages/dashboard/patientContent/patientContent";
import Questions from "./pages/dashboard/faq/faq";
import Faq from "./pages/dashboard/faq/faq";
import Home from "./pages/dashboard/home";
import SystemGoal from "./pages/dashboard/systemGoal/sysGoal";
import Poster from "./pages/dashboard/poster/poster";
import Video from "./pages/dashboard/video/video";
import Article from "./pages/dashboard/articles/articles";
import Workspace from "./pages/dashboard/workspace/workspace";
import CustomMessage from "./pages/dashboard/customMessage/customMessage";
import Notif from "./pages/dashboard/notification/notification";
import Patient from "@/pages/dashboard/patient/patient.jsx";
import Hospital from "./pages/dashboard/hospital/hospital";
import UsersList from '@/pages/dashboard/users.jsx';
import Logout from "@/pages/auth/logout.jsx";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "داشبورد",
                path: "/",
                element: <Home/>,
            },

            {
                icon: <BellIcon {...icon} />,
                name: "مدیریت کاربران",
                path: "/users",
                element: <UsersList/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "آموزش ها",
                path: "/tutorials",
                element: <Tutorials/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "مقالات",
                path: "/articles",
                element: <Article/>,
            }, {
                icon: <BellIcon {...icon} />,
                name: "لیست بیماران",
                path: "/patient-content",
                element: <PatientContent/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "ارسالی هوشمند به بیماران",
                path: "/patient",
                element: <Patient/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "دسته بندی ها",
                path: "/categories",
                element: <Category/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: " پوسترهای آموزشی",
                path: "/poster",
                element: <Poster/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "ارسال پیام به کاربر  ",
                path: "/custom-message",
                element: <CustomMessage/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "فواید سیستم الکترونیکی ",
                path: "/benefit",
                element: <SystemBenefit/>,
            },

            {
                icon: <BellIcon {...icon} />,
                name: "  اهداف سامانه آموزش به بیمار",
                path: "/systemgoal",
                element: <SystemGoal/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "ویدئوهای آموزشی ",
                path: "/video",
                element: <Video/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "  محل خدمت",
                path: "/workspace",
                element: <Workspace/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "بیمارستان ها",
                path: "/hospital",
                element: <Hospital/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "سوالات متداول",
                path: "/faq",
                element: <Faq/>,
            },
            {
                icon: <BellIcon {...icon} />,
                name: "ارسال اعلانات",
                path: "/notification",
                element: <Notif/>,
            },
            // {
            //   icon: <BellIcon {...icon} />,
            //   name: " درباره ما ",
            //   path: "/abouts",
            //   element: <About />,
            // },
        ],
    },
    {
        title: "صفحات احراز هویت",
        layout: "auth",
        pages: [
            {
                icon: <ArrowRightOnRectangleIcon {...icon} />,
                name: "خروج",
                path: "/logout",
                element: <Logout/>,
            },
            // {
            //   icon: <UserPlusIcon {...icon} />,
            //   name: "فراموشی رمز عبور",
            //   path: "/forget",
            //   element: <Forget />,
            // },

        ],
    },
];

export default routes;
