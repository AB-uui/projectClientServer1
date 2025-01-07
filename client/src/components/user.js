import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

import * as React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, CardActionArea } from '@mui/material';
import { Fab, Pagination, PaginationItem, Stack, Alert, Snackbar } from '@mui/material';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Users = (props) => {

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
    anchor: { vertical: "top", horizontal: "center" }
  });
  const handleDelete = async (id) => {
    console.log("Delete user with ID:", id);

    try {
      const response = await axios.delete("http://localhost:7777/api/users/", { data: { _id: id } });
      setSnackbar({
        open: true,
        type: "success",
        message: response.data,
        anchor: { vertical: "top", horizontal: "center" }
      });
      getUsers();
    } catch (e) {
      console.error("Error deleting user:", e);
      setSnackbar({
        open: true,
        type: "error",
        message: "Error deleting user. Please try again.",
        anchor: { vertical: "top", horizontal: "center" }
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [usersData, setUsersData] = useState([])
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    setLoading(true);
    let res 
    try {
      console.log(props.view);
      {
      if(props.view==="1"){
              res = await axios.get(`http://localhost:7777/api/users/${props.page}`)
      }
      else if(props.view==="2"){
        res = await axios.get(`http://localhost:7777/api/users/address/${props.page}`)
      }
    }
      if (res.status === 200 && Array.isArray(res.data)) {
        setUsersData(res.data)
      }
      else {
        setUsersData([])

      }
    } catch (e) {
      console.error(e)
      setUsersData([]);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUsers();
  }, [props.page]);
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  )

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    phone: ""
  });
  const [addup, setAddup] = useState(0)
  const handleUpdate = (user) => {
    setAddup(1)
    setSelectedUser(user);
    setState("Edit")
    setOpen(true);
  };
  const handleAdd = () => {
    setAddup(2)
    setState("Add")
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser({
      name: "",
      username: "",
      email: "",
      address: "",
      phone: ""
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle submission of the updated data
  const handleSubmit = async () => {

    try {
      let response;
      if (addup === 1) {
        response = await axios.put("http://localhost:7777/api/users/", selectedUser);
      }
      else {//if(addup===2){
        response = await axios.post("http://localhost:7777/api/users/", selectedUser);
      }
      setSnackbar({
        open: true,
        type: "success",
        message: response.data,
        anchor: { vertical: "top", horizontal: "center" }
      });
      getUsers();
    } catch (e) {
      console.error("Error deleting user:", e);
      setSnackbar({
        open: true,
        type: "error",
        message: "Error deleting user. Please try again.",
        anchor: { vertical: "top", horizontal: "center" }
      });
    }

    handleClose();
  };
  const [state,setState] = useState("")
  return (
    <>
      <div>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: 4,
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : usersData && usersData.length > 0 ? (
            usersData.map((user, index) => (
              <Card key={user._id}>
                <CardActionArea
                  onClick={() => setSelectedCard(index === selectedCard ? null : index)}
                  data-active={selectedCard === index ? "" : undefined}
                  sx={{
                    flexGrow: 1,
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selectedHover",
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "12px", position: "absolute", top: 8, left: 8 }}
                    >
                      ID: {user._id}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1, fontSize: "30px", fontStyle: "italic", fontFamily: "fantasy" }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.phone}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AddCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                        {selectedCard !== index && "More Details"}
                      </div>
                      {selectedCard === index && (
                        <div style={{ marginTop: "8px", textAlign: "center" }}>
                          <div>Username: {user.username}</div>
                          <div>Address: {user.address}</div>
                        </div>
                      )}
                    </Typography>


                  </CardContent>
                </CardActionArea>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 4,
                    justifyContent: "flex-start",
                    padding: "8px",
                    gap: "0.5px",
                    borderTop: "1px solid #ccc",
                  }}
                >
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user._id)}
                    sx={{ fontSize: "small" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdate(user)}
                    sx={{ fontSize: "small" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </Card>
            ))) : props.page > 0 ? (
              <p>No more users found.</p>
            ) : (
            <p>No users found.</p>
          )}
        </Box>
      </div>
   
      {props.ah && (<Fab
        color="primary"
        aria-label="add"
        size="medium"
        onClick={handleAdd}
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 32 }, // Adjust for small and medium screens
          left: { xs: 16, md: 32 },
          zIndex: 1000
        }}
      >
        <PersonAddIcon />
      </Fab>)}

      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{state} User</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={selectedUser.name} // Controlled input value
              onChange={handleInputChange} // Track changes
            />
            <DialogContentText>Name</DialogContentText>

            <TextField
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={selectedUser.username}
              onChange={handleInputChange}
            />
            <DialogContentText>Username</DialogContentText>

            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={selectedUser.email}
              onChange={handleInputChange}
            />
            <DialogContentText>Email</DialogContentText>

            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={selectedUser.address}
              onChange={handleInputChange}
            />
            <DialogContentText>Address</DialogContentText>

            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              value={selectedUser.phone}
              onChange={handleInputChange}
            />
            <DialogContentText>Phone</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={snackbar.anchor}
      >
        <Alert
          severity={snackbar.type} // "success" or "error"
          onClose={handleCloseSnackbar}
          variant="filled" // Optional: Makes the alert background filled
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Users

