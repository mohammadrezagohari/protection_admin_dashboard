import axios from "axios";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showProvinces } from '@/api/services/province';

export function CreateCity() {
  const navigate = useNavigate();
  const {id} =useParams();
 
  const [province, setProvince] = useState();
  const showInfoProvince = async (id) => {
    const showResult = await showProvinces(id)
      .then(function (response) {
        setProvince(response?.data);
        console.log(province);
      })
      .catch(function (error) {
        console.log(error.message);
      });
    // setLoading(false);
    return showResult;
  };

  useEffect(() => {
    showInfoProvince(id);
    // setTimeout(() => {
    // }, 3000);
  }, []);
  // useEffect(() => {
  //   const { data } = axios
  //     .get(`https://testato.ir/api/province/show/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("_token_testato")}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setProvince(response?.data?.data);
  //       console.log(province);
  //     })
  //     .catch(function (error) {
  //       console.log(error.message);
  //     });
  // }, []);

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
    textAlign: "center",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  

  function storeProvince(e) {
    e.preventDefault();

    const token = localStorage.getItem("_token_testato");
    const { data } = axios
      .post(
        "https://testato.ir/api/province/store",
        {
          name: name,
          slug: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        navigate(-1);
      })
      .catch(function (error) {
        console.log(data);
      });
  }

  return (
    <>
      <Card>
        <div className="py-5">
          <Link to={`/dashboard/provinces`} className="mr-3" style={linkStyle}>
            بازگشت
          </Link>
        </div>
        <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
          <Typography variant="h6" color="white">
            ساخت شهرستان جدید برای {province?.name}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <form method="post" onSubmit={storeProvince} className="m-6">
            <label className="ml-3">نام شهرستان:</label>
            <input
              onChange={(e) => handleName(e)}
              type="text"
              className="ml-3"
              name="name"
              style={inputStyle}
            />

            
            <Button type="submit">ذخیره</Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default CreateCity;
