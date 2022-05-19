import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const ClickableChips = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(true);
    actions.register(navigate);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Chip
          label="Click here to create an admin user"
          color="warning"
          onClick={() => handleToggle()}
          // avatar={<Avatar src="/static/images/avatar/1.jpg" />}
        />
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="warning" />
      </Backdrop>
    </>
  );
};
