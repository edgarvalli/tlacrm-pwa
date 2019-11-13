import React from "react";
import { TextField } from "@material-ui/core";

function InvoiceForm(props) {
  const { values, handleChange } = props;
  return (
    <>
      <TextField
        name="rfc"
        value={values.rfc || ""}
        onChange={handleChange}
        label="RFC"
        style={{ textTransform: "uppercase" }}
        fullWidth
      />
      <TextField
        name="razonSocial"
        value={values.razonSocial || ""}
        onChange={handleChange}
        label="Razon Social"
        style={{ textTransform: "uppercase" }}
        fullWidth
      />
    </>
  );
}

export default InvoiceForm;
