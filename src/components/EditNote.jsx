import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Edit Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="noteTitle" className="form-label">
                                        Note Title
                                    </label>
                                    <input type="text" className="form-control" id="noteTitle" placeholder="Enter note title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteCategory" className="form-label">
                                        Category
                                    </label>
                                    <select className="form-control" id="noteCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Select a category</option>
                                        {categoryChoices.map((cat, index) => (
                                            <option key={index} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteContent" className="form-label">
                                        Note Content
                                    </label>
                                    <textarea className="form-control" id="noteContent" placeholder="Enter note content" value={content} onChange={(e) => setContent(e.target.value)} rows="10" />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Edit Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditNote;
