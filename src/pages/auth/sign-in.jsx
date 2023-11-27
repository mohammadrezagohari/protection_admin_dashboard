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
import { useContext, useState } from "react";
import React from "react";
import { signIn } from "@/api/services/auth-api";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "@/gard/context/AuthContext";

export function SignIn() {
  const { isLoggedIn, loginContext, setUserToken, userToken, logout } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Default
  const DefaultNotify = () => toast("Here is your toast.");

  // Success
  const SuccessNotify = () => toast.success("با موفقیت ثبت شد !");

  // Error
  const ErrorNotify = () => toast.error("لطفا اطلاعات ضروری را وارد نمایید !!");

  const PromiseNotify = () =>
    toast.promise(signIn(), {
      loading: "loading...",
      success: "Successfully get data",
      error: "error occurs in data",
    });
  // toast.promise(
  //   saveSettings(settings),
  //    {
  //      loading: 'Saving...',
  //      success: <b>Settings saved!</b>,
  //      error: <b>Could not save.</b>,
  //    }
  //  );

  const login = async (e) => {
    e.preventDefault();
    const loginUser = await signIn(mobile, password)
      .then(function (response) {
        console.log("ressssss", response);
        if (response?.status == true) {
          loginContext(response?.token);
          // localStorage.setItem("_token_admin", response?.token);
          toast.success("با موفقیت ثبت شد !");
          navigate("/");
        } else {
          toast.error("لطفا اطلاعات ضروری را وارد نمایید !!");
        }
      })
      .catch(function (err) {
        console.log("error", err);
        toast.error("لطفا اطلاعات ضروری را وارد نمایید !!");
      });
    return loginUser;
    // const { data } = axios
    //   .post(
    //     "https://testato.ir/api/auth/login",
    //     {
    //       mobile: mobile,
    //       password: password,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     localStorage.setItem("_token_testato", response.data.token);
    //     navigate("/home");
    //   })
    //   .catch(function (error) {
    //     console.log(data);
    //   });
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
                onChange={(e) => handleMobile(e)}
                label="موبایل"
                size="lg"
                name="mobile"
              />
              <Input
                type="password"
                onChange={(e) => handlePassword(e)}
                label="رمز عبور"
                size="lg"
                name="password"
              />
              <div className="-ml-2.5">
                <Checkbox label="مرا به خاطر بسپار" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                ورود
              </Button>

              <Typography variant="small" className="mt-6 flex justify-center">
                ثبت نام نکردی هنوز ؟؟
                <Link to="/auth/register">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    بیا اینجا :)
                  </Typography>
                </Link>
              </Typography>

              <Typography variant="small" className="mt-6 flex justify-center">
                اگر رمز عبور را فراموش کرده اید?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    بازیابی رمز
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

export default SignIn;
