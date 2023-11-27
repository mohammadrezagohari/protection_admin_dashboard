import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
 
export function SignUp() {
  let navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
   function sendOtpCode(e) {
    e.preventDefault();
    localStorage.setItem("mobile", JSON.stringify(mobile));
    const {data} =  axios.post(
      "https://testato.ir/api/auth/otp",
      {
        mobile: mobile,
      
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      }
    ) .then(function (response) {
      console.log(response);
      alert("then:")
    })
    .catch(function (error) {
      console.log(error);
      alert("error")
    });
    navigate("/sendOtpCode");

  }
  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              بازیابی رمز
            </Typography>
          </CardHeader>
          <form onSubmit={sendOtpCode} dir="rtl">
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                onChange={(e) => handleMobile(e)}
                label="موبایل"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                ارسال کد تایید
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                ورود با رمز?
                <Link to="/auth/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    ورود
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
