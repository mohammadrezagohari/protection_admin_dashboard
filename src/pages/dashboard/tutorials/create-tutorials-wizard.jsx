import { useContext, useEffect, useRef, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Input,
  Textarea,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "@/gard/context/AuthContext";
import {
  createTutorials,
  createTutorialsStep01,
  createTutorialsStep02,
} from "@/api/services/tutorial";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";
import { Editor } from "@tinymce/tinymce-react";

export function CreateTutorialsWizard() {
  const { userToken } = useContext(AuthContext);
  const [idResonse, setIdResonse] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [step, setStep] = useState("step01");

  const [mainTitle, setMainTitle] = useState(null);
  const [firstTitle, setFirstTitle] = useState(null);
  const [firstContext, setFirstContext] = useState(null);
  const [secondTitle, setSecondTitle] = useState(null);
  const [secondContext, setSecondContext] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const editorRef = useRef(null);
  const buttonRef = useRef(null);

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

  const simulateButtonClick = () => {
    buttonRef.current.click(); // Trigger the click event manually
  };


  const storeTutorial_01 = async (e) => {
    e.preventDefault();
    const createResult = await createTutorialsStep01(
      {
        main_title: mainTitle,
        first_title: firstTitle,
        first_context: firstContext,
        main_image: image,
        category_id: category,
      },
      userToken
    )
      .then(function (response) {
        console.log("response", response);
        if (response?.data?.status) {
          setStep("step02");
          simulateButtonClick();
          setIdResonse(response?.data?.id);
          toast.success(" دسته بندی با موفقیت افزوده شد !");
        } else {
          if (response?.data?.success == false) {
            toast(
              `${
                response?.data?.data?.mainTitle != undefined
                  ? response?.data?.data?.mainTitle
                  : ""
              } \n
              ${
                response?.data?.data?.first_context != undefined
                  ? response?.data?.data?.first_context
                  : ""
              } \n
              ${
                response?.data?.data?.category_id != undefined
                  ? response?.data?.data?.category_id
                  : ""
              } \n
              ${
                response?.data?.data?.first_title != undefined
                  ? response?.data?.data?.first_title
                  : ""
              } \n
                  ${
                    response?.data?.main_image != undefined
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

  const storeTutorial_02 = async (e) => {
    e.preventDefault();
    const createResult = await createTutorialsStep02(
      {
        id: idResonse,
        second_title: secondTitle,
        second_context: secondContext,
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

  const data = [
    {
      label: "گام اول (حین بستری)",
      value: "step01",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "گام دوم (حین ترخیص)",
      value: "step02",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  return (
    <Tabs value={step}>
      <TabsHeader>
        <Tab value={"step01"}>گام اول (حین بستری)</Tab>
        <Tab ref={buttonRef} value={"step02"}>گام دوم (حین ترخیص)</Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value={"step01"}>
          <Card>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <form
                method="POST"
                onSubmit={storeTutorial_01}
                className="m-6 mb-4 flex flex-wrap"
              >
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
                  <Editor
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
                <div className="col-span-2 mt-4 w-6/12">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </TabPanel>
        <TabPanel value={"step02"}>
          <Card>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <form
                method="POST"
                onSubmit={storeTutorial_02}
                className="m-6 mb-4 flex flex-wrap"
              >
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
                  <Editor
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
                  />
                </div>
                <div className="col-span-2 mt-4 w-6/12">
                  <Button type="submit">ذخیره</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </TabPanel>

        {/* {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))} */}
      </TabsBody>
    </Tabs>
  );
}

export default CreateTutorialsWizard;
