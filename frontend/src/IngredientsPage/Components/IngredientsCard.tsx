import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import "../Style/IngredientCard.css";

interface Props {
    img_src?: string;
    name?: string;
}

const IngredientsCard = (props: Props) => {
    return (
        <Grid item xs={8}>
            <Card
            sx={{
                transition: "transform 0.15s ease-in-out",
                "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: 3,
                },
            }}
            >
            <CardMedia
                component="img"
                height="200px"
                alt="food pic"
                src={props.img_src}
            />
            <CardContent>
                <Typography variant="h5">{props.name}</Typography>
            </CardContent>
            </Card>
        </Grid>
    );
  };
  

export default IngredientsCard;