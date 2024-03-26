import { Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import Navbar from "../../components/navbar";
import RecipeItem from "../../components/recipe-item";
import noRecipes from "../../assets/images/undraw_no_data_re_kwbl.svg";
import spinner from "../../assets/images/infinite-spinner.svg";

const searchRecipes = ([endpoint, query]) => {
    // prepare URL
    // const url = new URL(`${process.env.REACT_APP_SPOONACULAR_API}${endpoint}`);
    const url = new URL(`${process.env.REACT_APP_RECIPE_API}${endpoint}`);
    url.searchParams.append('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
    url.searchParams.append('query', query);
    // fetch recipes from API and return
    return fetch(url).then(response => response.json());
}

export default function Recipes() {
    const [query, setQuery] = useState("");
    // const { data, isLoading } = useSWR(['/recipes/complexSearch', query], searchRecipes);
    const { data, isLoading } = useSWR(['/recipes', query], searchRecipes);

    return (
        <>
            <Navbar />
            <Container sx={{ my: '2rem' }}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Enter a keyword to search recipes and hit Enter"
                    variant="outlined"
                    onKeyDown={event => event.key === 'Enter' && setQuery(event.target.value)} />
                <Grid sx={{ mt: '1rem' }} container spacing={3}>
                    {isLoading ? (
                        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={spinner} alt="spinner" width="25%" />
                        </Container>
                    ) : data && data.length > 0 ? data.map(recipe => <RecipeItem key={recipe._id} title={recipe.title} image={recipe.image} id={recipe._id} />) : (
                        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={noRecipes} alt="noRecipes" width="25%" />
                        </Container>
                    )}
                </Grid>
            </Container>
        </>
    );
}