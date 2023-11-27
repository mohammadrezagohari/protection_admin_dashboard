// import axios from "axios";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
//   Chip,
//   Tooltip,
//   Progress,
//   Button,
//   Alert,
// } from "@material-tailwind/react";

// import { Link, useNavigate } from "react-router-dom";
// import { getProvince, deleteProvinces } from "@/api/services/province";
// import { toast } from "react-hot-toast";
// import { ThreeDots } from "react-loader-spinner";
// import Sortable from "sortablejs";

// export function Province() {

//   const [provinces, setProvinces] = useState([]);
//   const listRef = useRef(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [sortColumn, setSortColumn] = useState("");
//   const [sortDirection, setSortDirection] = useState("asc");

//   const [isOpentDropDown, setIsOpentDropDown] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const perPage = 10;

//   const navigate = useNavigate();
//   const getDatas = async () => {
//     const result = await getProvince()
//       .then(function (response) {
//         console.log("response", response);
//         setProvinces(response?.data);
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//     setLoading(false);
//     return result;
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       getDatas();
//     }, 3000);
//   }, []);
//   useEffect(() => {
//     if (listRef.current) {
//       new Sortable(listRef.current, {
//         animation: 150, // Animation speed
//         onSort: (event) => {
//           // Handle sorting logic here
//           console.log("New order:", event.newIndex);
//         },
//         ghostClass: "bg-blue-100",
//         // handle: '.handle',
//       });
//     }
//   }, [provinces]);
//   // const nextPage = () => {
//   //   setPage(page + 1);
//   // };

//   // const prevPage = () => {
//   //   if (page > 1) {
//   //     setPage(page - 1);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const { data } = axios
//   //     .get("https://testato.ir/api/province?count=32", {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       setProvinces(response?.data?.data);
//   //       console.log(provinces);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   // }, []);

//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//     marginRight: "1rem",
//   };
//   const deleteProvince = async (id) => {
//     const deleteResult = await deleteProvinces(id)
//       .then(function (response) {
//         toast.success("حذف با موفقیت انجام شد !");
//         console.log(response?.data);
//         setProvinces(provinces.filter((provinces) => provinces.id !== id));
//         // return (
//         //   <div className="flex w-full flex-col gap-2">
//         //     <Alert color="green">A success alert for showing message.</Alert>
//         //   </div>
//         // );
//       })
//       .catch(function (err) {
//         toast.error("خطا !! مجددا تلاش نمایید");
//         console.log("error", err);
//       });

//     return deleteResult;
//     // const token = localStorage.getItem("_token_testato");
//     // const { data } = axios
//     //   .delete(`https://testato.ir/api/province/delete/${provinceId}`, {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       Accept: "application/json",
//     //       Authorization: `Bearer ${token}`,
//     //     },
//     //   })
//     //   .then(function (response) {
//     //     console.log(response.data.data);
//     //     setProvinces(provinces.filter((province) => province.id != provinceId));
//     //     // return (
//     //     //   <div className="flex w-full flex-col gap-2">
//     //     //     <Alert color="green">A success alert for showing message.</Alert>
//     //     //   </div>
//     //     // );
//     //   })
//     //   .catch(function (error) {
//     //     console.log(error.message);
//     //   });
//   };

//   const openDropDown = (id) => {
//     if (isOpentDropDown === id) {
//       setIsOpentDropDown(null);
//     } else {
//       setIsOpentDropDown(id);
//     }
//     console.log("isOpentDropDown : ", isOpentDropDown);
//   };

//   useEffect(() => {
//     // Filter data based on the search term
//     const filtered = provinces?.filter((item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [searchTerm, provinces]);

