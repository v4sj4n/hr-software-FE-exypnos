import style from "./style/assets.module.scss";
import { EmployeesWithAssets } from "./Component/EmployeesWithAssets";
import AssetProvider from "./AssetsContext.tsx";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import Input from "@/Components/Input/Index.tsx";

function AssetsComponent() {
  const [alignment, setAlignment] = useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <div className={style.titleHeading}>
        <div className={style.title}>Employees with Assets</div>
        <Input IsUsername label="Search" name="search" />
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="All">ALL</ToggleButton>
          <ToggleButton value="android">W Assets</ToggleButton>
          <ToggleButton value="ios">W/O Assets</ToggleButton>
        </ToggleButtonGroup>
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
