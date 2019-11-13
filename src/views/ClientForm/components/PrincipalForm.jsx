import React from "react";
import { TextField } from "@material-ui/core";

function PrincipalForm(props) {
  const { values, handleChange } = props;
  return (
    <>
      <TextField
        label="Nombre Completo"
        name="name"
        type="text"
        value={values.name || ""}
        fullWidth
        required
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Celular"
        name="cellphone"
        type="tel"
        value={values.cellphone || ""}
        fullWidth
        required
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Telefono"
        name="phone"
        type="tel"
        value={values.phone || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Telefono"
        name="email"
        type="email"
        value={values.email || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Calle y Numero"
        name="address"
        type="text"
        value={values.address || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Colonia"
        name="hood"
        type="text"
        value={values.hood || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Municipio"
        name="county"
        type="text"
        value={values.county || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Estado"
        name="state"
        type="text"
        value={values.state || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="País"
        name="contry"
        type="text"
        value={values.country || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
      <TextField
        label="Codigo Postal"
        name="zip"
        type="number"
        value={values.zip || ""}
        fullWidth
        autoComplete="off"
        onChange={handleChange}
      />
    </>
  );
}

export default PrincipalForm;
