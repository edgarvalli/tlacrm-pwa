import React from "react";
import { BottomNavigation, BottomNavigationAction, Icon } from "@material-ui/core";

function BottomNavbar(props) {
  return (
    <BottomNavigation className={props.classes}>
      <BottomNavigationAction
        label="Editar"
        icon={<Icon>edit</Icon>}
        showLabel
        onClick={() =>
          props.navigation.go("ClientForm", {
            client: props.params.client,
            action: "update"
          })
        }
      />
    </BottomNavigation>
  );
}

export default BottomNavbar;
