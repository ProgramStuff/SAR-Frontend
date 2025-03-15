import { Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

const tempIncidents = [
    {
        incidentName: 'Incident 101-03-15-2025',
        agency: 'Fire',
        incidentType: 'Missing person',
    },
    {
        incidentName: 'Incident 102-03-16-2025',
        agency: 'Police',
        incidentType: 'Robbery',
    },
    {
        incidentName: 'Incident 103-03-17-2025',
        agency: 'EMS',
        incidentType: 'Abdominal Aortic Aneurysm',
    },
];

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.text.secondary,
    },
}));

export default function ActiveIncident() {
    return (
        <Grid container spacing={1}>
            {tempIncidents.map((incident, index) => (
                <Grid size={4} key={index}>
                    <Link
                        sx={{
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'red',
                                backgroundColor: 'white',
                            },
                        }}
                    >
                        <Skeleton height={200}>
                            <div>
                                <p>Name: {incident.incidentName}</p>
                                <p>Type: {incident.incidentType}</p>
                                <p>Agency: {incident.agency}</p>
                            </div>
                        </Skeleton>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}
