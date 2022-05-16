import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";


export const ImageAvatars = ({ url, width, height }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src={url}
        sx={{ width: width, height: height }}
      />
    </Stack>
  );
};
