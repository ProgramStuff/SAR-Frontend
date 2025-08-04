import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Button, Divider } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

export default function LandingPage() {
    return (
        <Grid container justifyContent="center" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={6}
                sx={{ textAlign: 'left', mt: '15vh', pr: '12vw' }}
            >
                <Typography
                    sx={{
                        width: '30vw',
                        mb: '2vh',
                        fontWeight: 'bold',
                        fontSize: '5vh',
                    }}
                    variant="h4"
                >
                    An Efficient Incident Management System
                </Typography>
                <Typography sx={{ width: '25vw' }}>
                    Built for First Responders, by First Responders - A Smarter
                    Way to Manage Incidents.
                </Typography>
                <Button variant='contained' sx={{
                    width: '14vw', 
                    height: '6vh',
                    mt: '5vh'
                    }}>
                    Contact Us
                </Button>
            </Grid>
            <Grid item xs={6} sx={{ mt: '5vh' }}>
                <Card
                    variant="outlined"
                    sx={{
                        width: '40vw',
                        height: '48vh',
                        borderRadius: 4,
                    }}
                >
                    <CardMedia
                        sx={{ height: '100%' }}
                        image="src/app/SARImages/Helicopter.jpg"
                    />
                </Card>
            </Grid>
            <Grid sx={{ mt: '15vh' }}>
                <Typography variant="h5">
                    Trusted by First Responder Across Canada
                </Typography>

                <Grid
                    container
                    justifyContent="center"
                    spacing={'4vw'}
                    sx={{ mt: '4vh' }}
                >
                    {/* SAR Rescue Icon */}
                    <Card
                        sx={{
                            width: '7vw',
                            height: '13vh',
                            borderRadius: '50%',
                            b: 1,
                        }}
                    >
                        <CardMedia
                            sx={{ height: '100%', borderRadius: '50%' }}
                            image="src/assets/Icons/SAR-Icon-Yellow.png"
                        />
                    </Card>

                    <Card
                        sx={{
                            width: '7vw',
                            height: '13vh',
                            borderRadius: '50%',
                            b: 1,
                        }}
                    >
                        <CardMedia
                            sx={{ height: '100%', borderRadius: '50%' }}
                            image="src/assets/Icons/FF-Icon.jpg"
                        />
                    </Card>

                    <Card
                        sx={{
                            width: '7vw',
                            height: '13vh',
                            borderRadius: '50%',
                            b: 1,
                        }}
                    >
                        <CardMedia
                            sx={{ height: '100%', borderRadius: '50%' }}
                            image="src/assets/Icons/Police-Icon.jpg"
                        />
                    </Card>
                </Grid>
            </Grid>
            <Divider
                sx={{ width: '100%', height: '2vh', mt: '10vh' }}
            ></Divider>
        </Grid>
    );
}
