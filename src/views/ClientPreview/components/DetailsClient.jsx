import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Icon
} from "@material-ui/core";

function phoneFormat(phoneParam = "") {
  let phone = "phone";
  phone = phoneParam.match(/[0-9]{3}/g);
  phone = `${phone[0] || ""}  ${phone[1] || ""}  ${phone[2] || ""}`;
  return phone;
}

function makePhoneCall(phone) {
  window.open(`tel:${phone}`);
}

function formatAddress(client) {
  let address = "";
  let params = [
    client.address || "",
    client.hood || "",
    client.county || "",
    client.state || "",
    client.country || ""
  ];

  params = params.map(param => param !== "" && param);

  address = params.join(", ");
  return address;
}

function DetailsClient({ params = {} }) {
  return (
    <List>
      {params.client.cellphone && (
        <ListItem>
          <ListItemText
            primary={"CEL: " + phoneFormat(params.client.cellphone)}
          />
          <ListItemSecondaryAction>
            <Icon onClick={() => makePhoneCall(params.client.cellphone)}>
              phone
            </Icon>
          </ListItemSecondaryAction>
        </ListItem>
      )}

      {params.client.phone && (
        <ListItem>
          <ListItemText primary={"TEL: " + phoneFormat(params.client.phone)} />
          <ListItemSecondaryAction>
            <Icon onClick={() => makePhoneCall(params.client.phone)}>
              Tel: phone
            </Icon>
          </ListItemSecondaryAction>
        </ListItem>
      )}

      {params.client.address && (
        <ListItem>
          <ListItemText
            primary={"DIRECCIÓN: " + formatAddress(params.client)}
          />
          <ListItemSecondaryAction>
            <Icon>gps_fixed</Icon>
          </ListItemSecondaryAction>
        </ListItem>
      )}

      {params.client.rfc && (
        <ListItem>
          <ListItemText primary={"RFC: " + params.client.rfc} />
        </ListItem>
      )}

      {params.client.razon_social && (
        <ListItem>
          <ListItemText primary={"RFC: " + params.client.razon_social} />
        </ListItem>
      )}
    </List>
  );
}

export default DetailsClient;
