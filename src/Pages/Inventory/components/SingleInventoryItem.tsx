import { useContext } from "react";
import { ModalComponent } from "@/Components/Modal/Modal";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { InventoryContext } from "./InventoryContext";
import { useOneAsset } from "../hook";
import style from "../style/singleInventoryItem.module.scss";
import { TitleCaser } from "@/Helpers/TitleCaser";
import { InventoryItem } from "../InventoryType";

export const SingleInventoryItem = () => {
  const {
    viewAssetModalOpen: open,
    handleCloseViewAssetModalOpen: handleClose,
    singleAssetID,
  } = useContext(InventoryContext);
  const { data, error, loading } = useOneAsset<InventoryItem>(singleAssetID!);
  console.log(data);
  return (
    <ModalComponent handleClose={handleClose} open={open}>
      {error ? (
        <p>Error fetching asset</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={style.titleContainer}>
            <h3>{data?.type && TitleCaser(data?.type)}</h3>
            <div>
              <p className={style.sn}>
                {data?.serialNumber}
                <QrCodeIcon />
              </p>
              {data && renderStatus(data.status, data.userId)}
            </div>
          </div>
        </>
      )}
    </ModalComponent>
  );
};

const renderStatus = (
  status: string,
  user: { firstName: string; lastName: string } | null = null,
) => {
  return (
    <span>
      <span
        style={{
          color: status === "assigned" ? "rgb(211, 47, 47)" : "rgb(2, 167, 0)",
        }}
      >
        {status}
      </span>
      {user && (
        <>
          <span>to</span>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </>
      )}
    </span>
  );
};
