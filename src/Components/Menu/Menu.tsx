import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";

const ITEM_HEIGHT = 32;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Icon = (props) => <div onClick={props.onClick}>{<props.Icon />}</div>;

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={props.style} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left", 
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right", 
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            borderRadius: "10px",
            fontFamily:"Outfit, sans-serif",
            color:"rgb(44, 56, 68)"
          },
        }}
      >
      
          <div>
            <MenuItem>
              <ListItemIcon>
                {<Icon  onClick={props.onClickEdit} Icon={props.EditIcon} />}
              </ListItemIcon>
              <button
                style={{
                  textDecoration: "none",
                  color: "rgb(44, 56, 68)",
                  border: "none",
                  backgroundColor: "transparent",
                  fontFamily:"Outfit, sans-serif",
                  fontSize: "18px",
                }}
                onClick={props.onClickEdit}
              >
                {props.name}
              </button>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                {<Icon  onClick={props.onClickDelete} Icon={props.Delete} />}
              </ListItemIcon>
              <button
                onClick={props.onClickDelete}
                style={{
                  textDecoration: "none",
                  color: "#3C3A3B",
                  border: "none",
                  backgroundColor: "transparent",
                  fontFamily:"Outfit, sans-serif",
                  fontSize: "18px",
                }}
              >
                {props.name2}
              </button>
            </MenuItem>
          </div>
      
      </Menu>
    </div>
  );
}