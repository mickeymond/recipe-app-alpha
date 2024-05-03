import { Box, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { USER_INFO } from "../../guards/constants";

export default function Register() {
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useSessionStorage(USER_INFO, null);
    const [loading, setLoading] = useState(true);

    const getUserProfile = async () => {
        // Fetch user profile
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API}/users/profile`, {
            credentials: 'include'
        });
        if (response.status === 200) {
            // Get json response
            const data = await response.json();
            setUserInfo(data);
            // Navigate to /recipes if login was successful
            navigate('/recipes');
        } else {
            // Set loading to false
            setLoading(false);
        }
    }

    const register = async (event) => {
        // Set loading to true
        setLoading(true);
        // Prevent default form submit behavior
        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);
        // Post form data to the backend
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API}/users/register`, {
            // credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            // Navigate to /login if register was successful
            navigate('/login');
        } else {
            // Set loading to false
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserProfile();
        // eslint-disable-next-line
    }, []);

    return (
        <Container sx={{ my: '2rem' }} maxWidth="sm">
            <h1>User Registration</h1>
            <form onSubmit={register}>
                <TextField
                    sx={{ mb: '2rem' }}
                    fullWidth
                    name="fullName"
                    label="Enter FullName" />
                <TextField
                    sx={{ mb: '2rem' }}
                    fullWidth
                    name="email"
                    label="Enter Email" />
                <TextField
                    sx={{ mb: '2rem' }}
                    fullWidth
                    type="password"
                    name="password"
                    label="Enter Password" />
                <Box textAlign="center">
                    <LoadingButton
                        sx={{ width: '50%' }}
                        loading={loading}
                        type="submit"
                        size="large"
                        variant="contained">
                        Register
                    </LoadingButton>
                </Box>
            </form>
            <Box sx={{ mt: '2rem' }} textAlign="center">
                <Typography component={Link} to="/login">Already have an Account? Login!</Typography>
            </Box>
        </Container>
    );
}