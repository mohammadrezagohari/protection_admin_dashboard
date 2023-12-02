import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { getHospital,deleteHospital } from "@/api/services/hospital";
// import DataTable from "react-data-table-component";
// import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";

function Hospital() {
  const { userToken } = useContext(AuthContext);
  //   const [page, setPage] = useState(1);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const getHospitals = async () => {
    const result = await getHospital(userToken)
      .then(function (response) {
        setHospitals(response?.data);
        console.log(response?.data);

      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getHospitals();
    }, 3000);
  }, []);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  const deleteHospitals = async (id) => {
    const deleteResult = await deleteHospital(id, userToken)
      .then(function (response) {
        if (response.status) {
          toast.success("حذف با موفقیت انجام شد !");
          setHospitals(hospitals.filter((hospital) => hospital.id !== id));
        } else {
          toast.error("خطا !! مجددا تلاش نمایید");
        }
      })
      .catch(function (err) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error", err);
      });

    return deleteResult;
  };



  return (
    <>
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 mt-3 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
            لیست بیمارستان ها
          </Typography>
          <Link
            to={`/dashboard/hospital/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت بیمارستان جدید
          </Link>
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
            <CardBody className="min-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto text-right">
                <thead>
                  <tr>
                    {["#", "نام","شهر","شماره تماس ", "تنظیمات"].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
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
                  {hospitals?.map((hospital, key) => {
                    const className = `py-3 px-5 ${
                      key === hospitals.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={hospital?.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {hospital?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {hospital?.name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                          {hospital?.city?.name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                          {hospital?.telephone}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link
                            to={`/dashboard/hospital/show/${hospital.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deleteHospitals(hospital.id)}
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
              {hospitals.length == 0 ? (
                <>
                  <div className="flex h-[80vh] w-full items-center justify-center">
                    <p className="">آیتمی وجود ندارد :(</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </CardBody>
          </>
        )}
      </Card>
    </>
  );
}

export default Hospital;
