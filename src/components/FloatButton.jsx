import React from "react";
import { Fab, Icon, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
    float: {
        position: 'fixed',
        right: 20,
        bottom: 20
    }
})

function FloatButton({ icon = "add", onClick }) {
  return (
    <Fab onClick={onClick} className={useStyle().float} color="primary">
      <Icon>{icon}</Icon>
    </Fab>
  );
}

export default FloatButton;