//   //SORTING
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) {
//       return sortDirection === "asc" ? -1 : 1;
//     }
//     if (a[sortColumn] > b[sortColumn]) {
//       return sortDirection === "asc" ? 1 : -1;
//     }
//     return 0;
//   });

//   //PAGINATION

//   const totalItems = sortedData.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const displayedData = sortedData.slice(startIndex, endIndex);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleSort = (column) => {
//     if (column === sortColumn) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   //----------------------------------------------------------------

//   return (
//     <>
//       <Card>
//         <div className="py-5">
//           <Link
//             to={`/dashboard/province/create`}
//             className="mr-3"
//             style={linkStyle}
//           >
//             ثبت استان جدید
//           </Link>
//         </div>
//         <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//           <Typography variant="h6" color="white">
//             لیست استان ها
//           </Typography>
//           <div className="mt-2 flex gap-6">
//             <input
//               className="rounded-md p-1 pr-2 text-gray-900 focus:outline-none"
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <div
//               className="hover:cursor-pointer"
//               onClick={() => handleSort("name")}
//             >
//               نام
//               {sortColumn === "name" && (sortDirection === "asc" ? " ▲" : " ▼")}
//             </div>
//           </div>
//         </CardHeader>
//         {loading ? (
//           <div className=" flex w-full  items-center justify-center py-60">
//             <ThreeDots
//               height="80"
//               width="80"
//               radius="9"
//               color="#820382"
//               ariaLabel="three-dots-loading"
//               wrapperStyle={{}}
//               wrapperClassName="mx-auto w-full"
//               visible={true}
//             />
//           </div>
//         ) : (
//           <>
//             <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//               <table className="w-full min-w-[640px]	   table-auto text-right">
//                 <thead>
//                   <tr>
//                     {["#", "نام", "تنظیمات"].map((el) => (
//                       <th
//                         key={el}
//                         className="place-items-center border-b border-blue-gray-50		 py-3 px-5 text-center "
//                       >
//                         <Typography
//                           variant="small"
//                           className="text-[11px] font-bold uppercase text-blue-gray-400"
//                         >
//                           {el}
//                         </Typography>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody ref={listRef}>
//                   {displayedData?.map((province, key) => {
//                     const className = `py-3 px-5 ${
//                       key === displayedData.length - 1
//                         ? ""
//                         : "border-b text-center	 border-blue-gray-50"
//                     }`;

//                     return (
//                       <tr key={key}>
//                         <td className={className}>
//                           <div className="flex items-center gap-4">
//                             {/* {key + 1} */}
//                             {province?.id}
//                           </div>
//                         </td>
//                         <td className={className}>
//                           <Typography className="text-xs font-semibold text-blue-gray-600">
//                             {province?.name}
//                           </Typography>
//                         </td>

//                         <td className={`relative ${className}`}>
//                           <button
//                             onClick={() => openDropDown(province.id)}
//                             // id="dropdownDelayButton"
//                             // data-dropdown-toggle="dropdownDelay"
//                             // data-dropdown-delay="500"
//                             // data-dropdown-trigger="hover"
//                             className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             type="button"
//                           >
//                             <svg
//                               className="ml-2.5 h-2.5 w-2.5"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 10 6"
//                             >
//                               <path
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="m1 1 4 4 4-4"
//                               />
//                             </svg>
//                             امکانات
//                           </button>

//                           {isOpentDropDown === province.id ? (
//                             <>
//                               <div
//                                 // id="dropdownDelay"
//                                 className="absolute left-0 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
//                               >
//                                 <ul
//                                   className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                                   aria-labelledby="dropdownDelayButton"
//                                 >
//                                   <li>
//                                     <Link
//                                       to={`/dashboard/province/${province.id}/cities/show`}
//                                       className="block px-4 py-2 text-right text-[12.5px] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                     >
//                                       مشاهده شهرهای زیرمجموعه
//                                     </Link>
//                                   </li>
//                                   <li>
//                                     <Link
//                                       to={`/dashboard/province/show/${province.id}`}
//                                       className="block px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                     >
//                                       اصلاح
//                                     </Link>
//                                   </li>
//                                   <li>
//                                     <Button
//                                       onClick={() =>
//                                         deleteProvince(province.id)
//                                       }
//                                       className="w-full rounded-none bg-white px-0 pr-4 text-right text-gray-600 shadow-none hover:bg-gray-100 hover:shadow-none focus:outline-none"
//                                     >
//                                       حذف
//                                     </Button>
//                                   </li>
//                                 </ul>
//                               </div>
//                             </>
//                           ) : (
//                             <></>
//                           )}
//                         </td>
//                         {/* <td className={className}>
//                       <Link 
//                         to={`/dashboard/province/show/${province.id}`}
//                         style={linkStyle}
//                       >
//                         اصلاح
//                       </Link>
//                       <Button
//                         onClick={() => deleteProvince(province.id)}
//                         className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
//                       >
//                         حذف
//                       </Button>


//                       <Link
//                         to={`/dashboard/province/${province.id}/cities/show`}
//                         style={linkStyle}
//                       >
//                         مشاهده شهرهای زیرمجموعه
//                       </Link>
//                     </td> */}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//               {/* <div className="flex items-center gap-3">
//       <ul>
//         {provinces.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//       <button onClick={prevPage}>Previous Page</button>
//       <button onClick={nextPage}>Next Page</button>
//     </div> */}
//               {displayedData.length == 0 ? (
//                 <>
//                   <div className="flex h-[80vh] w-full items-center justify-center">
//                     <p className="">آیتمی وجود ندارد :(</p>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="my-6 mx-auto mt-10 flex w-full items-center  justify-center gap-3">
//                     <button
//                       className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
//                         currentPage === 1 ? "opacity-50" : ""
//                       }`}
//                       disabled={currentPage === 1}
//                       onClick={() => handlePageChange(currentPage - 1)}
//                     >
//                       قبلی
//                     </button>
//                     <span className="p-1">{currentPage}</span>
//                     <button
//                       className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
//                         currentPage === totalPages ? "opacity-50" : ""
//                       }`}
//                       disabled={currentPage === totalPages}
//                       onClick={() => handlePageChange(currentPage + 1)}
//                     >
//                       بعدی
//                     </button>
//                   </div>
//                 </>
//               )}
//             </CardBody>
//           </>
//         )}
//       </Card>
//     </>
//   );
// }

// export default Province;
