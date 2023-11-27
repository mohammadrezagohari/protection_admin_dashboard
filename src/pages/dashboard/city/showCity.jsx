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
// import { getCities, showCities, updateCity } from "@/api/services/cities";
// import { toast } from "react-hot-toast";

// export function ShowCity() {
//   const navigate = useNavigate();
//   const { province_id } = useParams(); 
//    const {id } = useParams();

//   const [city, setCity] = useState();

//   const intitialValues = {
//     name: city?.name,
//     slug: city?.slug,
//     province_id: city?.province_id,
   
//   }; 
//   // const getDatas = async () => {
//   //   const result = await showCities()
//   //     .then(function (response) {
//   //       console.log("response", response);
//   //       setCity(response?.data);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   //   return result;
//   // };

//   // useEffect(() => {
//   //   getDatas();
//   // }, []);

//   // const showInfoCities = async (id) => {
//   //   const showResult = await showCities(id)
//   //     .then(function (response) {
//   //       setCity(response?.data);
//   //       console.log(grade);
//   //     })
//   //       .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   //   return showResult;
//   // };
//   // useEffect(() => {
//   //   showInfoCities(id);
//   // }, []);


//   // const editInfoCitie = async (id,values) => {
//   //   const editResult = await updateCity(id,values)
//   //     .then(function (response) {
//   //       toast.success("تغییرات با موفقیت انجام گرفت");
//   //       console.log(response.data.message);
//   //       // navigate("/dashboard/schools");
//   //     })
//   //     .catch(function (error) {
//   //       toast.error("خطا !! مجددا تلاش نمایید");
//   //       console.log(error.message);
//   //     });

//   //   return editResult;
//   // };


//   useEffect(() => {
//     const { data } = axios
//       .get(`https://testato.ir/api/city/show/${city_id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
//         },
//       })
//       .then(function (response) {
//         setCity(response?.data?.data);
//         console.log(city);
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//   }, []);

//   const inputStyle = {
//     border: "1px solid gray",
//     borderRadius: "5px",
//     padding: "0.45rem",
//     textAlign: "center",
//     width: "40%",
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
//       <Card>
//         <div className="py-5">
//           <Link to={`/dashboard/provinces`} className="mr-3" style={linkStyle}>
//             بازگشت
//           </Link>
//         </div>
//         <CardHeader variant="gradient" color="blue" className="mb-4 mt-3 p-6">
//           <Typography variant="h6" color="white">
//            بروزرسانی شهرستان
//           </Typography>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <Formik
//             initialValues={intitialValues}
//             enableReinitialize={true}
//             onSubmit={(values) => {
//               // editInfoCitie(id,values)
              
//               const { data } = axios
//                 .patch(
//                   `https://testato.ir/api/city/update/${city_id}`,
//                   {
//                     name: values.name,
//                     slug:values.name,
//                     province_id:province_id
//                   },
//                   {
//                     headers: {
//                       "Content-Type": "application/json",
//                       Accept: "application/json",
//                       Authorization: `Bearer ${localStorage.getItem(
//                         "_token_testato"
//                       )}`,
//                     },
//                   }
//                 )
//                 .then(function (response) {
//                   console.log(response.data.message);

//                   navigate("/dashboard/provinces");
//                 })
//                 .catch(function (error) {
//                   console.log(data);
//                 });
//             }}
//           >
//             {({ handleSubmit, handleChange, values, errors }) => (
//               <form onSubmit={handleSubmit} className="m-6 mb-4">
//                 <label className="ml-3">نام شهرستان:</label>
//                 <Field
//                   component="input"
//                   onChange={handleChange}
//                   type="text"
//                   className="ml-3"
//                   name="name"
//                   value={values?.name}
//                   style={inputStyle}
//                   label="نام استان"
//                 />
            

//                 <Button type="submit" className="mt-4">
//                   ذخیره
//                 </Button>
//                 {errors.name && (
//                   <div style={{ color: "red" }}>{errors.name}</div>
//                 )}
//               </form>
//             )}
//           </Formik>
//         </CardBody>
//       </Card>
//     </>
//   );
// }

// export default ShowCity;
