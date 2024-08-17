import { Backdrop, Modal, Fade, Card, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { VacationContext } from "../../VacationContext";
import { useGetVacation } from "../../Hook";
import { VacationForm } from "./VacationForm";

export const SelectedVacation = () => {
  const {
    viewVacationModalOpen: open,
    handleCloseVacationModalOpen: handleClose,
  } = useContext(VacationContext);

  const vacation = useGetVacation();

  if (vacation.isLoading) return <CircularProgress />;
  if (vacation.error) return <div>Error: {vacation.error.message}</div>;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            width: "33vw",
          }}
        >
          <VacationForm data={vacation} />
        </Card>
      </Fade>
    </Modal>
  );
};
