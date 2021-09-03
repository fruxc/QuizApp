import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 4),
  },
  quiz: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    margin: "auto",
    justifyContent: "center",
    alignItem: "center",
  },
  card: {
    height: "400px",
    width: "100%",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "5px",
    textAlign: "center",
  },
  title: {
    padding: theme.spacing(2),
  },
  featureList: {
    padding: theme.spacing(2),
  },
  media: {
    height: 90,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.quiz}>
      <Container component="section" maxWidth="lg" className={classes.root}>
        <Grid container spacing={2} justifyContent="center" direction="row">
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  HTML
                </Typography>
                <Typography className={classes.featureList}>Feature</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  CSS
                </Typography>
                <Typography className={classes.featureList}>Feature</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  JavaScript
                </Typography>
                <Typography className={classes.featureList}>Feature</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
