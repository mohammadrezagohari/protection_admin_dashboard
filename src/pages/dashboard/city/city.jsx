import axios from "axios";

import React, { useEffect, useState } from "react";
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
import { deleteCities, getCities } from "@/api/services/cities";
import { Toaster, toast } from "react-hot-toast";
import { deleteProvinces, getProvince } from "@/api/services/province";

export function City() {
  let [provinces, setProvinces] = useState();
  const navigate = useNavigate();

  const getDatas = async () => {
    const result = await getProvince()
      .then(function (response) {
        console.log("response", response);
        setProvinces(response?.data);
      })
      .catch(function (err) {
        console.log("error", err.message);
      });
    return result;
  };

  useEffect(() => {
    getDatas();
  }, []);

  // useEffect(() => {
  //   const { data } = axios
  //     .get("https://testato.ir/api/province?count=32", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setProvinces(response?.data?.data);
  //       console.log(provinces);
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
    marginRight: "1rem",
  };
  // const deleteProvince = async (id) => {
  //   const deleteResult = await deleteProvinces(id)
  //     .then(function (response) {
  //       if (response.status) {
  //         toast.success("حذف با موفقیت انجام شد !");
  //         setProvinces(provinces.filter((province) => province.id !== id));
  //         navigate("/home");
  //       } else {
  //         console.log("response validation error:", response.data);
  //         toast.error("خطا !! مجددا تلاش نمایید");
  //         /******
  //          * You should add foreach for show validation errors ****
  //          */
  //       }
  //     })
  //     .catch(function (err) {
  //       console.log("error", err);
  //       toast.error("خطا !! مجددا تلاش نمایید");

  //     });
  //   return deleteResult;
  //   // const token = localStorage.getItem("_token_testato");
  //   // const { data } = axios
  //   //   .delete(`https://testato.ir/api/province/delete/${provinceId}`, {
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //       Accept: "application/json",
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   })
  //   //   .then(function (response) {
  //   //     console.log(response.data.data);
  //   //     setProvinces(provinces.filter((province) => province.id != provinceId));
  //   //     // return (
  //   //     //   <div className="flex w-full flex-col gap-2">
  //   //     //     <Alert color="green">A success alert for showing message.</Alert>
  //   //     //   </div>
  //   //     // );
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error.message);
  //   //   });
  // };

  return (
    <>
      <Card>
        <div className="py-5">
          <Link
            to={`/dashboard/province/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت استان جدید
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            لیست استان ها
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px]	   table-auto text-right">
            <thead>
              <tr>
                {["#", "نام", "تنظیمات"].map((el) => (
                  <th
                    key={el}
                    className="place-items-center border-b border-blue-gray-50		 py-3 px-5 text-center "
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
            <tbody>
              {provinces?.map((province, key) => {
                const className = `py-3 px-5 ${
                  key === provinces.length - 1
                    ? ""
                    : "border-b text-center	 border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <div className="flex items-center gap-4">{key + 1}</div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {province?.name}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Link
                        to={`/dashboard/province/show/${province.id}`}
                        style={linkStyle}
                      >
                        اصلاح
                      </Link>
                      <Button
                        onClick={() => deleteProvince(province.id)}
                        className="bg-red-700 text-white hover:bg-red-800 focus:outline-none"
                      >
                        حذف
                      </Button>

                      <Link
                        to={`/dashboard/city/show/${province.id}`}
                        style={linkStyle}
                      >
                        مشاهده شهرهای زیرمجموعه
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default Province;
