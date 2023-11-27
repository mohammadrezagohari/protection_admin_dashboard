import {
    Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Tabs, TabsHeader, Tab, Switch, Tooltip, Button, Input,
} from "@material-tailwind/react";
import Select from "react-select";
import {useParams} from "react-router-dom";
// import {Formik, Form, Field} from "formik";
import {useContext, useEffect, useState} from "react";
// import axios from "axios";
// import ProvinceDropdown from "@/components/provinces/ProvinceDropdown";
import {showProfile, updateProfiles} from "@/api/services/auth-api";
import {ThreeDots} from "react-loader-spinner";
import {AuthContext} from "@/gard/context/AuthContext";
import {showUser, updateUser} from "@/api/services/users";
import CitiesDropdown from "@/components/citiesDropDown/citiesDropDown";
import WorkspaceDropdown from "@/components/workspace-dropdown/workspace-dropdown";
import {toast} from "react-hot-toast";

export function EditUser() {
    const {userToken} = useContext(AuthContext);
    const {id} = useParams();
    const [userInfo, setUserInfo] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [cityId, setCityId] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [isEnable, setIsEnable] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [sex, setSex] = useState(null);
    const [workspace, setWorkspace] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);

    const [loading, setLoading] = useState(true);

    // const initialValues = {
    //     avatar: userInfo?.avatar,
    //     first_name: userInfo?.first_name,
    //     last_name: userInfo?.last_name,
    //     mobile: userInfo?.mobile,
    //     is_enable: userInfo?.is_enable,
    //     workspace: userInfo?.workspace,
    //     city_id: userInfo?.city_id,
    //     sex: userInfo?.sex,
    //     password: userInfo?.password,
    // };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const file_url = URL.createObjectURL(file);
        console.log("file", file);
        console.log("file_url", file_url);
        console.log("image target", event.target.files[0]);
        setAvatar(event.target.files[0]);
        setImagePreview(file_url);
    };
    const showUserProfileInfo = async (id) => {
        const showResult = await showUser(id, userToken)
            .then(function (response) {
                setAvatar(response?.data?.avatar);
                setFirstname(response?.data?.first_name);
                setLastname(response?.data?.last_name);
                setMobile(response?.data?.mobile);
                setIsEnable(response?.data?.is_enable);
                setWorkspace(response?.data?.workspace_id);
                setCityId(response?.data?.city_id);
                setSex(response?.data?.sex);
                setPassword(response?.data?.password);
                setLoading(false);
            })
            .catch(function (err) {
                console.log("error", err);
            });
        return showResult;
    };

    useEffect(() => {
        showUserProfileInfo(id);
    }, []);

    const editUserProfileInfo = async (e) => {
        e.preventDefault();
        const editResult = await updateUser(id, {
            "avatar": avatar,
            "first_name": firstname,
            "last_name": lastname,
            "mobile": mobile,
            "is_enable": isEnable,
            "workspace": workspace,
            "city_id": cityId,
            "sex": sex,
            "password": password
        }, userToken)
            .then(function (response) {
                if (response.status) {
                    toast.success(" سوال با موفقیت درج شد!   !");
                } else {
                    if (response?.success == false) {
                        toast(`${response?.data?.first_name != undefined ? response?.data?.first_name : ""} \n
                          ${response?.data?.last_name != undefined ? response?.data?.last_name : ""} \n
                          ${response?.data?.mobile != undefined ? response?.data?.mobile : ""} \n
                          ${response?.data?.is_enable != undefined ? response?.data?.is_enable : ""} \n
                          ${response?.data?.workspace != undefined ? response?.data?.workspace : ""} \n
                          ${response?.data?.sex != undefined ? response?.data?.sex : ""} \n
                          ${response?.data?.city_id != undefined ? response?.data?.city_id : ""} `, {
                          duration: 2000,
                        },);
                    }
                    toast.error("خطایی رخ داده است");
                }
                // navigate("/dashboard/fields");
            })
            .catch(function (err) {
                console.log("error", err);
            });

        return editResult;
    };

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


    return (<>
        {loading ? (<div className="flex items-center justify-center py-60">
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
        </div>) : (<>
            <div className="container mx-auto">
                <div className=" relative mt-8 h-72 w-full overflow-hidden rounded-xl  bg-cover	bg-center">
                    <div className="absolute inset-0 h-full w-full bg-blue-500/50"/>
                </div>
                <Card className="mx-3 -mt-56 mb-6 lg:mx-4">
                    <CardHeader
                        color="blue"
                        floated={false}
                        shadow={false}
                        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    >
                        <div className="mb-4  border border-white/10 bg-white/10 p-6 text-white">
                            <img
                                className="w-20"
                                src={sex == "men" ? "/images/avatar/men.png" : "/images/avatar/men.png"}
                            />
                        </div>
                        <Typography variant="h4" color="white">
                            <span>{firstname + " " + lastname}</span>
                        </Typography>
                    </CardHeader>
                    <CardBody className="min-h-screen">
                        <div className="i flex flex-col">
                            <form
                                onSubmit={editUserProfileInfo}
                                className="m-6 mb-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2"
                            >
                                <div className="">
                                    <label htmlFor="first_name">نام :</label>
                                    <Input
                                        component="input"
                                        onChange={(e) => setFirstname(e.currentTarget.value)}
                                        type="text"
                                        className="ml-3"
                                        // style={inputStyle}
                                        name="first_name"
                                        value={firstname}
                                        label="نام "
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="last_name">نام خانوادگی:</label>
                                    <Input
                                        component="input"
                                        type="text"
                                        onChange={(e) => setLastname(e.currentTarget.value)}
                                        className="ml-3"
                                        // style={inputStyle}
                                        name="last_name"
                                        value={lastname}
                                        label="نام خانوادگی"
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="mobile">شماره تلفن:</label>
                                    <Input
                                        component="input"
                                        onChange={(e) => setMobile(e.currentTarget.value)}
                                        type="text"
                                        className="ml-3"
                                        // style={inputStyle}
                                        name="mobile"
                                        id="mobile"
                                        value={mobile}
                                        label="شماره تلفن"
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="password">گذرواژه :</label>
                                    <Input
                                        component="input"
                                        onChange={(e) => setPassword(e.currentTarget.value)}
                                        type="password"
                                        className="ml-3"
                                        // style={inputStyle}
                                        name="password"
                                        id="password"
                                        value={password}
                                        label="گذرواژه"
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="sex">جنسیت</label>
                                    <Select
                                        id="sex"
                                        className="mt-4"
                                        options={[{
                                            value: "men", label: "آقا",
                                        }, {
                                            value: "women", label: "خانم",
                                        },]}
                                        onChange={(e) => setSex(e.value)}
                                        defaultValue={{
                                            value: sex, label: sex == "men" ? "آقا" : "خانم",
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="is_enable">وضعیت حساب</label>
                                    <Select
                                        id="is_enable"
                                        className="mt-4"
                                        options={[{
                                            value: 0, label: "غیرفعال",
                                        }, {
                                            value: 1, label: "فعال",
                                        },]}
                                        onChange={(e) => setIsEnable(e.value)}
                                        defaultValue={{
                                            value: isEnable, label: isEnable == 1 ? "فعال" : "غیرفعال",
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="city_id">شهر</label>
                                    <CitiesDropdown
                                        selected_id={cityId}
                                        id="city_id"
                                        cities={cityId}
                                        setCities={setCityId}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="workspace_id">محل خدمت</label>
                                    {cityId ? (<WorkspaceDropdown
                                        city_id={cityId}
                                        workspace={workspace}
                                        setWorkspace={setWorkspace}
                                    />) : (<div>در انتظار انتخاب شهر ...</div>)}
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
                                <div className="col-span-2">
                                    <Button className="mt-4" type="submit" size="md">
                                        ذخیره
                                    </Button>
                                </div>

                                {/*{errors.full_name && (<div style={{color: "red"}}>{errors.full_name}</div>)}*/}
                            </form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>)}
    </>);
}

export default EditUser;
