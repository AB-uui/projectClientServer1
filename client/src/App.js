import './App.css';
import axios from 'axios'
import { Routes, Route, Router, Link, useNavigate } from "react-router-dom";
import Users from './components/user';
import Todos from './components/todo';
import Posts from './components/post';
import Photos from './components/photo';
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, Typography, Grid, Box, Button, Select, FormControl, MenuItem, InputLabel, OutlinedInput, TextField, Pagination, Stack, Fab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "./components/navbarMenu";
import FullWidthTabs from './components/navbarMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from './components/userA';

function App() {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [whatOpen, setWhatOpen] = useState("Aplication");
  const [view, setView] = useState(1);
  const [criteria, setCriteria] = useState(["criteria"]);
  // const [open, setOpen] = React.useState(false);
  const [ah, setAh] = React.useState(false);
  const [text, setText] = React.useState("");

  // const handleChangeOp = (event) => {
  //   setView(event.target.value);
  // };
  const filterHandle = (event) => {
    setText(event.target.value);
    setPage(0)
  };
  
  // const handleClose = async () => {
  //   setOpen(false);
    
    // const app = whatOpen.toLowerCase()
    // if (view === "0") {
    //   await axios.get(`http://localhost:7777/api/${app}/${page}`)
    // }
    // else {
    //   switch (app) {
    //     case "users": await axios.get(`http://localhost:7777/api/${app}/address/${page}`)
    //     case "todos": await axios.get(`http://localhost:7777/api/${app}/Uncompleted/${page}`)
    //     case "posts": await axios.get(`http://localhost:7777/api/${app}/new/${page}`)
    //   }
    // }
    //send..
  // };
  // const handleChange1 = (event) => {
  //   setView(event.target.value);
  //   console.log(view);
    
  // };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setPage(0)
  };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`${selectedValue} selectedValue`);
    console.log(view);
    setView(selectedValue)
    setPage(0)
    };
  const [page, setPage] = React.useState(0);

  const handlePage = (event, value) => {
    setPage(value - 1);
    console.log(value);

  };

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ height: "25px", backgroundColor: "#f5f5f5" }} />
      <AppBar position="relative" sx={{ backgroundColor: "#007FFF" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {whatOpen}
          </Typography>
          <Box sx={{ width: "60%" }} />

          {ah && (<Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '35ch', } }}
            noValidate
            autoComplete="off"
            color={'black'}
          >
            <TextField
              id="filled-textarea"
              label="search"
              placeholder="Type text to search"
              multiline
              variant="filled"
              color='secondary'
              onChange={filterHandle}
            />
          </Box>)}
          <Box sx={{ width: "40%" }} />

          {/* <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}></Button> */}
          {ah && (<FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id="views-label">view</InputLabel>
            <Select
              labelId="views-label"
              id="views-select"
              // open={open}
              // onClose={handleClose}
              // onOpen={handleOpen}
              value={view}
              label="view"
              // onChange={handleChange1}
              onSelect={handleChange}
            >
              <MenuItem value={0}>All item</MenuItem>
              <MenuItem value= {1}>{criteria}</MenuItem>

            </Select>
          </FormControl>)}
        </Toolbar>
      </AppBar>

      {ah && (<Grid container spacing={4} sx={{ padding: 8 }}>
        <Grid container rowSpacing={2} xs={12} sm={12} md={12} >
          <Grid xs={12}>

            <Box
              sx={{
                padding: 4,
                textAlign: "center",
                backgroundColor: "#e0f7fa",
                borderRadius: 2,
              }}
            >

              <Routes>
                <Route path="/users" element={<Users key={page} text={text} view={view} page={page} ah={ah} />} />
                <Route path="/todos" element={<Todos key={page} text={text} view={view} page={page} ah={ah} />} />
                <Route path="/posts" element={<Posts key={page} text={text} view={view} page={page} ah={ah} />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/add" element={<FormDialog />} />
              </Routes>
            </Box>
          </Grid>
          <Grid container justifyContent="center" xs={12}>
            <Box sx={{ width: "40%" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                textAlign: "center",
                backgroundColor: "#f5f9f3",
                borderRadius: 2,
                width: "100%",
              }}
            >
              <Stack spacing={2}>
                <Pagination count={10} onChange={handlePage} />
              </Stack>
            </Box>
          </Grid>

        </Grid>
      </Grid>)}
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Navbar whatOpen={setWhatOpen} isDrawerOpen={setIsDrawerOpen} criteria={setCriteria} view={setView} ah={setAh} />
      </Drawer>
    </Box>
  );
}

export default App;
