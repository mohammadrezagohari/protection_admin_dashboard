import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
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
  Alert,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { deleteMenu, getMenu } from "@/api/services/menu";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import Sortable from "sortablejs";


export function Menu() {


  const [menus, setMenus] = useState();
  const listRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getMenu()
      .then(function (response) {
        console.log("response", response);
        setMenus(response?.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    setLoading(false);
    return result;
  };

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
  }, [menus]);

  // useEffect(() => {
  //   const { data } = axios
  //     .get("https://testato.ir/api/menu/list?count=100", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setMenus(response?.data?.data);
  //       console.log(menus);
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
  const deleteMenus = async (id) => {
    const deleteResult = await deleteMenu(id)
      .then(function (response) {
        toast.success("حذف با موفقیت انجام شد !");
        console.log(response?.data);
        setMenus(menus.filter((menu) => menu.id !== id));
        // return (
        //   <div className="flex w-full flex-col gap-2">
        //     <Alert color="green">A success alert for showing message.</Alert>
        //   </div>
        // );
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });
    return deleteResult;
    // const token = localStorage.getItem("_token_testato");
    // const { data } = axios
    //   .delete(`https://testato.ir/api/menu/delete/${menuId}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log(response.data.data);
    //     setMenus(menus.filter((menu) => menu.id != menuId));
    //     // return (
    //     //   <div className="flex w-full flex-col gap-2">
    //     //     <Alert color="green">A success alert for showing message.</Alert>
    //     //   </div>
    //     // );
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  };
  return (
    <>
      <Card className="">
        <div className="py-5">
          {/* <Link
            to={`/dashboard/menu/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت منو جدید
          </Link> */}
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست منو ها
          </Typography>
        </CardHeader>
        {loading ? (
          <div className="flex w-full  items-center justify-center py-60">
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
            <CardBody className="min-h-screen overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px]	   table-auto text-right">
                <thead>
                  <tr>
                    {["#", "نام", "آیکن", "رنگ", "پس زمینه", "تنظیمات"].map(
                      (el) => (
                        <th
                          key={el}
                          className="place-items-center border-b 		 border-blue-gray-50 py-3 px-5 "
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody ref={listRef}>
                  {menus?.map((menu, key) => {
                    const className = `py-3 px-5 ${
                      key === menus.length - 1
                        ? ""
                        : "border-b  border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {menu?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {menu?.title}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            <img className="w-20" src={menu?.icon} />
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="flex items-center gap-2 text-xs font-semibold text-blue-gray-600">
                            <input type="color" value={menu?.color} />
                            {menu?.color}
                          </Typography>
                        </td>

                        <td className={className}>
                          <Typography className="flex items-center gap-1 text-xs font-semibold text-blue-gray-600">
                            <input type="color" value={menu?.background} />
                            {menu?.background}
                          </Typography>
                          {/* <div className={`w-2 h-2 bg-[#${menu?.background}] `}>v</div> */}
                        </td>

                        <td className={className}>
                          <Link
                            to={`/dashboard/menu/show/${menu.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteMenus(menu.id)}
                            className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {menus.length == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
              ) : (<></>)}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Menu;
