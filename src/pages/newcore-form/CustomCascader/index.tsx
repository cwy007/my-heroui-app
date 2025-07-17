import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// import { fetchProvincesOrCitysOrDistricts } from '@app/service/c2';
import { addToast, Select, SelectItem } from '@heroui/react';

const fetchProvincesOrCitysOrDistricts = async (id) => {
  // 模拟异步请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ret: true,
        data: {
          child: [
            { id: '1', name: '省份1' },
            { id: '2', name: '省份2' },
            { id: '3', name: '省份3' },
          ],
        },
      });
    }, 1000);
  });
}

// 自定义级联选择器组件
const CustomCascader = ({ value, onChange, placeholder }) => {
  const { t } = useTranslation("workspaceInfo");
  const [selectedCountry, setSelectedCountry] = useState(value?.[0] || "");
  const [selectedProvince, setSelectedProvince] = useState(value?.[1] || "");
  const [selectedCity, setSelectedCity] = useState(value?.[2] || "");
  const [selectedDistrict, setSelectedDistrict] = useState(value?.[3] || "");
  const countries = [
    { id: "1", name: "中国", children: [] },
    { id: "9000", name: "其他地区" },
  ];
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    [],
  );

  // console.log("countries", countries);
  // console.log("provinces", provinces);
  // console.log("cities", cities);
  // console.log("districts", districts);

  useEffect(() => {
    if (value) {
      setSelectedCountry(value[0] || "");
      setSelectedProvince(value[1] || "");
      setSelectedCity(value[2] || "");
      setSelectedDistrict(value[3] || "");
    }
  }, [JSON.stringify(value)]);

  const fetchProvincesReq = useRequest(
    (id) => fetchProvincesOrCitysOrDistricts(id),
    {
      manual: true,
      onSuccess: (res) => {
        // console.log("fetchProvincesReq", res);
        if (res.ret) {
          const children = res.data?.child || [];
          setProvinces(children);
        } else {
          addToast({ title: res.message, color: "danger" });
        }
      },
    },
  );

  const fetchCitiesReq = useRequest(
    (id) => fetchProvincesOrCitysOrDistricts(id),
    {
      manual: true,
      onSuccess: (res) => {
        // console.log("fetchCitiesReq", res);
        if (res.ret) {
          const children = res.data?.child || [];
          setCities(children);
        } else {
          addToast({ title: res.message, color: "danger" });
        }
      },
    },
  );

  const fetchDistrictsReq = useRequest(
    (id) => fetchProvincesOrCitysOrDistricts(id),
    {
      manual: true,
      onSuccess: (res) => {
        // console.log("fetchDistrictsReq", res);
        if (res.ret) {
          const children = res.data?.child || [];
          setDistricts(children);
        } else {
          addToast({ title: res.message, color: "danger" });
        }
      },
    },
  );

  useEffect(() => {
    // console.log("selectedCountry", selectedCountry);
    fetchProvincesReq.run("1"); // 默认加载中国的省份
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // console.log("selectedProvince", selectedProvince);
      fetchCitiesReq.run(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      // console.log("selectedCity", selectedCity);
      fetchDistrictsReq.run(selectedCity);
    }
  }, [selectedCity]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedDistrict("");
    onChange?.([country]);
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setSelectedDistrict("");
    onChange?.([selectedCountry, province]);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedDistrict("");
    onChange?.([selectedCountry, selectedProvince, city]);
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    onChange?.([selectedCountry, selectedProvince, selectedCity, district]);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-small  font-medium text-default-700 min-w-[80px] text-left w-full">
        {t("所在地区")}
      </span>

      <div
        className="flex-1 flex gap-2 self-stretch"
        style={{ alignSelf: "stretch" }}
      >
        <Select
          aria-label={t("请选择国家")}
          placeholder={t("请选择国家")}
          selectedKeys={selectedCountry ? [selectedCountry] : []}
          onSelectionChange={(keys) => {
            const country = Array.from(keys)[0] as string;
            handleCountryChange(country);
          }}
          className="flex-1"
          classNames={{
            label: "text-small font-semibold leading-5 text-default-700",
            value: "text-small !text-foreground-900",
          }}
          size="md"
          // popoverProps={{
          //   portalContainer: portalContainer(),
          // }}
        >
          {countries.map((country) => (
            <SelectItem key={country.id}>{country.name}</SelectItem>
          ))}
        </Select>

        {selectedCountry && selectedCountry === "1" && (
          <Select
            aria-label={t("请选择省份")}
            placeholder={t("请选择省份")}
            selectedKeys={selectedProvince ? [selectedProvince] : []}
            onSelectionChange={(keys) => {
              // console.log("Selected Province:", keys);
              const province = Array.from(keys)[0] as string;
              handleProvinceChange(province);
            }}
            className="flex-1"
            classNames={{
              label: "text-small font-semibold leading-5 text-default-700",
              value: "text-small !text-foreground-900",
            }}
            size="md"
            // popoverProps={{
            //   portalContainer: portalContainer(),
            // }}
          >
            {provinces.map((province) => (
              <SelectItem key={province.id}>{province.name}</SelectItem>
            ))}
          </Select>
        )}

        {selectedProvince && (
          <Select
            aria-label={t("请选择城市")}
            placeholder={t("请选择城市")}
            selectedKeys={selectedCity ? [selectedCity] : []}
            onSelectionChange={(keys) => {
              const city = Array.from(keys)[0] as string;
              handleCityChange(city);
            }}
            className="flex-1"
            classNames={{
              label: "text-small font-semibold leading-5 text-default-700",
              value: "text-small !text-foreground-900",
            }}
            size="md"
            isDisabled={!selectedProvince}
            // popoverProps={{
            //   portalContainer: portalContainer(),
            // }}
          >
            {cities.map((city) => (
              <SelectItem key={city.id}>{city.name}</SelectItem>
            ))}
          </Select>
        )}

        {districts.length > 0 && selectedProvince && selectedCity && (
          <Select
            aria-label={t("请选择区县")}
            placeholder={t("请选择区县")}
            selectedKeys={selectedDistrict ? [selectedDistrict] : []}
            onSelectionChange={(keys) => {
              const district = Array.from(keys)[0] as string;
              handleDistrictChange(district);
            }}
            className="flex-1"
            classNames={{
              label: "text-small font-semibold leading-5 text-default-700",
              value: "text-small !text-foreground-900",
            }}
            size="md"
            isDisabled={!selectedCity}
            // popoverProps={{
            //   portalContainer: portalContainer(),
            // }}
          >
            {districts.map((district) => (
              <SelectItem key={district.id}>{district.name}</SelectItem>
            ))}
          </Select>
        )}
      </div>
    </div>
  );
};

export default CustomCascader;
