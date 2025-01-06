import './App.css';
import { Routes, Route,Router, Link, useNavigate } from "react-router-dom";
import Users from './components/user';
import Todos from './components/todo';
import Posts from './components/post';
import Photos from './components/photo';
// import { Box, Grid } from '@mui/material';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, Typography, Grid, Box, Button,Select ,FormControl,MenuItem,InputLabel, OutlinedInput, TextField, Pagination, Stack, Fab} from "@mui/material";
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
  const [view, setView] = useState("0");
  const [criteria, setCriteria] = useState(["criteria"]);
  const [open, setOpen] = React.useState(false);
  const [ah, setAh] = React.useState(false);
 
  const handleChangeOp = (event) => {
    setView(event.target.value);
  };
  const filterHandle = (event) => {
    // (event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    //send..
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log("uuuuu");

  };
  // const sendValue = (value) => {
  //   // setIsDrawerOpen(!isDrawerOpen);
  // };
  const handleChange = (event) => {
    setView(event.target.value);
  };
  const [page, setPage] = React.useState(0);

  const handlePage = (event, value) => {
    setPage(value-1);
    console.log(value);
    
  };

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      {/* Empty space at the top */}
      <Box sx={{ height: "25px", backgroundColor: "#f5f5f5" }} />

      {/* AppBar with menu */}
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
      <Box sx={{ width:"60%"}} />

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
          placeholder="Text or ID"
          multiline
          variant="filled"
          color='secondary'
          onChange={filterHandle}
        />
      </Box>)}
      <Box sx={{ width:"40%"}} />

          {/* <Button color="inherit">Filter</Button> */}
          {/* <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
  <InputLabel id="demo-simple-select-label">VIEW</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    multiple
    displayEmpty
    value={view}
    label="view"
    onChange={handleChange}
    renderValue={(view) => {
      if (view === 0) {
        return <em>All Items</em>;
      }}}
  >
    <MenuItem value={[1]}>Ten</MenuItem>
    <MenuItem value={[2]}>Twenty</MenuItem>
    <MenuItem value={[3]}>Thirty</MenuItem>
  </Select>
</FormControl> */}
{/* <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={view}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(view) => {
            if (view[0] === 0) {
              return <em>All Items</em>;
            }
            return view
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        > */}
        
          {/* {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))} */}
            <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
        
      </Button>
      {ah && (<FormControl sx={{ m: 1, width: 500}}>
        <InputLabel id="demo-controlled-open-select-label">view</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={view}
          label="All item"
          onChange={handleChangeOp}
          aria-hidden={ah}
          hidden={ah}
          
        >
          <MenuItem value="0">
            <em>All item</em>
          </MenuItem>
    <MenuItem  value={"1"} >{criteria}</MenuItem>

        </Select>
      </FormControl>)}
        </Toolbar>
      </AppBar>
     

      {/* Responsive Grid */}

{/* Responsive Grid */}
{/* <Box sx={{ marginTop: 4 }}> Adds spacing above the grid */}
  <Grid container spacing={4} sx={{ padding: 10 }}>
    {/* {[...Array(1).keys()].map((item) => ( */}
      {/* <Grid  container  rowSpacing={2} xs={12} sm={22} md={20} > */}
      {/* <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 12, md: 3 }}> */}
      <Grid  container  rowSpacing={2} xs={12} sm={12} md={12} >
<Grid xs={12}>

        <Box
          sx={{
            padding: 20,
            textAlign: "center",
            backgroundColor: "#e0f7fa",
            borderRadius: 2,
          }}
        >
          Grid Item 1
          <Routes>
       <Route path="/users" element = {<Users page={page} ah={ah}/>}/>
           <Route path="/todos" element = {<Todos/>}/>
           <Route path="/posts" element = {<Posts/>}/>
           <Route path="/photos" element = {<Photos/>}/>
           <Route path="/add" element = {<FormDialog/>}/>
         </Routes>
        </Box>
        </Grid> 
<Grid xs={12}>
<Box sx={{ width:"40%"}} />
<Box
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            
          }}
        >
          Grid Item 2
          <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10}  onChange={handlePage} />
    </Stack>
        </Box>
</Grid> 

<Grid xs={12}>

        <Box
          sx={{
            padding: 2,
            textAlign: "left",
            backgroundColor: "#e0f7fa",
            borderRadius: 2,
          }}
        >
          Grid Item 3
          {/* {ah&&(<Fab color="primary" aria-label="add" size='medium' onClick={handleAdd}>
  <AddIcon />
</Fab>)} */}
        </Box></Grid>
      </Grid>
    {/* ))} */}
  </Grid>
{/* </Box> */}

{/* <Router>
      <Navbar />

      </Router> */}
    

      {/* Drawer (Navbar) */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        {/* <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6">Menu</Typography>
          <Button fullWidth onClick={() => alert("Option 1 Clicked")}>
            Option 1
          </Button>
          <Button fullWidth onClick={() => alert("Option 2 Clicked")}>
            Option 2
          </Button>
          <Button fullWidth onClick={() => alert("Option 3 Clicked")}>
            Option 3
          </Button>
        </Box> */}
         {/* <AppBar position="static" sx={{ backgroundColor: "#007FFF" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <MuiLink
            component={RouterLink}
            to="/Users"
            underline="none"
            color="inherit"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Users
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/Todos"
            underline="none"
            color="inherit"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Todos
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/Posts"
            underline="none"
            color="inherit"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Posts
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/Photos"
            underline="none"
            color="inherit"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Photos
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar> */}
              <Navbar whatOpen={setWhatOpen} isDrawerOpen={setIsDrawerOpen} criteria={setCriteria} view={setView} ah={setAh}/>

      </Drawer>
    </Box>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">


//     <Box sx={{ width: '100%' }}>
//     <Stack
//         spacing={{ xs:'20%', sm: '20%'}}
//         direction="row"
//         useFlexGap
//         sx={{ flexWrap: 'wrap' }}>
//         <Link to={'/Users'}></Link>
//         <Link to={'/Users'}>users</Link>
//         <Link to={'/Todos'}>todos</Link> 
//         <Link to={'/Posts'}>posts</Link> 
//         <Link to={'/Photos'}>photos</Link>
      
//         </Stack>
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         <Grid xs={4}>
//         <Stack direction="row" spacing={2}>
//       <Button variant="outlined">Primary</Button>
//       <Button variant="outlined" disabled>
//         Disabled
//       </Button>
//       <Button variant="outlined" href="#outlined-buttons">
//         Link
//       </Button>
//     </Stack>
//     </Grid>
//         <Grid item xs={2}>
//           <Link to={'/Users'}>users</Link>
//         </Grid>
//         <Grid item xs={2}>
//           <Link to={'/Todos'}>todos</Link> 
//         </Grid>
//         <Grid item xs={2}>
//            <Link to={'/Posts'}>posts</Link> 
//         </Grid>
//         <Grid item xs={2}>
//            <Link to={'/Photos'}>photos</Link>
//         </Grid>
//         {/* <Grid item xs={4}>
          
//         </Grid> */}
//       </Grid>
//     </Box>
  
             
              

//         <Routes>
//           <Route path="/users" element = {<Users/>}/>
//           <Route path="/todos" element = {<Todos/>}/>
//           <Route path="/posts" element = {<Posts/>}/>
//           <Route path="/photos" element = {<Photos/>}/>
//         </Routes>
  
//     </div>
//   );
// }

// export default App;
