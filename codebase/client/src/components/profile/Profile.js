import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import config from "../../environments/development";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(12, 4),
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
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
    height: 140,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  let user;
  if (props !== null || props !== undefined) {
    user = props.location.state.users;
  }

  return (
    <Container component="section" maxWidth="lg" className={classes.root}>
      <div className={classes.profile}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={4} key={user._id}>
            <Card>
              {user.profile_picture && (
                <CardMedia
                  className={classes.media}
                  image={`${config.baseUrl}uploads/${user.profile_picture}`}
                  title={`${user.name.split(" ")[0]}`}
                />
              )}
              <CardContent>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  {user.name.split(" ")[0]}
                </Typography>
                <Typography className={classes.featureList}>
                  Email: {user.email}
                </Typography>
                <Typography className={classes.featureList}>
                  Role: {user.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
