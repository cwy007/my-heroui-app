import {
  addToast,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Chip,
  cn,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
  InputOtp,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { useRequest, useSetState } from "ahooks";
import { parseDate, getLocalTimeZone, now } from "@internationalized/date";
import { animals, users } from "./data";
import { useEffect, useRef, useState } from "react";
import CustomCascader from "./CustomCascader";
import {
  Notification,
  CartIcon,
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@heroui/shared-icons";

export const mobilePhoneRegExp = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;


export default function HeroForm() {
  const [formData, setFormData] = useSetState({
    textInput: "",
    callingCode: "86",
    mobile: "13800138000",
    mobileSmsCode: "242080",
    datePickerValue: parseDate("2025-07-22"),
    datetimeValue: now(getLocalTimeZone()),
    singleSelect: "",
    multipleSelect: new Set<string>(["cat", "dog"]),
    multipleSelectStaffs: new Set<string>(["4", "5"]),
    singleSelectStaff: "1",
    countryId: "1",
    provinceId: "31",
    cityId: "3101",
    districtId: "310104",
    switchSelect: false,
    radioGroup: "A",
    password: "",
    loadingProgress: 60,
    progressWithValue: 0,
  });
  const timerRef = useRef<NodeJS.Timeout>();
  const [countdown, setCountdown] = useState(0);
  const [isInvisible, setIsInvisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((v) => ({
        ...v,
        progressWithValue: v.progressWithValue >= 100 ? 0 : v.progressWithValue + 10,
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  console.log("formData", formData);

  // let formatter = useDateFormatter({ dateStyle: "full" });

  const sendSmsCodeReq = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            message: "验证码已发送",
          });
        }, 1000);
      });
    },
    {
      manual: true,
      debounceWait: 1000,
      onBefore: () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        let count = 60;
        setCountdown(60);
        timerRef.current = setInterval(() => {
          count = count - 1;
          if (count < 0) {
            count = 0;
          }
          setCountdown(count);
          if (count <= 0) {
            clearInterval(timerRef.current!);
          }
        }, 1000);
      },
      onSuccess: (res: any) => {
        if (res.code !== 200) {
          addToast({ title: res.message, color: "danger" });
          clearInterval(timerRef.current!);
          setCountdown(0);
        }
      },
      onError: () => {
        clearInterval(timerRef.current!);
        setCountdown(0);
      },
    }
  );

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold leading-9 text-default-foreground mb-6">Title</h1>

      <Form className="space-y-6">
        <h2 className="text-base font-normal leading-6 text-default-500">输入框</h2>
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          <Input
            // isRequired
            classNames={{
              label: "text-small font-semibold text-default-700",
              input: "text-small !text-foreground-900",
            }}
            labelPlacement="outside"
            label="文本"
            placeholder="请输入"
            name="textInput"
            value={formData.textInput}
            onChange={(e) => setFormData({ textInput: e.target.value })}
          />

          <Input
            isRequired
            classNames={{
              label: "text-small font-semibold text-default-700 min-w-[80px] ",
              inputWrapper: "pl-0",
              input: "text-small !text-foreground-900",
              mainWrapper: "flex-1",
            }}
            startContent={
              <div className="flex max-w-[140px] items-center" style={{ minWidth: "80px" }}>
                <Select
                  selectionMode="single"
                  variant="flat"
                  className="border-none"
                  classNames={{
                    popoverContent: "min-w-[80px]",
                    trigger: "min-w-[80px] !bg-transparent border-none shadow-none",
                    value: "text-small !text-foreground-900",
                  }}
                  name="callingCode"
                  selectedKeys={
                    formData.callingCode ? new Set([formData.callingCode]) : new Set([])
                  }
                  onSelectionChange={(value) => {
                    setFormData({
                      callingCode: Array.from(value)?.[0] as string,
                    });
                  }}
                >
                  {["86", "49", "00"].map((item) => (
                    <SelectItem key={item}>{`+${item}`}</SelectItem>
                  ))}
                </Select>
              </div>
            }
            labelPlacement="outside"
            label="电话"
            placeholder="请输入"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => {
              console.log("mobile change", e.target.value);
              setFormData({ mobile: e.target.value });
            }}
            validate={(value: string) => {
              if (!value) {
                return "手机号不能为空";
              }
              if (!mobilePhoneRegExp.test(value)) {
                return "请输入合法手机号";
              }
              return "";
            }}
          />

          <DatePicker
            classNames={{
              label: "text-small font-semibold text-default-700 min-w-[80px] ",
              input: "text-small !text-foreground-900",
            }}
            size="sm"
            radius="md"
            labelPlacement="outside"
            name="datePickerValue"
            label="日期选择器"
            value={formData.datePickerValue}
            onChange={(value: any) => {
              setFormData({ datePickerValue: value });
            }}
          />

          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            classNames={{
              label: "text-small font-semibold text-default-700 min-w-[80px] ",
              input: "text-small !text-foreground-900",
            }}
            labelPlacement="outside"
            name="datetimeValue"
            label="时间选择器"
            value={formData.datetimeValue}
            onChange={(value: any) => {
              setFormData({ datetimeValue: value });
            }}
          />
          <div className="flex flex-col w-full">
            <div className="text-small font-semibold text-default-700">一次性密码</div>
            <InputOtp
              length={4}
              size="md"
              variant="flat"
              color="default"
              value={formData.password}
              onValueChange={(value) => setFormData({ password: value })}
            />
          </div>

          <Input
            isReadOnly
            classNames={{
              label: "text-small font-semibold text-default-700",
              input: "text-small !text-foreground-900",
            }}
            size="sm"
            radius="md"
            variant="underlined"
            labelPlacement="outside"
            label="只读"
            name="id"
            placeholder="文本输入框"
            // value={systemConfig?.tenantId}
          />
        </div>

        <h2 className="text-base font-normal leading-6 text-default-500">选择器</h2>
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          <Select
            classNames={{
              label: "text-small font-semibold text-default-700",
              value: "text-small !text-foreground-900",
            }}
            labelPlacement="outside"
            label="单选"
            placeholder="请选择"
            name="singleSelect"
            selectedKeys={formData.singleSelect ? [formData.singleSelect?.toString()] : []}
            onSelectionChange={(value) => {
              setFormData({ singleSelect: Array.from(value)?.[0] as any }); // 确保是 Set 类型
            }}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>

          <Select
            selectionMode="multiple"
            classNames={{
              label: "text-small font-semibold text-default-700",
              value: "text-small !text-foreground-900",
            }}
            labelPlacement="outside"
            items={animals}
            label="多选"
            placeholder="请选择"
            name="multipleSelect"
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.label}</Chip>
                  ))}
                </div>
              );
            }}
            selectedKeys={formData.multipleSelect}
            onSelectionChange={(value) => {
              console.log("multipleSelect change", value);
              setFormData({ multipleSelect: value as Set<string> });
            }}
          >
            {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
          </Select>

          <Select
            // className="max-w-xs"
            classNames={{
              // label: "group-data-[filled=true]:-translate-y-5",
              label: "text-small font-semibold text-default-700",
              value: "text-small !text-foreground-900",
              // trigger: "min-h-16",
              listboxWrapper: "max-h-[400px]",
            }}
            labelPlacement="outside"
            items={users}
            label="人员单选"
            placeholder="请选择"
            listboxProps={{
              itemClasses: {
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data?.name}
                    className="shrink-0"
                    size="sm"
                    src={item.data?.avatar}
                  />
                  <div className="flex flex-col">
                    <span>{item.data?.name}</span>
                    {/* <span className="text-default-500 text-tiny">
                      ({item.data?.email})
                    </span> */}
                  </div>
                </div>
              ));
            }}
            variant="bordered"
            selectedKeys={
              formData.singleSelectStaff ? [formData.singleSelectStaff?.toString()] : []
            }
            onSelectionChange={(value) => {
              setFormData({ singleSelectStaff: Array.from(value)?.[0] as any }); // 确保是 Set 类型
            }}
          >
            {(user) => (
              <SelectItem key={user.id} textValue={user.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={user.name} className="shrink-0" size="sm" src={user.avatar} />
                  <div className="flex flex-col">
                    <span className="text-small">{user.name}</span>
                    <span className="text-tiny text-default-400">{user.email}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>

          <Select
            classNames={{
              // base: "max-w-xs",
              // trigger: "min-h-12 py-2",
              label: "text-small font-semibold text-default-700",
              value: "text-small !text-foreground-900",
            }}
            isMultiline={true}
            items={users}
            label="人员多选"
            labelPlacement="outside"
            placeholder="请选择"
            renderValue={(items) => {
              console.log("renderValue items", items);
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item.data?.name}</Chip>
                  ))}
                </div>
              );
            }}
            selectionMode="multiple"
            variant="bordered"
            selectedKeys={formData.multipleSelectStaffs}
            onSelectionChange={(value) => {
              setFormData({ multipleSelectStaffs: value as Set<string> });
            }}
          >
            {(user) => (
              <SelectItem key={user.id} textValue={user.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={user.name} className="shrink-0" size="sm" src={user.avatar} />
                  <div className="flex flex-col">
                    <span className="text-small">{user.name}</span>
                    <span className="text-tiny text-default-400">{user.email}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>

          <Select
            isDisabled
            variant="underlined"
            classNames={{
              label: "text-small font-semibold text-default-700",
              value: "text-small !text-foreground-900",
            }}
            labelPlacement="outside"
            label="只读"
            placeholder="请选择"
            name="singleSelect"
            selectedKeys={formData.singleSelect ? [formData.singleSelect?.toString()] : []}
            onSelectionChange={(value) => {
              setFormData({ singleSelect: Array.from(value)?.[0] as any }); // 确保是 Set 类型
            }}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>

        <h2 className="text-base font-normal leading-6 text-default-500">按钮</h2>
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">默认</p>
            <div className="flex items-center gap-2">
              <Button color="primary">Button</Button>
              <Button variant="bordered">Button</Button>
              <Button variant="light">Button</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">禁用</p>
            <div className="flex items-center gap-2">
              <Button isDisabled>Button</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">加载中</p>
            <div className="flex items-center gap-2">
              <Button isLoading color="primary">
                Button
              </Button>
            </div>
          </div>
        </div>

        <h2 className="text-base font-normal leading-6 text-default-500">其他</h2>
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          <Switch
            defaultSelected
            classNames={{
              base: "flex-col items-start justify-start gap-2",
              label: "text-small font-semibold text-default-700 leading-6 -order-1",
              hiddenInput: "order-3",
            }}
            isSelected={formData.switchSelect}
            onValueChange={(value) => {
              setFormData({ switchSelect: value });
            }}
          >
            开关
          </Switch>

          <RadioGroup
            label="单选组"
            orientation="horizontal"
            classNames={{
              label: "text-small font-semibold text-default-700",
            }}
            value={formData.radioGroup}
            onValueChange={(value) => setFormData({ radioGroup: value })}
          >
            <Radio value="A">Option A</Radio>
            <Radio value="B">Option B</Radio>
          </RadioGroup>

          <div className="mb-4 flex items-end gap-4">
            <Input
              className="flex-1"
              classNames={{
                label: "text-small font-medium text-default-700",
                input: "text-sm",
              }}
              labelPlacement="outside"
              label="验证码"
              placeholder="请输入"
              name="mobileSmsCode"
              value={formData.mobileSmsCode}
              onChange={(e) => setFormData({ mobileSmsCode: e.target.value })}
            />

            <Button
              disabled={sendSmsCodeReq.loading || countdown > 0}
              className="w-fit"
              variant="ghost"
              onPress={async () => {
                if (mobilePhoneRegExp.test(formData.mobile)) {
                  sendSmsCodeReq.run();
                }
              }}
            >
              {countdown > 0 ? `重新发送(${countdown})` : "获取验证码"}
            </Button>
          </div>

          {/* 所在地区 */}
          <CustomCascader
            value={[formData.countryId, formData.provinceId, formData.cityId, formData.districtId]}
            onChange={(value: any) => {
              const [countryId, provinceId, cityId, districtId] = value || [];
              setFormData({
                countryId,
                provinceId,
                cityId,
                districtId,
              });
            }}
            placeholder="请选择地区"
          />

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">头像</p>
            <div className="flex items-center gap-2">
              <Avatar name="新" color="primary" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">头像组</p>
            <AvatarGroup isBordered color="primary">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">徽标</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Badge color="danger" content={5} isInvisible={isInvisible} shape="circle">
                  <Notification className="fill-current" size={30} />
                </Badge>
                <Badge color="danger" content={50} isInvisible={isInvisible} shape="circle">
                  <CartIcon size={30} />
                </Badge>
              </div>
              <Switch isSelected={!isInvisible} onValueChange={(value) => setIsInvisible(!value)}>
                Show badge
              </Switch>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">标签</p>
            <div className="flex gap-2">
              <Chip color="default">Default</Chip>
              <Chip color="primary">Primary</Chip>
              <Chip color="success">Success</Chip>
              <Chip color="warning">Warning</Chip>
              <Chip color="danger">Danger</Chip>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">下拉菜单</p>
            <div className="flex gap-2">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Button variant="bordered">Open Menu</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                  <DropdownItem
                    key="new"
                    shortcut="⌘N"
                    startContent={
                      <AddNoteBulkIcon className="text-xl text-default-500 pointer-events-none shrink-0" />
                    }
                  >
                    New file
                  </DropdownItem>
                  <DropdownItem
                    key="copy"
                    shortcut="⌘C"
                    startContent={
                      <CopyDocumentBulkIcon className="text-xl text-default-500 pointer-events-none shrink-0" />
                    }
                  >
                    Copy link
                  </DropdownItem>
                  <DropdownItem
                    key="edit"
                    shortcut="⌘⇧E"
                    startContent={
                      <EditDocumentBulkIcon className="text-xl text-default-500 pointer-events-none shrink-0" />
                    }
                  >
                    Edit file
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    shortcut="⌘⇧D"
                    startContent={
                      <DeleteDocumentBulkIcon
                        className={cn(
                          "text-xl text-default-500 pointer-events-none shrink-0",
                          "text-danger"
                        )}
                      />
                    }
                  >
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">进度条-加载中</p>
            <Progress className="max-w-md mt-8" value={formData.loadingProgress} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-small font-semibold text-default-700">进度条-有值</p>
            <Progress
              className="max-w-md"
              color="success"
              showValueLabel={true}
              size="md"
              value={formData.progressWithValue}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
