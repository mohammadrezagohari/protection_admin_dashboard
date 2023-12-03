import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { showFaq ,updateFaq} from "@/api/services/faq";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";

export function ShowFaq() {
  const { userToken } = useContext(AuthContext);
  const [faqs,setFaqs] = useState([]);
  const [question,setQuestion] = useState([]);
  const [description,setDescription] = useState([]);

  const { id } = useParams();


  const [loading, setLoading] = useState(true);

  const inputStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "0.45rem",
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
  const showFaqs = async () => {
    const showResult = await showFaq(id)
      .then((result) => {
        console.log('result', result)
        setQuestion(result?.data?.question);
        console.log('queeee',result?.data?.question)

        setDescription(result?.data?.description);
        console.log('dessss',result?.data?.question)

      })
      .catch(function (error) {
        console.log(error);
      });
    return showResult;
  };
  useEffect(() => {
    showFaqs(id);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const editResult = await updateFaq(id, {
          question:question,
          description:description,
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
            <Typography variant="h6" color="white" className="flex h-14 items-center">
              ارسال سوال  
            </Typography>
            <div className="py-5">
            <Link
              to={`/dashboard/faq`}
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
              className="flex flex-col m-6 mt-0 mb-4 "
            >
             <div className="w-1/2 mt-6">
                <label className="ml-3">  عنوان سوال </label>
                <input
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={question}
                  type="text"
                  className="ml-3 p-4"
                  name="question"
                  style={inputStyle}
                  autoComplete="off"
                />
                
              </div>
              <div className="w-1/2 mt-6 ">
                <label className=""> توضیحات  </label>
                <textarea
                  onChange={(e) => {
                    setDescription(e.currentTarget.value);
                    console.log(e.currentTarget.value);
                  }}
                  value={description}
                  type="text"
                  className="ml-3 p-4 h-full "
                  name="description"
                  style={inputStyle}
                >
                </textarea>
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

export default ShowFaq;
