import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { ImageAvatars } from "../avatars/avatar";
import { yellow } from "@mui/material/colors";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import Filter7Icon from "@mui/icons-material/Filter7";
import Filter8Icon from "@mui/icons-material/Filter8";
import Filter9Icon from "@mui/icons-material/Filter9";
import Filter9PlusIcon from "@mui/icons-material/Filter9Plus";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import { Grid } from "@mui/material";
import { SelectedListItem } from "../list/selectedList";
import { tasksData } from "../../constants/services";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff0",
  border: "none",
  boxShadow: "none",
  fontSize: "1.5rem",
  padding: theme.spacing(2),
  textAlign: "left",
  color: "#b26a00",
}));
export const ControlledAccordions = () => {
  const { store, actions } = useContext(Context);
  const [expanded, setExpanded] = useState(false);
  const icons = [
    {
      id: 0,
      icon: <LensOutlinedIcon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 1,
      icon: <Filter1Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 2,
      icon: <Filter2Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 3,
      icon: <Filter3Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 4,
      icon: <Filter4Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 5,
      icon: <Filter5Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 6,
      icon: <Filter6Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 7,
      icon: <Filter7Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 8,
      icon: <Filter8Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 9,
      icon: <Filter9Icon sx={{ marginX: 1, color: yellow[500] }} />,
    },
    {
      id: 10,
      icon: <Filter9PlusIcon sx={{ marginX: 1, color: yellow[500] }} />,
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    actions.getAllTasks();
  }, []);

  return (
    <div>
      {store.devsTask && store.devsTask?.map((oneDev) => {
        const { dev, tickets } = oneDev;
        let ticketsObj = {
          todo: [],
          done: [],
          blocked: [],
          rejected: [],
        };
        if (tickets) {
          const { todo, done, blocked, rejected } = ticketsObj;
          for (const tick of tickets) {
            if (tick.status.id === 1) {
              todo.push(tick);
            } else if (tick.status.id === 2) {
              done.push(tick);
            } else if (tick.status.id === 3) {
              blocked.push(tick);
            } else {
              rejected.push(tick);
            }
          }
        }

        const selectedTodoIcon = icons.find(
          (item) => item.id === ticketsObj.todo.length
        );
        const selectedDoneIcon = icons.find(
          (item) => item.id === ticketsObj.done.length
        );
        const selectedBlockedIcon = icons.find(
          (item) => item.id === ticketsObj.blocked.length
        );
        const selectedRejectIcon = icons.find(
          (item) => item.id === ticketsObj.rejected.length
        );
        return (
          <Accordion
            key={dev.id}
            expanded={expanded === `panel1${dev.id}`}
            onChange={handleChange(`panel1${dev.id}`)}
            sx={{ backgroundColor: "#333" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#999" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "7%", flexShrink: 0 }}>
                <ImageAvatars url={dev.photo} width={50} height={50} />
              </Typography>
              <Typography
                sx={{
                  width: "70%",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontFamily: "Roboto Mono",
                  fontWeight: 600,
                }}
              >
                {dev.name}
              </Typography>
              <Typography sx={{ width: "20%" }}>
                {selectedTodoIcon?.icon}
                {selectedDoneIcon?.icon}
                {selectedBlockedIcon?.icon}
                {selectedRejectIcon?.icon}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      To Do
                    </Typography>
                    <SelectedListItem tasks={ticketsObj.todo} />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Done
                    </Typography>
                    <SelectedListItem tasks={ticketsObj.done} />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Blocked
                    </Typography>
                    <SelectedListItem tasks={ticketsObj.blocked} />
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Rejected
                    </Typography>
                    <SelectedListItem tasks={ticketsObj.rejected} />
                  </Item>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
