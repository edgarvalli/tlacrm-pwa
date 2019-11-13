import React from "react";
import evclient from "../../../helpers/evclient";
import {
  Card,
  Switch,
  Dialog,
  Button,
  TextField,
  CardHeader,
  CardActions,
  CardContent,
  FormControlLabel
} from "@material-ui/core";

class UpdateBudget extends React.Component {
  state = {
    budget: this.props.budget || {}
  };

  static getDerivedStateFromProps(props, state) {
    state.budget = props.budget;
    return state;
  }
  handleUpdate = async () => {
    const { budget } = this.state;
    const id = budget._id;
    delete budget._id;
    await evclient("budgets").update(id, budget);
    window.location.reload();
  };

  render() {
    const { budget } = this.state;
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <Card>
          <CardHeader
            title={budget.clientName}
            subheader={
              budget.createDate !== undefined
                ? budget.createDate.replace("T", " ").split(".")[0]
                : ""
            }
          />
          <CardContent>
            <TextField
              value={budget.description || ""}
              label="Descripcion"
              variant="outlined"
              fullWidth
              multiline
              rowsMax={5}
              onChange={ev => {
                budget.description = ev.target.value;
                this.setState(budget);
              }}
            />
            <FormControlLabel
              label="Visitado"
              control={
                <Switch
                  onChange={ev => {
                    budget.visited = ev.target.checked;
                    this.setState(budget);
                  }}
                  checked={budget.visited}
                />
              }
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUpdate}
            >
              Actualizar
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    );
  }
}

export default UpdateBudget;
