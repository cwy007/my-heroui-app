"use client";

import {Accordion, AccordionItem} from "@heroui/accordion";
import React from "react";
import {Listbox, ListboxItem, ListboxSection} from "@heroui/listbox";
import {Tooltip} from "@heroui/tooltip";
import {Icon} from "@iconify/react";
import {cn} from "@heroui/theme";

export let SidebarItemType = /*#__PURE__*/ (function (SidebarItemType) {
  SidebarItemType["Nest"] = "nest";

  return SidebarItemType;
})({});

const Sidebar = React.forwardRef(
  ({
    items,
    isCompact,
    defaultSelectedKey,
    onSelect,
    hideEndContent,
    sectionClasses: sectionClassesProp = {},
    itemClasses: itemClassesProp = {},
    iconClassName,
    classNames,
    className,
    ...props
  }, ref) => {
    const [selected, setSelected] = React.useState(defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, "w-full", {
        "p-0 max-w-[44px]": isCompact,
      }),
      group: cn(sectionClassesProp?.group, {
        "flex flex-col gap-1": isCompact,
      }),
      heading: cn(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
    };

    const itemClasses = {
      ...itemClassesProp,
      base: cn(itemClassesProp?.base, {
        "w-11 h-11 gap-0 p-0": isCompact,
      }),
    };

    // 新增递归渲染函数，支持任意层级嵌套
    const renderNestedItems = React.useCallback(
      (items, depth = 0) => {
        return items.map((item) => {
          const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;
          
          if (isNestType) {
            return (
              <ListboxItem
                {...item}
                key={item.key}
                classNames={{
                  base: cn({
                    "h-auto p-0": !isCompact,
                  }),
                }}
                endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
                startContent={isCompact ? null : null}
                title={isCompact ? null : null}
              >
                {isCompact ? (
                  <Tooltip content={item.title} placement="right">
                    <div className="flex w-full items-center justify-center">
                      {item.icon ? (
                        <Icon
                          className={cn(
                            "text-default-500 group-data-[selected=true]:text-foreground",
                            iconClassName,
                          )}
                          icon={item.icon}
                          width={24}
                        />
                      ) : (
                        item.startContent ?? null
                      )}
                    </div>
                  </Tooltip>
                ) : (
                  <Accordion className={"p-0"}>
                    <AccordionItem
                      key={item.key}
                      aria-label={item.title}
                      classNames={{
                        heading: "pr-3",
                        trigger: "p-0",
                        content: `py-0 pl-${Math.min(4 + depth * 2, 12)}`, // 动态缩进
                      }}
                      title={
                        item.icon ? (
                          <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                            <Icon
                              className={cn(
                                "text-default-500 group-data-[selected=true]:text-foreground",
                                iconClassName,
                              )}
                              icon={item.icon}
                              width={24}
                            />
                            <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                              {item.title}
                            </span>
                          </div>
                        ) : (
                          item.startContent ?? null
                        )
                      }
                    >
                      <Listbox
                        className={"mt-0.5"}
                        classNames={{
                          list: cn(`border-l border-default-200 pl-${Math.min(4, 8)}`),
                        }}
                        items={item.items}
                        variant="flat"
                      >
                        {renderNestedItems(item.items, depth + 1)}
                      </Listbox>
                    </AccordionItem>
                  </Accordion>
                )}
              </ListboxItem>
            );
          }

          return (
            <ListboxItem
              {...item}
              key={item.key}
              endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
              startContent={
                isCompact ? null : item.icon ? (
                  <Icon
                    className={cn(
                      "text-default-500 group-data-[selected=true]:text-foreground",
                      iconClassName,
                    )}
                    icon={item.icon}
                    width={24}
                  />
                ) : (
                  item.startContent ?? null
                )
              }
              textValue={item.title}
              title={isCompact ? null : item.title}
            >
              {isCompact ? (
                <Tooltip content={item.title} placement="right">
                  <div className="flex w-full items-center justify-center">
                    {item.icon ? (
                      <Icon
                        className={cn(
                          "text-default-500 group-data-[selected=true]:text-foreground",
                          iconClassName,
                        )}
                        icon={item.icon}
                        width={24}
                      />
                    ) : (
                      item.startContent ?? null
                    )}
                  </div>
                </Tooltip>
              ) : null}
            </ListboxItem>
          );
        });
      },
      [isCompact, hideEndContent, iconClassName]
    );

    // 更新原有的renderNestItem函数
    const renderNestItem = React.useCallback(
      (item) => {
        return renderNestedItems([item])[0];
      },
      [renderNestedItems]
    );

    const renderItem = React.useCallback(
      (item) => {
        const isNestType =
          item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item);
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            endContent={isCompact || hideEndContent ? null : item.endContent ?? null}
            startContent={
              isCompact ? null : item.icon ? (
                <Icon
                  className={cn(
                    "text-default-500 group-data-[selected=true]:text-foreground",
                    iconClassName,
                  )}
                  icon={item.icon}
                  width={24}
                />
              ) : (
                item.startContent ?? null
              )
            }
            textValue={item.title}
            title={isCompact ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon
                      className={cn(
                        "text-default-500 group-data-[selected=true]:text-foreground",
                        iconClassName,
                      )}
                      icon={item.icon}
                      width={24}
                    />
                  ) : (
                    item.startContent ?? null
                  )}
                </div>
              </Tooltip>
            ) : null}
          </ListboxItem>
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCompact, hideEndContent, iconClassName, itemClasses?.base],
    );

    return (
      <Listbox
        key={isCompact ? "compact" : "default"}
        ref={ref}
        hideSelectedIcon
        as="nav"
        className={cn("list-none", className)}
        classNames={{
          ...classNames,
          list: cn("items-center", classNames?.list),
        }}
        color="default"
        itemClasses={{
          ...itemClasses,
          base: cn(
            "px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100",
            itemClasses?.base,
          ),
          title: cn(
            "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
            itemClasses?.title,
          ),
        }}
        items={items}
        selectedKeys={[selected]}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0];

          setSelected(key);
          onSelect?.(key);
        }}
        {...props}
      >
        {(item) => {
          return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              showDivider={isCompact}
              title={item.title}
            >
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
