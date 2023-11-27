import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
// import { getProvince
import { getProvince } from "@/api/services/province";
import { AuthContext } from "@/gard/context/AuthContext";

const ProvinceDropdown = ({ province_id, setProvince_id }) => {
  const { userToken } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery(["provinceslist", userToken], () =>
    getProvince(userToken)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="province_id"
        isSearchable={true}
        options={data?.data?.map((province) => ({
          value: province.id,
          label: province.name,
        }))}
        placeholder="استان مد نظر را انتخاب کنید"
        onChange={(e) => setProvince_id(e.value)}
      />
    </div>
  );
};

export default ProvinceDropdown;
