import { Box, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { USER_INFO } from "../../guards/constants";

export default function Login() {
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [userInfo, setUserInfo] = useSessionStorage(USER_INFO, null);
    const [loading, setLoading] = useState(false);

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

    const login = async (event) => {
        // Set loading to true
        setLoading(true);
        // Prevent default form submit behavior
        event.preventDefault();
        // Get form data
        const formData = new FormData(event.target);
        // Post form data to the backend
        const response = await fetch(`${process.env.REACT_APP_RECIPE_API}/users/login`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            // Get User Profile
            await getUserProfile();
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
            <h1>User Login</h1>
            <form onSubmit={login}>
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
                        Login
                    </LoadingButton>
                </Box>
            </form>
            <Box sx={{ mt: '2rem' }} textAlign="center">
                <Typography component={Link} to="/register">New User? Register!</Typography>
            </Box>
        </Container>
    );
}