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
import { createCustomMessage } from "@/api/services/customMessage";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function CreateCustomMessage() {
  const { userToken } = useContext(AuthContext);
  const [title,setTitle] = useState([]);
  const [mobile,setMobile] = useState([]);
  const [context,setContext] = useState([]);




  const [loading, setLoading] = useState(true);

  const inputStyle = {
    border: "1px solid #CCC8AA",
    borderRadius: "5px",
    padding: "0.45rem",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createCustomMessage(
      {
        title:title,
        mobile:mobile,
        context:context,
      },
       userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success(" پیام با موفقیت ارسال شد !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.title != undefined ? response?.data?.title : ""
              } \n
              ${
                response?.data?.mobile != undefined ? response?.data?.mobile : ""
              } \n
              {
                response?.data?.context != undefined ? response?.data?.context : ""
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
          <div className="py-5">
            <Link
              to={`/dashboard/custom-message`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
              ارسال پیام   
            </Typography>
          </CardHeader>
          <CardBody className="h-full px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="px-4 lg:pr-8 md:pr-8 flex flex-col lg:w-1/2 md:w-1/2 w-full gap-4"
            >
             <div className="w-full">
                <label className="ml-3">  عنوان  </label>
                <input
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={title}
                  type="text"
                  className="ml-3 p-4"
                  name="question"
                  style={inputStyle}
                  autoComplete="off"
                />
                
              </div>
              <div className="w-full">
                <label className="ml-3">  شماره تماس  </label>
                <input
                  onChange={(e) => {
                    setMobile(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={mobile}
                  type="text"
                  className="ml-3 p-4"
                  name="question"
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
                  name="description"
                  style={inputStyle}
                >
                </textarea>
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

export default CreateCustomMessage;
