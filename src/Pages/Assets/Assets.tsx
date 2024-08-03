import style from "./style/assets.module.scss";
import { EmployeesWithAssets } from "./Component/EmployeesWithAssets";
import AssetProvider, { AssetsContext } from "./AssetsContext.tsx";
import { useContext, useState } from "react";
import Input from "@/Components/Input/Index.tsx";

import * as React from "react";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";

import { debounce } from "lodash";

function AssetsComponent() {
  const { setSearchParams } = useContext(AssetsContext);

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    setSearchParams((prev) => {
      const value = e.target.value;

      if (value) {
        const newParams = new URLSearchParams(prev);
        if (value === "all") {
          newParams.delete("users");
        } else {
          newParams.set("users", value);
        }
        return newParams;
      }
    });
  };

  const debouncedSetSearchParams = debounce((value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  }, 500);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchParams(e.target.value);
  };

  return (
    <>
      <div className={style.titleHeading}>
        <div className={style.title}>Employees with Assets</div>
        <Input
          IsUsername
          label="Search"
          name="search"
          onChange={onSearchChange}
        />
        <RadioGroup
          aria-labelledby="product-size-attribute"
          defaultValue={"all"}
          sx={{ gap: 2, mb: 2, flexWrap: "wrap", flexDirection: "row" }}
          onChange={handleChange}
        >
          {["ALL", "W ASSETS", "W/O ASSETS"].map((usersFilter) => (
            <Sheet
              key={usersFilter}
              sx={{
                position: "relative",
                height: 40,
                flexShrink: 0,
                padding: "1rem 2rem",
                display: "flex",
                alignItems: "center",
                borderRadius: 20,
                justifyContent: "center",
                "--joy-focus-outlineOffset": "4px",
                "--joy-palette-focusVisible": (theme) =>
                  theme.vars.palette.neutral.outlinedBorder,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.label}`]: {
                    fontWeight: "lg",
                  },
                  [`& .${radioClasses.action}`]: {
                    "--variant-borderWidth": "1px",
                    borderColor: "text.secondary",
                  },
                },
                [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                  outlineWidth: "2px",
                },
              }}
            >
              <Radio
                color="neutral"
                overlay
                disableIcon
                value={
                  usersFilter === "ALL"
                    ? "all"
                    : usersFilter === "W ASSETS"
                      ? "with"
                      : "without"
                }
                label={usersFilter}
              />
            </Sheet>
          ))}
        </RadioGroup>
      </div>
      <EmployeesWithAssets />
    </>
  );
}

export default function Assets() {
  return (
    <AssetProvider>
      <AssetsComponent />
    </AssetProvider>
  );
}
