import { Backdrop, Modal, Fade, Card } from "@mui/material";
import { useContext } from "react";
import { VacationContext } from "../../VacationContext";

export const SelectedVacation = () => {
  const {
    viewVacationModalOpen: open,
    handleCloseVacationModalOpen: handleClose,
  } = useContext(VacationContext);
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
          }}
        >
          AYO MBAYE
        </Card>
      </Fade>
    </Modal>
  );
};
