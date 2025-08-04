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

export default function ActiveIncident({
    appRouter,
    setSelectedIncident,
    setAddIncidentInfo,
}) {
    const [selectedCard, setSelectedCard] = useState(0);
    const [allIncidents, setAllIncidents] = useState([]);
    const [incidentInfo, setIncidentInfo] = useState([]);
    useEffect(() => {
        async function fetchIncidents() {
            const incidents = await getIncidents();
            setAllIncidents(incidents);
        }
        fetchIncidents();
    }, []);

    async function getIncident(incidentId, index) {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/get-viewIncident/${incidentId}`
            );
            if (response.status == 200) {
                console.log('Incident retrieved: ', response.data);
                // State passed down from Dashboard
                setAddIncidentInfo(allIncidents[index]);
                setSelectedIncident(response.data);
                appRouter.navigate(`/activeIncident/${incidentId}`);
            }
        } catch (error) {
            console.log('Error retrieving incident: ', error.message);
            console.log(response);
        }
    }

    return (
        <>
            <Grid container justifyContent={'start'} spacing={1}>
                {allIncidents.map((incident, index) => (
                    <Grid size={{ sm: 12, md: 12, lg: 4, xl: 4 }}>
                        <Card key={incident.incidentId} variant="outlined">
                            <CardActionArea
                                onClick={() =>
                                    getIncident(incident.incidentId, index)
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
            </Grid>
        </>
    );
}
