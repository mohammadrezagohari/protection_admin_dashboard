import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Alert,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { getGoal,deleteGoal } from "@/api/services/goal";

function SystemGoal() {
  const { userToken } = useContext(AuthContext);

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getGoals = async () => {
    const result = await getGoal()
      .then(function (response) {
        console.log("response", response);
        setGoals(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return result;
  };


  useEffect(() => {
    setTimeout(() => {
        getGoals();
    }, 3000);
  }, []);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  
  const deleteGoals = async (id) => {
    const deleteResult = await deleteGoal(id, userToken)
      .then(function (response) {
        if (response.status) {
          toast.success("حذف با موفقیت انجام شد !");
          setGoals(goals.filter((goal) => goal.id !== id));
        } else {
          toast.error("خطا !! مجددا تلاش نمایید");
        }
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return deleteResult;
  };
  return (
    <>
      <Card>
        <div className="py-5">
          {/* <Link
            to={`/dashboard/category/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت دسته بندی جدید
          </Link> */}
        </div>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 mt-3 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
                 اهداف سامانه آموزش به بیمار     
          </Typography>
          <Link
            to={`/dashboard/systemgoal/create`}
            className="mr-3"
            style={linkStyle}
          >
            ایجاد اهداف  
          </Link>
        </CardHeader>

        {loading ? (
          <div className="flex w-full  items-center justify-center py-60">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#820382"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="mx-auto w-full"
              visible={true}
            />
          </div>
        ) : (
          <>
            <CardBody className="min-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto text-right">
                <thead>
                  <tr>
                    {["#"," عنوان", "تنظیمات", ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
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
                  {goals?.map((goal, key) => {
                    const className = `py-3 px-5 ${
                      key === goal.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {" "}
                            {goal?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                          { ` ${goal.title}` }
                          </Typography>
                        </td>
                        {/* <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 max-w-8">
                          { ` ${goal.description}` }
                          </Typography>
                        </td> */}
                        <td className={className}>
                          <Link
                            to={`/dashboard/systemgoal/show/${goal.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteGoals(goal.id)}
                            className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {goals.length == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
               ) : (
                <></> 
              )} 
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}




  export default SystemGoal;