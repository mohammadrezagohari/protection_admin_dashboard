// import axios from "axios";

// import React, { useState, useEffect } from "react";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { createProvinces } from "@/api/services/province";
// import { toast } from "react-hot-toast";
// import { ThreeDots } from "react-loader-spinner";

// export function CreateProvince() {
//   const navigate = useNavigate();

//   const [name, setName] = useState();
//   const [loading, setLoading] = useState(true);

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
//   const handleName = (e) => {
//     setName(e.target.value);
//   };

//   // const storefield = async (e) => {
//   //   e.preventDefault();
//   //   const createResult = await createField(field)
//   //     .then(function (response) {
//   //       setField(response?.data);
//   //       console.log(field);
//   //     })
//   //     .catch(function (err) {
//   //       console.log("error", err);
//   //     });
//   //   return createResult;
//   // };
//   const storeProvince = async (e) => {
//     e.preventDefault();
//     const createResult = await createProvinces(name)
//       .then(function (response) {
//         toast.success("استان با موفقیت افزوده شد !");
//         console.log(response);
//         // navigate(-1);
//       })
//       .catch(function (err) {
//         toast.error("خطا !! مجددا تلاش نمایید");
//         console.log("error", massage.err);
//       });
//     return createResult;

//     // const token = localStorage.getItem("_token_testato");
//     // const { data } = axios
//     //   .post(
//     //     "https://testato.ir/api/province/store",
//     //     {
//     //       name: name,
//     //       slug: name,
//     //     },
//     //     {
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //         Accept: "application/json",
//     //         Authorization: `Bearer ${token}`,
//     //       },
//     //     }
//     //   )
//     //   .then(function (response) {
//     //     console.log(response);
//     //     navigate(-1);
//     //   })
//     //   .catch(function (error) {
//     //     console.log(data);
//     //   });
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
//               className="mb-8 mt-3 p-6"
//             >
//               <Typography variant="h6" color="white">
//                 ساخت استان جدید
//               </Typography>
//             </CardHeader>
//             <CardBody className=" px-0 pt-0 pb-2">
//               <form
//                 method="post"
//                 onSubmit={storeProvince}
//                 className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
//               >
//                 <div className="">
//                   <label className="ml-3 block">نام استان:</label>
//                   <input
//                     onChange={(e) => handleName(e)}
//                     type="text"
//                     className="ml-3"
//                     name="name"
//                     style={inputStyle}
//                   />
//                 </div>

//                 <div className="col-span-2">
//                   <Button type="submit">ذخیره</Button>
//                 </div>
//               </form>
//             </CardBody>
//           </Card>
//         </>
//       )}
//     </>
//   );
// }

// export default CreateProvince;
