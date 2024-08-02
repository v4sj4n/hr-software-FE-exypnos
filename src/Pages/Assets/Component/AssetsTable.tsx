import { CircularProgress } from "@mui/material";
import { Asset } from "../TAsset";

import { useContext, useState } from "react";
import { AssetsContext } from "../AssetsContext";
import { GridRenderCellParams } from "@mui/x-data-grid";
import style from "../style/assetsTable.module.css";
import DataTable from "@/Components/Table/Table";

// Icons
import { Laptop, Monitor } from "@mui/icons-material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import PersonIcon from "@mui/icons-material/Person";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CircleIcon from "@mui/icons-material/Circle";
import { SingleAsset } from "./SingleAsset";
import { useAllAssets } from "../Hook";

export default function AssetsTable() {
  const { error, loading } = useAllAssets();
  const { assets } = useContext(AssetsContext);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const handleOpenModal = (assetId: string) => {
    setSelectedAssetId(assetId);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedAssetId(null);
  };

  if (error) return <div>Error: {error}</div>;
  if (loading) return <CircularProgress />;

  const rows = assets!.map((asset: Asset, index: number) => ({
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
          style={
            param.value === "assigned"
              ? { color: "#d32f2f" }
              : param.value === "available"
                ? { color: "#02A700" }
                : { color: "gray" }
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
            onClick={() => handleOpenModal(param.value)}
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

  const headerIcons = {
    id: FormatListNumberedIcon,
    type: TypeSpecimenIcon,
    fullName: PersonIcon,
    status: CircleIcon,
    serialNumber: FingerprintIcon,
  };

  // console.log(assets)
  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        headerIcons={headerIcons}
      />
      {selectedAssetId && (
        <SingleAsset
          handleClose={handleCloseModal}
          open={isUpdateModalOpen}
          assetId={selectedAssetId}
        />
      )}
    </>
  );
}
