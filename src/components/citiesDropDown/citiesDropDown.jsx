import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { AuthContext } from "@/gard/context/AuthContext";
import { getCities } from "@/api/services/cities";

const CitiesDropdown = ({ cities, setCities, selected_id = null }) => {
  const [selected, setSelected] = useState(null);
  const { userToken } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery(
    ["getCitiesCollection", userToken],
    () => getCities(userToken)
  );
  
  useEffect(
    function () {
      if (!isLoading && !isError) {
        const slItem = data.find((c) => c.id == selected);
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
    },
    [data, isLoading, isError]
  );

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
