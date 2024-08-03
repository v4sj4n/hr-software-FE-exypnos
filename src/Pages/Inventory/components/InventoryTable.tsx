import { CircularProgress } from "@mui/material";

import { useContext } from "react";
import { InventoryContext } from "./InventoryContext";
import { GridRenderCellParams } from "@mui/x-data-grid";
import style from "../style/inventoryTable.module.scss";
import DataTable from "@/Components/Table/Table";

// Icons
import { Laptop, Monitor } from "@mui/icons-material";
import { useAllAssets } from "../hook";
import { SingleInventoryItem } from "./SingleInventoryItem";
import { InventoryItem } from "../InventoryType";

export const InventoryTable = () => {
  const { error, loading } = useAllAssets();

  const {
    assets,
    handleOpenViewAssetModalOpen,
    setSingleAssetID,
    singleAssetID,
  } = useContext(InventoryContext);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <CircularProgress />;

  const rows = assets!.map((asset: InventoryItem, index: number) => ({
    id: index + 1,
    type: asset.type[0].toUpperCase() + asset.type.slice(1),
    status: asset.status,
    fullName: asset.userId,
    serialNumber: asset.serialNumber,
  }));

  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 80,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (param: GridRenderCellParams) =>
        param.value === "laptop" ? (
          <>
            <Laptop /> {param.value}
          </>
        ) : (
          <>
            <Monitor /> {param.value}
          </>
        ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (param: GridRenderCellParams) => (
        <span
          className={
            param.value === "available"
              ? style.available
              : param.value === "assigned"
                ? style.assigned
                : style.notAvailable
          }
        >
          {param.value}
        </span>
      ),
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      renderCell: (param: GridRenderCellParams) => {
        return (
          <div className={style.divStyle}>
            {param.value === null ? (
              <span className={style.spanStyleNA}>N/A</span>
            ) : (
              <span className={style.spanStyleA}>
                {param.value.firstName} {param.value.lastName}
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,

      renderCell: (param: GridRenderCellParams) => {
        return (
          <button
            onClick={() => {
              handleOpenViewAssetModalOpen(true);
              setSingleAssetID(param.value);
            }}
            style={{
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            {param.value}
          </button>
        );
      },
    },
  ];

  const getRowId = (row: { id: number | string }) => row.id;

  console.log(assets);
  return (
    <>
      <DataTable rows={rows} columns={columns} getRowId={getRowId} />
      {singleAssetID && <SingleInventoryItem />}
    </>
  );
};
