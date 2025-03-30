import { useState } from 'react';
import { styled  } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import CardActions from '@mui/material/CardActions';



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

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const tempImageObjects = [
    {
    id: 1,
    type: 'image',
    content:"src/app/TempFile/IncidentBriefing.jpg"
    },
    {
    id: 2,
    type: 'image',
    content:"src/app/TempFile/CommsExample.jpg"
    },
]


export default function FileUpload() {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (image) => setSelectedImage(image);
    const handleClose = () => setSelectedImage(null);

    return (
        <Card 
        sx={{ 
            width: '71vw', 
            mt: '2vh', 
            ml: '1vh',
            }} >
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
                <Grid container spacing={2} sx={{ mt: 2 }}>
                {tempImageObjects.map((file) => (
                        <Grid item key={file.id} xs={12} sm={6} md={4}>
                            <Card sx={{ width: '20vw', height: '25vh' }}>
                                <CardActionArea onClick={() => handleOpen(file.content)}>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        image={file.content}
                                        alt="Image Preview"
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
 </Grid>


<Modal open={!!selectedImage} onClose={handleClose}>
    <Card sx={modalStyle}>
        {selectedImage && (
            <>
                <CardMedia
                    component="img"
                    sx={{ height: '80vh', objectFit: 'contain' }}
                    image={selectedImage}
                    title="Image Preview"
                />
                <CardActions>
                    <Button size="small" onClick={() => window.open(selectedImage, '_blank')}>
                        Download
                    </Button>
                </CardActions>
            </>
        )}             </Card>
                </Modal>
            </CardContent>
        </Card>
    );
}
