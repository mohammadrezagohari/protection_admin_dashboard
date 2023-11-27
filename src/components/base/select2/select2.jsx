import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from 'react-query';
import {
  fetchProvinces,
  fetchCitiesByProvince,
} from "../../../api/services/cities";

export function Select2() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const {
    isLoading: isLoadingProvinces,
    isError: isErrorProvinces,
    data: provinces,
    error: provincesError,
  } = useQuery("provinces", fetchProvinces);

//   const {
//     isLoading: isLoadingCities,
//     isError: isErrorCities,
//     data: cities,
//     error: citiesError,
//   } = useQuery(
//     ["cities", selectedProvince],
//     () => {
//       if (selectedProvince) {
//         return fetchCitiesByProvince(selectedProvince);
//       }
//     },
//     {
//       enabled: Boolean(selectedProvince),
//     }
//   );

  const handleProvinceSelect = (selectedOption) => {
    setSelectedProvince(selectedOption);
  };

  const provinceOptions = provinces.map((province) => ({
    value: province.id,
    label: province.name,
  }));

  const cityOptions = cities
    ? cities.map((city) => ({
        value: city.id,
        label: city.name,
      }))
    : [];

  return (
    <div>
        {console.log(fetchProvinces)}
      <h2>Provinces</h2>
      <Select
        options={provinceOptions}
        onChange={handleProvinceSelect}
        placeholder="Select a province"
        isClearable
      />

      {/* {isLoadingCities && <div>Loading cities...</div>} */}

      {/* {isErrorCities && <div>Error loading cities: {citiesError.message}</div>} */}

      {/* {cities && (
        <div>
          <h2>Cities</h2>
          <Select
            options={cityOptions}
            placeholder="Select a city"
            isClearable
          />
        </div>
      )} */}
    </div>
  );

  //   return (
  //     <>
  //       <div className="relative h-10 w-full min-w-[200px]">
  //         {console.log("dataState show me", dataState)}
  //         {dataState ? (
  //           <Select
  //             options={dataState}
  //             value={selectedOption}
  //             onChange={handleChange}
  //           />
  //         ) : (
  //           ``
  //         )}
  //       </div>
  //     </>
  //   );
}

export default Select2;
