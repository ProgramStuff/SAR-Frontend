import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function LandingPage() {
    return (
        <Box>
            <Box sx={{ width: '28vw', textAlign: 'center' }}>
                <Typography variant="h4">
                    An Efficient Incident Management System
                </Typography>
            </Box>
            <Card sx={{ width: '35vw', height: '45vh', ml: '50vw', mt: '5vh' }}>
                <CardMedia
                    sx={{ height: '35vw' }}
                    image="src/app/SARImages/Helicopter.jpg"
                />
            </Card>
        </Box>
    );
}
