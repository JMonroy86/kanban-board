import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/appContext";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButtonsTransition } from "../../../components/form/button";
import { InputSelect } from "../../../components/form/selectMenu";
import moment from "moment";
import { createTask, updateTask } from "../../../services/tasks";
import axios from "axios";
import { ImageAvatars } from "../../../components/avatars/avatar";
import { red } from "@mui/material/colors";
import { DialogAlert } from "../../../components/dialog/dialog";
import { CustomizedSnackbars } from "../../../components/alerts/snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

export const UpdateTaskModal = ({ open, handleClose, taskId }) => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [state, setState] = useState({
    id: "",
    creator: "",
    statusId: "",
    title: "",
    assigned: null,
  });

  useEffect(() => {
    actions.getAllStatus();
    const filteredStatus = store.status?.filter((item) => item.id !== 1);
    setStatus(filteredStatus);
  }, []);

  useEffect(() => {
    const getUserToUpdate = async () => {
      try {
        if (taskId) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/tickets/getOne/${taskId}`,
            {
              headers: {
                Authorization: `Bearer ${store.currentUser?.accessToken}`,
              },
            }
          );
          if (res.data) {
            const { id, creator, status, title, createdDate, assigned } =
              res.data;
            setState({
              id: id,
              creator: creator.name,
              assigned: assigned,
              status: status.name,
              title: title,
              date: createdDate,
            });
          }
          actions.getRols();
        }
      } catch (error) {
        throw error;
      }
    };
    getUserToUpdate();
  }, [taskId]);

  const handleSelectChange = (e) => {
    setState({ ...state, assignedId: e.target.value });
  };
  const handleStatusChange = (e) => {
    setState({ ...state, statusId: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { assignedId, statusId } = state;
    setLoading(true);
    const data = {
      assignedDate: moment().format(),
      assignedId: assignedId,
      statusId: store.currentUser?.rolsId !== 2 ? 1 : statusId,
    };
    const res = await updateTask(data, store.currentUser.accessToken, taskId);
    console.log(res)
    if (res.response) {
      setLoading(false);
      setOpenSnack(true);
      setMessage(res.response.data.message);
      setSeverity("error");
    } else {
      setOpenSnack(true);
      setMessage(res.message);
      setSeverity("success");
      setState({
        assignedId: "",
      });
      setTimeout(async () => {
        await actions.getAllTasks();
        setLoading(false);
        handleClose();
      }, 3000);
    }
  };

  const CloseDelete = () => setOpenDelete(false);

  const deleteTask = () => {
    setId(taskId);
    handleClose();
    setOpenDelete(true);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 600,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            component="form"
            autoComplete="off"
            m="auto"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Grid container spacing={2} justifyContent="left">
              <Grid
                item
                container
                xs={6}
                md={12}
                marginBottom={2}
                marginTop={1}
              >
                <Grid item xs={6} md={12} container justifyContent="right">
                  {store.currentUser?.rolsId !== 2 && (
                    <DeleteIcon
                      fontSize="large"
                      sx={{ color: red[500] }}
                      onClick={deleteTask}
                    />
                  )}
                </Grid>
                <Grid item xs={6} md={3} marginBottom={4}>
                  <Typography
                    sx={{
                      color: "#ed6c02",
                      fontWeight: 600,
                      fontSize: "1.3rem",
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    Id: {state?.id}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={9} marginBottom={4}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "1.3rem",
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    Title: {state?.title}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={12} marginBottom={2}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "1.3rem",
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    Created by: {state?.creator}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={12} marginBottom={2}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "1rem",
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    Created on: {moment(state?.date).format("MMM Do YY")}
                  </Typography>
                </Grid>
                <Grid container xs={6} md={12} marginBottom={2}>
                  <Typography
                    sx={{
                      color: "#ed6c02",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    Assigned to:
                  </Typography>
                </Grid>
                <Grid item xs={3} md={2} marginBottom={4}>
                  <ImageAvatars
                    url={state.assigned?.photo}
                    alterName={state.assigned?.name}
                    width={56}
                    height={56}
                  />
                </Grid>
                <Grid item xs={6} md={8} marginY={2}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "1.2rem",
                      fontFamily: "Roboto Mono",
                    }}
                  >
                    {state.assigned?.name}
                  </Typography>
                </Grid>
                <Grid container item xs={6} md={12} marginBottom={2}>
                  <Grid item xs={6} md={12} marginBottom={1}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        fontFamily: "Roboto Mono",
                      }}
                    >
                      Reassign to:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={12}>
                    {store.currentUser?.rolsId !== 1 ? (
                      <InputSelect
                        label={"Status"}
                        handleChange={handleStatusChange}
                        rol={status}
                      />
                    ) : (
                      <InputSelect
                        label={"Dev"}
                        handleChange={handleSelectChange}
                        rol={store.devs}
                      />
                    )}
                  </Grid>
                </Grid>

                <Grid item sm={12} xs={12} md={12} marginTop={2}>
                  <LoadingButtonsTransition
                    loading={loading}
                    text={"Save"}
                    icon={"save"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
      <DialogAlert
        open={openDelete}
        handleClose={CloseDelete}
        taskId={id}
        path={"tickets"}
      />
      <CustomizedSnackbars
        open={openSnack}
        setOpen={setOpenSnack}
        severity={severity}
        message={message}
      />
    </div>
  );
};
