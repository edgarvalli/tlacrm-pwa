import React from 'react';
import { AppBar, Toolbar, Icon, Typography } from '@material-ui/core';

function ChildNavbar(props) {
    return (
        <AppBar id="child-navbar">
            <Toolbar>
                <Icon onClick={props.navigation.goBack}>arrow_back</Icon>
                <Typography id="child-navbar-title">{props.params.title}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default ChildNavbar;