import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { AuthContext, AuthProvider } from "./gard/context/AuthContext";
import { SignIn } from "./pages/auth";
import EditUser from "./pages/dashboard/users/editUser";
// import ShowCities from "./pages/dashboard/province/showCities";
// import ShowCity from "./pages/dashboard/city/showCity";
// import CreateCity from "./pages/dashboard/city/createCity";
import CreateCategory from "./pages/dashboard/category/createCategory";
// import ShowCategory from "./pages/dashboard/category/showCategory";

import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import UserPanel from "./pages/dashboard/users/panel";
// import CreateContact from "./pages/dashboard/contact/createContact";
import CreateAboutUs from "./pages/dashboard/about/createAbout";
import { Profile, Users } from "./pages/dashboard";
import { useContext } from "react";
import CreateTutorialPage from "./pages/dashboard/tutorials/create-tutorials";
import Category from "./pages/dashboard/category/category";
import Tutorials from "./pages/dashboard/Tutorials/Tutorials";

import CreateEducationCover, { CreatePoster } from "./pages/dashboard/poster/createPoster";
import SystemBenefit from "./pages/dashboard/systemBenefit/systemBenefit";
import CreateSystemBenefit from "./pages/dashboard/systemBenefit/createSystemBenefit";
import PatientContent from "./pages/dashboard/patientContent/patientContent";
import CreatePatientContent from "./pages/dashboard/patientContent/createPatientContent";

import CreateQuestions, { CreateFaq } from "./pages/dashboard/faq/createFaq";
import Faq from "./pages/dashboard/faq/faq";
import ShowFaq from "./pages/dashboard/faq/showFaq";
import Home from "./pages/dashboard/home";
import SystemGoal from "./pages/dashboard/systemGoal/sysGoal";
import CreateSystemGoal from "./pages/dashboard/systemGoal/createSysGoal";
import ShowSystemGoals from "./pages/dashboard/systemGoal/showSystemGoal";
import Poster from "./pages/dashboard/poster/poster";
import Video from "./pages/dashboard/video/video";
import CreateVideo from "./pages/dashboard/video/createVideo";
import Article from "./pages/dashboard/articles/articles";
import CreateArticle from "./pages/dashboard/articles/createArticle";
import Workspace from "./pages/dashboard/workspace/workspace";
import ShowPoster from "./pages/dashboard/poster/showPoster";
import CreateTutorialsWizard from "./pages/dashboard/tutorials/create-tutorials-wizard";
import CreateWorkspace from "./pages/dashboard/workspace/createWorkspace";
import CustomMessage from "./pages/dashboard/customMessage/customMessage";
import CreateCustomMessage from "./pages/dashboard/customMessage/createCustomMessage";
import Notif from "./pages/dashboard/notification/notification";
import CreateNotif from "./pages/dashboard/notification/createNotif";

function App() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const { isLoggedIn, loginContext, setUserToken, userToken, logout } =
    useContext(AuthContext);
  if (!userToken) {
    return (
      <Routes>
        <Route path="/*" element={<SignIn />} />
      </Routes>
    );
  } else {
    return (
      <>
        <Dashboard>
          <Routes>
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
            <Route path="/dashboard/profile/profile" element={<Profile />} />
            <Route path="/dashboard/tutorials" element={<Tutorials />} />
            <Route path="/dashboard/users/panel/:id" element={<UserPanel />} />

            {/* <Route path="/dashboard/about/create" element={<CreateAboutUs />} />  */}

            <Route path="/dashboard/categories" element={<Category />} />
            <Route
              path="/dashboard/category/create"
              element={<CreateCategory />}
            />
        
            <Route path="/dashboard/articles" element={<Article />} />
            <Route path="/dashboard/articles/create" element={<CreateArticle />} />

            <Route
              path="/dashboard/patientcontent"
              element={<PatientContent />}
            />
            <Route
              path="/dashboard/patientcontent/create"
              element={<CreatePatientContent />}
            />

            <Route path="/dashboard/systemgoal" element={<SystemGoal />} />
            <Route
              path="/dashboard/systemgoal/create"
              element={<CreateSystemGoal />}
            />
            <Route
              path="/dashboard/systemgoal/show/:id"
              element={<ShowSystemGoals />}
            />

            <Route path="/dashboard/faq" element={<Faq />} />
            <Route path="/dashboard/faq/create" element={<CreateFaq />} />
            <Route path="/dashboard/faq/show/:id" element={<ShowFaq />} />
            {/* <Route path="/dashboard/home" element={<Home />} /> */}

            {/* <Route
              path="/dashboard/province/:id/cities/show"
              element={<ShowCities />}
            />
            <Route path="/dashboard/city/create/:id" element={<CreateCity />} />
            <Route
              path="/dashboard/province/:province_id/city/show/:city_id"
              element={<ShowCity />}
            /> */}
            <Route
              path="/dashboard/tutorials/create"
              element={<CreateTutorialPage />}
            />            
            {/* <Route
              path="/dashboard/tutorials/create"
              element={<CreateTutorialsWizard />}
            /> */}
            <Route path="/dashboard" element={<Home />} />

            <Route path="/dashboard/poster" element={<Poster />} />
            <Route path="/dashboard/poster/create" element={<CreatePoster />} />
            <Route path="/dashboard/poster/show/:id" element={<ShowPoster />}/>
            
            <Route path="/dashboard/benefit" element={<SystemBenefit />} />
            <Route path="/dashboard/benefit/create" element={<CreateSystemBenefit />} />


            <Route
              path="/dashboard/video"
              element={<Video />}
            />

            <Route
              path="/dashboard/video/create"
              element={<CreateVideo />}
            />

          <Route path="/dashboard/workspace" element={<Workspace />} />
          <Route path="/dashboard/workspace/create" element={<CreateWorkspace />} />


          <Route path="/dashboard/custom-message" element={<CustomMessage />} />
          <Route path="/dashboard/custom-message/create" element={<CreateCustomMessage />} />


          <Route path="/dashboard/notification" element={<Notif />} />
          <Route path="/dashboard/notification/create" element={<CreateNotif />} />
          <Route path="/" element={<Home />} />

          </Routes>
        </Dashboard>
      </>
    );
  }
}

export default App;
