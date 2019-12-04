import React from "react";
import { List } from "@material-ui/core";

function ListView({ data, renderItems, reverse }) {
  return (
    <List>
      {reverse ? data.map(renderItems).reverse() : data.map(renderItems)}
    </List>
  );
}

export default ListView;
