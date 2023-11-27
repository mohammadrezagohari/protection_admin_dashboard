import { Link } from "react-router-dom";
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
import axios from "axios";

export function Forget() {
 const [mobile,setMobile]=useState();
 function sendOtpCode(e){
  e.preventDefault();
  const { data } = axios
  .post(
    "https://testato.ir/api/auth/otp",
    {
      mobile: mobile,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
  .then(function (response) {
    console.log(response);
    localStorage.setItem("_token_testato", response.data.token);
    // navigate("/home");
  })
  .catch(function (error) {
    console.log(data);
  });
console.log(data);
}

 
 function handleMobile(e){
  setMobile(e.target.value);
 }
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
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
          <form onSubmit={sendOtpCode} >
          <CardBody className="flex flex-col gap-4">
            <Input onChange={(e)=>{handleMobile(e)}}  name="mobile" label="موبایل" size="lg" />
          </CardBody>
          
            <Button type="submit" variant="gradient" fullWidth>
             ورود
            </Button>
            </form>
            <CardFooter className="pt-0">
            <Typography variant="small" className="mt-6 flex justify-center">
              احراز هویت با گذرواژه &nbsp;
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
        </Card>
      </div>
    </>
  );
}

export default Forget;
