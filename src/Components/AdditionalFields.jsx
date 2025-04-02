import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { useActivePage } from '@toolpad/core/useActivePage';
import { Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const tempTasks = [
    {
        id: 1,
        name: 'Search Area 1',
        startTime: dayjs('2025-03-15T23:54:26.305Z').toString(),
    },
    {
        id: 2,
        name: 'Search Area 2',
        startTime: dayjs('2025-03-15T23:54:26.305Z').toString(),
    },
    {
        id: 3,
        name: 'Search Area 3',
        startTime: dayjs('2025-03-15T23:54:26.305Z').toString(),
    },
];

export default function AdditionalFields({
    changePath,
    appRouter,
    incidentId,
}) {
    const [selectedCard, setSelectedCard] = useState(0);
    return (
        <Box sx={{ ml: '1vh' }}>
            <CssBaseline enableColorScheme />
            <Typography variant="h6">Tasks</Typography>
            <Grid container justifyContent={'center'} spacing={1}>
                {appRouter.pathname != '/incident/newIncident' &&
                    tempTasks.map((task) => (
                        <Grid
                            key={task.id}
                            size={{ sm: 12, md: 12, lg: 4, xl: 4 }}
                        >
                            <Card variant="outlined">
                                <CardActionArea
                                    onClick={() =>
                                        changePath(
                                            `/incident/${incidentId}/task/${task.id}`
                                        )
                                    }
                                    data-active={
                                        selectedCard === task.id
                                            ? ''
                                            : undefined
                                    }
                                    sx={{
                                        height: 100,
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
                                        <Typography component="div">
                                            {task.name}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {task.startTime}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            {!/incident\/pastIncident\/./.test(appRouter.pathname) && (
                <Button
                    sx={{ width: '13vw', marginTop: '2vh', mb: '2vh' }}
                    size="large"
                    variant="contained"
                    onClick={() =>
                        changePath(`/incident/${incidentId}/newTask`)
                    }
                >
                    Create New Task
                </Button>
            )}
        </Box>
    );
}
