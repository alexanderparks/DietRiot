import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from"@mui/material/Box";

import "../Style/DietGroupCard.css";

interface Props {
    id?: number;
    img_src?: string;
    name?: string;
    restrictions?: string;
}

const DietGroupsCard = (props: Props) => {
    return (
        <Grid item xs={8} md = {10} alignItems="stretch" paddingBottom={5}>
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
                <h5 style={{textTransform: "uppercase", textAlign: "center"}}>{props.name}</h5><br></br>
                <p><strong>Restrictions:</strong> {props.restrictions}</p>
            </CardContent>
            <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{marginBottom: "75px"}}
            >
            <Button variant="contained">
                    <Link to={`/dietgroups/view/${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        View Details
                    </Link>
                </Button>
            </Box>
            </Card>
        </Grid>
    );
  };

export default DietGroupsCard;