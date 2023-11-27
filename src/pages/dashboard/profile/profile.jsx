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
import { getProfileMe } from "@/api/services/auth-api";
import { getProvince } from "./../../../api/services/province";
import { AuthContext } from "@/gard/context/AuthContext";
import { fetchUsers } from "@/api/services/users";
import CitiesDropdown from "@/components/citiesDropDown/citiesDropDown";

export function Profile() {
  const { userToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [province, setProvince] = useState();
  const [avatar,setAvatar] =useState();
  const [first_name,setFirst_name] =useState();
  const [last_name,setLast_name] =useState();
  const [mobile,setMobile] =useState();
  const [city_id,setCity_id] =useState();
  const [cities,setCities] =useState();
  
  const [users,setUsers] =useState();


  const [sex,setSex] =useState();
  const [workspace_id,setWorkspace_id] =useState();
  const [password,setPassword] =useState();

  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    console.log("image target", event.target.files[0]);
    setAvatar(event.target.files[0]);
    setImagePreview(file_url);
  };

  // const getAllProvince = async () => {
  //   const result = await getProvince(userToken)
  //     .then(function (response) {
  //       setProvince(response?.data);
  //     })
  //     .catch(function (err) {
  //       console.log(err.message);
  //     });
  //   return result;
  // };

  const inputStyle = { 
    border: "1px solid #CCC8AA",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
    width: "100%",
    marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const getProfileMeData = async () => {
    const result = await getProfileMe(userToken)
      .then(function (response) {
        console.log("response:", response.data);
        setUserInfo(response?.data);
      })
      .catch(function (error) {
        console.log("error :", error.message);
      });
    return result;
  };
  useEffect(() => {
    setTimeout(() => {
      getProfileMeData();
      // getAllProvince();
    }, 3000);
  }, []);


  const getUserDatas = async () => {
    const result = await fetchUsers(userToken)
      .then(function (response) {
        console.log("response", response);
        setUsers(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };
  useEffect(() => {
    setTimeout(() => {
      getUserDatas();
      console.log("first");
    }, 3000);
  }, []);





  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createNotification(
      {
        avatar: avatar,
        first_name: first_name,
        last_name: last_name,
        mobile: mobile,
        city_id: city_id,
        sex: sex,
        workspace_id: workspace_id,
        password: password,
      },
       userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success("هشدار با موفقیت ارسال شد !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.avatar != undefined ? response?.data?.avatar : ""
              } \n
              ${
                response?.data?.first_name != undefined ? response?.data?.first_name : ""
              } \n
              ${
                response?.data?.last_name != undefined ? response?.data?.last_name : ""
              } \n
              ${
                response?.data?.mobile != undefined ? response?.data?.mobile : ""
              } \n
              ${
                response?.data?.city_id != undefined ? response?.data?.city_id : ""
              } \n
              ${
                response?.data?.sex != undefined ? response?.data?.sex : ""
              } \n
              ${
                response?.data?.workspace_id != undefined ? response?.data?.workspace_id : ""
              } \n
              ${
                response?.data?.password != undefined ? response?.data?.password : ""
              } \n`,{
                duration: 2000,
              },
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
        console.log(data);
      });

    return createResult;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


  return (

      <>
        <Card style={{height:'570px'}} className=" h-full rounded-none  w-full  lg:bg-white md:bg-blue-900  ">
          <CardHeader
            color="blue"
            floated={false}
            shadow={false}
            className="m-0 grid relative overflow-visible place-items-center rounded-none py-8 px-4  h-40 text-center"
          >
          <div className="mb-4 w-32  border border-white rounded-full bg-white  text-white absolute right-16 top-4 z-50">
            <img
              className="w-full "
              src={
                userInfo?.avatar == 0
                  ? "../../images/avatar/men.png"
                  : "../../images/avatar/women.png"
              }
            />
          </div>
          <Typography variant="h4" color="white" className="absolute text-xl top-28 right-56 font-extrabold">
            {userInfo?.first_name} 
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="mt-8 i flex flex-col">
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className="!w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:w-96 pr-10 pl-12 gap-4 relative top-8"
                >
                  <Input
                    size="md"
                    onChange={(e)=> setFirst_name(e.target.value)}
                    className="mt-1em"
                    value={first_name}
                    name="first_name"
                    label=" نام "
                  />
                  <Input
                    className="mt-1em  ml-8 "
                    onChange={(e)=> setLast_name(e.target.value)}
                    name="last_name"
                    size="md"
                    value={last_name}
                    label="نام خانوادگی"
                  />
                  <Input
                    className="mt-1em "
                    onChange={(e)=> setMobile(e.target.value)}
                    name="city_id"
                    size="md"
                    autoComplete="off"
                    value={mobile}
                    label="موبایل"
                    contentEditable="false"
                  />
                   <div className="w-7/12">
                    <label className="ml-3"> شهر</label>
                    <CitiesDropdown
                      cities={cities}
                      setCities={setCities}
                    />
                  </div>
                  {/* <Input
                    className="mt-1em "
                    onChange={(e)=> setCity_id(e.target.value)}
                    name="mobile"
                    size="md"
                    value={city_id}
                    label="شهر"
                  /> */}
                  <Input
                    type="password"
                    size="md"
                    onChange={(e)=> setPassword(e.target.value)}
                    name="password"
                    className="mt-1em  "
                    value={password}
                    label="رمزعبور"
                  />
      
                  <Input
                    className="mt-1em  "
                    onChange={(e)=> setSex(e.target.value)}
                    name="sex"
                    size="md"
                    label="جنسیت"
                    // value={(sex.value = "men" ? "مرد" : "زن")}
                    value={sex}
                  />
                  <br/>

                  <div className="flex justify-center items-center  w-full mt-4 ">
                    <label className="ml-3 block"> آواتار:</label>
                    <div className="flex justify-center items-center  gap-3">
                      <input
                        type="file"
                        name="icon"
                        accept="image/png,image/jpeg,image/webp,"
                        style={inputStyle}
                        onChange={handleFileChange}
                        className="!mt-0"
                      />
                    <div className=" h-12 w-16 rounded-md border-2 p-3">
                      <img
                        className="h-full w-full rounded-md object-cover"
                        src={imagePreview ?? "../../images/no-image.svg"}
                        alt="آپلود عکس"
                      />
                    </div>
                </div>
              </div>
              <div className="-mt-16 w-full">
                <Button type="submit" className="w-full">ذخیره</Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
    
  );
}

export default Profile;
