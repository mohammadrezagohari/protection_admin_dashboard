import axios from "axios";
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
import {
  deleteCategory,
  getCategory,
  getCategorysList,
} from "@/api/services/category";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { getPatient,deletePatient } from "@/api/services/patient";

function PatientContent() {
  const { userToken } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState();
  const [imagePreview, setImagePreview] = useState();
  const navigate = useNavigate();

  const [patients,setPatients] = useState(null);

  const getDatas = async () => {
    const result = await getPatient()
      .then(function (response) {
        console.log("response", response);
        setPatients(response?.data);
      })
      .catch(function (err) {
        console.log("error", err);
      });
    setLoading(false);
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      getDatas();
    }, 3000);
  }, []);

  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setIcon(file)
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    console.log("image target", event.target.files[0]);
    setIcon(event.target.files[0]);
    setImagePreview(file_url);
    setIcon(file_url);
  };
  const deletePatients = async (id) => {
    const deleteResult = await deletePatient(id, userToken)
      .then(function (response) {
        if (response.status) {
          toast.success("حذف با موفقیت انجام شد !");
          setPatients(patients.filter((patient) => patient.id !== id));
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
        <div className="py-5">
          {/* <Link
            to={`/dashboard/category/create`}
            className="mr-3"
            style={linkStyle}
          >
            ثبت دسته بندی جدید
          </Link> */}
        </div>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 mt-3 flex justify-between p-6"
        >
          <Typography variant="h6" color="white">
              اطلاعات بیماران       
          </Typography>
          <Link
            to={`/dashboard/patientcontent/create`}
            className="mr-3"
            style={linkStyle}
          >
               بیمار جدید
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
            <CardBody className="min-h-max overflow-x-scroll  px-0 pt-0 pb-2">
              <table className="w-full min-w-max table-auto  overflow-x-scroll text-right">
                <thead>
                  <tr>
                    {["#", "نام","نام خانوادگی","کدملی","  شماره همراه بیمار ","نام بخش","تاریخ پذیرش","تشخیص","بیمارستان","کد بیمار","تنظیمات", ].map((el) => (
                      <th
                        key={el}
                        className="place-items-center border-b 	 border-blue-gray-50 py-3 px-5 "
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400 w-20"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {patients?.map((patient, key) => {
                    const className = `py-3 px-5 ${
                      key === patients.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4 ">
                            {" "}
                            {patient?.id}
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.first_name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient.last_name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.national_code}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.phone}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.section_title}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.recep_date}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.diagnose}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.hospital_title}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient?.patient_code}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link
                            to={`/dashboard/patient/show/${patient.id}`}
                            style={linkStyle}
                          >
                            اصلاح
                          </Link>
                          <Button
                            onClick={() => deletePatients(patient.id)}
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
              {patients.length == 0 ? (
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




  export default PatientContent;