import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createCategory } from "@/api/services/category";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowPatientContent() {
  const { userToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [icon, setIcon] = useState();
  const [imagePreview, setImagePreview] = useState();

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

  const storeCover = async (e) => {
    e.preventDefault();
    const createResult = await createCategory(name, icon, userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success(" محتوا با موفقیت ارسال شده است!");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.name != undefined ? response?.data?.name : ""
              } \n
                  ${
                    response?.data?.icon != undefined
                      ? response?.data?.icon
                      : ""
                  } \n`,
              {
                duration: 2000,
              }
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
        // navigate(-1);
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
        <Card>
          <div className="py-5">
            <Link
              to={`/dashboard/patientcontent`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
              ارسال محتوا  
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              // onSubmit={storeCover}
              className="m-6 mb-4 flex flex-wrap"
            >
              <div className="w-7/12">
                <label className="ml-3"> عنوان محتوا</label>
                <input
                //   onChange={(e) => handleField(e)}
                  type="text"
                  className="ml-3"
                  name="name"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3"> شماره موبایل </label>
                <input
                //   onChange={(e) => handleField(e)}
                  type="text"
                  className="ml-3"
                  name="name"
                  style={inputStyle}
                />
              </div>
              <div className="col-span-2 mt-4 w-6/12">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ShowPatientContent;
