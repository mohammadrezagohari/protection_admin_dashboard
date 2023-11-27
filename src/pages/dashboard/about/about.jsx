
import React, { useEffect, useState } from "react";
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
import { getAbout } from "@/api/services/about";
function About() {
  const [aboutU, setAboutU] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getAbout()
      .then(function (response) {
        console.log("response About", response);
        setAboutU(response?.data);
        console.log('aboutU', aboutU);
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
  
  return (
    <>
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/about/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت درباره ما
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست درباره ما
          </Typography>
          
        </CardHeader>
        {loading ? ( 
          <div className="flex w-full  items-center justify-center  py-60">
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
            <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto text-right">
                <thead>
                  <tr>
                    {["#", "عنوان","متن", "تنظیمات"].map((el) => (
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
                  {aboutU?.map((abut, key) => {
                    const className = `py-3 px-5 ${
                      key == aboutU.length - 1
                        ? ""
                        : "border-b  text-center	 border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* {key + 1} */}
                            {abut?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {abut?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {abut?.content}
                          </Typography>
                        </td>

                        <td className={className}>
                          {/* <Link
                            to={`/dashboard/level/show/${level.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            // onClick={() => deleteLevels(level.id)}
                            className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                          >
                            حذف
                          </Button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* {aboutU.length == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
              ) : (
                <>
                
                </>
              )} */}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default About;
