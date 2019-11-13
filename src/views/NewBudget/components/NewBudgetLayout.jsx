import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import evclient from "../../../helpers/evclient";

const useStyle = makeS

function NewBudgetLayout(props) {
  const params = props.navigation.getParams();

  React.useEffect(() => {
    console.log(params);
    document.getElementById("child-navbar-title").innerText =
      params.client.name || "Name";
  }, []);
  return (
    <Container>
      <textarea
        name="description"
        id="description"
        placeholder="Escribe la descripcion del presupuesto"
        style={{ width: "100vw", height: "90vh" }}
      >
        Escribe la descripcion del presupuesto
      </textarea>
    </Container>
  );
}

export default NewBudgetLayout;
