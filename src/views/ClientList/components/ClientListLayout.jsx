import React from "react";
import { Container } from "@material-ui/core";
import ClientList from "./ClientList";
import FloatButton from "../../../components/FloatButton";

function ClientListLayout(props) {
  return (
    <Container style={{ marginTop: "4rem" }}>
      <ClientList {...props}/>
      <FloatButton
        onClick={() => {
          props.navigation.go("ClientForm");
        }}
      />
    </Container>
  );
}

export default ClientListLayout;
