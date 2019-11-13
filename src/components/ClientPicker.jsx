import React from "react";
import evclient from "../helpers/evclient";
import {
  List,
  Paper,
  Dialog,
  ListItem,
  InputBase,
  makeStyles,
  ListSubheader
} from "@material-ui/core";

const useStyle = makeStyles(theme => {
  return {
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: ".5rem",
      transition: theme.transitions.create("width"),
      width: "100%",
      border: "solid thin"
    }
  };
});

function ClientPicker({ open = false, onClose, onSelect }) {
  const classes = useStyle();
  const [clients, setClients] = React.useState([]);
  React.useEffect(function() {
    evclient("clients")
      .get()
      .then(resp => {
        if (resp.error) return;
        setClients(resp.data);
      });
  }, []);
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper>
        <List>
          <ListSubheader>
            <InputBase
              placeholder="Buscar Cliente"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={ev => {
                const { value } = ev.target;
                evclient("clients")
                  .search(value, ["name"])
                  .then(resp => {
                    if (resp.error) return;
                    setClients(resp.data);
                  });
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </ListSubheader>
          {clients.map(client => (
            <ListItem button onClick={() => onSelect(client)} key={client._id}>
              {client.name}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Dialog>
  );
}

export default ClientPicker;
