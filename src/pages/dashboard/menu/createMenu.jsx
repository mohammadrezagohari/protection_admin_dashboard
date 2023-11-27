import axios from "axios";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { createMenu } from "@/api/services/menu";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function CreateMenu() {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [background, setBackground] = useState();
  const [color, setColor] = useState();
  const [icon, setIcon] = useState();
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setIcon(file)
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    setIcon(event.target.files[0]);
  };
  const storeMenus = async (e) => {
    e.preventDefault();

    const createResult = await createMenu(title, background, color, icon)
      .then(function (response) {
        toast.success("  بخش منو با موفقیت افزوده شد !");
        console.log(response);
        // navigate(-1);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log(error.massage);
      });
    return createResult;
  };
  // function storeGrade(e) {
  //   e.preventDefault();

  //   const token = localStorage.getItem("_token_testato");
  //   const { data } = axios
  //     .post(
  //       "https://testato.ir/api/grade/store",
  //       {
  //         name: name,
  //         priority: priority,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response);
  //       navigate(-1);
  //     })
  //     .catch(function (error) {
  //       console.log(data);
  //     });
  // }
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
          <Card className="min-h-screen">
            <div className="py-5">
              <Link to={`/dashboard/menus`} className="mr-3" style={linkStyle}>
                بازگشت
              </Link>
            </div>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                ساخت منو جدید
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={storeMenus}
                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
              >
                <div className="">
                  <label className="ml-3">نام منو:</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="ml-3"
                    name="title"
                    style={inputStyle}
                  />
                </div>

                {/* <div className="">

            <label className="ml-3">آیکن:</label>
            <input
              onChange={(e) => setBackground(e.target.value)}
              type="file"
              className="ml-3"
              name="icon"
              style={inputStyle}
            />    
            </div> */}
                <div className="">
                  <label className="ml-3 block">file:</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      name="icon"
                      accept="image/png,image/jpeg,image/webp,"
                      style={inputStyle}
                      onChange={handleFileChange}
                    />
                    <div className=" h-20 w-36 rounded-md border-2">
                      <img
                        className="h-full w-full rounded-md object-cover"
                        src={icon}
                        alt="Uploaded File"
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="">

            <label className="ml-3">پس زمینه:</label>
            <input
              onChange={(e) => setColor(e.target.value)}
              type="color"
              className="ml-3"
              name="background"
              style={inputStyle}
            />
            </div> */}
                <div className="">
                  <label className="ml-3 block"> بکگراند:</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="background"
                      // value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      style={inputStyle}
                    />
                    <span className="px-5">{background}</span>
                  </div>
                </div>

                <div className="">
                  <label className="ml-3 block">رنگ:</label>
                  {/* <input
              onChange={(e) => setIcon(e.target.value)}
              type="color"
              className="ml-3"
              name="color"
              style={inputStyle}
            /> */}
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="color"
                      // value={background}
                      onChange={(e) => setColor(e.target.value)}
                      style={inputStyle}
                    />
                    <span className="px-5">{color}</span>
                  </div>
                </div>

                <div className="col-span-2">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default CreateMenu;
