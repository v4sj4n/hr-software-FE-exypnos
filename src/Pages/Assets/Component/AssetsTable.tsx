import { CircularProgress } from "@mui/material";
import { Asset } from "../TAsset";
import { useAllAssets as useData } from "../Hook";
import { useContext } from "react";
import { AssetsContext } from "../AssetsContext";
import { GridRenderCellParams } from "@mui/x-data-grid";
import DataTable from "@/Components/Table/Table";
import { tableUserPresenceFormatter } from "@/Helpers/tableUserPresenceFormatter";

// Icons
import { Laptop, Monitor } from "@mui/icons-material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import PersonIcon from "@mui/icons-material/Person";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CircleIcon from "@mui/icons-material/Circle";

export const AssetsTable = () => {
  const { error, loading } = useData();
  const { assets } = useContext(AssetsContext);
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
      renderCell: (param: GridRenderCellParams) =>
        tableUserPresenceFormatter(param.value),
    },
    { field: "serialNumber", headerName: "Serial Number", width: 200 },
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
    <DataTable
      height={"62.75vh"}
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      headerIcons={headerIcons}
      pageSizeOptions={[5, 10, 20, 50]}
    />
  );
};
