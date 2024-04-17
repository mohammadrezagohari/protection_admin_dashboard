import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import {useQuery} from "react-query";
import {AuthContext} from "@/gard/context/AuthContext";
import {getCategory} from "@/api/services/category";

// const CategoryDropdown = ({ field_id, setField_id, selected_id = null }) => {
const CategoryDropdown = ({category, setCategory, selected_id = null}) => {
    const [selected, setSelected] = useState(null);
    const {userToken} = useContext(AuthContext);
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    // const { data, isLoading, isError } = useQuery(
    //   ["getCategoryCollection", userToken],
    //   () => getCategory("50",userToken)
    // );

    const fetchData = async () => {
        const result = await getCategory().then((response) => {
            setData(response?.data);
            setLoading(false);
        });
        // console.log("response result", result);
    }
    useEffect(()=>{
        fetchData();
        // setTimeout(fetchData,3000);
    },[])

    useEffect(
        function () {
            // console.log("response --- data", data);
            // console.log("loading --- data", loading);
            if (!loading) {
                if (data.length>0){
                    const slItem = data.find((c) => c?.id == selected_id);
                    if (slItem) {
                        setSelected({
                            value: slItem.id,
                            label: slItem.name,
                        });
                    } else {
                        const slItem = data[0];
                        setSelected({
                            value: slItem.id,
                            label: slItem.name,
                        });
                    }
                }
            }
        },
        [data]
    );

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }
    if (!selected && selected_id) {
        return <div>در حال انتخاب آیتم...</div>;
    }
    return (
        <div className="relative h-10 w-full min-w-[200px]">
            <Select
                name="categoty_id"
                isSearchable={true}
                options={data?.map((field) => ({
                    value: field.id,
                    label: field.name,
                }))}
                defaultValue={selected ? selected : null}
                placeholder="دسته بندی مد نظر را انتخاب کنید"
                onChange={(e) => {
                    setCategory(e.value);
                }}
            />
        </div>
    );
};

export default CategoryDropdown;
