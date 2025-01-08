import axios from 'axios'
import { useState, useEffect, Postef } from 'react'

import * as React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, CardActionArea, tableBodyClasses } from '@mui/material';
import { Fab, Pagination, PaginationItem, Stack, Alert, Snackbar } from '@mui/material';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Posts = (props) => {

    const [selectedCard, setSelectedCard] = React.useState(null);

    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: "",
        message: "",
        anchor: { vertical: "top", horizontal: "center" }
    });
    const handleDelete = async (id) => {
        console.log("Delete Post with ID:", id);

        try {
            const response = await axios.delete("http://localhost:7777/api/posts/", { data: { _id: id } });
            setSnackbar({
                open: true,
                type: "success",
                message: response.data,
                anchor: { vertical: "top", horizontal: "center" }
            });
            getPosts();
        } catch (e) {
            console.error("Error deleting Post:", e);
            setSnackbar({
                open: true,
                type: "error",
                message: "Error deleting Post. Please try again.",
                anchor: { vertical: "top", horizontal: "center" }
            });
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const [postsData, setPostsData] = useState([])
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        setLoading(true);
        props.setAh(true)
        let res
        try {
            if (!props.text) {
                res = await axios.get(`http://localhost:7777/api/posts/${props.page}`)

            } else {
                res = await axios.get(`http://localhost:7777/api/posts/ByText?page=${props.page}&text=${props.text}`)

            }
            if (res.status === 200 && Array.isArray(res.data)) {
                setPostsData(res.data)
            }
            else {
                setPostsData([])

            }
        } catch (e) {
            console.error(e)
            setPostsData([]);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getPosts();
    }, [props.page,props.text]);
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    )

    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({
        title: "",
        body: ""
    });
    const [addup, setAddup] = useState(0)
    const handleUpdate = (Post) => {
        setAddup(1)
        setSelectedPost(Post);
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
        setSelectedPost({
            title: "",
            body: ""
        })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedPost((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const [state, setState] = useState("")
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
                    ) : postsData && postsData.length > 0 ? (
                        postsData.map((Post, index) => (
                            <Card key={Post._id}>
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
                                            ID: {Post._id}
                                        </Typography>
                                        <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1, fontSize: "30px", fontStyle: "italic", fontFamily: "fantasy" }}>
                                            {Post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {Post.body}
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
                                        onClick={() => handleDelete(Post._id)}
                                        sx={{ fontSize: "small" }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleUpdate(Post)}
                                        sx={{ fontSize: "small" }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        ))) : props.page > 0 ? (
                            <p>No more posts found.</p>
                        ) : (
                        <p>No posts found.</p>
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
                <PostAddIcon />
            </Fab>)}

            <React.Fragment>
                <Dialog open={open} onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async(event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      const email = formJson.email;
                      console.log(email);
                      try {
                        let response;
                        if (addup === 1) {
                            response = await axios.put("http://localhost:7777/api/posts/", selectedPost);
                        }
                        else {//if(addup===2){
                            response = await axios.post("http://localhost:7777/api/posts/", selectedPost);
                        }
                        setSnackbar({
                            open: true,
                            type: "success",
                            message: response.data,
                            anchor: { vertical: "top", horizontal: "center" }
                        });
                        getPosts();
                    } catch (e) {
                        console.error("Error deleting Post:", e);
                        setSnackbar({
                            open: true,
                            type: "error",
                            message: `Error ${state} post. Please try again.`,
                            anchor: { vertical: "top", horizontal: "center" }
                        });
                    }
                      handleClose();
                    },
                  }}>
                    <DialogTitle>{state} Post</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedPost.title} // Controlled input value
                            onChange={handleInputChange} // Track changes
                        />
                        <DialogContentText>Title</DialogContentText>

                        <TextField
                            required
                            margin="dense"
                            id="body"
                            name="body"
                            label="Body"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedPost.body}
                            onChange={handleInputChange}
                        />
                        <DialogContentText>Body</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Submit</Button>
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

export default Posts

