import NoteCard from "./Notecard";
import { useState, useEffect } from "react";

function Home() {
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Which theme should we pick?",
            category: "Ideas",
            content: "",
            date: "Jul 20, 2025 6:58 PM",
        },
        {
            id: 2,
            title: "Project Making Week",
            category: "Personal",
            content: "",
            date: "Jul 20, 2025 6:58 PM",
        },
        {
            id: 3,
            title: "Assignment Sheets",
            category: "Work",
            content: "",
            date: "Jul 20, 2025 6:58 PM",
        },
    ]);

    // localStorage.clear()

    const [categories, setCategories] = useState(["Ideas", "Personal", "Work"]);

    const [sortingOption, setSortingOption] = useState(["Date", "Title"]);

    const [sort, setSort] = useState("none");

    const [filter, setFilter] = useState("all");

    if (localStorage.getItem("notes") === null) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    if (localStorage.getItem("categories") === null) {
        localStorage.setItem("categories", JSON.stringify(categories));
    }

    // Get notes from localStorage.
    useEffect(() => {
        setNotes(JSON.parse(localStorage.getItem("notes")));
        setCategories(JSON.parse(localStorage.getItem("categories")));
    }, []);

    const filterNote = filter === "all" ? notes : notes.filter((note) => note.category === filter);

    let sortedNotes = filterNote;

    if (sort === "Date") {
        sortedNotes = filterNote.sort((a, b) => b.date - a.date);
    } else if (sort === "Title") {
        sortedNotes = filterNote.sort((a, b) => a.title.localeCompare(b.title));
    }

    console.log(sortedNotes);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-8">
                    <h1>All Notes</h1>
                </div>
                <div className="col-md-4">
                    <div className="d-flex gap-2">
                        <select className="form-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
                            <option value="all">All Categories</option>
                            {categories.map((category, key) => (
                                <option key={key} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <select className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}>
                            <option value="none">Sort By</option>
                            {sortingOption.map((option, key) => (
                                <option key={key} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                {sortedNotes.map((note, key) => (
                    <NoteCard key={key} noteId={note.id} noteTitle={note.title} noteCategory={note.category} noteDate={note.date} />
                ))}
            </div>
        </div>
    );
}

export default Home;
