import React from "react";
import evclient from "../../../helpers/evclient";
import LinearLoader from "../../../components/LinearLoader";
import ListView from "../../../components/ListView";

import { ListItem, Typography } from "@material-ui/core";

function BudgetList(props) {
  const [budgets, setBudgets] = React.useState([]);
  const [show, setShow] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    evclient("budgets")
      .get()
      .then(resp => {
        setShow(false);
        if (resp.error) {
          setErrorMessage(resp.message);
        } else {
          setBudgets(resp.data);
        }
      });
  }, []);

  return (
    <>
      <LinearLoader show={show} />
      {errorMessage !== "" && (
        <Typography color="secondary" variant="h6">
          {errorMessage}
        </Typography>
      )}
      <ListView
        data={budgets}
        reverse
        renderItems={budget => (
          <ListItem button key={budget._id} onClick={() => props.onSelect(budget)}>
            <div className="ev-card border-bottom-grey">
              <h4>{budget.clientName}</h4>
              <div style={{ fontSize: ".75rem" }}>
                {budget.createDate.replace("T", " ").split(".")[0]}
              </div>
              <div>
                {budget.description.split("\n").map((row, i) => (
                  <div key={row + i}>{row}</div>
                ))}
              </div>
              <span>{budget.visited ? "Visitado" : "Sin visitar"}</span>
            </div>
          </ListItem>
        )}
      />
    </>
  );
}

export default BudgetList;
