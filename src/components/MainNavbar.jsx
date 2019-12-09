import React from "react";
import EVClient from "../helpers/evclient";
import {
  Icon,
  List,
  AppBar,
  Avatar,
  Divider,
  Toolbar,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  SwipeableDrawer,
  Typography
} from "@material-ui/core";

const swipeMenu = [
  {
    reactPath: "ClientList",
    params: {},
    icon: "accessibility",
    label: "Clientes"
  },
  {
    reactPath: "BudgetList",
    params: {},
    icon: "work",
    label: "Presupuesto"
  },
  {
    reactPath: "H?JobList",
    params: {},
    icon: "folder",
    label: "Trabajos"
  }
];

const Swipe = props => {
  const [open, setOpen] = React.useState(props.open);
  const params = new EVClient().setStore();
  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => props.onClose()}
      onOpen={() => props.onOpen()}
    >
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              src={
                "https://ev-server.ddns.net/evserver/image/?id=" +
                params.getItem("ev-id")
              }
            />
          </ListItemAvatar>
          <ListItemText primary={params.getItem("ev-fullname") || ""} />
        </ListItem>
        <ListItem>
          <ListItemText primary={params.getItem("ev-email") || ""} />
        </ListItem>
      </List>

      <Divider />

      <List style={{ width: 250 }}>
        {swipeMenu.map(sm => (
          <ListItem
            button
            key={sm.reactPath}
            onClick={() => props.navigation.switchView(`${sm.reactPath}`)}
          >
            <ListItemIcon>
              <Icon>{sm.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={sm.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

const MainNavbar = props => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <AppBar position="fixed" style={props.style} id="main-navbar">
      <Toolbar variant="regular">
        <Icon onClick={() => setOpenDrawer(true)}>menu</Icon>
        <Typography style={{ marginLeft: "10px" }} variant="h6">
          <span id="titlebar"></span>
        </Typography>
      </Toolbar>
      <Swipe
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
        {...props}
      />
    </AppBar>
  );
};

export default MainNavbar;
