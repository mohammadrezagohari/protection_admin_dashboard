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
import { createNotification } from "@/api/services/notification";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import Select from "react-select";


export function CreateNotif() {
  const { userToken } = useContext(AuthContext);
  const [title,setTitle] = useState([]);
  const [context,setContext] = useState([]);
  const [status,setStatus] = useState("");


  const options = [
    { value: true, label: "فعال" },
    // { value: false, label: "غیرفعال" },
  ]
  const [loading, setLoading] = useState(true);
  

  const handleChange = (selectedOption) => {
    setStatus(selectedOption.value);
    console.log(`Option selected:`, selectedOption.value);
  };


  const inputStyle = {
    border: "1px solid #CCC8AA", 
    outlineColor:"#0174BE",
    borderRadius: "5px",
    padding: "0.45rem",
    width: "100%",
    marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "#183087",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createNotification(
      {
        subject: title,
        context:context,
        status:status,
      },
       userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success("اعلان با موفقیت ارسال شد !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.title != undefined ? response?.data?.title : ""
              } \n
              ${
                response?.data?.context != undefined ? response?.data?.context : ""
              } \n
              ${
                response?.data?.status != undefined ? response?.data?.status : ""
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
        <Card style={{height:"570px"}}>
          <CardHeader variant="gradient" color="blue" className="flex justify-between mb-8 mt-3 p-6">
            <div className="h-14 flex items-center">
              <Typography variant="h6" color="white">
                ارسال اعلان   
              </Typography>
            </div>
            <div className="py-5">
            <Link
              to={`/dashboard/notification`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          </CardHeader>
          <CardBody className="h-full px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="px-4 lg:pr-8 md:pr-8 flex flex-col lg:w-1/2 md:w-1/2 w-full gap-4"
            >
             <div className="w-full">
                <label className="ml-3">  عنوان اعلان  </label>
                <input
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={title}
                  type="text"
                  className="ml-3 p-4"
                  name="title"
                  style={inputStyle}
                  autoComplete="off"
                />
              </div>
              <div className="w-full  ">
                <label className=""> توضیحات  </label>
                <textarea
                  onChange={(e) => {
                    setContext(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={context}
                  type="text"
                  className="ml-3 p-4 h-full "
                  name="context"
                  style={inputStyle}
                >
                </textarea>
              </div>
              <div className="">
                <label htmlFor="isActive">وضعیت نمایش</label>
                <Select
                  id="isActive"
                  className="mt-2 w-full md:w-7/12 lg:w-7/12"
                  onChange={handleChange}
                  autoFocus={true}
                  options={options}
                //   defaultValue={
                //     options.filter(function(option) {
                //     return option.label === is_active;
                //     })}
                // defaultValue={is_active == "1" ? "فعال" : 'غیرفعال'}
                  value={options.filter(function(option) {
                      return option.value === status;
                    })}
                    label="Single select"
                />
              </div>
              <div className="col-span-2 mt-2 w-max">
                <Button type="submit" className="w-4/12" style={{width:'150px'}}>ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );

}

export default CreateNotif;
