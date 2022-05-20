import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/appContext";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import UseFormControl from "../../../components/form/inputText";
import { LoadingButtonsTransition } from "../../../components/form/button";
import { InputSelect } from "../../../components/form/selectMenu";
import moment from "moment";
import { createTask } from "../../../services/tasks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

export const CreateTaskModal = ({ open, handleClose }) => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    title: "",
    assignedId: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    setState({ ...state, assignedId: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, assignedId } = state;
    setLoading(true);
    const data = {
      title: title,
      creatorId: store.currentUser?.id,
      createdDate: moment().format(),
      assignedDate: moment().format(),
      assignedId: assignedId,
      statusId: 1,
    };
    await createTask(data, store.currentUser.accessToken);
    setState({
      title: "",
      assignedId: "",
    });
    setTimeout(async () => {
      await actions.getAllTasks();
      setLoading(false);
      handleClose();
    }, 3000);
  };

  useEffect(() => {
    actions.getAllStatus();
  }, []);

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
              <Grid item xs={6} md={6} marginBottom={2}>
                <InputSelect
                  label={"Dev"}
                  handleChange={handleSelectChange}
                  rol={store.devs}
                />
              </Grid>

              <Grid item xs={6} md={12} marginBottom={2} marginTop={2}>
                <Grid item xs={6} md={12} marginBottom={2}>
                  <UseFormControl
                    handleChange={handleChange}
                    inputName={"title"}
                    inputType={"text"}
                    helper={"e.g.: Jhon Doe"}
                    inputValue={state.title}
                    placeholder={"Task Description"}
                    label={"Task Description"}
                    textColor={"#000"}
                  />
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
    </div>
  );
};
