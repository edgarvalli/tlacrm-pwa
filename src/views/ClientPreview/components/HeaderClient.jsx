import React from "react";
import { Icon } from "@material-ui/core";

function HeaderClient({ params = {}, classes = {}, navigation = {} }) {
  return (
    <div className={classes.previewContainer}>
      <div className={classes.navbar}>
        <Icon onClick={navigation.goBack}>arrow_back</Icon>
      </div>
      {params.client.name}
      <br />
      {params.client.email || ""}
    </div>
  );
}

export default HeaderClient;