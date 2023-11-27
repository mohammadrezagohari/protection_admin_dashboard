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
import { getWorkspace,deleteWorkspace } from "@/api/services/workspace";
import { data } from "autoprefixer";

function Workspace() {
  const { userToken } = useContext(AuthContext);

  const [workspace, setWorkspace] = useState(null);

  const [loading, setLoading] = useState(true);

  

  const getDatas = async () => {
    const result = await getWorkspace(userToken)
      .then(function (result) {
        console.log("response", result?.data);
        setWorkspace(result?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
        getDatas();
    }, 3000);
  }, []);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  
  const deleteWorkspaces = async (id) => {
    const deleteResult = await deleteWorkspace(id, userToken)
      .then(function (response) {
        if (response.status) {
          toast.success("حذف با موفقیت انجام شد !");
          setWorkspace(workspace.filter((wspc) => wspc.id !== id));
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
        </div>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 mt-3 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
                  لیست محل خدمت    
          </Typography>
          <Link
            to={`/dashboard/workspace/create`}
            className="mr-3"
            style={linkStyle}
          >
               محل خدمت جدید
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
                    {["#"," نام شهر ",'ID', "تنظیمات", ].map((el) => (
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
                  {workspace?.data?.map((wspc, key) => {
                    const className = `py-3 px-5 ${
                      key === 10 - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {wspc?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            { ` ${wspc.name}` }
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 max-w-8">
                          { ` ${wspc.city_id}` }
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link
                            // to={`/dashboard/workspace/show/${wspc.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteWorkspaces(wspc.id)}
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
              {10 == 0 ? (
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




  export default Workspace;