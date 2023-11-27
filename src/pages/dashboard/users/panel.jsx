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
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { showProfile, updateProfiles } from "@/api/services/auth-api";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function UserPanel() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    avatar: userInfo?.avatar,
    full_name: userInfo?.full_name,
    mobile: userInfo?.mobile,
    is_student: userInfo?.is_student,
    field_id: userInfo?.field_id,
    grade_id: userInfo?.grade_id,
    school_id: userInfo?.school_id,
    familiar_with_us: userInfo?.familiar_with_us,
    city_id: userInfo?.city_id,
    province_id: userInfo?.province_id,
    sex: userInfo?.sex,
  };

  const showUserProfileInfo = async (id) => {
    const showResult = await showProfile(id, userToken)
      .then(function (response) {
        setUserInfo(response?.data);
        console.log(userInfo);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return showResult;
  };

  useEffect(() => {
    showUserProfileInfo(id);
  }, []);

  const inputStyle = {
    border: "1px solid gray",
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <div className=" relative mt-8 h-72 w-full overflow-hidden rounded-xl  bg-cover	bg-center">
              <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <Card className="mx-3 -mt-56 mb-6 lg:mx-4">
              <CardHeader
                color="blue"
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
              >
                <div className="mb-4 border border-white/10 bg-white/10 p-6 text-white">
                  <img
                    className="w-20"
                    src={
                      userInfo?.sex == "men"
                        ? "/images/avatar/men.png"
                        : "/images/avatar/women.png"
                    }
                  />
                </div>
                <Typography variant="h4" color="white">
                  <span>{userInfo?.full_name}</span>
                </Typography>
              </CardHeader>
              <CardBody className="min-h-screen">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
                  <div className="">
                    <strong className="">نام ونام خانوادگی</strong>
                    <h6 className="pt-2">{userInfo?.full_name}</h6>
                  </div>
                  <div className="">
                    <strong className=""> شماره تلفن </strong>
                    <h6 className="pt-2">{userInfo?.mobile}</h6>
                  </div>
                  <div className="">
                    <strong className=""> جنسیت </strong>
                    <h6 className="pt-2">
                      {userInfo?.sex == "men" ? "آقا" : "خانم"}
                    </h6>
                  </div>
                  <div className="">
                    <strong className=""> نحوه آشنایی </strong>
                    <h6 className="pt-2">{userInfo?.familiar_with_us}</h6>
                  </div>
                  <div className="">
                    <strong> آیا کاربر دانش آموز است </strong>
                    <h6>{userInfo?.is_student == "true" ? "بله" : "خیر"}</h6>
                  </div>
                  <div className="">
                    <strong className=""> مدرسه </strong>
                    <h6 className="pt-2">{userInfo?.school?.name}</h6>
                  </div>
                  <div className="">
                    <strong className=""> شهر </strong>
                    <h6 className="pt-2">{userInfo?.city?.name}</h6>
                  </div>
                  <div className="">
                    <strong className=""> استان </strong>
                    <h6 className="pt-2">{userInfo?.province?.name}</h6>
                  </div>
                  <div className="">
                    <strong className=""> سطح </strong>
                    <h6 className="pt-2">{userInfo?.grade?.name}</h6>
                  </div>
                  <div className="">
                    <strong className=""> کیف پول </strong>
                    <h6 className="pt-2">{userInfo?.grade?.name}</h6>
                  </div>
                  <div className="col-span-2">
                    <strong className=""> آزمون ها </strong>
                    <table className="mt-2 w-full min-w-[640px] table-auto text-right">
                      <thead>
                        <tr>
                          {[
                            "#",
                            "نام درس",
                            "سطح",
                            "تعداد سوال",
                            "تعداد پاسخ",
                            "زمان پیشنهادی",
                            "امتیاز ",
                            "تنظیمات",
                          ].map((el) => (
                            <th
                              key={el}
                              className="place-items-center border-b border-blue-gray-50		 py-3 px-5 text-center "
                            >
                              <Typography
                                variant="small"
                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                              >
                                {el}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {/* {exams?.map((exam, key) => {
                    const className = `py-3 px-5 ${
                      key === exams.length - 1
                        ? ""
                        : "border-b text-center	 border-blue-gray-50"
                    }`; */}

                        <tr>
                          <td className={""}>
                            <div className="flex items-center gap-4">
                              {/* {key + 1} */}
                            </div>
                          </td>
                          <td className={""}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {/* {exam?.course?.title} */}
                            </Typography>
                          </td>

                          <td className={""}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {/* {exam?.level?.title} */}
                            </Typography>
                          </td>

                          <td className={""}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {/* {exam?.question_quantity} */}
                            </Typography>
                          </td>

                          <td className={""}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {/* {exam?.answer_quantity} */}
                            </Typography>
                          </td>

                          <td className={""}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {/* {exam?.time_exam} دقیقه */}
                            </Typography>
                          </td>

                          <td className={""}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {/* {exam?.score} */}
                            </Typography>
                          </td>
                        </tr>

                        {/* })} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default UserPanel;
