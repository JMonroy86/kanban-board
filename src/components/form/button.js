import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import CircularProgress from "@mui/material/CircularProgress";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
export const LoadingButtonsTransition = ({ loading, text, icon }) => {
  return (
    <Box>
      <Box
        style={{ color: "#737679" }}
        sx={{ "& > button": { width: "100%" } }}
        md={{ width: "100%" }}
      >
        <LoadingButton
          type="submit"
          color="warning"
          endIcon={icon === 'login' ? <LoginIcon /> : <SaveRoundedIcon />}
          loading={loading}
          loadingPosition="center"
          variant="outlined"
          loadingIndicator={<CircularProgress color="warning" size={20} />}
        >
          {text}
        </LoadingButton>
      </Box>
    </Box>
  );
};
