import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import React from "react";

import axios from "axios";
import { userRegister } from "@/api/services/auth-api";

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = async (e) => {
    e.preventDefault();
    const reg = await userRegister(name, mobile, password)
      .then(function (response) {
        console.log(response);
        navigate("/home");
      })
      .catch(function (err) {
        console.log("error", err);
      });
    return reg;
  };

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
              ورود
            </Typography>
          </CardHeader>
          <form onSubmit={login} dir="rtl">
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                onChange={(e) => handleName(e)}
                label="نام و نام خانوادگی"
                size="lg"
              />
              <Input
                type="text"
                onChange={(e) => handleMobile(e)}
                label="موبایل"
                size="lg"
              />
              <Input
                type="password"
                onChange={(e) => handlePassword(e)}
                label="رمز عبور"
                size="lg"
              />
              <div className="-ml-2.5">
                <Checkbox label="مرا به خاطر بسپار" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                ثبت نام
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                قبلا ثبت نام کرده بودی ؟؟؟
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

export default Register;
