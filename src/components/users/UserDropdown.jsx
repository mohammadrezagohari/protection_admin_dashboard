// import React from 'react'

// export default function UnitDropdown() {
//   return (
//     <div>UnitDropdown</div>
//   )
// }
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
// import { getProvince
import { getProvince } from "@/api/services/province";
import { getCourse } from "@/api/services/course";
import { profile } from "@/api/services/auth-api";

const UserDropdown = ({ userProfile, setUserProfile }) => {
  // const [course, setCourse] = useState([]);
  const { isLoading, data } = useQuery("course", profile);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <Select
        name="course"
        isSearchable={true}
        options={data?.data?.map((course) => ({
          value: course.id,
          label: course.name,
        }))}
        placeholder="درس مد نظر را انتخاب کنید"
        // value={course}
        onChange={(e) => setUserProfile(e.value)}
      />
    </div>
  );
};

export default UserDropdown;
