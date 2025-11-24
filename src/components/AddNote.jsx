import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Add New Note</h2>
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
                                        Add Note
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

export default AddNote;
