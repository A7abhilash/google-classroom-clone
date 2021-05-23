import React from "react";
import { IconButton, Snackbar } from "@material-ui/core";
import { useMsg } from "../contexts/MsgContext";

function CustomSnackBar() {
  const { msg, setMsg } = useMsg();
  const handleClose = () => setMsg(null);

  return (
    msg != null && (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={msg ? true : false}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <i className="fa fa-times"></i>
          </IconButton>
        }
      />
    )
  );
}

export default CustomSnackBar;
