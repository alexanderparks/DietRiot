import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from"@mui/material/Box";

import "../Style/IngredientCard.css";

interface Props {
    id?: number;
    img_src?: string;
    name?: string;
    calories?: number;
    sugars?: number;
    carbs?: number;
    protein?: number;
    serving?: string;
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
                sx={{objectFit: "contain"}}
            />
            <CardContent>
                <h5 style={{textTransform: "uppercase", textAlign: "center"}}>{props.name}</h5><br></br>
                <p><strong>Calories:</strong> {props.calories ? props.calories.toFixed(2) : 0}</p>
                <p><strong>Sugars:</strong> {props.sugars ? props.sugars.toFixed(2) : 0}</p>
                <p><strong>Carbs:</strong> {props.carbs ? props.carbs.toFixed(2) : 0}</p>
                <p><strong>Protein:</strong> {props.protein ? props.protein.toFixed(2) : 0}</p>
                <p><strong>Serving(s):</strong> {props.serving}</p>
            </CardContent>

            <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{marginBottom: "40px"}}
            >
                <Button variant="contained">
                    <Link to={`/ingredients/view/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        View Details
                    </Link>
                </Button>
            </Box>
            </Card>
            
        </Grid>
    );
  };
  

export default IngredientsCard;