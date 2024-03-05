import { Container } from "@mui/material";
import { useParams } from "react-router-dom"
import useSWR from "swr";
import spinner from "../../assets/images/infinite-spinner.svg";

const getRecipe = (endpoint) => {
    // prepare URL
    const url = new URL(`https://api.spoonacular.com${endpoint}`);
    url.searchParams.append('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
    // fetch and return data
    return fetch(url).then(response => response.json());
}

export default function Recipe() {
    const { id } = useParams();
    const { data: recipe, isLoading } = useSWR(`/recipes/${id}/information`, getRecipe);

    console.log(recipe, isLoading);

    return (
        <>
            {isLoading ? <img src={spinner} alt="spinner" /> : (
                <Container>
                    <h1>{recipe.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    <img src={recipe.image} alt={recipe.title} />
                </Container>
            )}
        </>
    );
}