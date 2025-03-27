import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileUpload() {
    return (
        <Card sx={{ width: '71vw', mt: '2vh', ml: '1vh' }}>
            <CardContent>
                <Typography variant="h6">File Upload</Typography>
                <Button
                    sx={{ mt: '1vh' }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
                <Grid size={{ sm: 12, md: 12, lg: 4, xl: 4 }}>
                    <Typography component="div" sx={{ mt: '2vh' }}>
                        Comms Log
                    </Typography>
                    <Card
                        sx={{ width: '20vw', height: '25vh' }}
                        variant="outline"
                    >
                        <CardActionArea
                            // onClick={() =>
                            //     changePath(
                            //         `/incident/${incidentId}/task/${task.id}`
                            //     )
                            // }
                            // data-active={
                            //     selectedCard === task.id ? '' : ''
                            // }
                            data-active={''}
                            sx={{
                                height: '25vh',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="100%"
                                image="src\app\TempFile\CommsExample.jpg"
                                alt="Comms Log"
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
            </CardContent>
        </Card>
    );
}
