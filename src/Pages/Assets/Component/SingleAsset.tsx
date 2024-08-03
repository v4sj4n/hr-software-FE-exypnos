import { useState } from "react";
import { ModalComponent } from "@/Components/Modal/Modal";
import { useOneAsset } from "../Hook/index";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateAssetForm } from "./Form/UpdateAssetForm";
import { Asset } from "../TAsset";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface SingleAssetProps {
  handleClose: () => void;
  open: boolean;
  assetId: string;
}

export const SingleAsset: React.FC<SingleAssetProps> = ({
  open,
  handleClose,
  assetId,
}) => {
  const { data, error, loading } = useOneAsset<Asset>(assetId);

  const [toBeEdited, setToBeEdited] = useState(false);

  const handleEditClick = () => setToBeEdited(true);

  const handleCancelEdit = () => setToBeEdited(false);

  return (
    <ModalComponent handleClose={handleClose} open={open}>
      {error ? (
        <p>Error fetching asset</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {toBeEdited && data ? (
            <UpdateAssetForm
              type={data.type}
              id={data._id}
              status={data.status}
              user={data.userId ? data.userId : null}
              cancelEdit={handleCancelEdit}
              handleCloseModal={handleClose}
            />
          ) : (
            <>
              <h3
                style={{
                  color: "#333",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginBottom: 0,
                }}
              >
                {data?.type
                  ? data.type[0].toUpperCase() + data.type.slice(1)
                  : ""}
              </h3>
              {data && renderStatus(data.status, data.userId)}
              <p
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  fontSize: "1.25rem",
                  fontFamily: "monospace",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <QrCodeIcon />
                {data?.serialNumber}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  cursor: "pointer",
                }}
                onClick={handleEditClick}
              >
                <EditIcon />
                Edit
              </div>
            </>
          )}
        </div>
      )}
    </ModalComponent>
  );
};

const renderStatus = (
  status: string,
  user: { firstName: string; lastName: string } | null = null,
) => {
  return (
    <span
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {user && (
        <strong>
          {user.firstName} {user.lastName}
          {" -"}
        </strong>
      )}{" "}
      <span
        style={{
          color: status === "assigned" ? "rgb(211, 47, 47)" : "rgb(2, 167, 0)",
          marginTop: "0.25rem",
          marginBottom: "1rem",
        }}
      >
        {status}
      </span>
    </span>
  );
};
