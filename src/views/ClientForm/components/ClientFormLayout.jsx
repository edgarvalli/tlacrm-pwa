import React from "react";
import evclient from "../../../helpers/evclient";
import FloatButton from "../../../components/FloatButton";
import PrincipalForm from "./PrincipalForm";
import {
  Container,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import InvoiceForm from "./InvoiceForm";

const ClientModel = {
  name: "",
  rfc: "",
  cellphone: "",
  email: "",
  jobs: [],
  desc: "",
  invoiceInfo: false,
  phone: "",
  address: "",
  country: "Mexico",
  county: "",
  state: "Nuevo León",
  hood: "",
  razonSocial: "",
  zip: ""
};

class ClientFormLayout extends React.Component {
  params = this.props.navigation.getParams();
  state = {
    values: ClientModel,
    dialog: {
      open: false,
      message: ""
    }
  };

  componentDidMount() {
    if (this.params.action === "update") {
      this.setState({ values: this.params.client });
    }
  }

  handleClose = () => this.setState({ dialog: { open: false, message: "" } });

  handleChange = ev => {
    this.setState({
      values: {
        ...this.state.values,
        [ev.target.name]: ev.target.value
      }
    });
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    const { values } = this.state;
    if (values.name === "") {
      this.setState({
        dialog: {
          open: true,
          message:
            "El campo 'Nombre Completo' es obligatorio, favor de llenarlo"
        }
      });
      return;
    }

    if (values.cellphone === "") {
      this.setState({
        dialog: {
          open: true,
          message: "El campo 'Celular' es obligatorio, favor de llenarlo"
        }
      });
      return;
    }

    if (this.params.action === "update") {
      const id = values._id;
      delete values._id;
      await evclient("clients").update(id, values);
      this.props.navigation.goMain();
    } else {
      /*
        response return an object with 2 keys
        error and result, result key contains insertedId
        what is the key of the new record saved 
      */
      await evclient("clients").add(values);
      this.props.navigation.goMain();
    }
  };

  render() {
    const { values, dialog } = this.state;
    return (
      <Container style={{ marginTop: "5rem" }}>
        <form onSubmit={this.handleSubmit}>
          <PrincipalForm values={values} handleChange={this.handleChange} />
          <FormControlLabel
            label="Datos de facturacion"
            style={{ margin: "1rem 0 0 1rem" }}
            control={
              <Switch
                checked={values.invoiceInfo || false}
                onChange={ev => {
                  this.setState({
                    values: {
                      ...this.state.values,
                      [ev.target.name]: ev.target.checked
                    }
                  });
                }}
                name="invoiceInfo"
                color="primary"
              />
            }
          />
          {values.invoiceInfo && (
            <InvoiceForm values={values} handleChange={this.handleChange} />
          )}
          <FloatButton icon="save" onClick={this.handleSubmit} />

          <Dialog open={dialog.open} onClose={this.handleClose}>
            <DialogTitle>Atención</DialogTitle>
            <DialogContent>{dialog.message}</DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </Container>
    );
  }
}

export default ClientFormLayout;
