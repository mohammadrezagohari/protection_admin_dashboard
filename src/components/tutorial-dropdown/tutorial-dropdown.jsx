import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { AuthContext } from "@/gard/context/AuthContext";
import { getTutorials } from "@/api/services/tutorial";

// const CategoryDropdown = ({ field_id, setField_id, selected_id = null }) => {
const TutorialDropdown = ({ tutorial, setTutorial, selected_id = null }) => {
  const [selected, setSelected] = useState(null);
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["getTutorialCollection", userToken],
    () => getTutorials()
  );
  useEffect(
    function () {
      if (!isLoading && !isError) {
        const slItem = data?.data.find((c) => c.id == selected_id);
        if (slItem) {
          setSelected({
            value: slItem.id,
            label: slItem.main_title,
          });
        } else {
          const slItem = data?.data[0];
          setSelected({
            value: slItem.id,
            label: slItem.main_title,
          });
        }
      }
    },
    [data, isLoading, isError]
  );

  if (isError) {
    return <div>خطا در بارگذاری اطلاعات</div>;
  }
  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }
  //   if (!selected) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="field_id"
        isSearchable={true}
        options={data?.data?.map((field) => ({
          value: field.id,
          label: field.main_title,
        }))}
        defaultValue={selected ? selected : null}
        placeholder="دسته بندی مد نظر را انتخاب کنید"
        onChange={(e) => {
          setTutorial(e.value);
        }}
      />
    </div>
  );
};

export default TutorialDropdown;
