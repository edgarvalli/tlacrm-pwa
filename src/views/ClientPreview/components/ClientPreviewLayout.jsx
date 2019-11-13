import React from "react";
import BottomNavbar from "./BottomNavbar";
import DetailsClient from "./DetailsClient";
import HeaderClient from "./HeaderClient";

import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  bottomNav: {
    position: "fixed",
    width: "100%",
    bottom: 0
  },
  previewContainer: {
    background: theme.palette.primary.main,
    height: "40vh",
    color: "#ffffff",
    display: "flex",
    alignItems: "flex-end",
    padding: "1rem",
    textAlign: "center",
    justifyContent: "center"
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: ".5rem"
  }
}));

function ClientPreviewLayout(props) {
  const params = props.navigation.getParams();
  const classes = useStyle();
  React.useEffect(() => {
    const navbar = document.getElementById("child-navbar");
    navbar.style.display = "none";
  });
  return (
    <>
      <HeaderClient
        params={params}
        classes={classes}
        navigation={props.navigation}
      />
      <DetailsClient params={params} />
      <BottomNavbar {...props} classes={classes.bottomNav} params={params} />
    </>
  );
}

export default ClientPreviewLayout;
