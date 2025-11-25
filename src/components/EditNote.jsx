import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Editor from "react-simple-wysiwyg";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Card, CardContent, Typography, Button } from "@mui/material";

const EditNote = ({}) => {
    const { id } = useParams();

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
    }, []);

    useEffect(() => {
        if (existingNotes.length === 0) {
            return;
        }
        const note = existingNotes.find((note) => note.id == id);
        console.log(note);
        if (!note) {
            console.warn("Note not found for id:", id);
            return;
        }
        setTitle(note.title || "");
        setCategory(note.category || "");
        setContent(note.content || "");
        console.log(existingNotes);
    }, [existingNotes, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Step 0: Create a new note
        const newNote = {
            id: id,
            title: title,
            content: content,
            category: category,
            date: new Date(),
        };
        // Step 1: Find the index of the existing note we are trying to edit/replace
        const noteIndex = existingNotes.findIndex((note) => note.id == id);
        console.log(noteIndex);

        // Step 2: Make a copy of the existing notes array.
        const newNotes = [...existingNotes];

        // Step 3: Replace the existing note inside the array with the edited version
        if (noteIndex !== -1) {
            newNotes[noteIndex] = newNote;
        }

        // Step 4: Save the new edited notes list.
        localStorage.setItem("notes", JSON.stringify(newNotes));

        console.log(localStorage.getItem("notes"));
        navigate("/");
    };

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    Edit Note
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <TextField fullWidth id="noteTitle" label="Enter note title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Select a category</InputLabel>
                            <Select labelId="category-label" id="noteCategory" value={category} label="Select a category" onChange={(event) => setCategory(event.target.value)}>
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
                        Edit Note
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditNote;
