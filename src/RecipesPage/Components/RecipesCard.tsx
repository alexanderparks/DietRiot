import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import "../style/RecipeCard.css";

interface Props {
  id?: number;
  img_src?: string;
  name?: string;
  carlories?: number;
  servings?: number;
  search?: string;
  ingredients: any[];
}

let not_highlighted: boolean = true;
const Highlighted = ({ text = "", highlight = "" }) => {
  if (text == null) {
    return <span>{text}</span>;
  }
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <mark key={i}>{part}{not_highlighted = false}</mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};


const RecipesCard = (props: Props) => {
  let carls_string = props.carlories!.toString();
  let serving_string = props.servings!.toString();
  console.log(props.ingredients)
  const HighlightedButton = () => {
    if(not_highlighted){
      return <mark>View Details</mark>
    } 
    return <span>View Details</span>
  };

  return (
    <Grid item xs={12} md={10} alignItems="stretch" paddingBottom={5}>
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
        <CardContent sx={{ height: "220px" }}>
          <h5 style={{ textTransform: "uppercase", textAlign: "center" }}>
            <Highlighted text={props.name} highlight={props.search} />
          </h5>
          <br></br>
          <p>
            <strong>Carbs</strong>:{" "}
            <Highlighted text={carls_string} highlight={props.search} />
          </p>
          <p>
            <strong>Serving(s)</strong>: {" "}
            <Highlighted text={serving_string} highlight={props.search} />
          </p>
        </CardContent>
        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "50px" }}
        >
          <Button variant="contained">
            <Link
              to={`/recipes/view/${props.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <HighlightedButton/>
              
            </Link>
            
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default RecipesCard;
