import React from "react";
import evclient from "../../../helpers/evclient";
import LinearLoader from "../../../components/LinearLoader";
import {
  Card,
  ListItem,
  CardHeader,
  Typography,
  CardContent,
  CardActions
} from "@material-ui/core";

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
      {budgets.map(budget => (
        <ListItem button key={budget._id} onClick={() => props.onSelect(budget)}>
          <Card className={props.classes.card || {}}>
            <CardHeader
              title={budget.clientName}
              subheader={budget.createDate.replace("T", " ").split(".")[0]}
            />
            <CardContent>
              {budget.description.split("\n").map((row, i) => (
                <div key={row + i}>{row}</div>
              ))}
            </CardContent>
            <CardActions>
              {budget.visited ? "Visitado" : "Sin visitar"}
            </CardActions>
          </Card>
        </ListItem>
      ))}
    </>
  );
}

export default BudgetList;
