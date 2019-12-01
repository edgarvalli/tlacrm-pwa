import React from "react";
import { List } from "@material-ui/core";

function ListView({ data, renderItems }) {
  return <List>{data.map(renderItems)}</List>;
}

export default ListView;
