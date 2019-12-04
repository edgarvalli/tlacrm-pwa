import React from "react";
import evclient from "../../../helpers/evclient";
import Loader from "../../../components/LinearLoader";
import ListView from "../../../components/ListView";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";

// function fillItems(total = 1000) {
//   const items = [];
//   for(let i = 0; i < 1000; i++) {
//     items.push({
//       name: 'item ' + (i + 1),
//       cellphone: '0123842'
//     })
//   }
//   return items;
// }

function ClientList(props) {
  const [clients, setClients] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    evclient("clients")
      .get()
      .then(response => {
        setClients(response.data);
        setShowLoader(false);
        if (response.error) {
          setErrorMessage(response.message);
          setError(true);
          return;
        } else {
          setClients(response.data);
        }
      })
      .catch(error => {
        setErrorMessage(error);
        setError(true);
      });
  }, []);

  return (
    <>
      <ListView
        data={clients}
        errorMessage={errorMessage}
        error={error}
        renderItems={client => (
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
        )}
      />
      <Loader show={showLoader} message="Obteniendo clientes" />
    </>
  );
}

export default ClientList;
