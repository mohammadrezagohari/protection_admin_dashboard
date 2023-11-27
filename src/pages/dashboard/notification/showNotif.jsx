// import axios from "axios";

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Formik } from "formik";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Typography,
//   Input,
// } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { showNotification,updateNotification } from "@/api/services/notification";
// import { toast } from "react-hot-toast";
// import { ThreeDots } from "react-loader-spinner";

// export function ShowNotif() {


//   const { userToken } = useContext(AuthContext);
//   const [subject,setSubject] = useState([]);
//   const [context,setContext] = useState([]);
//   const [status,setStatus] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [notif, setNotif] = useState();
//   const [loading, setLoading] = useState(true);
 

//   const showNotif = async (id) => {
//     const showResult = await showNotification(id)
//       .then(function (response) {
//         setNotif(response?.data);
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//     return showResult;
//   };
//   useEffect(() => {
//     showNotif(id);
//   }, []);

//   const inputStyle = {
//     border: "1px solid #CCC8AA",
//     borderRadius: "5px",
//     padding: "0.45rem",
//     textAlign: "center",
//   };
//   const linkStyle = {
//     backgroundColor: "#183087",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//   };

//   const editNotif = async (id, values) => {
//     const editResult = await updateNotification(id, values)
//       .then(function (response) {
//         if (response.data.status == true) {
//           toast.success("تغییرات با موفقیت انجام گرفت");
//         }
//         console.log(response.data.message);
//         navigate("/dashboard/notification");
//       })
//       .catch(function (error) {
//         toast.error("خطا !! مجددا تلاش نمایید");
//         console.log(error.message);
//       });

//     return editResult;
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

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
//         <Card style={{height:"570px"}}>
//           <div className="py-5">
//             <Link
//               to={`/dashboard/notification`}
//               className="mr-3"
//               style={linkStyle}
//             >
//               بازگشت
//             </Link>
//           </div>
//           <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//             <Typography variant="h6" color="white">
//               ارسال اعلان   
//             </Typography>
//           </CardHeader>
//           <CardBody className="h-full px-0 pt-0 pb-2">
//             <form
//               method="post"
//               onSubmit={handleSubmit}
//               className="px-4 lg:pr-8 md:pr-8 flex flex-col lg:w-1/2 md:w-1/2 w-full gap-4"
//             >
//              <div className="w-full">
//                 <label className="ml-3">  عنوان اعلان  </label>
//                 <input
//                   onChange={(e) => {
//                     setSubject(e.currentTarget.value);
//                     console.log(e.currentTarget.value);
//                   }}
//                   value={subject}
//                   type="text"
//                   className="ml-3 p-4"
//                   name="sunject"
//                   style={inputStyle}
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="w-full  ">
//                 <label className=""> توضیحات  </label>
//                 <textarea
//                   onChange={(e) => {
//                     setContext(e.currentTarget.value);
//                     console.log(e.currentTarget.value);
//                   }}
//                   value={context}
//                   type="text"
//                   className="ml-3 p-4 h-full "
//                   name="description"
//                   style={inputStyle}
//                 >
//                 </textarea>
//               </div>
//               <div className="">
//                           <label htmlFor="statusSelect">وضعیت </label>
//                           <Select
//                             id="statusSelect"
//                             className="w-full mt-2"
//                             onChange={handleChange} autoFocus={true}
//                             value={status}
//                             defaultValue={status ? status : null}
//                             options={[
//                               {
//                                 value: true,
//                                 label: "فعال",
//                               },
//                               {
//                                 value: false,
//                                 label: "غیرفعال",
//                               },
//                             ]}
//                           />
//                     </div>
//               <div className="col-span-2 mt-2 w-max">
//                 <Button type="submit" className="w-4/12" style={{width:'150px'}}>ذخیره</Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       )}
//     </>
//   );

// }

// export default ShowNotif;
