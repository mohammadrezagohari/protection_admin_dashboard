import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import React from "react";
import {logOut, signIn} from "@/api/services/auth-api";
import {Toaster, toast} from "react-hot-toast";
import {AuthContext} from "@/gard/context/AuthContext";
import {createTutorials} from "@/api/services/tutorial.js";

export function Logout() {
    const {isLoggedIn, loginContext, setUserToken, userToken, logout, setIsLoggedIn} =
        useContext(AuthContext);
    const navigate = useNavigate();

    // Default
    const DefaultNotify = () => toast("بدرود تا درود دیگر");

    // Success
    // const SuccessNotify = () => toast.success("با موفقیت ثبت شد !");

    // Error
    // const ErrorNotify = () => toast.error("لطفا اطلاعات ضروری را وارد نمایید !!");

    useEffect(() => {
        localStorage.removeItem("_token_admin");
        // Perform logout logic
        setIsLoggedIn(false);
        location.reload();
        // navigate("/auth/login");
        // logOutUser();
    },[])


    const logOutUser = async () => {
        const log_out_user_result = await logOut(userToken)
            .then(function (response) {
                console.log('res', response);
                localStorage.removeItem("_token_admin");
                // Perform logout logic
                setIsLoggedIn(false);
                navigate("/");
            })
            .catch(function (error) {
                toast.error("خطا !! مجددا تلاش نمایید");
                console.log("error :", error);
            });

        return log_out_user_result;
    };

    return (<>


        </>
    );
}

export default Logout;
