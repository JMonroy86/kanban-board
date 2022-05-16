import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export const ClickedCard = ({ img, title, desc, path }) => {
  return (
    <Link to={path}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={`${process.env.REACT_APP_BUCKET_URL}${img}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
