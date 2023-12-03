import React, {useContext, useEffect, useState} from "react";
import Select from "react-select";
import {useQuery} from "react-query";
import {AuthContext} from "@/gard/context/AuthContext";
import {getWorkspace} from "@/api/services/workspace";

// const CategoryDropdown = ({ field_id, setField_id, selected_id = null }) => {
const WorkspaceDropdown = ({
                               workspace,
                               setWorkspace,
                               city_id = null
                           }) => {
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);
    const {userToken} = useContext(AuthContext);
    const getWorkspaces = async () => {
        const editResult = await getWorkspace("50", userToken, city_id)
            .then((response) => {
                setCollection(response?.data?.data);
                const slItem = response?.data?.data.find((c) => c.id == workspace);
                console.log("slItem", slItem)
                if (slItem) {
                    setSelected({
                        value: slItem.id,
                        label: slItem.name,
                    });
                } else {
                    const slItem = response?.data?.data[0];
                    setSelected({
                        value: slItem.id,
                        label: slItem.name,
                    });
                }

                setLoading(false);
                // navigate("/dashboard/fields");
            })
            .catch(function (err) {
                console.log("error", err.massage);
            });

        return editResult;
    };

    useEffect(() => {
        getWorkspaces();
    }, [city_id])

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }
    if (!collection) {
        console.log('collection', collection)
        return <div>در حال پردازش...</div>;
    }
    // if (!workspace) {
    //     console.log('collection',collection)
    //     return <div>Loading...</div>;
    //     console.log("NOOK")
    //
    // } else {
    //     console.log("OK workspace", workspace)
    //     console.log("OK selected", selected)
    //
    // }
    return (
        <div className="relative h-10 w-full min-w-[200px]">
            <Select
                name="field_id"
                isSearchable={true}
                options={collection.map((item) => ({
                    value: item.id,
                    label: item.name,
                }))}
                defaultValue={selected ? selected : null}
                placeholder="محل خدمت مد نظر را انتخاب کنید"
                onChange={(e) => {
                    setWorkspace(e.value);
                }}
            />
        </div>
    );
};

export default WorkspaceDropdown;
