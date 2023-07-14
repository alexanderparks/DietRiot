import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "../style/DietGroupCard.css";

interface Props {
  id?: number;
  img_src?: string;
  name?: string;
  restrictions?: string;
  desc: string;
  percentage: number;
  search?: string;
}



const DietGroupsCard = (props: Props) => {
  let not_highlight: boolean = true;
  let searched: boolean = true;
  if(props.search === "" || props.search == null){
    searched = false;
  }
  const HighlightedButton = () => {
    if(not_highlight && searched){
      return <mark>View Details</mark>
    } 
    return <span>View Details</span>
  };

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
            <mark key={i}>{part}{not_highlight = false}</mark>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </span>
    );
  };
  
  let percent_string = props.percentage!.toString();
  
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
        <CardContent sx={{ height: "270px" }}>
          <h5 style={{ textTransform: "uppercase", textAlign: "center" }}>
            <Highlighted text={props.name} highlight={props.search} />
          </h5>
          <br></br>
          <p>
            <strong>Restrictions:</strong>{" "}
            <Highlighted text={props.restrictions} highlight={props.search} />
          </p>
          <p>
            <strong>Percentage:</strong>{" "}
            <Highlighted text={percent_string} highlight={props.search} />%
          </p>
        </CardContent>
        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "25px", paddingTop: "25px" }}
        >
          <Button variant="contained">
            <Link
              to={`/dietgroups/view/${props.id}`}
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

export default DietGroupsCard;
