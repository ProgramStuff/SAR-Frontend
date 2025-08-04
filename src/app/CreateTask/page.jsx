import { useState, useEffect } from 'react';
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

const tempCert1 = {
    id: 1,
    name: 'Chainsaw Operation',
    expiryDate: dayjs('2026-07-20T23:54:26.305Z').format('YYYY-MM-DD HH:mm:ss'),
    certificate: 'Cert',
};

const tempCert2 = {
    id: 2,
    name: 'Chainsaw Operation',
    expiryDate: dayjs('2026-05-05T23:54:26.305Z').format('YYYY-MM-DD HH:mm:ss'),
    certificate: 'Cert',
};

const tempCert3 = {
    id: 3,
    name: 'Drone Operation',
    expiryDate: dayjs('2026-03-15T23:54:26.305Z').format('YYYY-MM-DD HH:mm:ss'),
    certificate: 'Cert',
};

export default function CreateTask({
    taskID,
    appRouter,
    user,
    selectedIncident,
}) {
    const [taskName, setTaskName] = useState('');
    const [op, setOp] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [description, setDescription] = useState('');
    const [roles, setRoles] = useState([]);
    const [selected, setSelected] = useState([]);

    const changeStatus = (selected) => {
        setResponderInfo((prevState) =>
            prevState.map((responder) => ({
                ...responder,
                checkedIn: selected.some(
                    (item) => item == responder.responderId
                )
                    ? !responder.checkedIn
                    : responder.checkedIn,
                startDate:
                    selected.some((item) => item == responder.responderId) &&
                    !responder.checkedIn
                        ? dayjs()
                        : responder.startDate,
                endDate:
                    selected.some((item) => item == responder.responderId) &&
                    responder.checkedIn
                        ? dayjs()
                        : responder.endDate,
            }))
        );
        setSelected([]);
    };

    const handleCheckIn = () => {
        changeStatus(selected);
    };

    const [tempTask1, setTempTask1] = useState({
        taskName: 'Search Area 1',
        operationalPeriod: 1,
        startDate: dayjs('2025-03-15T12:00:57.013Z'),
        endDate: '',
        description: 'Sweep the area',
        team: [
            {
                responderId: '1',
                name: 'Jordan Kelsey',
                startDate: '2025-03-15T12:00:57.013Z',
                endDate: '2025-03-15T16:00:57.013Z',
                phone: '123-456-7890',
                checkedStatus: false,
                responderRole: 'Team lead',
                cert: tempCert1,
            },
        ],
    });

    const [tempTask2, setTempTask2] = useState({
        taskName: 'Search Area 2',
        operationalPeriod: '1',
        startDate: dayjs('2025-03-15T12:00:57.013Z'),
        endDate: '',
        description: 'Sweep area 2',
        team: [
            {
                responderId: '2',
                name: 'Blake Velemirovich',
                phone: '098-765-4321',
                checkedStatus: false,
                startDate: '2025-03-15T12:00:57.013Z',
                endDate: '',
                responderRole: 'Team Lead',
                cert: tempCert2,
            },
        ],
    });

    const [tempTask3, setTempTask3] = useState({
        taskName: 'Search Area 3',
        operationalPeriod: '1',
        startDate: dayjs('2025-03-15T12:00:57.013Z'),
        endDate: '',
        description: 'Sweep area 3',
        team: [
            {
                responderId: '3',
                name: 'Alfred Parks',
                phone: '555-123-4567',
                checkedStatus: false,
                startDate: '2025-03-15T12:00:57.013Z',
                endDate: '',
                responderRole: 'Team Lead',
                cert: tempCert3,
            },
        ],
    });

    const tempTasks = {
        1: tempTask1,
        2: tempTask2,
        3: tempTask3,
    };

    const [responderInfo, setResponderInfo] = useState([]);

    function loadTask() {
        const data = tempTasks[taskID];
        setTaskName(data.taskName);
        setStartDate(data.startDate);
        setStartTime(data.startDate);
        setOp(data.operationalPeriod);
        setDescription(data.description);
    }

    useEffect(() => {
        if (/incident\/[^/]+\/task\/[^/]+$/.test(appRouter.pathname)) {
            loadTask();
        }
        if (/^\/incident\/([^/]+)\/newTask$/.test(appRouter.pathname)) {
            setOp(selectedIncident.operationalPeriods[0].operationalPeriod);
        }
    }, []);

    async function handleSubmit() {
        handleCheckIn();
        // {
        //     "taskName": "string",
        //     "startDate": "2025-04-03T12:24:30.303Z",
        //     "endDate": "2025-04-03T12:24:30.303Z",
        //     "opId": 0,
        //     "description": "string",
        //     "role": "string",
        //     "responderIds": [
        //       "string"
        //     ]
        //   }

        const payload = {
            taskName: taskName,
            startDate: dayjs(startDate),
            endDate: dayjs(endDate),
            opId: selectedIncident.operationalPeriods[0].operationalPeriodId,
            description: description,
            role: 'Ground Search',
            responderIds: selected,
        };
        console.log(payload);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/create-task`,
                payload
            );
            console.log(response);
            if (response.status == 200) {
                console.log('Task created ');
            }
        } catch (error) {
            console.log('Error creating task: ', error.message);
        }
    }

    return (
        <Box>
            <Typography sx={{ ml: '1vh' }} variant="h6">
                {/incident\/[^/]+\/task\/[^/]+$/.test(appRouter.pathname)
                    ? 'Task'
                    : 'New Task'}
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
                    type="number"
                    disabled
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

            <ResponderTable
                setRoles={setRoles}
                roles={roles}
                responderInfo={responderInfo}
                setResponderInfo={setResponderInfo}
                selected={selected}
                setSelected={setSelected}
                taskID={taskID}
                tempTasks={tempTasks}
            />

            <Stack spacing={3} direction="row" sx={{ marginTop: '3vh' }}>
                <Button
                    sx={{ width: '10vw' }}
                    size="large"
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </Box>
    );
}
