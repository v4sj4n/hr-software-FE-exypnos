import { useContext } from "react";
import { AssetsTable } from "./Component/AssetsTable";
import { AssetsContext } from "./AssetsContext";
import { CreateAssetForm } from "./Component/Form/CreateAssetForm";
import style from "./style/assets.module.css";
import { ButtonTypes } from "@/Components/Button/ButtonTypes";
import Button from "@/Components/Button/Button";
import { ModalComponent } from "@/Components/Modal/Modal";
import { EmployeesWithAssets } from "./Component/EmployeesWithAssets";
import AssetProvider from "./AssetsContext.tsx";

function AssetsComponent() {
  const { modalOpen, handleOpenModal, handleCloseModal } =
    useContext(AssetsContext);
  return (
    <>
      <div className={style.titleHeading}>
        <div className={style.title}>Employees with Assets</div>
      </div>
      <EmployeesWithAssets />
      <div className={style.titleHeading}>
        <div className={style.title}>Assets</div>
        <Button
          type={ButtonTypes.PRIMARY}
          btnText="Create Asset"
          onClick={handleOpenModal}
          width="12rem"
        />
      </div>
      <ModalComponent open={modalOpen} handleClose={handleCloseModal}>
        <CreateAssetForm />
      </ModalComponent>
      <AssetsTable />
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
