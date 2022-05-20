import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { ClickedCard } from "../../components/cards/clickedCard";
import { servicesData } from "../../constants/services";
import { Context } from "../../store/appContext";

export const Admin = () => {
  const { store } = useContext(Context);
  return (
    <>
      <Grid container spacing={3}>
        {store.currentUser?.rolsId === 1 && (
          <Grid item sm={6} xs={6} md={6} marginBottom={4}>
            <ClickedCard
              img={"users_crud.jpg"}
              title={"Devs Manager"}
              desc={
                "Lizards are a widespread group of squamate reptiles, with over 6,000 species"
              }
              path={"../devs_manager"}
            />
          </Grid>
        )}
        <Grid item sm={6} xs={6} md={6} marginBottom={4}>
          <ClickedCard
            img={"tasks.jpg"}
            title={"Task Builder"}
            desc={
              "Lizards are a widespread group of squamate reptiles, with over 6,000 species"
            }
            path={"../tasks_builder"}
          />
        </Grid>
      </Grid>
    </>
  );
};
