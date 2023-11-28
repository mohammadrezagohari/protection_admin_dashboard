import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { updateWorkspace, showWorkspace } from "@/api/services/workspace";
import CitiesDropdown from "@/components/citiesDropDown/citiesDropDown";

export function ShowWorkspace() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
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

  const showWorkspaces = async () => {
    const showResult = await showWorkspace(id, userToken)
      .then((result) => {
        setName(result?.data?.name);
        setCities(result?.data?.city?.id);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    return showResult;
  };
  useEffect(() => {
    showWorkspaces(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const editResult = await updateWorkspace(
      id,
      {
        name: name,
        city_id: cities,
      },
      userToken
    )
      .then(function (response) {
        console.log("res", response.status);
        if (response.status == true) {
          toast.success("تغییرات با موفقیت افزوده شد !");
        }
        console.log(response?.data);
        if (response?.data?.status == true) console.log(response?.data?.status);
      })
      .catch(function (err) {
        console.log("error", err);
      });

    return editResult;
  };

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
              onSubmit={handleSubmit}
              className="m-6 mb-4 flex flex-wrap"
            >
              <div className="w-7/12">
                <label className="ml-3"> نام محل خدمت</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                  selected_id={cities}
                />
              </div>
              <div className="col-span-2 mt-4 mb-44 w-6/12">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ShowWorkspace;
