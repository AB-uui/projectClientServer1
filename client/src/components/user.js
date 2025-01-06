import axios from 'axios'
import { useState,useEffect,useRef } from 'react'


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Fab, Pagination, PaginationItem, Stack } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';


const Users = (props) => {
  const [selectedCard, setSelectedCard] = React.useState(0);

  const cards = [
    {
      id: 1,
      title: 'Plants',
      description: 'Plants are essential for all life.',
    },
    {
      id: 2,
      title: 'Animals',
      description: 'Animals are a part of nature.',
    },
    {
      id: 3,
      title: 'Humans',
      description: 'Humans depend on plants and animals for survival.',
    },
  ];
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(true);

const getUsers = async () => {
    //******GET - getAllUsers***** */
    try {
        const res = await axios.get(`http://localhost:7777/api/users/${props.page}`)
        console.log(props.page);
        console.log("propspage.");
        if (res.status === 200) {
            console.log(res.data);
            setUsersData(res.data)
        }
        else{
            
        }
        // debugger
    } catch (e) {
        console.error(e)

    }
    finally {
        setLoading(false);
      }
      

    //******POST - createUser***** */
}
useEffect(() => {
        getUsers();
      }, []);
      const bull = (
<Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
      )

const card = (
  <React.Fragment >
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);
const [open, setOpen] = React.useState(false);
  console.log("fffffff");

  const handleClickOpen = () => {
    setOpen(true);
  console.log("fffffff");

  };

  const handleClose = () => {
    setOpen(false);
  };
const nameRef = React.useRef("")
const usernameRef = React.useRef("")
const emailRef = React.useRef("")
const addressRef = React.useRef("")
const phoneRef = React.useRef("")
const handleAddUser = async() =>{
  console.log("newUser");
  console.log(newUser);
  await axios.post("http://localhost:7777/api/users",newUser)
  getUsers()
}
const newUser = {
  "name":nameRef,
  "username":usernameRef,
  "email":emailRef,
  "address":addressRef,
  "phone":phoneRef
}
    return(
      <>

<Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>

        <div>
        {loading ? (
          <p>Loading...</p>
        ) : usersData.length > 0 ? (
          usersData.map((user) => (
            <div
              key={user._id}
              style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
           {/* <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box> */}
      </div>
      {/* <Stack spacing={2} direction="row">
      <Button variant="text">1</Button>
      <Button variant="contained">2</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack> */}
             {props.ah&&(<Fab color="primary" aria-label="add" size='medium' onClick={handleClickOpen} >
  <AddIcon />
</Fab>)}
<React.Fragment width="1px">


<Dialog
  open={open}
  onClose={handleClose}
  // PaperProps={{
  //   component: 'form',
  //   onSubmit: (event) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     const formJson = Object.fromEntries(formData.entries());
  //     const name = formJson.name;
  //     const username = formJson.username;
  //     const email = formJson.email;
  //     const address = formJson.address;
  //     const phone = formJson.phone;
  //     console.log(formJson);
  //     console.log("formJson");
  //     handleClose();
  //     handleAddUser()

  //   },
  // }}
>
  <DialogTitle>Add a User</DialogTitle>
  <DialogContent>
    
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="email"
      label="name"
      type="text"
      fullWidth
      variant="standard"
      inputRef={nameRef}
      // HTMLInputElement={nameRef}
    />
    <DialogContentText>
     name
    </DialogContentText>

    <TextField
      autoFocus
      margin="dense"
      id="name"
      name="email"
      label="username"
      type="text"
      fullWidth
      variant="standard"
      inputRef={usernameRef}
      // HTMLInputElement={usernameRef}

    />
        <DialogContentText>
     username
    </DialogContentText>
  
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="email"
      label="Email Address"
      type="email"
      fullWidth
      variant="standard"
      inputRef={emailRef}
      // HTMLInputElement={emailRef}
    />
          <DialogContentText>
    email
    </DialogContentText>

    <TextField
      autoFocus
      margin="dense"
      id="name"
      name="email"
      label="address"
      type="text"
      fullWidth
      variant="standard"
      inputRef={addressRef}
      // HTMLInputElement={addressRef}
    />
            <DialogContentText>
  address
    </DialogContentText>
    
    <TextField
      autoFocus
      required
      margin="dense"
      id="name"
      name="email"
      label="phone"
      type="text"
      fullWidth
      variant="standard"
      inputRef={phoneRef}
      // HTMLInputElement={phoneRef}
    />
        <DialogContentText>
    phone
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleAddUser}>Submit </Button>
    {/* <Button type="submit" onClick={handleAddUser}>Submit </Button> */}
  </DialogActions>
</Dialog>
</React.Fragment>
      </>
    )
}

export default Users

