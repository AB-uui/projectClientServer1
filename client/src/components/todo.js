import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

import * as React from 'react';
import { Box,Checkbox, Card, CardActions, CardContent, Button, Typography, CardActionArea } from '@mui/material';
import { Fab, Pagination, PaginationItem, Stack, Alert, Snackbar } from '@mui/material';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Todos = (props) => {

    const [selectedCard, setSelectedCard] = React.useState(null);

    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [snackbar, setSnackbar] = useState({
        open: false,
        type: "",
        message: "",
        anchor: { vertical: "top", horizontal: "center" }
    });
    const handleComplet = async (id) => {
        try {
            const response = await axios.put("http://localhost:7777/api/todos/Completed", { _id: id });
            console.log(response);
            getTodos();
        } catch (e) {
            console.log(e);
        }
    }
    const handleDelete = async (id) => {
        console.log("Delete todo with ID:", id);

        try {
            const response = await axios.delete("http://localhost:7777/api/todos/", { data: { _id: id } });
            setSnackbar({
                open: true,
                type: "success",
                message: response.data,
                anchor: { vertical: "top", horizontal: "center" }
            });
            getTodos();
        } catch (e) {
            console.error("Error deleting todo:", e);
            setSnackbar({
                open: true,
                type: "error",
                message: "Error deleting todo. Please try again.",
                anchor: { vertical: "top", horizontal: "center" }
            });
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const [todosData, setTodosData] = useState([])
    const [loading, setLoading] = useState(true);

    const getTodos = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:7777/api/todos/${props.page}`)
            if (res.status === 200 && Array.isArray(res.data)) {
                setTodosData(res.data)
            }
            else {
                setTodosData([])

            }
        } catch (e) {
            console.error(e)
            setTodosData([]);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getTodos();
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
    const [selectedTodo, setSelectedTodo] = useState({
        title: "",
        tags: [""],
        completed: false
    });
    const [addup, setAddup] = useState(0)
    const handleUpdate = (todo) => {
        setAddup(1)
        setSelectedTodo(todo);
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
        setSelectedTodo({
            title: "",
            tags: [""],
            completed: false
        })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // setSelectedTodo((prev) => ({
        //     ...prev,
        //     [name]: value
        // }));
        if (name === "tags") {
            const tagsArray = value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
            setSelectedTodo(prevState => ({
                ...prevState,
                [name]: tagsArray,
            }));
        } else {
            setSelectedTodo(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    // Handle submission of the updated data
    const handleSubmit = async () => {

        try {
            let response;
            if (addup === 1) {
                response = await axios.put("http://localhost:7777/api/todos/", selectedTodo);
            }
            else {//if(addup===2){
                response = await axios.post("http://localhost:7777/api/todos/", selectedTodo);
            }
            setSnackbar({
                open: true,
                type: "success",
                message: response.data,
                anchor: { vertical: "top", horizontal: "center" }
            });
            getTodos();
        } catch (e) {
            console.error("Error deleting todo:", e);
            setSnackbar({
                open: true,
                type: "error",
                message: "Error deleting todo. Please try again.",
                anchor: { vertical: "top", horizontal: "center" }
            });
        }

        handleClose();
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
                    ) : todosData && todosData.length > 0 ? (
                        todosData.map((todo, index) => (
                            <Card key={todo._id}>
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
                                            ID: {todo._id}
                                        </Typography>
                                        <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1, fontSize: "30px", fontStyle: "italic", fontFamily: "fantasy" }}>
                                            {todo.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {todo.tags.map(t =>
                                                <div>{t}</div>
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
                                        onClick={() => handleDelete(todo._id)}
                                        sx={{ fontSize: "small" }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleUpdate(todo)}
                                        sx={{ fontSize: "small" }}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    {todo.completed ? (
                                        <IconButton color="success" sx={{ fontSize: "small" }}>
                                            <CheckCircleIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            color="default"
                                            onClick={() => handleComplet(todo._id)}
                                            sx={{ fontSize: "small" }}
                                        >
                                            <CheckCircleIcon />
                                        </IconButton>
                                    )}

                                </Box>
                            </Card>
                        ))) : props.page > 0 ? (
                            <p>No more todos found.</p>
                        ) : (
                        <p>No todos found.</p>
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
                <AddTaskIcon />
            </Fab>)}

            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{state} Todo</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedTodo.title} // Controlled input value
                            onChange={handleInputChange} // Track changes
                        />
                        <DialogContentText>Title</DialogContentText>

                        {/* <TextField
                            margin="dense"
                            id="tags"
                            name="tags"
                            label="Tags"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedTodo.tags}
                            onChange={handleInputChange}
                        />
                        <DialogContentText>Tags</DialogContentText> */}
                        <TextField
                            margin="dense"
                            id="tags"
                            name="tags"
                            label="Tags (comma-separated)"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={selectedTodo.tags.join(", ")} // Show tags as a comma-separated string
                            onChange={handleInputChange}
                        />

                        <DialogContentText>Tags (separate with commas)</DialogContentText>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                checked={selectedTodo.completed}
                                onChange={(e) => setSelectedTodo((prevState) => ({
                                    ...prevState,
                                    completed: e.target.checked,
                                }))}
                                sx={{
                                    color: "primary.main",
                                    '&.Mui-checked': {
                                        color: "success.main", // Change color when checked
                                    },
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {selectedTodo.completed ? "Completed" : "Not Completed"}
                            </Typography>
                        </Box>
                        {/* <DialogContentText>Completed</DialogContentText> */}

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

export default Todos

