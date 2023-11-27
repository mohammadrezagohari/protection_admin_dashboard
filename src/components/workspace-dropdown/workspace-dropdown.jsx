import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { AuthContext } from "@/gard/context/AuthContext";
import { getWorkspace } from "@/api/services/workspace";

// const CategoryDropdown = ({ field_id, setField_id, selected_id = null }) => {
const WorkspaceDropdown = ({
  workspace,
  setWorkspace,
  city_id = null,
  selected_id = null,
}) => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const { userToken } = useContext(AuthContext);
  //   const { data, isLoading, isError } = useQuery(
  //     ["getWorkspaceCollection", userToken],
  //     () => getWorkspace("50", userToken, city_id)
  //   );
  const getWorkspaces = async () => {
    const editResult = await getWorkspace("50", userToken, city_id)
      .then((response) => {
        console.log("responseresponse", response?.data);
        setCollection(response?.data?.data);
        setLoading(false);
        // navigate("/dashboard/fields");
      })
      .catch(function (err) {
        console.log("error", err.massage);
      });

    return editResult;
  };
  useEffect(
    function () {
      console.log("getWorkspaces runngin");
      getWorkspaces();
      if (!loading && collection.length != 0) {
        console.log("workspace", collection);
        const slItem = collection.find((c) => c.id == selected_id);
        if (slItem) {
          setSelected({
            value: slItem.id,
            label: slItem.name,
          });
        } else {
          const slItem = collection[0];
          setSelected({
            value: slItem.id,
            label: slItem.name,
          });
        }
      }
    },
    [city_id]
  );

  if (loading && collection.length <= 0) {
    return <div>در حال بارگذاری...</div>;
  }
  //   if (!loading) {
  //     setLoading(true);
  //   }
  //   if (!selected) {
  //     return <div>Loading...</div>;
  //   }
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
        placeholder="دسته بندی مد نظر را انتخاب کنید"
        onChange={(e) => {
          setWorkspace(e.value);
        }}
      />
    </div>
  );
};

export default WorkspaceDropdown;
