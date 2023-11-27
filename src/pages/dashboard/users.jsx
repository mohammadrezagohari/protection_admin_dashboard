import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
} from "@material-tailwind/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
// import { authorsTableData, projectsTableData } from "@/data";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { deleteProfiles, profile } from "@/api/services/auth-api";
import { fetchUsers } from "@/api/services/users";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";
import { AuthContext } from "@/gard/context/AuthContext";

export function Users() {
  const { userToken } = useContext(AuthContext);

  const listRef = useRef(null);
  const [users, setUsers] = useState([]);

  const [isOpentDropDown, setIsOpentDropDown] = useState(null);
  const [loading, setLoading] = useState(true);
  const openDropDown = (id) => {
    if (isOpentDropDown === id) {
      setIsOpentDropDown(null);
    } else {
      setIsOpentDropDown(id);
    }
    console.log("isOpentDropDown : ", isOpentDropDown);
  };
  const getDatas = async () => {
    const result = await fetchUsers(userToken)
      .then(function (response) {
        console.log("response", response);
        setUsers(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

  // useEffect(() => {
  //   getDatas();
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);
  useEffect(() => {
    if (listRef.current) {
      new Sortable(listRef.current, {
        animation: 150, // Animation speed
        onSort: (event) => {
          // Handle sorting logic here
          console.log("New order:", event.newIndex);
        },
        ghostClass: "bg-blue-100",
        // handle: '.handle',
      });
    }
  }, [users]);
  // useEffect(() => {
  //   const { data } = axios
  //     .get("https://testato.ir/api/profile", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       setUsers(response?.data?.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  const deleteUser = async (id) => {
    const deleteResult = await deleteProfiles(id, userToken)
      .then(function (response) {
        console.log(response?.data);
        setUsers(users.filter((user) => user.id != id));
        toast.success("حذف با موفقیت انجام شد !");
        // return (
        //   <div className="flex w-full flex-col gap-2">
        //     <Alert color="green">A success alert for showing message.</Alert>
        //   </div>
        // );
      })
      .catch(function (err) {
        console.log("error", err.message);
        toast.error("خطا !! مجددا تلاش نمایید");
      });

    return deleteResult;
    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .delete(`https://testato.ir/api/profile/delete/${userId}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data.data);
    //     setUsers(users.filter((user) => user.id != userId));
    //         })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  };

  //----------------------------------------------------------------

  //----------------------------------------------------------------
  const handleSort = (event) => {
    const { oldIndex, newIndex } = event.detail;
    const updatedData = [...users];
    const [movedItem] = updatedData.splice(oldIndex, 1);
    updatedData.splice(newIndex, 0, movedItem);
    setUsers(updatedData);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            کاربران
          </Typography>
          <div className="mt-2 flex gap-6">
    
          </div>
        </CardHeader>
        {loading ? (
          <div className="flex w-full  items-center justify-center  py-60">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#820382"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="mx-auto w-full"
              visible={true}
            />
          </div>
        ) : (
          <>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto text-right">
                <thead className="w-full">
                  <tr>
                    {[
                      "#",
                      "عکس",
                      "نام",
                      "جنسیت",
                      "موبایل",
                      "وضعیت",
                      "شهر",
                      "تنظیمات",
                    ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b	 border-blue-gray-50 py-3 px-5 "
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody ref={listRef} className="w-full">
                  {users?.map((user, key) => {
                    const className = `py-3 px-5 ${
                      key === users.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user?.id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={
                                user?.sex == "men"
                                  ? "/images/avatar/men.png"
                                  : "/images/avatar/women.png"
                              }
                              alt={user?.name}
                              size="sm"
                            />
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user?.first_name + " " + user.last_name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user?.sex == "men" ? "آقا" : "خانم"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user?.mobile}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user?.is_enable ? (
                              <i className="fa fa-check bg-green-500 text-white p-2"></i>
                            ) : (
                              <i className="fa fa-close bg-red-500 text-white p-2"></i>
                            )}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user?.city?.name ?? "تعین نشده"}
                          </Typography>
                        </td>

                        <td className={`relative ${className}`}>
                          <button
                            onClick={() => openDropDown(user.id)}
                            // id="dropdownDelayButton"
                            // data-dropdown-toggle="dropdownDelay"
                            // data-dropdown-delay="500"
                            // data-dropdown-trigger="hover"
                            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                          >
                            <svg
                              className="ml-2.5 h-2.5 w-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                            امکانات
                          </button>

                          {isOpentDropDown === user.id ? (
                            <>
                              <div
                                // id="dropdownDelay"
                                className="absolute left-0 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                              >
                                <ul
                                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownDelayButton"
                                >
                                  {/* <li>
                                    <Link
                                      to={`/dashboard/users/panel/${user.id}`}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      پنل کاربری
                                    </Link>
                                  </li> */}
                                  <li className="w-full flex justify-center">
                                    <Link
                                      to={`/dashboard/users/edit/${user.id}`}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      اصلاح
                                    </Link>
                                  </li>
                                  <li className="w-full">
                                    <Button
                                      onClick={() => deleteUser(user.id)}
                                      className=" flex justify-center w-full rounded-none bg-white px-0 pr-4 text-right text-gray-600 shadow-none hover:bg-gray-100 hover:shadow-none focus:outline-none"
                                    >
                                      حذف
                                    </Button>
                                  </li>
                                </ul>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* <div className="my-6 mx-auto mt-10 flex w-full items-center  justify-center gap-3">
            <button
              className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
                currentPage === 1 ? "opacity-50" : ""
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              قبلی
            </button>
            <span className="p-1">{currentPage}</span>
            <button
              className={`rounded-md bg-purple p-1 px-2 text-sm text-white ${
                currentPage === totalPages ? "opacity-50" : ""
              }`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              بعدی
            </button>
          </div> */}
            </CardBody>
          </>
        )}
      </Card>
    </div>
  );
}

export default Users;
