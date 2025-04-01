import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import axios from 'axios';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import ResponderTable from '../../Components/Table';

/**
 * Temp responders list with:
 *      - name, certification status, certified for
 * Drop down selection for responder position
 * satart time of incident
 * endtime
 * operational period
 *
 *
 *
 */

export default function CreateTask({ taskID, appRouter, user }) {
    const [taskName, setTaskName] = useState('');
    const [op, setOp] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [description, setDescription] = useState('');
    const [roles, setRoles] = useState([]);
    console.log(appRouter.pathname);
    async function handleSubmit() {
        const payload = {
            taskName: taskName,
            startDate: startDate,
            operationalPeriod: 1,
            description: description,
            team: [
                {
                    responderId: 'team member ID',
                    startDate: dayjs(startDate),
                    responderRole: 'string',
                },
            ],
            responderId: user.responderId,
        };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/create-task`
            );
        } catch (error) {
            console.log('Error creating task: ', error.message);
        }
    }

    return (
        <Box>
            <Typography sx={{ ml: '1vh' }} variant="h6">
                New Task
            </Typography>
            <FormControl>
                <TextField
                    name="name"
                    label="Task Name"
                    value={taskName}
                    onChange={(event) => setTaskName(event.target.value)}
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
                        margin: '1vh',
                    }}
                />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl>
                    <DatePicker
                        name="startDate"
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                </FormControl>

                <FormControl>
                    <TimePicker
                        name="startTime"
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                    />
                </FormControl>
                <FormControl>
                    <DatePicker
                        name="endDate"
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                    />
                </FormControl>

                <FormControl>
                    <TimePicker
                        name="endTime"
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                        label="End Time"
                        value={endTime}
                        onChange={(newValue) => setEndTime(newValue)}
                    />
                </FormControl>
            </LocalizationProvider>
            <FormControl>
                <TextField
                    name="op"
                    label="Opperational Period"
                    value={op}
                    onChange={(event) => setOp(event.target.value)}
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
                        margin: '1vh',
                    }}
                />
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
                <TextField
                    name="description"
                    value={description}
                    sx={{
                        width: { md: '98%', lg: '98%', xl: '98%' },
                        margin: '1vh',
                    }}
                    label="Description"
                    multiline
                    onChange={(event) => setDescription(event.target.value)}
                    maxRows={1000}
                    minRows={8}
                />
            </FormControl>

            <ResponderTable setRoles={setRoles} roles={roles} />

            <Stack spacing={3} direction="row" sx={{ marginTop: '3vh' }}>
                <Button
                    sx={{ width: '10vw' }}
                    size="large"
                    variant="contained"
                    type="submit"
                >
                    Create
                </Button>
            </Stack>
        </Box>
    );
}
