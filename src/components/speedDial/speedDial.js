import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const actions = [
  {
    icon: <SupervisedUserCircleIcon />,
    name: "Create Users",
    path: "./devs_manager",
  },
  {
    icon: <AddTaskIcon />,
    name: "Create tasks",
    path: "./tasks_builder",
  },
];

export const SpeedDialTooltipOpen = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <Box sx={{ position: "relative", mt: 0, height: 90 }}>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon  />}
        direction={"down"}
        FabProps={{
          sx: {
            bgcolor: '#222',
            '&:hover': {
              bgcolor: '#333',
            }
          }
        }}
      >
        {actions.map((action) => {
          return (
            <SpeedDialAction
            
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClick(action.path)}
            
            />
          );
        })}
      </StyledSpeedDial>
    </Box>
  );
};
