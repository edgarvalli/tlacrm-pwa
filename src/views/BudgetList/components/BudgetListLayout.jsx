import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import FloatButton from "../../../components/FloatButton";
import BudgetList from "./BudgetList";
import UpdateBudget from "./UpdateBudget";
import ClientPicker from "../../../components/ClientPicker";

const useStyle = makeStyles({
  root: {
    padding: "5rem 0 4rem 0",
    background: "#e1e1e1"
  },
  card: {
    marginTop: "1rem",
    width: "100%"
  }
});

function BudgetListLayout(props) {
  const classes = useStyle();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openClientPicker, setOpenClientPicker] = React.useState(false);
  const [budget, setBudget] = React.useState({});
  const handleSelectBudget = budget => {
    setBudget(budget);
    setOpenDialog(true);
  };
  return (
    <Container className={classes.root}>
      <ClientPicker
        open={openClientPicker}
        onClose={() => setOpenClientPicker(false)}
        onSelect={client => {
          props.navigation.go("NewBudget", { client });
        }}
      />
      <UpdateBudget
        budget={budget}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <BudgetList {...props} classes={classes} onSelect={handleSelectBudget} />
      <FloatButton icon="add" onClick={() => setOpenClientPicker(true)} />
    </Container>
  );
}

export default BudgetListLayout;
