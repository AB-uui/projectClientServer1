import React, { useState } from "react";
import { AppBar, Toolbar, Link as MuiLink, Typography, Box ,Button} from "@mui/material";
// import { AppBar, Toolbar, IconButton, Drawer, Typography, Grid, Box, Button } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

function Navbar(props) {
  return (<>
    <AppBar position="static" sx={{ backgroundColor: "#007FFF" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        </Toolbar>
        </AppBar>
        {/* <Box sx={{ display: "flex", gap: 2 }}> */}
        <Box sx={{ width: 250, padding: 2 }} role="presentation" >
        <Box sx={{ height: "10px", backgroundColor: "#fff" }} />

        <Button fullWidth  onClick={() =>{props.whatOpen("Users"); props.isDrawerOpen(false); props.criteria("With address"); props.view("0"); props.ah(true)}} >
          
          <MuiLink
            component={RouterLink}
            to="/Users"
            underline="none"
            color="inherit"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
            
          >
            Users
          </MuiLink>
          </Button>
                <Box sx={{ height: "10px", backgroundColor: "#fff" }} />
          
        <Button fullWidth onClick={() =>{props.whatOpen("Todos"); props.isDrawerOpen(false); props.criteria("Uncompleted Todos");props.view("0"); props.ah(true)}}>

          <MuiLink
            component={RouterLink}
            to="/Todos"
            underline="none"
            color="inherit"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Todos
          </MuiLink>
          </Button>
          <Box sx={{ height: "10px", backgroundColor: "#fff" }} />

        <Button fullWidth onClick={() =>{props.whatOpen("Posts"); props.isDrawerOpen(false); props.criteria("New Posts");props.view("0"); props.ah(true)}}>

          <MuiLink
            component={RouterLink}
            to="/Posts"
            underline="none"
            color="inherit"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Posts
          </MuiLink>
          </Button>
          <Box sx={{ height: "10px", backgroundColor: "#fff" }} />

        <Button fullWidth disabled>

          <MuiLink
            component={RouterLink}
            to="/Photos"
            underline="none"
            color="inherit"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Photos
          </MuiLink>
          </Button>

        </Box>
      {/* </Toolbar> */}
    {/* </AppBar> */}</>
  );
}

export default Navbar;

