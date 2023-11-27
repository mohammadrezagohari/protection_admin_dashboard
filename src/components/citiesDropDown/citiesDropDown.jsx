import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { AuthContext } from "@/gard/context/AuthContext";
import { getCities } from "@/api/services/cities";

const CitiesDropdown = ({ cities, setCities, selected_id = null }) => {
  const [selected, setSelected] = useState([]);
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["getCitiesCollection", userToken],
    () => getCities(userToken)
  );

  useEffect(() => {
    if (!isLoading) {
      console.log("selected_id", selected_id);
      let slItem = data.find((c) => c.id == selected_id);
      console.log("slItem", slItem);
      setSelected({
        value: data.find((c) => c.id == selected_id).id,
        label: data.find((c) => c.id == selected_id).name,
      });
      // if (slItem) {
      //   setSelected({
      //     value: slItem.id,
      //     label: slItem.name,
      //   });
      // } else {
      //   const slItem = data[0];
      //   setSelected({
      //     value: slItem.id,
      //     label: slItem.name,
      //   });
      //   console.log("cant open to selected");
      // }
    }
  }, [selected_id]);

  if (isError) {
    return <div>خطا در بارگذاری اطلاعات</div>;
  }
  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="field_id"
        isSearchable={true}
        options={data.map((field) => ({
          value: field.id,
          label: field.name,
        }))}
        defaultValue={selected ? selected : null}
        placeholder="شهر مورد نظر را انتخاب کنید"
        onChange={(e) => {
          setCities(e.value);
        }}
      />
    </div>
  );
};

export default CitiesDropdown;
