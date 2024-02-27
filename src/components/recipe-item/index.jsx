import { Card, CardContent, CardMedia, Grid, Typography, CardActionArea } from "@mui/material";

export default function RecipeItem({ title, image }) {
    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345, height: '100%' }}>
                <CardActionArea sx={{ height: '100%' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={title}
                    />
                    <CardContent sx={{ height: '100%' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}