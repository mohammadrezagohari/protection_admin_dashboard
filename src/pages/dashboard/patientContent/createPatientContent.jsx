import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createPatient } from "@/api/services/patient";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import TutorialDropdown from "@/components/tutorial-dropdown/tutorial-dropdown";



export function CreatePatientContent() {
  const { userToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [firstName,setFirstName] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [nationalCode,setNationalCode] = useState(null);
  const [phone,setPhone] = useState(null);
  const [sectionTitle,setSectionTitle] = useState(null);
  const [diagnose,setDiagnose] = useState(null);
  const [hospital,setHospital] = useState(null);
  const [patientCode, setPatientCode] = useState(null);
  const [recepDate,setRecepDate]= useState(null);

  const [imagePreview, setImagePreview] = useState();
  
  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
    width: "100%",
    marginTop: "1rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createPatient(
      {
        first_name:firstName,
        last_name:lastName,
        national_code:nationalCode,
        phone:phone,
        section_title:sectionTitle,
        recep_date:recepDate,
        diagnose:diagnose,
        hospital_title:hospital, 
        patient_code:patientCode, 
      },
       userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success(" اطلاعات با موفقیت درج شد!   !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.first_name != undefined ? response?.data?.first_name : ""
              } \n
              ${
                response?.data?.last_name != undefined ? response?.data?.last_name : ""
              } \n
              ${
                response?.data?.national_code != undefined ? response?.data?.national_code : ""
              } \n
              ${
                response?.data?.phone != undefined ? response?.data?.phone : ""
              } \n
              ${
                response?.data?.section_title != undefined ? response?.data?.section_title : ""
              } \n
              ${
                response?.data?.recep_date != undefined ? response?.data?.recep_date : ""
              } \n
              ${
                response?.data?.diagnose != undefined ? response?.data?.diagnose : ""
              } \n
              ${
                response?.data?.hospital != undefined ? response?.data?.hospital : ""
              } \n
              ${
                response?.data?.patient_code != undefined ? response?.data?.patient_code : ""
              } \n`,{
                duration: 2000,
              },
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
        console.log(data);
      });

    return createResult;
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <Card>
          <div className="py-5">
            <Link
              to={`/dashboard/patientcontent`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
               اطلاعات بیمار
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="m-6 mb-4 flex flex-wrap"
            >
              <div className="w-7/12">
                <label className="ml-3">نام</label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="first_name"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">نام خانوادگی</label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="last_name"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">کدملی</label>
                <input
                  onChange={(e) => setNationalCode(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="national_code"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">شماره تماس</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="phone"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">نام بخش</label>
                <input
                  onChange={(e) => setSectionTitle(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="section_title"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3"> تاریخ پذیرش</label>
                <input
                  onChange={(e) => setRecepDate(e.target.value)}
                  type="date"
                  className="ml-3"
                  name="recep-date"
                  style={inputStyle}
                />
         
              </div>
              <div className="w-7/12">
                <label className="ml-3">تشخیص</label>
                <input
                  onChange={(e) => setDiagnose(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="diagnose"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">نام بیمارستان</label>
                <input
                  onChange={(e) => setHospital(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="hospital_title"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3">کدبیمار</label>
                <input
                  onChange={(e) => setPatientCode(e.target.value)}
                  type="text"
                  className="ml-3"
                  name="patient_code"
                  style={inputStyle}
                />
              </div>
              <div className="col-span-2 mt-4 w-6/12">
                <Button type="submit">ثبت</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default CreatePatientContent;
