import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import "../Style/RecipeCard.css";

interface Props {
    id?: number;
    img_src?: string;
    name?: string;
}

const RecipesCard = (props: Props) => {
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
                <Button variant="contained">
                    <Link to={`/recipes/view/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        View Details
                    </Link>
                </Button>
            </CardContent>
            </Card>
        </Grid>
    );
  };

export default RecipesCard;