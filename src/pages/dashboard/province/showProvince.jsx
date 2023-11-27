// import axios from "axios";

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Field, Formik } from "formik";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Typography,
//   Input,
// } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { showProvinces, updateProvinces } from "@/api/services/province";
// import { toast } from "react-hot-toast";
// import { ThreeDots } from "react-loader-spinner";

// export function ShowProvince() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [province, setProvince] = useState();
//   const [loading, setLoading] = useState(true);

//   const intitialValues = {
//     name: province?.name,
//     slug: province?.slug,
//   };
//   const editInfoProvince = async (id, values) => {
//     const editResult = await updateProvinces(id, values)
//       .then(function (response) {
//         toast.success("تغییرات با موفقیت انجام گرفت");
//         console.log(response.data.message);
//         // navigate("/dashboard/schools");
//       })
//       .catch(function (error) {
//         toast.error("خطا !! مجددا تلاش نمایید");
//         console.log(error.message);
//       });

//     return editResult;
//   };

//   const showInfoProvince = async (id) => {
//     const showResult = await showProvinces(id)
//       .then(function (response) {
//         setProvince(response?.data);
//         console.log(province);
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//     setLoading(false);
//     return showResult;
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       showInfoProvince(id);
//     }, 3000);
//   }, []);
//   // useEffect(() => {
//   //   const { data } = axios
//   //     .get(`https://testato.ir/api/province/show/${id}`, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       setProvince(response?.data?.data);
//   //       console.log(province);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   // }, []);

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
//         <>
//           <Card className="min-h-screen">
//             <div className="py-5">
//               <Link
//                 to={`/dashboard/provinces`}
//                 className="mr-3"
//                 style={linkStyle}
//               >
//                 بازگشت
//               </Link>
//             </div>
//             <CardHeader
//               variant="gradient"
//               color="blue"
//               className="mb-4 mt-3 p-6"
//             >
//               <Typography variant="h6" color="white">
//                 بروزرسانی استان
//               </Typography>
//             </CardHeader>
//             <CardBody className=" px-0 pt-0 pb-2">
//               <Formik
//                 initialValues={intitialValues}
//                 enableReinitialize={true}
//                 onSubmit={(values) => {
//                   editInfoProvince(id, values);
//                   // const { data } = axios
//                   //   .patch(
//                   //     `https://testato.ir/api/province/update/${id}`,
//                   //     {
//                   //       name: values.name,
//                   //       slug:values.name
//                   //     },
//                   //     {
//                   //       headers: {
//                   //         "Content-Type": "application/json",
//                   //         Accept: "application/json",
//                   //         Authorization: `Bearer ${localStorage.getItem(
//                   //           "_token_testato"
//                   //         )}`,
//                   //       },
//                   //     }
//                   //   )
//                   //   .then(function (response) {
//                   //     console.log(response.data.message);

//                   //     navigate("/dashboard/provinces");
//                   //   })
//                   //   .catch(function (error) {
//                   //     console.log(data);
//                   //   });
//                 }}
//               >
//                 {({ handleSubmit, handleChange, values, errors }) => (
//                   <form
//                     onSubmit={handleSubmit}
//                     className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
//                   >
//                     <div className="">
//                       <label className="ml-3 block">نام مقطع:</label>
//                       <Field
//                         component="input"
//                         onChange={handleChange}
//                         type="text"
//                         className="ml-3"
//                         name="name"
//                         value={values?.name}
//                         style={inputStyle}
//                         label="نام استان"
//                       />
//                     </div>

//                     <div className="col-span-2">
//                       <Button type="submit" className="mt-4">
//                         ذخیره
//                       </Button>
//                     </div>
//                     {errors.name && (
//                       <div style={{ color: "red" }}>{errors.name}</div>
//                     )}
//                   </form>
//                 )}
//               </Formik>
//             </CardBody>
//           </Card>
//         </>
//       )}
//     </>
//   );
// }

// export default ShowProvince;
