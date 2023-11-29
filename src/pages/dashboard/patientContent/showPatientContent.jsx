import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { showPatient,updatePatient } from "@/api/services/patient";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import TutorialDropdown from "@/components/tutorial-dropdown/tutorial-dropdown";



export function ShowPatient() {
  const { userToken } = useContext(AuthContext);

  const {id} = useParams();

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

  const showPatients = async () => {
    const showResult = await showPatient(id)
      .then((result) => {
        console.log('result', result)
        setFirstName(result?.data?.first_name);
        setLastName(result?.data?.last_name);
        setNationalCode(result?.data?.national_code);
        setPhone(result?.data?.phone);
        setSectionTitle(result?.data?.section_title);

      })
      .catch(function (error) {
        console.log(error);
      });
    return showResult;
  };
  useEffect(() => {
    showPatients(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await updatePatient(id,
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
          toast.success(" اطلاعات با موفقیت اصلاح شد!   !");
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
