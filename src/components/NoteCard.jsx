import { useNavigate } from "react-router";
import { Card, CardContent, Typography, Chip, Button, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const NoteCard = ({ noteId, noteTitle, noteCategory, noteDate }) => {
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/edit-note/${noteId}`);
    };
    return (
        <div className="col-md-4 mx-auto my-3">
            <Card sx={{ maxWidth: 400, mx: "auto", my: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        {noteTitle}
                    </Typography>

                    <Chip label={noteCategory} color="default" variant="filled" sx={{ mb: 1 }} />

                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                        {noteDate}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="text" color="primary" startIcon={<EditIcon />} onClick={navigateToEdit} sx={{ p: 0, minWidth: "auto" }}>
                            Edit
                        </Button>

                        <Button variant="text" color="error" startIcon={<DeleteIcon />} sx={{ p: 0, minWidth: "auto" }}>
                            Delete
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoteCard;
