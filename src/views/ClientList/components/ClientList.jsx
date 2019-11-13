import React from "react";
import evclient from "../../../helpers/evclient";
import Loader from "../../../components/LinearLoader";
import {
  List,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography
} from "@material-ui/core";

function ClientList(props) {
  const [clients, setClients] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    evclient("clients")
      .get()
      .then(response => {
        console.log(response)
        // setClients(response.children);
        setShowLoader(false);
        if (response.error) {
          setErrorMessage(response.message);
          return;
        } else {
          setClients(response.data);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <List>
      {clients.map(client => (
        <ListItem
          key={client._id}
          button
          onClick={() => props.navigation.go("ClientPreview", { client })}
        >
          <ListItemAvatar>
            <Avatar>{client.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={client.name}
            secondary={client.cellphone || client.phone || ""}
          />
        </ListItem>
      ))}
      {clients.length <= 0 && (
        <Typography color="secondary" variant="h6">{errorMessage}</Typography>
      )}
      <Loader show={showLoader} message="Obteniendo clientes" />
    </List>
  );
}

export default ClientList;
