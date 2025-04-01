import { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CreateIncident from '../CreateIncident/page';
import { useActivePage } from '@toolpad/core/useActivePage';
import axios from 'axios';

const tempIncidents = [
    {
        id: 1,
        incidentName: 'Incident 101-03-15-2025',
        agency: 'Search and Rerscue',
        incidentType: 'Missing person',
    },
    {
        id: 2,
        incidentName: 'Incident 102-03-16-2025',
        agency: 'Police',
        incidentType: 'Assist SAR with Missing Person Incident',
    },
    {
        id: 3,
        incidentName: 'Incident 103-03-17-2025',
        agency: 'EMO',
        incidentType: 'Lost at Sea',
    },
];

async function getIncidents() {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT}/get-allIncidents`
        );
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log('Fetch failed: ', error.message);
    }
}

export default function ActiveIncident({ appRouter, setSelectedIncident }) {
    const [selectedCard, setSelectedCard] = useState(0);
    const [allIncidents, setAllIncidents] = useState([]);
    useEffect(() => {
        async function fetchIncidents() {
            const incidents = await getIncidents();
            setAllIncidents(incidents);
        }
        fetchIncidents();
    }, []);

    function handleSelection(incidentId, index) {
        setSelectedIncident(allIncidents[index]);
        appRouter.navigate(`/activeIncident/${incidentId}`);
    }

    return (
        <>
            <Grid container justifyContent={'start'} spacing={1}>
                {allIncidents.map((incident, index) => (
                    <Grid size={{ sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <Card key={incident.incidentId} variant="outlined">
                            <CardActionArea
                                onClick={() =>
                                    handleSelection(incident.incidentId, index)
                                }
                                data-active={
                                    selectedCard === incident.incidentId
                                        ? ''
                                        : undefined
                                }
                                sx={{
                                    height: 200,
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor:
                                                'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        {incident.incidentName}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        {incident.incidentType}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        Agency: {incident.agencyName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                {/* {tempIncidents.map((incident) => (
                    <Grid size={{ sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <Card key={incident.id} variant="outlined">
                            <CardActionArea
                                onClick={() =>
                                    appRouter.navigate(
                                        `/activeIncident/${incident.id}`
                                    )
                                }
                                data-active={
                                    selectedCard === incident.id
                                        ? ''
                                        : undefined
                                }
                                sx={{
                                    height: 200,
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor:
                                                'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        {incident.incidentName}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        {incident.incidentType}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        Agency: {incident.agency}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))} */}
            </Grid>
        </>
    );
}
