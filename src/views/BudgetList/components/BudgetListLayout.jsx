import React from "react";
import FloatButton from "../../../components/FloatButton";
import BudgetList from "./BudgetList";
import UpdateBudget from "./UpdateBudget";
import ClientPicker from "../../../components/ClientPicker";

function BudgetListLayout(props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openClientPicker, setOpenClientPicker] = React.useState(false);
  const [budget, setBudget] = React.useState({});
  const handleSelectBudget = budget => {
    setBudget(budget);
    setOpenDialog(true);
  };
  return (
    <div style={{ marginTop: "3rem" }}>
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
      <BudgetList {...props} onSelect={handleSelectBudget} />
      <FloatButton icon="add" onClick={() => setOpenClientPicker(true)} />
    </div>
  );
}

export default BudgetListLayout;
