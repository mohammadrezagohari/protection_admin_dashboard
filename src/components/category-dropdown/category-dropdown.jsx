import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { AuthContext } from "@/gard/context/AuthContext";
import { getCategory } from "@/api/services/category";

// const CategoryDropdown = ({ field_id, setField_id, selected_id = null }) => {
const CategoryDropdown = ({ category, setCategory, selected_id = null }) => {
  const [selected, setSelected] = useState(null);
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["getCategoryCollection", userToken],
    () => getCategory("50",userToken)
  );
  useEffect(
    function () {
      if (!isLoading && !isError) {
        const slItem = data?.data.find((c) => c.id == selected_id);
        console.log('find item ',slItem);
        if (slItem) {
          setSelected({
            value: slItem.id,
            label: slItem.name,
          });
        } 
        // else {
        //   const slItem = data?.data[0];
        //   setSelected({
        //     value: slItem.id,
        //     label: slItem.name,
        //   });
        // }
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
  console.log('selected',selected);
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="categoty_id"
        isSearchable={true}
        options={data?.data?.map((field) => ({
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
