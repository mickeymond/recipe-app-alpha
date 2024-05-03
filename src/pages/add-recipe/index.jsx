import { Box, Container, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/navbar";

export const countries = [
    { value: 'GH', label: 'Ghana' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'BE', label: 'Benin' },
    { value: 'TG', label: 'Togo' }
];

export default function AddRecipe() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const addRecipe = async (event) => {
        // Set loading to true
        setLoading(true);
        // Prevent default form submit behavior
        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);
        // Post form data to the backend
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API}/recipes`, {
            credentials: 'include',
            method: 'POST',
            body: formData
        });
        // Navigate to /recipes if add recipe was successful
        if (response.status === 201) {
            navigate('/recipes');
        } else {
            // Set loading to false
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <Container sx={{ my: '2rem' }} maxWidth="sm">
                <h1>Add A New Recipe</h1>
                <form onSubmit={addRecipe}>
                    <TextField
                        sx={{ mb: '2rem' }}
                        fullWidth
                        name="title"
                        label="Recipe Title" />
                    <TextField
                        sx={{ mb: '2rem' }}
                        fullWidth
                        name="description"
                        label="Recipe Description"
                        multiline
                        rows={4} />
                    <TextField
                        sx={{ mb: '2rem' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type="file"
                        fullWidth
                        name="image"
                        label="Recipe Image" />
                    <TextField
                        sx={{ mb: '2rem' }}
                        select
                        fullWidth
                        name="country"
                        label="Recipe Country"
                        defaultValue="GH"
                    >
                        {countries.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box textAlign="center">
                        <LoadingButton
                            sx={{ width: '50%' }}
                            loading={loading}
                            type="submit"
                            size="large"
                            variant="contained">
                            Add New Recipe
                        </LoadingButton>
                    </Box>
                </form>
            </Container>
        </>
    );
}