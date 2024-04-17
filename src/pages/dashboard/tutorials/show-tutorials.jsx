import {useContext, useEffect, useRef, useState} from "react";
import {
    Card, CardHeader, CardBody, Button, Typography, Input,
} from "@material-tailwind/react";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import {ThreeDots} from "react-loader-spinner";
import {AuthContext} from "@/gard/context/AuthContext";
import {showTutorials, updateTutorials} from "@/api/services/tutorial";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";
import CKEditorText from "@/components/base/ckeditor/ckeditor";
import {useQuery} from "react-query";

export function ShowTutorials() {
    const {id} = useParams();
    const {userToken} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);

    const [code,setCode] = useState(null);
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
        backgroundColor: "purple", color: "white", marginLeft: "1rem", padding: "0.5rem", borderRadius: "8px",
    };



    const {data, isError, isLoading, error} = useQuery(["tutorial_item", id], () => showTutorials(id));

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
        const updateResult = await updateTutorials({
            main_title: mainTitle,
            first_title: firstTitle,
            first_context: firstContext,
            second_title: secondTitle,
            second_context: secondContext,
            main_image: image,
            category_id: category,
            icd_code: code,
        }, id, userToken)
            .then(function (response) {
                if (response.status) {
                    toast.success("عملیات با موفقیت انجام شد");
                } else {
                    if (response?.success == false) {
                        toast(`${response?.data?.main_title != undefined ? response?.data?.main_title : ""} \n 
                            ${response?.data?.first_title != undefined ? response?.data?.first_title : ""} \n
                            ${response?.data?.first_context != undefined ? response?.data?.first_context : ""} \n
                            ${response?.data?.second_title != undefined ? response?.data?.second_title : ""} \n
                            ${response?.data?.second_context != undefined ? response?.data?.second_context : ""} \n
                            ${response?.data?.main_image != undefined ? response?.data?.main_image : ""} \n
                            ${response?.data?.category_id != undefined ? response?.data?.category_id : ""} \n`, {
                            duration: 2000,
                        });
                    }
                    toast.error("خطایی رخ داده است");
                }
                console.log(response);
            })
            .catch(function (error) {
                toast.error("خطا !! مجددا تلاش نمایید");
                console.log("error :", error);
            });

        return updateResult;
    };
    useEffect(() => {
        setCode(data?.data?.icd_code);
        // setImage(data?.data?.main_image);
        setMainTitle(data?.data?.main_title);
        setFirstTitle(data?.data?.first_title);
        setFirstContext(data?.data?.first_context);
        setSecondTitle(data?.data?.second_title);
        setSecondContext(data?.data?.second_context);
        setCategory(data?.data?.category?.id);
        setImagePreview(data?.data?.main_image)
        if (loading) {
            setLoading(false);
        }
    }, [isLoading]);
    console.log('category',category)
    if (isLoading || error) {
        return (
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
        );
    }
    return (<>
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
        </div>) : (
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
                     <div className="w-7/12">
                        <label className="ml-3">کد ICD</label>
                        <Input
                            className="mt-1em "
                            onChange={(e) => setCode(e.target.value)}
                            name="icd_code"
                            size="md"
                            value={code}
                            label="کد ICD"
                        />
                    </div>
                    <div className="w-7/12">
                        <label className="ml-3">دسته بندی</label>
                        <CategoryDropdown
                            category={category}
                            setCategory={setCategory}
                            selected_id={category}
                        />
                    </div>

                    <div className="w-7/12">
                        <label className="ml-3">عنوان اصلی</label>
                        <Input
                            className="mt-1em "
                            onChange={(e) => setMainTitle(e.target.value)}
                            name="main_title"
                            size="md"
                            value={mainTitle}
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
                            value={firstTitle}
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
                    </div>

                    <div className="w-7/12">
                        <label className="ml-3"></label>
                        <Input
                            className="mt-1em "
                            onChange={(e) => setSecondTitle(e.target.value)}
                            name="second_title"
                            size="md"
                            value={secondTitle}
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
                                    src={imagePreview ?? "../../../images/no-image.svg"}
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
        </Card>)}
    </>);
}

export default ShowTutorials;
