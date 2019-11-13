import React from "react";
import { LinearProgress } from "@material-ui/core";

function LinearLoader({ show = false, message = "Cargando" }) {
  return show ? (
    <div className="loader-page">
      <LinearProgress />
      <div className="loader-page-message">
        <span>{message}</span>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default LinearLoader;
