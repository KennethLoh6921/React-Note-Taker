import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Editor from "react-simple-wysiwyg";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Card, CardContent, Typography, Button } from "@mui/material";

const AddNote = ({}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const [categoryChoices, setCategoryChoices] = useState([]);
    const [existingNotes, setExistingNotes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("categories") !== null) {
            setCategoryChoices(JSON.parse(localStorage.getItem("categories")));
        }
        if (localStorage.getItem("notes") !== null) {
            setExistingNotes(JSON.parse(localStorage.getItem("notes")));
        }
        console.log(existingNotes);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            id: existingNotes.length + 1,
            title: title,
            content: content,
            category: category,
            date: new Date(),
        };
        const newNotes = [...existingNotes, newNote];
        setExistingNotes([...existingNotes, newNote]);
        localStorage.setItem("notes", JSON.stringify(newNotes));
        //Possible Solution
        // 1. Get the item again from localStorage and replace existingNotes.
        // 2. Refresh the page programmatically.
        // 3.
        console.log(localStorage.getItem("notes"));
        navigate("/");
    };

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    Add New Note
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <TextField fullWidth id="noteTitle" label="Enter note title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Select a category</InputLabel>
                            <Select labelId="category-label" id="noteCategory" value={category} label="Select a category" onChange={(event) => setCategory(event.target.value)}>
                                <MenuItem value={"all"}>All Categories</MenuItem>
                                {categoryChoices.map((cat, key) => (
                                    <MenuItem key={key} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Editor containerProps={{ style: { height: "300px" } }} value={content} onChange={(e) => setContent(e.target.value)} />
                    </Box>

                    <Button type="submit" variant="contained" fullWidth>
                        Add Note
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNote;
