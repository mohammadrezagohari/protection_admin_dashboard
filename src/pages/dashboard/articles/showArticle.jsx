import {useContext, useEffect, useState, useRef} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Typography,
} from "@material-tailwind/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import {ThreeDots} from "react-loader-spinner";
import {AuthContext} from "@/gard/context/AuthContext";
import CategoryDropdown from "@/components/category-dropdown/category-dropdown";
import {showArticle, updateArticle} from "@/api/services/article";
import CKEditorText from "@/components/base/ckeditor/ckeditor.jsx";

export function ShowArticle() {
    const {userToken} = useContext(AuthContext);
    const {id} = useParams();
    const [title, setTitle] = useState([]);
    const [context, setContext] = useState([]);
    const [category_id, setCategory_id] = useState([]);
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);

    const inputStyle = {
        border: "1px solid #CCC8AA",
        outlineColor: "#0174BE",
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
    const showArticles = async () => {
        const showResult = await showArticle(id, userToken)
            .then((result) => {
                console.log('result', result)
                setTitle(result?.data?.title);
                setContext(result?.data?.context);
                setCategory_id(result?.data?.category?.id);
                setImagePreview(result?.data?.image);
            })
            .catch(function (error) {
                console.log(error);
            });
        return showResult;
    };
    useEffect(() => {
        showArticles(id);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const editResult = await updateArticle(id, {
            title: title,
            context: context,
            category_id: category_id,
            image: image,
        }, userToken)
            .then(function (response) {

                if (response?.status == true)
                    console.log(response?.status);
                toast.success("  تغییرات با موفقیت افزوده شد !");
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
                        <div className="h-14 flex items-center">
                            <Typography variant="h6" color="white">
                                ایجاد مقاله
                            </Typography>
                        </div>
                        <div className="py-5">
                            <Link
                                to={`/dashboard/articles`}
                                className="mr-3"
                                style={linkStyle}
                            >
                                بازگشت
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody className="h-full px-0 pt-0 pb-2">
                        <form
                            method="post"
                            onSubmit={handleSubmit}
                            className=" mt-0  flex flex-col lg:w-1/2 md:w-1/2 w-full h-full gap-6 p-6"
                        >
                            <div className="w-full">
                                <label className="ml-3"> عنوان مقاله </label>
                                <input
                                    onChange={(e) => {
                                        setTitle(e.target.value);
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
                                <CKEditorText
                                    id="first_context"
                                    setContext={setContext}
                                    context={context}
                                />
                            </div>

                            <div className="w-full">
                                <label className="ml-3">دسته بندی</label>
                                <CategoryDropdown
                                    category={category_id}
                                    setCategory={setCategory_id}
                                    selected_id={category_id}
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

export default ShowArticle;
