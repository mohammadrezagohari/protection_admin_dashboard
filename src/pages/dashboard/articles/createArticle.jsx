import { useContext, useEffect, useState ,useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { Editor } from "@tinymce/tinymce-react";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";
import { getArticle,createArticle } from "@/api/services/article";

export function CreateArticle() {
  const { userToken } = useContext(AuthContext);
  const [title,setTitle] = useState([]);
  const [context,setContext] = useState([]);
  const [category_id,setCategory_id] = useState([]);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const inputStyle = {
    border: "1px solid #CCC8AA",
    outlineColor:"#0174BE",
    borderRadius: "5px",
    padding: "0.45rem",
    width: "100%",
    marginTop: ".8rem",
  };
  const linkStyle = {
    backgroundColor: "purple",
    color: "white",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "8px",
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const file_url = URL.createObjectURL(file);
    console.log("file", file);
    console.log("file_url", file_url);
    console.log("image target", event.target.files[0]);
    setImage(event.target.files[0]);
    setImagePreview(file_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createResult = await createArticle(
      {
        title:title,
        context:context,
        category_id:category_id,
        image:image,
      },
       userToken)
      .then(function (response) {
        console.log('dataresult', response)
        if (response.status) {
          toast.success(" سوال با موفقیت درج شد!   !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.title != undefined ? response?.data?.title : ""
              } \n
              ${
                response?.data?.context != undefined ? response?.data?.context : ""
              } \n
              ${
                response?.data?.category_id != undefined ? response?.data?.category_id : ""
              } \n`,{
                duration: 2000,
              },
            );
          }
          toast.error("خطایی رخ داده است");
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
              to={`/dashboard/articles`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
               ایجاد مقاله  
            </Typography>
          </CardHeader>
          <CardBody className="h-full px-0 pt-0 pb-2">
            <form
              method="post"
              onSubmit={handleSubmit}
              className=" mt-0  flex flex-col lg:w-1/2 md:w-1/2 w-full h-full gap-6 p-6" 
            >
             <div className="w-full">
                <label className="ml-3">  عنوان مقاله </label>
                <input
                  onChange={(e) => {
                    setTitle(e.currentTarget.value);
                  }}
                  value={title}
                  type="text"
                  className="ml-3 p-4"
                  name="question"
                  style={inputStyle}
                  autoComplete="off"
                />
                
              </div>
              <div className="my-3 w-full">
                <label className="ml-3">توضیحات</label>
                <Editor
                style={{textAlign: 'right',fontFamily:'Verdana, sans-serif'}}
                  apiKey="gl63rdyllvfa1swq1l7dd9hvyw785dci9mmmyf2eqchka051"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  name="first_context"
                  onEditorChange={(content, editor) => setContext(editor.getContent())}
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      //   "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat ",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>

              <div className="w-full">
                <label className="ml-3">دسته بندی</label>
                <CategoryDropdown
                  category={category_id}
                  setCategory={setCategory_id}
                />
              </div>

              <div className="mt-4 w-7/12">
                <label className="ml-3 block">تصویر شاخص:</label>
                <div className="flex items-center gap-3">
                  <input
                      type="file"
                      name="main_image"
                      accept="image/png,image/jpeg,image/webp,"
                      style={inputStyle}
                      onChange={handleFileChange}
                  />
                  <div className=" h-20 w-36 rounded-md border-2">
                    <img
                        className="h-full w-full rounded-md object-cover"
                        src={imagePreview ?? "../../images/no-image.svg"}
                        alt="آپلود عکس"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 w-6/12">
                <Button type="submit" className="w-2/3">ذخیره</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );

}

export default CreateArticle;
