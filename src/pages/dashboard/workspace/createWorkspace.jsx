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
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { createWorkspace } from "@/api/services/workspace";
import CitiesDropdown from "@/components/citiesDropDown/citiesDropDown";

export function CreateWorkspace() {
  const { userToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [cities, setCities] = useState(null);

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

  const storeWorkspace = async (e) => {
    e.preventDefault();
    const createResult = await createWorkspace(
      {
        name: title,
        city_id: cities,
      },
      userToken
    )
      .then(function (response) {
        console.log("dataresult", response);
        if (response?.data?.status) {
          toast.success("محل خدمت با موفقیت افز,ده شد!");
        } else {
          if (response?.data?.success == false) {
            toast(
              `${response?.data?.data?.name != undefined ? response?.data?.data?.name : ""} \n
                  ${
                    response?.data?.data?.city_id != undefined ? response?.data?.data?.city_id : ""
                  } \n `,
              {
                duration: 2000,
              }
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
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
              to={`/dashboard/workspace`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
              ایجاد محل خدمت
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={storeWorkspace}
              className="m-6 mb-4 flex flex-wrap"
            >
              <div className="w-7/12">
                <label className="ml-3"> نام محل خدمت</label>
                <input
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  value={title}
                  type="text"
                  className="ml-3"
                  name="name"
                  style={inputStyle}
                />
              </div>

              <div className="mt-4 w-7/12">
                <label htmlFor="cities">شهر</label>
                <CitiesDropdown
                  id="cities"
                  cities={cities}
                  setCities={setCities}
                />
              </div>
              <div className="col-span-2 mt-4 w-6/12 mb-44">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default CreateWorkspace;
