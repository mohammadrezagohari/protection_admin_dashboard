import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { showMenus, updateMenu } from "@/api/services/menu";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export function ShowMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menu, setMenu] = useState();
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(true);

  const intitialValues = {
    title: menu?.title,
    icon: menu?.icon,
    color: menu?.color,
    background: menu?.background,
  };
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/menu/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setMenu(response?.data?.data);
  //       console.log(menu);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const showInfoMenu = async (id) => {
    const showResult = await showMenus(id)
      .then(function (response) {
        setMenu(response?.data);
        console.log(menu);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return showResult;
  };

  useEffect(() => {
    setTimeout(() => {
      showInfoMenu(id);
    }, 3000);
  }, []);

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
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    // setFile(URL.createObjectURL(e.target.files[0]));
    setIcon(file_url);
    // if (file) {
    //   // Create a file URL to display the file
    //   const file_url = URL.createObjectURL(file);

    //   // setFileInfo({
    //   //   file_url,
    //   // });
    // }
  };
  const editInfoMenu = async (id, values) => {
    const editResult = await updateMenu(id, values)
      .then(function (response) {
        toast.success("تغییرات با موفقیت انجام گرفت");
        console.log(response.data.message);

        // navigate("/dashboard/menus");
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
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
              className="mb-4 mt-3 p-6"
            >
              <Typography variant="h6" color="white">
                بروزرسانی منو
              </Typography>
            </CardHeader>
            <CardBody className=" px-0 pt-0 pb-2">
              <Formik
                initialValues={intitialValues}
                enableReinitialize={true}
                encType="multipart/form-data"
                onSubmit={(values) => {
                  editInfoMenu(id, values);
                  // const { data } = axios
                  //   .patch(
                  //     `https://testato.ir/api/menu/update/${id}`,
                  //     {
                  //       title: values.title,
                  //       icon: values.icon,
                  //       color: values.color,
                  //       background: values.background,
                  //     },
                  //     {
                  //       headers: {
                  //         "Content-Type": "application/json",
                  //         Accept: "application/json",
                  //         Authorization: `Bearer ${localStorage.getItem(
                  //           "_token_testato"
                  //         )}`,
                  //       },
                  //     }
                  //   )
                  //   .then(function (response) {
                  //     console.log(response.data.message);

                  //     navigate("/dashboard/menus");
                  //   })
                  //   .catch(function (error) {
                  //     console.log(data);
                  //   });
                }}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                  >
                    <div className="">
                      <label className="ml-3">نام منو:</label>
                      <Field
                        component="input"
                        onChange={handleChange}
                        type="text"
                        className="ml-3"
                        name="title"
                        value={values?.title}
                        style={inputStyle}
                        label="مقطع"
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block">آیکن:</label>
                      {/* <Field
                    component="file"
                    onChange={handleChange}
                    type="text"
                    className="ml-3"
                    name="icon"
                    value={values?.icon}
                    style={inputStyle}
                    label="آیکن"
                  /> */}
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          name="icon"
                          accept="image/png,image/jpeg,image/webp,"
                          style={inputStyle}
                          onChange={handleFileChange}
                        />
                        <div className=" h-20 w-36 rounded-md border">
                          <img
                            className="h-full w-full rounded-md object-cover"
                            src={values?.icon}
                            // src={icon}
                            alt="Uploaded File"
                          />
                        </div>
                        <span className="">
                          {icon}
                          {/* {values?.icon} */}
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <label className="ml-3">رنگ:</label>
                      {/* <input type="color" value={menu?.color} /> */}
                      <input
                        type="color"
                        style={inputStyle}
                        value={values?.color}
                        //  onChange={e => setBackground(e.target.value)}
                        // value="#ff0000"
                        name="color"
                        id=""
                      />
                    </div>

                    <div className="">
                      <label className="ml-3 block"> بکگراند:</label>

                      {/* <input type="color" value={menu?.background} /> */}
                      <input
                        type="color"
                        style={inputStyle}
                        value={values?.background}
                        //  onChange={e => setBackground(e.target.value)}
                        // value="#ff0000"
                        name="background"
                        id=""
                      />
                    </div>

                    <div className="col-span-2">
                      <Button type="submit" className="mt-4">
                        ذخیره
                      </Button>
                    </div>
                    {errors.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                  </form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default ShowMenu;
