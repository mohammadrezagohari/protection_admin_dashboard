import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { showBenefit,updateBenefit } from "@/api/services/benefit";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import Select from "react-select";

export function ShowBenefits() {
  const { userToken } = useContext(AuthContext);
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [is_active, setIs_active] = useState('');

  const options = [
    { value: true, label: "فعال" },
    // { value: false, label: "غیرفعال" },
  ]
  

  const handleChange = (selectedOption) => {
    setIs_active(selectedOption.value);
    console.log(selectedOption.value);
  };

  const inputStyle = {
    border: "1px solid #CCC8AA",
    borderRadius: "5px",
    padding: "0.45rem",
    marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  const showBenefits = async () => {
    const showResult = await showBenefit(id)
      .then((result) => {
        console.log('result', result)
        setTitle(result?.data?.title);
        console.log('queeee',result?.data?.title)

        setIs_active(result?.data?.is_active);
        console.log('dessss',result?.data?.is_active)

      })
      .catch(function (error) {
        console.log(error);
      });
    return showResult;
  };
  useEffect(() => {
    showBenefits(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const editResult = await updateBenefit(id, {
          title:title,
          is_active:is_active,
        }, userToken)
          .then(function (response) {
            if (response.status == true) {
              toast.success("  تغییرات با موفقیت افزوده شد !");
            }
            console.log(response?.data?.status);
            if(response?.data?.status == true)
            console.log(response?.data?.status);
          })
          .catch(function (err) {
            console.log("error", err);
          });
    
        return editResult;
  
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
        <Card style={{ height: "570px" }}>
          <CardHeader variant="gradient" color="blue" className="flex justify-between mb-8 mt-3 p-6">
            <Typography variant="h6" color="white" className="h-14 flex items-center">
              ساخت عنوان جدید
            </Typography>
            <div className="py-5">
            <Link to={`/dashboard/benefit`} className="mr-3" style={linkStyle}>
              بازگشت
            </Link>
          </div>
          </CardHeader>
          <CardBody className="w-full px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="m-6 mb-4 flex flex-col flex-wrap gap-7"
            >
              <div className="flex w-7/12 flex-col">
                <label className="ml-2"> عنوان فواید </label>
                <textarea
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  type="text"
                  className="mt-4 outline-none "
                  name="name"
                  style={inputStyle}
                />
              </div>

              <div className="">
                <label htmlFor="isActive">وضعیت نمایش</label>
                <Select
                  id="isActive"
                  className="mt-2 w-full md:w-7/12 lg:w-7/12"
                  onChange={handleChange}
                  autoFocus={true}
                  defaultInputValue={is_active == "1" ? "فعال" : 'غیرفعال'}
                  options={options}
                //   defaultValue={
                //     options.filter(function(option) {
                //     return option.label === is_active;
                //     })}
                // defaultValue={is_active == "1" ? "فعال" : 'غیرفعال'}
                  value={options.filter(function(option) {
                      return option.value === is_active;
                    })}
                    label="Single select"
                />
              </div>
              <div className="col-span-2 mt-4 w-max">
                <Button
                  type="submit"
                  className="w-4/12"
                  style={{ width: "150px" }}
                >
                  ذخیره
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ShowBenefits;
