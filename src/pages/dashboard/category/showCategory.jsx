// import { showCategory, updateCategory } from "@/api/services/category";
// import { AuthContext } from "@/gard/context/AuthContext";
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import baseUrl from "@/configs/base-url";
// import { ThreeDots } from "react-loader-spinner";
// import {
//     Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Typography,
// } from "@material-tailwind/react";
// import { Formik } from "formik";
// import toast from "react-hot-toast";

// function ShowCategory() {
//   const { id } = useParams();
//   const { userToken } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);
//   const [name, setName] = useState();
//   const [icon, setIcon] = useState();
//   const [category, setCategory] = useState(null);
//   const [imagePreview, setImagePreview] = useState();

//   const inputStyle = {
//     border: "1px solid gray",
//     borderRadius: "5px",
//     padding: "0.45rem",
//     textAlign: "center",
//     width: "100%",
//     marginTop: "1rem",
//   };
//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//   };
//   const handleField = (e) => {
//     setName(e.target.value);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const file_url = URL.createObjectURL(file);
//     console.log("file", file);
//     console.log("file_url", file_url);
//     console.log("image target", event.target.files[0]);
//     setIcon(event.target.files[0]);
//     setImagePreview(file_url);
//   };

  const intitialValues = {
    name: category?.name,
    icon: null,
  };

  const showCategoryItem = async (id) => {
    const showResult = await showCategory(id, userToken)
      .then(function (response) {
        setIcon(response?.data?.icon);
        setCategory(response?.data);
        setImagePreview(`${response?.data?.icon}`);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return showResult;
  };
  useEffect(() => {
    setTimeout(() => {
      showCategoryItem(id);
    }, 3000);
  }, []);

  const editInfoCategory = async (id, values) => {
    console.log("values", values);
    const editResult = await updateCategory(id, values, userToken)
      .then(function (response) {
        console.log("dataresult", response);
        if (response.status) {
          toast.success("تغییرات با موفقیت انجام گرفت");
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
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });
    return editResult;
  };

//   return (
//     <>
//       {loading ? (
//         <div className="flex items-center justify-center py-60">
//           <ThreeDots
//             height="80"
//             width="80"
//             radius="9"
//             color="#4fa94d"
//             ariaLabel="three-dots-loading"
//             wrapperStyle={{}}
//             wrapperClassName=""
//             visible={true}
//           />
//         </div>
//       ) : (
//         <Card>
//           <div className="py-5">
//             <Link
//               to={`/dashboard/categories`}
//               className="mr-3"
//               style={linkStyle}
//             >
//               بازگشت
//             </Link>
//           </div>
//           <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//             <Typography variant="h6" color="white">
//               ساخت دسته بندی جدید
//             </Typography>
//           </CardHeader>
//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//             <Formik
//               initialValues={intitialValues}
//               enableReinitialize={true}
//               encType="multipart/form-data"
//               onSubmit={(values) => {
//                 editInfoCategory(id, values);
//               }}
//             >
//               {({ handleSubmit, handleChange, values, errors }) => (
//                 <form
//                   onSubmit={handleSubmit}
//                   className="m-6 mb-4 flex flex-wrap"
//                 >
//                   <div className="w-7/12">
//                     <label className="ml-3">نام دسته بندی</label>
//                     <input
//                       onChange={handleChange}
//                       type="text"
//                       className="ml-3"
//                       name="name"
//                       value={values?.name}
//                       style={inputStyle}
//                     />
//                   </div>
//                   <div className="mt-4 w-7/12">
//                     <label className="ml-3 block">آیکون:</label>
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="file"
//                         name="icon"
//                         accept="image/png,image/jpeg,image/webp,"
//                         style={inputStyle}
//                         onChange={handleFileChange}
//                       />
//                       <div className=" h-20 w-36 rounded-md border-2">
//                         <img
//                           className="h-full w-full rounded-md object-cover"
//                           src={imagePreview ?? "../../images/no-image.svg"}
//                           alt="آپلود عکس"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-span-2 mt-4 w-6/12">
//                     <Button type="submit">ذخیره</Button>
//                   </div>
//                 </form>
//               )}
//             </Formik>
//           </CardBody>
//         </Card>
//       )}
//     </>
//   );
// }

// export default ShowCategory;
