import {useContext, useEffect, useState} from "react";
import {
    Card, CardHeader, CardBody, Button, Typography,
} from "@material-tailwind/react";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import {showHospital, updateHospital} from "@/api/services/hospital";
import {ThreeDots} from "react-loader-spinner";
import {AuthContext} from "@/gard/context/AuthContext";
import CitiesDropdown from "@/components/citiesDropDown/citiesDropDown";

export function ShowHospital() {
    const {userToken} = useContext(AuthContext);
    const {id} = useParams();
    console.log("gggggggggggg", id);
    const [name, setName] = useState([]);
    const [address, setAddress] = useState([]);
    const [telephone, setTelephone] = useState([]);
    const [description, setDescription] = useState([]);
    const [email, setEmail] = useState([]);
    const [workHour, setWorkHour] = useState([]);
    const [cityId, setCityId] = useState([]);
    const [image, setImage] = useState([]);

    const [loading, setLoading] = useState(true);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const inputStyle = {
        border: "1px solid gray", borderRadius: "5px", padding: "0.45rem", width: "100%", marginTop: "1rem",
    };
    const linkStyle = {
        backgroundColor: "purple", color: "white", marginLeft: "1rem", padding: "0.5rem", borderRadius: "8px",
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // setIcon(file)
        const file_url = URL.createObjectURL(file);
        console.log("file", file);
        console.log("file_url", file_url);
        console.log("image target", event.target.files[0]);
        setImage(event.target.files[0]);
        setImagePreview(file_url);
    };

    const showHospitals = async () => {
        const showResult = await showHospital(id, userToken)
            .then((result) => {
                console.log('result', result)
                setName(result?.data?.name);
                setAddress(result?.data?.address);
                setDescription(result?.data?.description);
                setEmail(result?.data?.email);
                setCityId(result?.data?.city_id);
                setTelephone(result?.data?.telephone);
                setImagePreview(result?.data?.image);
                setWorkHour(result?.data?.work_hour);
                // steLatitude(latitude),
                //     longitude: longitude,
            })
            .catch(function (error) {
                console.log(error);
            });
        return showResult;
    };
    useEffect(() => {
        showHospitals(id);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('lat',latitude)
        console.log('long',longitude)
        const editResult = await updateHospital(id, {
            name: name,
            address: address,
            telephone: telephone,
            description: description,
            email: email,
            work_hour: workHour,
            city_id: cityId,
            image: image,
            // latitude: latitude,
            // longitude: longitude,
        }, userToken)
            .then(function (response) {
                if (response.status == true) {
                    toast.success("  تغییرات با موفقیت افزوده شد !");
                }
                console.log(response?.data?.status);
                if (response?.data?.status == true) console.log(response?.data?.status);
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
        </div>) : (<Card>
            <CardHeader variant="gradient" color="blue" className="flex justify-between mb-8 mt-3 p-6">
                <div className="h-18 flex items-center">
                    <Typography variant="h6" color="white">
                        ویرایش اطلاعات بیمارستان
                    </Typography>
                </div>
                <div className="py-5">
                    <Link
                        to={`/dashboard/hospital`}
                        className="mr-3"
                        style={linkStyle}
                    >
                        بازگشت
                    </Link>
                </div>
            </CardHeader>
            <CardBody className="w-full px-0 pt-0 pb-2">
                <form
                    method="post"
                    onSubmit={handleSubmit}
                    className="p-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <label className="ml-3"> نام بیمارستان :</label>
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                                console.log(e.target.value);
                            }}
                            value={name}
                            type="text"
                            className="ml-3 p-4"
                            name="name"
                            style={inputStyle}
                            autoComplete="off"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <label className="ml-3"> آدرس :</label>
                        <input
                            onChange={(e) => {
                                setAddress(e.target.value);
                                console.log(e.target.value);
                            }}
                            value={address}
                            type="text"
                            className="ml-3 p-4"
                            name="name"
                            style={inputStyle}
                            autoComplete="off"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 mt-6 ">
                        <label className="ml-3"> نام شهر :</label>
                        <CitiesDropdown
                            cities={cityId}
                            setCities={setCityId}
                            selected_id={cityId}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1  mt-6 ">
                        <label className=""> آدرس ایمیل : </label>
                        <input
                            type="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                console.log(e.target.value);
                            }}
                            value={email}
                            className="ml-3 "
                            name="email"
                            style={inputStyle}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 mt-6  ">
                        <label className=""> شماره تماس :</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setTelephone(e.target.value);
                                console.log(e.target.value);
                            }}
                            value={telephone}
                            className="ml-3 "
                            name="telephone"
                            style={inputStyle}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 mt-6 ">
                        <label className=""> ساعت کاری : </label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setWorkHour(e.target.value);
                                console.log(e.target.value);
                            }}
                            value={workHour}
                            className="ml-3 "
                            name="work-hour"
                            style={inputStyle}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-6  ">
                        <label className=""> توضیحات : </label>
                        <textarea
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            value={description}
                            className="ml-3 p-4 "
                            name="description"
                            style={inputStyle}
                        >
                            </textarea>
                    </div>
                    {/*<div className="col-span-1 md:col-span-1 lg:col-span-1 mt-6 ">*/}
                    {/*    <label className="">Latitude</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        onChange={(e) => {*/}
                    {/*            setLatitude(e.target.value);*/}
                    {/*            console.log(e.target.value);*/}
                    {/*        }}*/}
                    {/*        value={latitude}*/}
                    {/*        className="ml-3 "*/}
                    {/*        name="latitude"*/}
                    {/*        style={inputStyle}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="col-span-1 md:col-span-1 lg:col-span-1 mt-6 ">*/}
                    {/*    <label className="">Longitude</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        onChange={(e) => {*/}
                    {/*            setLongitude(e.target.value);*/}
                    {/*        }}*/}
                    {/*        value={longitude}*/}
                    {/*        className="ml-3 "*/}
                    {/*        name="longitude"*/}
                    {/*        style={inputStyle}*/}
                    {/*    />*/}
                    {/*</div>*/}


                    <div className="col-span-1 md:col-span-2 lg:col-span-1 mt-6 ">
                        <label className="ml-3 block">فایل تصویر:</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="file"
                                name="image"
                                accept="image/png,image/jpeg,image/webp,"
                                style={inputStyle}
                                onChange={handleFileChange}
                            />
                            <div className=" h-20 w-36 rounded-md border-2 p-3">
                                <img
                                    className="h-full w-full rounded-md object-cover"
                                    src={imagePreview ?? "../../../images/no-image.svg"}
                                    alt="آپلود عکس"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-span-1 md:col-span-2 lg:col-span-2 mt-4 flex justify-start items-center">
                        <Button type="submit">ذخیره</Button>
                    </div>
                </form>
            </CardBody>
        </Card>)}
    </>);

}

export default ShowHospital;
