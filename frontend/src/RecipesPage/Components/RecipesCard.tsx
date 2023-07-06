import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from"@mui/material/CardMedia";
import Box from"@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import "../Style/RecipeCard.css";

interface Props {
    id?: number;
    img_src?: string;
    name?: string;
    carb?: number;
    servings?: number;
}

const RecipesCard = (props: Props) => {
    return (
        <Grid item xs = {12}  md = {10} alignItems="stretch" paddingBottom={5}>
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
            <CardContent sx = {{height:"200px"}}>
                <h5>{props.name}</h5><br></br>
                <p>Carbs: {props.carb}</p>
                <p>Serving(s): {props.servings}</p>
            </CardContent>
            <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{marginBottom: "75px"}}
            >
                <Button variant="contained">
                    <Link to={`/recipes/view/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        View Details
                    </Link>
                </Button>
            </Box>
           
            </Card>
        </Grid>
    );
  };

export default RecipesCard;