import { useNavigate } from "react-router";

const NoteCard = ({ noteId, noteTitle, noteCategory, noteDate }) => {
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/edit-note/${noteId}`);
    };
    return (
        <div className="col-md-4 card mx-auto my-3">
            <div className="card-body">
                <h3 className="card-title">{noteTitle}</h3>

                <p className="badge bg-dark rounded-pill">{noteCategory}</p>

                <p className="text-gray fs-6">{noteDate}</p>

                <div className="d-flex gap-2">
                    <button className="btn btn-link text-primary p-0 text-decoration-none" onClick={navigateToEdit}>
                        <i className="bi bi-pencil"></i>
                        Edit
                    </button>
                    <button className="btn btn-link text-danger p-0 text-decoration-none">
                        <i className="bi bi-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
