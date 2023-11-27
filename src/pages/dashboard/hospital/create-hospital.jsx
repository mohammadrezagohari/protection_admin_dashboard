import { useContext, useEffect, useRef, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import { createTutorials } from "@/api/services/tutorial";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";
// import { Editor } from "@tinymce/tinymce-react";
// import {  CKEditorContext } from "@ckeditor/ckeditor5-react";
// import CKEditor from '@ckeditor/ckeditor5-react';
// import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
// import { Context } from "@ckeditor/ckeditor5-core";
// import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
// import { Essentials } from "@ckeditor/ckeditor5-essentials";
// import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import CKEditorText from "@/components/base/ckeditor/ckeditor";

export function CreateTutorialPage() {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  const [mainTitle, setMainTitle] = useState(null);
  const [firstTitle, setFirstTitle] = useState(null);
  const [firstContext, setFirstContext] = useState(null);
  const [secondTitle, setSecondTitle] = useState(null);
  const [secondContext, setSecondContext] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const editorRef = useRef(null);

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
  const handleField = (e) => {
    setName(e.target.value);
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

  const storeTutorial = async (e) => {
    e.preventDefault();
    const createResult = await createTutorials(
      {
        main_title: mainTitle,
        first_title: firstTitle,
        first_context: firstContext,
        second_title: secondTitle,
        second_context: secondContext,
        main_image: image,
        category_id: category,
      },
      userToken
    )
      .then(function (response) {
        console.log("dataresult", response);
        if (response.status) {
          toast.success(" دسته بندی با موفقیت افزوده شد !");
        } else {
          if (response?.success == false) {
            toast(
              `${
                response?.data?.name != undefined ? response?.data?.name : ""
              } \n
                  ${
                    response?.data?.icon != undefined
                      ? response?.data?.main_image
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
        console.log(data);
      });

    return createResult;
  };
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
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
              to={`/dashboard/tutorials`}
              className="mr-3"
              style={linkStyle}
            >
              بازگشت
            </Link>
          </div>
          <CardHeader variant="gradient" color="blue" className="mb-8 mt-3 p-6">
            <Typography variant="h6" color="white">
              ساخت آموزش جدید
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form
              method="POST"
              onSubmit={storeTutorial}
              className="m-6 mb-4 flex flex-wrap"
            >
              {/* <CKEditorContext context={Context}> */}
              <div className="w-7/12">
                <label className="ml-3">دسته بندی</label>
                <CategoryDropdown
                  category={category}
                  setCategory={setCategory}
                />
              </div>

              <div className="w-7/12">
                <label className="ml-3">عنوان اصلی</label>
                <Input
                  className="mt-1em "
                  onChange={(e) => setMainTitle(e.target.value)}
                  name="main_title"
                  size="md"
                  // value={values.city_id}
                  //   label="عنوان ثانویه اول (حین بستری)"
                />
              </div>

              <div className="w-7/12">
                <label className="ml-3"></label>
                <Input
                  className="mt-1em "
                  onChange={(e) => setFirstTitle(e.target.value)}
                  name="first_title"
                  size="md"
                  // value={values.city_id}
                  label="عنوان ثانویه اول (حین بستری)"
                />
              </div>
              <div className="my-3 w-7/12">
                <label className="ml-3">توضیحات</label>
                <CKEditorText
                  id="first_context"
                  setContext={setFirstContext}
                  context={firstContext}
                />
                {/* 
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  /> */}

                {/* <Editor
                  apiKey="gl63rdyllvfa1swq1l7dd9hvyw785dci9mmmyf2eqchka051"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  name="first_context"
                  onEditorChange={(content, editor) =>
                    setFirstContext(editor.getContent())
                  }
                  id="editor1"
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
                /> */}
              </div>

              <div className="w-7/12">
                <label className="ml-3"></label>
                <Input
                  className="mt-1em "
                  onChange={(e) => setSecondTitle(e.target.value)}
                  name="second_title"
                  size="md"
                  // value={values.second_title}
                  label="عنوان ثانویه دو (حین ترخیص)"
                />
              </div>

              <div className="my-3 w-7/12">
                <label className="ml-3">توضیحات</label>
                <CKEditorText
                  id="second_context"
                  setContext={setSecondContext}
                  context={secondContext}
                />
                {/* <CKEditor
                        editor={ ClassicEditor }
                        config={ {
                            plugins: [ Paragraph, Bold, Italic, Essentials ],
                            toolbar: [ 'bold', 'italic' ]
                        } }
                        data="<p>Hello from the second editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor2 is ready to use!', editor );
                        } }
                    /> */}
                {/* <Editor
                    apiKey="gl63rdyllvfa1swq1l7dd9hvyw785dci9mmmyf2eqchka051"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    name="second_context"
                    id="editor2"
                    onEditorChange={(content, editor) =>
                      setSecondContext(editor.getContent())
                    }
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
                  /> */}
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
              <div className="col-span-2 mt-4 w-6/12">
                <Button type="submit">ذخیره</Button>
              </div>
              {/* </CKEditorContext> */}
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}

export default CreateTutorialPage;
