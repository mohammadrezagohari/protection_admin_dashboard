import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { Formik } from "formik";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CategotyBox from "@/components/CategoryBox/CategoryBox";
import {
  getArticleCount,
  getCategoryCount,
  getTutorialCount,
  getUserCount,
} from "@/api/services/dashboard";
import { AuthContext } from "@/gard/context/AuthContext";

const DashboardBody = () => {
//   const category = [
//     { id: 1, name: "ارتوپدی", src: "" },
//     { id: 2, name: "اورولوژی", src: "" },
//     { id: 3, name: "جراحی اعصاب", src: "" },
//     { id: 4, name: "جراحی زنان", src: "" },
//   ];
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(null);
  const [articleQuantity, setArticleQuantity] = useState(null);
  const [userQuantity, setUserQuantity] = useState(null);
  const [tutorialQuantity, setTutorialQuantity] = useState(null);
  const [categoryQuantity, setCategoryQuantity] = useState(null);
  const articleCount = async () => {
    const result = await getArticleCount(userToken)
      .then(function (response) {
        console.log("setArticleQuantity", response);
        setArticleQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };
  const userCount = async () => {
    const result = await getUserCount(userToken)
      .then(function (response) {
        console.log("setUserQuantity", response);
        setUserQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };
  const tutorialCount = async () => {
    const result = await getTutorialCount(userToken)
      .then(function (response) {
        console.log("setTutorialQuantity", response);
        setTutorialQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

  const categoryCount = async () => {
    const result = await getCategoryCount(userToken)
      .then(function (response) {
        console.log("setCategoryQuantity", response);
        setCategoryQuantity(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    articleCount();
    userCount();
    tutorialCount();
    categoryCount();
  }, []);
  return (
    <Card className="rounded-4 h-full w-full bg-white">
      <CardBody className="h-full w-full p-0">
        {/* <label
          id="parentCkeck"
          className="h-26 flex w-full items-center justify-around  overflow-hidden rounded-xl border-2 border-gray-100 p-5 pb-8 "
        >
            <CategotyBox name={"دسته ها"} src="../img/svgs/Data Set.svg">
              <div>
                <div className="p-1">{categoryQuantity}</div>
              </div>
            </CategotyBox>
            <CategotyBox name={"کاربران"} src="../img/svgs/Profile.svg">
              <div>
                <div className="p-1">{userQuantity}</div>
              </div>
            </CategotyBox>
            <CategotyBox name={"آموزش ها"} src="../img/svgs/Cards.svg">
              <div>
                <div className="p-1">{tutorialQuantity}</div>
              </div>
            </CategotyBox>
            <CategotyBox name={"مقالات"} src="../img/svgs/icons8-news 1.svg">
              <div>
                <div className="p-1">{articleQuantity}</div>
              </div>
            </CategotyBox>
        </label> */}
        {/* <iframe src="https://visual.is/visualizations/LA1kX2s5PEd6b3SBWSCTw4is/embed" width="100%" height="100%" frameborder="0" style={{borderRadius:'8px'}}></iframe> */}
      </CardBody>
    </Card>
  );
};

export default DashboardBody;
