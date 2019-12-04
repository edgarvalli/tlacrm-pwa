import React from "react";
import { Container } from "@material-ui/core";
import FloatButton from "../../../components/FloatButton";
import evclient from "../../../helpers/evclient";

function NewBudgetLayout(props) {
  const [val, setVal] = React.useState("");
  const params = props.navigation.getParams();
  const budget = {
    clientId: params.client._id,
    clientName: params.client.name,
    clientCellphone: params.client.cellphone || "",
    visited: false,
    comments: [],
    description: val
  };

  React.useEffect(() => {
    document.getElementById("child-navbar-title").innerText =
      params.client.name || "Name";
  });

  const handleEvent = async () => {
    if (val === "") return alert("Debe escribir una descripcion!!!");
    const response = await evclient("budgets")
      .add(budget)
      .catch(error => alert(error));
    if (response.error) return alert(response.error);
    props.navigation.goBack();
  };

  return (
    <Container style={{ marginTop: "4rem" }}>
      <textarea
        name="description"
        id="description"
        placeholder="Escribe la descripcion del presupuesto"
        onChange={ev => setVal(ev.target.value)}
        style={{
          width: "100%",
          height: "80vh",
          padding: "1rem",
          border: "none"
        }}
      />
      <FloatButton onClick={handleEvent} />
    </Container>
  );
}

export default NewBudgetLayout;
