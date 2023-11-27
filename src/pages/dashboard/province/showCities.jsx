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

// import { Link, useNavigate, useParams } from "react-router-dom";
// import { deleteCities, getCitiesByProvince } from "@/api/services/cities";
// import Sortable from "sortablejs";
// import { ThreeDots } from "react-loader-spinner";

// export function ShowCities() {

//   const [cities, setCities] = useState([]);
//   const listRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [sortColumn, setSortColumn] = useState("");
//   const [sortDirection, setSortDirection] = useState("asc");

//   const { id } = useParams();
//   const navigate = useNavigate();

//   // const showInfoProvince = async (id,count) => {
//   //   const showResult = await getCitiesByProvince(id,count)
//   //     .then(function (response) {
//   //       setCities(response?.data);
//   //       console.log(province);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   //   return showResult;
//   // };

//   // useEffect(() => {
//   //   showInfoProvince(id,1000);
//   // }, []);

//   // ------------------------------------------------
// //   const citiesByProvince=async (id)=>{
// //    const showResult=await getCitiesByProvince(id)
// //    .then(function (response) {
// //     console.log("result", response?.data);
// //     setCities(response?.data?.data);
// //     console.log(cities);
// //   })
// //   .catch(function (error) {
// //     console.log(error.message);
// //   });

// //  return showResult;
// //   }
// //   useEffect(() => {
// //     citiesByProvince(id)
// //   },[]);
//   useEffect(() => {
//     const { data } = axios
//       .post(
//         "https://testato.ir/api/city/list_by_province",
//         {
//           province_id: id,
//           count: 1000,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
//           },
//         }
//       )
//       .then(function (response) {
//         console.log("result", response?.data);
//         setCities(response?.data?.data);
//         console.log(cities);
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
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
//   }, [cities]);

//   const linkStyle = {
//     backgroundColor: "purple",
//     color: "white",
//     marginLeft: "1rem",
//     padding: "0.5rem",
//     borderRadius: "8px",
//     marginRight: "1rem",
//   };

//   const deleteCity = async (id) => {
//     const deleteResult = await deleteCities(id)
//       .then(function (response) {
//         console.log(response?.data);
//         setCities(cities.filter((city) => city.id !== id));
//         // return (
//         //   <div className="flex w-full flex-col gap-2">
//         //     <Alert color="green">A success alert for showing message.</Alert>
//         //   </div>
//         // );
//       })
//       .catch(function (error) {
//         console.log(error.message);
//       });
//     return deleteResult;
//   };

//   // function deleteCity(cityId) {

//   //   const token = localStorage.getItem("_token_testato");
//   //   const { data } = axios
//   //     .delete(`https://testato.ir/api/city/delete/${cityId}`, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       console.log(response.data.data);
//   //       setCities(cities.filter((city) => city.id != cityId));
//   //       // return (
//   //       //   <div className="flex w-full flex-col gap-2">
//   //       //     <Alert color="green">A success alert for showing message.</Alert>
//   //       //   </div>
//   //       // );
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error.message);
//   //     });
//   // }

//   useEffect(() => {
//     // Filter data based on the search term
//     const filtered = cities?.filter((item) =>(

//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//    ));
//     setFilteredData(filtered);
//   }, [searchTerm, cities]);

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
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);
//   return (
//     <>
//     {loading ? (
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
//       <Card>
//         <div className="py-5">
//           <Link
//             to={`/dashboard/city/create/${id}`}
//             className="mr-3"
//             style={linkStyle}
//           >
//             ثبت شهرستان جدید
//           </Link>
//         </div>
//         <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
//           <Typography variant="h6" color="white">
//             لیست شهرستان های استان{" "}
//             {cities?.length > 1 ? cities[0].province?.name : "صبر کنید..."}
//           </Typography>
//           <div className="mt-2 flex gap-6">
//             <input
//             className="text-gray-900 p-1 rounded-md pr-2 focus:outline-none"
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <div className="hover:cursor-pointer" onClick={() => handleSort("name")}>
//                  نام
//                   {sortColumn === "name" &&
//                     (sortDirection === "asc" ? " ▲" : " ▼")}
//             </div>
//           </div>
//         </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <table className="w-full min-w-[640px]	   table-auto text-right">
//             <thead>
//               <tr>
//                 {["#", "نام", "تنظیمات"].map((el) => (
//                   <th
//                     key={el}
//                     className="place-items-center border-b	 border-blue-gray-50 py-3 px-5 "
//                   >
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-bold uppercase text-blue-gray-400"
//                     >
//                       {el}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody ref={listRef}>
//               {displayedData?.map((city, key) => {
//                 const className = `py-3 px-5 ${
//                   key === displayedData.length - 1
//                     ? ""
//                     : "border-b border-blue-gray-50"
//                 }`;

//                 return (
//                   <tr key={key}>
//                     <td className={className}>
//                       <div className="flex items-center gap-4">
//                         {/* {key + 1} */}
//                         {city?.id}
//                       </div>
//                     </td>
//                     <td className={className}>
//                       <Typography className="text-xs font-semibold text-blue-gray-600">
//                         {city?.name}
//                       </Typography>
//                     </td>

//                     <td className={className}>
//                       <Link
//                         to={`/dashboard/province/${id}/city/show/${city.id}`}
//                         style={linkStyle}
//                       >
//                         اصلاح
//                       </Link>
//                       <Button
//                         onClick={() => deleteCity(city.id)}
//                         className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
//                       >
//                         حذف
//                       </Button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           {/* <div className="flex justify-center my-6 mt-10 w-full mx-auto  items-center gap-3">
//             <button
//               className={`bg-purple p-1 px-2 text-sm text-white rounded-md ${currentPage === 1?'opacity-50':''}`}
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               قبلی
//             </button>
//             <span className="p-1">{currentPage}</span>
//             <button
//               className={`bg-purple p-1 px-2 text-sm text-white rounded-md ${currentPage === totalPages?'opacity-50':''}`}
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               بعدی
//             </button>
//           </div> */}
//           {displayedData.length == 0 ? (
//             <>
//                 <div className="w-full h-[80vh] flex items-center justify-center">
//                     <p className="">آیتمی وجود ندارد :(</p>
//                 </div>
//             </>
//           ) : (
//             <>
//               <div className="my-6 mx-auto mt-10 flex w-full items-center  justify-center gap-3">
//                 <button
//                   className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
//                     currentPage === 1 ? "opacity-50" : ""
//                   }`}
//                   disabled={currentPage === 1}
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   قبلی
//                 </button>
//                 <span className="p-1">{currentPage}</span>
//                 <button
//                   className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
//                     currentPage === totalPages ? "opacity-50" : ""
//                   }`}
//                   disabled={currentPage === totalPages}
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   بعدی
//                 </button>
//               </div>
//             </>
//           )}
//         </CardBody>
//       </Card>
//         </>
//       )}
//     </>
//   );
// }

// export default ShowCities;
