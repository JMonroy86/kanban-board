import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { ImageAvatars } from "../avatars/avatar";
import { yellow, red, orange, green } from "@mui/material/colors";
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
import { Grid } from "@mui/material";

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
  const { store } = useContext(Context);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {store.devs.map((dev, i) => {
        return (
          <Accordion
            expanded={expanded === `panel1${i}`}
            onChange={handleChange(`panel1${i}`)}
            sx={{ backgroundColor: "#333" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#999" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "7%", flexShrink: 0 }}>
                <ImageAvatars url={dev.urlAvatar} width={40} height={40} />
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
                {" "}
                <Filter1Icon sx={{ marginX: 1, color: yellow[500] }} />
                <Filter5Icon sx={{ marginX: 1, color: green[500] }} />
                <Filter4Icon sx={{ marginX: 1, color: red[500] }} />
                <Filter9PlusIcon sx={{ marginX: 1, color: orange[500] }} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item>
                    <Typography
                      sx={{ color: "#fff", fontFamily: "Roboto Mono" }}
                    >
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
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
