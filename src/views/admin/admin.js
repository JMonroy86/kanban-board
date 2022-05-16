import Grid from "@mui/material/Grid";
import { ClickedCard } from "../../components/cards/clickedCard";
import { servicesData } from "../../constants/services";

export const Admin = () => {
  return (
    <>
      <Grid container spacing={3}>
        {servicesData.map((service, i) => {
          return (
            <Grid key={i} item sm={6} xs={6} md={6} marginBottom={4}>
              <ClickedCard 
                img={service.img}
                title={service.title}
                desc={service.desc}
                path={service.path}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
