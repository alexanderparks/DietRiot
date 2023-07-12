import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "../style/IngredientCard.css";

interface Props {
  id?: number;
  img_src?: string;
  name?: string;
  calories?: number;
  sugars?: number;
  carbs?: number;
  protein?: number;
  serving?: string;
  search?: string;
}

const Highlighted = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};

const IngredientsCard = (props: Props) => {
  let calories_string = props.calories!.toString();
  let sugars_string = props.sugars!.toString();
  let carbs_string = props.carbs!.toString();
  let protein_string = props.protein!.toString();
  return (
    <Grid item xs={8} md={10} alignItems="stretch" paddingBottom={5}>
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
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{ height: "330px" }}>
          <h5 style={{ textTransform: "uppercase", textAlign: "center" }}>
            {props.name}
            <Highlighted text={props.name} highlight={props.search} />
          </h5>
          <br></br>
          <p>
            <strong>Calories:</strong>{" "}
            {props.calories ? props.calories.toFixed(2) : 0}
            <Highlighted text={calories_string} highlight={props.search} />
          </p>
          <p>
            <strong>Sugars:</strong>{" "}
            {props.sugars ? props.sugars.toFixed(2) : 0}
            <Highlighted text={sugars_string} highlight={props.search} />
          </p>
          <p>
            <strong>Carbs:</strong> {props.carbs ? props.carbs.toFixed(2) : 0}
            <Highlighted text={carbs_string} highlight={props.search} />
          </p>
          <p>
            <strong>Protein:</strong>{" "}
            {props.protein ? props.protein.toFixed(2) : 0}
            <Highlighted text={protein_string} highlight={props.search} />
          </p>
          <p>
            <strong>Serving(s):</strong> {props.serving}
            <Highlighted text={props.serving} highlight={props.search} />
          </p>
        </CardContent>

        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "40px" }}
        >
          <Button variant="contained">
            <Link
              to={`/ingredients/view/${props.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View Details
            </Link>
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default IngredientsCard;
