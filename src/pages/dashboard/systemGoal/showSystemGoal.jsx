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
import { showGoal, updateGoal } from "@/api/services/goal";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowSystemGoals() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState();
  const [descriptions, setDescriptions] = useState();


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


  const showGoals = async () => {
    const showResult = await showGoal(id)
      .then((result) => {
        console.log('result', result)
        setTitles(result?.data?.title);
        console.log('queeee',result?.data?.title)

        setDescriptions(result?.data?.description);
        console.log('dessss',result?.data?.description)

      })
      .catch(function (error) {
        console.log(error);
      });
    return showResult;
  };
  useEffect(() => {
    showGoals(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const editResult = await updateGoal(id, {
          title:titles,
          description:descriptions,
        }, userToken)
          .then(function (response) {
            if (response.status == true) {
              toast.success("  تغییرات با موفقیت افزوده شد !");
            }
            console.log(response?.data?.status);
            if(response?.data?.status == true)
            console.log(response?.data?.status);
          })
          .catch(function (err) {
            console.log("error", err);
          });
    
        return editResult;
  
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
          <CardHeader variant="gradient" color="blue" className="flex justify-between mb-8 mt-3 p-6">
            <Typography variant="h6" color="white" className="h-14 flex items-center">
              ساخت عنوان جدید
            </Typography>
            <div className="py-5">
            <Link
              to={`/dashboard/systemgoal`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="m-6 mb-4 flex flex-wrap"
            >
              <div className="w-7/12">
                <label className="ml-3"> عنوان  </label>
                <input
                type="text"
                  onChange={(e) => setTitles(e.target.value)}
                  value={titles}
                  className="ml-3"
                  name="name"
                  style={inputStyle}
                />
              </div>
              <div className="w-7/12">
                <label className="ml-3"> توضیحات  </label>
                <textarea
                  onChange={(e) => setDescriptions(e.target.value)}
                  value={descriptions}
                  type="text"
                  className="ml-3"
                  name="name"
                  style={inputStyle}
                />
              </div>
              <div className="col-span-2 mt-4 w-6/12">
                <Button type="submit">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default ShowSystemGoals;
