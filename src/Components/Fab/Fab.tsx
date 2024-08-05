import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

interface FloatingActionButtonProps {
    onClick?: () => void;
  }
  export default function FloatingActionButtonSize({ onClick }: FloatingActionButtonProps) {
  
  const StyledFab = styled(Fab)(({ theme }) => ({
    width: "68px",
    height: "68px",
    backgroundColor: "#2469FF",
    position: "fixed",
    right: "5%",
    top: "89%",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#2469FF",
    },

    [theme.breakpoints.only("xs")]: {
      right: "10%",
      top: "80%",
    },
    [theme.breakpoints.only("sm")]: {
      right: "30%",
      top: "80%",
    },
  }));

  return (
    <StyledFab onClick={onClick}>
      <AddIcon
        sx={{
          width: "30px",
          height: "38px",
        }}
      />
    </StyledFab>
  );
}