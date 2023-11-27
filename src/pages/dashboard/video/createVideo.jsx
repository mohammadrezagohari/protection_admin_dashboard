import { useContext, useEffect, useState } from "react";
import baseUrl from "@/configs/base-url";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createVideo } from "@/api/services/video";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";

export function CreateVideo() {
  const { userToken } = useContext(AuthContext);

  const [file_name, setFile_Name] = useState();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [category_id, setCategory_id] = useState(null);

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // setIcon(file)
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    console.log("video target", event.target.files[0]);
    setFile_Name(event.target.files[0]);
    setImagePreview(file_url);
  };

  //   const handleUpload = () => {
  //     // Assuming the API endpoint URL

  //     // Create a FormData object
  //     const formData = new FormData();

  //     // Append the file to the FormData object
  //     formData.append('file', file_name);

  //     // Using the Fetch API to send a POST request with the file in the body
  //     fetch(`${baseUrl/api/store}`, {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json(); // Parse the JSON response
  //       })
  //       .then(data => {
  //         // Handle the data from the response
  //         console.log(data);
  //       })
  //       .catch(error => {
  //         // Handle errors
  //         console.error('There was a problem with the fetch operation:', error);
  //       });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createVideo(
      {
        title: title,
        file_name: file_name,
      },
      userToken
    )
      .then(function (response) {
        console.log("dataresult", response);
        if (response.status) {
          toast.success("عنوان با موفقیت درج شد");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.title != undefined ? response?.data?.title : ""
              } \n
              ${
                response?.data?.file_name != undefined
                  ? response?.data?.file_name
                  : ""
              } \n`,
              {
                duration: 2000,
              }
            );
          }
          toast.error("خطایی رخ داده است");
        }
        console.log(response);
      })
      .catch(function (error) {
        toast.error("خطا !! مجددا تلاش نمایید");
        console.log("error :", error);
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
            <Link to={`/dashboard/video`} className="mr-3" style={linkStyle}>
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
              ساخت عنوان جدید
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="m-6 mb-4 flex flex-wrap"
            >
              <div className="w-7/12">
                <label className="ml-3"> عنوان </label>
                <input
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  value={title}
                  type="text"
                  className="ml-3"
                  name="name"
                  style={inputStyle}
                />
              </div>

              <div className="mt-4 w-7/12">
                <label className="ml-3 block">فایل ویدئو:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    name="icon"
                    accept=" video/mp4, video/3gpp, video/x-msvideo, video/quicktime"
                    style={inputStyle}
                    onChange={handleFileChange}
                  />
                  <div className=" h-20 w-36 rounded-md border-2 p-3">
                    <video width="400" controls>
                      <source
                        src={imagePreview ?? "../../images/no-image.svg"}
                        type="video/mp4"
                      />
                    </video>
                    {/* <img
                      className="h-full w-full rounded-md object-cover"
                      src={imagePreview ?? "../../images/no-image.svg"}
                      alt="آپلود ویدئو"
                    /> */}
                  </div>
                  <div>
                    <video width="400" controls>
                      <source
                        src={imagePreview ?? "../../images/no-image.svg"}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
              {/* <div className="w-7/12">
                <label className="ml-3">دسته بندی</label>
                <CategoryDropdown
                  category={category_id}
                  setCategory={setCategory_id}
                />
              </div> */}

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

export default CreateVideo;
