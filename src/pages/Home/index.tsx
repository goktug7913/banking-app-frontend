// Homepage index page
import React from "react";
import {Container, Stack, Typography} from "@mui/material";

export default function Home() {

    return (
        <Container>
            <Stack spacing={6} sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    World leading banking and investment services.
                </Typography>

                <Typography variant="body1" component="h2" gutterBottom>
                    We are a global leader in banking and financial services, with over 200 years of history in some of the world's most dynamic markets.
                </Typography>

                <Typography variant="body1" component="h2" gutterBottom>
                    We provide a wide range of financial products and services to over 100 million customers through our four global businesses: Personal Banking, Commercial Banking, Wealth Management and Investment Banking.
                </Typography>

                <Typography variant="body1" component="h2" gutterBottom>
                    We are committed to building a sustainable business over the long term and creating long-term value for our shareholders, our people, our customers and the communities in which we operate.
                </Typography>
            </Stack>
        </Container>
    );
}