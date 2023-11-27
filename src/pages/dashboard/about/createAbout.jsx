
import React, { useState, useEffect } from "react";
 
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
import { createAbout } from "@/api/services/about";


function CreateAboutUs() {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

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
  
  const storeAbout = async (e) => {
    e.preventDefault();

    const createResult = await createAbout(content,title)
    // console.log("content : ",content ,"\n"," title : ",title);
      .then(function (response) {
        toast.success("  درباره ما با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.massage);
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
        <>
      <Card>
        <div className="py-5">
          <Link to={`/dashboard/abouts`} className="mr-3" style={linkStyle}>
            بازگشت
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            ساخت درباره ما جدید
          </Typography> 
        </CardHeader>
        <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
          <form
            method="post"
            onSubmit={storeAbout}
            className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
          >
            <div className="">
              <label className="ml-3"> عنوان </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="ml-3"
                name="title"
                style={inputStyle}
              />
            </div>

            <div className="">
              <label className="ml-3">  متن </label>
              <input
                onChange={(e) => setContent(e.target.value)}
                type="text"
                className="ml-3"
                name="content"
                style={inputStyle}
              />
            </div>


            <div className="col-span-2">
              <Button type="submit">ذخیره</Button>
            </div>
          </form>
          {/* <h1>koi9i</h1> */}
        </CardBody>
      </Card>
        </>
      )}
    </>
  );
}

export default CreateAboutUs;
