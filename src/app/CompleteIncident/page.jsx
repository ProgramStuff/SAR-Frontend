import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useActivePage } from '@toolpad/core/useActivePage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import AdditionalFields from '../../Components/AdditionalFields';
import FileUpload from '../../Components/FileUpload';

const agencies = [
    {
        id: '',
        value: '',
        label: '',
    },
    {
        id: '8afd6fa8-17ce-4591-8d57-59b29933dd61',
        value: 'SAR',
        label: 'Search and Rescue',
    },
];

const incidentType = [
    {
        value: '',
        label: '',
    },
    {
        value: 'Missing Person',
        label: 'Missing Person',
    },
    {
        value: 'Entrapment',
        label: 'Entrapment',
    },
    {
        value: 'Structure Fire',
        label: 'Structure Fire',
    },
    {
        value: 'Lost at Sea',
        label: 'Lost at Sea',
    },
    {
        value: 'Other',
        label: 'Other',
    },
];

const province = [
    {
        value: '',
        label: '',
    },
    {
        value: 'AB',
        label: 'Alberta',
    },
    {
        value: 'BC',
        label: 'British Columbia',
    },
    {
        value: 'MB',
        label: 'Manitoba',
    },
    {
        value: 'NB',
        label: 'New Brunswick',
    },
    {
        value: 'NL',
        label: 'Newfoundland and Labrador',
    },
    {
        value: 'NT',
        label: 'NorthWest Territories',
    },
    {
        value: 'NS',
        label: 'Nova Scotia',
    },
    {
        value: 'NU',
        label: 'Nunavut',
    },
    {
        value: 'ON',
        label: 'Ontario',
    },
    {
        value: 'PEI',
        label: 'Prince Edward Island',
    },
    {
        value: 'QC',
        label: 'Quebec',
    },
    {
        value: 'SK',
        label: 'Saskatchewan',
    },
    {
        value: 'YT',
        label: 'Yukon',
    },
];

export default function CompleteIncident({ appRouter, changePathFunction }) {
    const [currentUser, setCurrentUser] = useState({});
    const [incidentName, setIncidentName] = useState('');
    const [incidentCommander, setIncidentCommander] = useState('');
    const [agency, setAgency] = useState('');
    const [incidentTypeChoice, setIncidentTypeChoice] = useState('');
    const [op, setOp] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [provinceChoice, setProvinceChoice] = useState('');
    const [date, setDate] = useState('');
    const [summary, setSummary] = useState('');
    const [objectives, setObjectives] = useState('');
    const [activeIncidentId, setActiveIncidentId] = useState('');

    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());

    function getCookie() {
        let name = 'user=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {}
            if (c.indexOf(name) == 0) {
                const userInfo = JSON.parse(c.substring(name.length, c.length));
                setCurrentUser(userInfo);
            }
        }
        return;
    }

    async function handleCancel() {
        setIncidentName('');
        setIncidentCommander('');
        setAddress('');
        setAgency('');
        setIncidentTypeChoice('');
        setOp('');
        setCity('');
        setPostal('');
        setProvinceChoice('');
        setSummary('');
        setObjectives('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            incidentName: incidentName,
            incidentCommander: incidentCommander,
            agency: agency,
            incidentType: incidentTypeChoice,
            operationPeriod: op,
            address: address,
            city: city,
            postal: postal,
            province: provinceChoice,
            date: startDate.toISOString(),
            summary: summary,
            objectives: objectives,
        };

        // try {
        //     const response = await axios.post('http://localhost:5185/newIncident', payload);

        //     if (response.status == 200) {
        //         setMessage(`Registration successful: ${response.data.message}`);
        //     }
        // } catch (error) {
        //     setMessage(`Error: ${error.message}`);
        //     console.log(`Error: ${error.message}`);
        // }
    }

    const tempIncident1 = {
        incidentName: 'Incident 107-05-21-2024',
        incidentCommander: 'Alfred Parks',
        agency: 'SAR',
        incidentType: 'Lost at Sea',
        operationPeriod: 1,
        address: '123 Main Street',
        city: 'Kentville',
        postal: 'B4P1P2',
        province: 'NS',
        date: '2024-05-21T23:54:26.305Z',
        summary: "Fishing vessel hasn't been seen for 2 days",
        objectives: 'Determine search locations',
    };
    const tempIncident2 = {
        incidentName: 'Incident 104-07-16-2023',
        incidentCommander: 'Jordan Kelsey',
        agency: 'SAR',
        incidentType: 'Missing Person',
        operationPeriod: 1,
        address: '123 Main Street',
        city: 'Kentville',
        postal: 'B4P1P2',
        province: 'NS',
        date: '2023-07-16T23:54:26.305Z',
        summary: 'Elderly person escaped nursing home',
        objectives: 'Determine search locations',
    };
    const tempIncident3 = {
        incidentName: 'Incident 108-01-17-2025',
        incidentCommander: 'Bob Straford',
        agency: 'SAR',
        incidentType: 'Missing Person',
        operationPeriod: 1,
        address: '123 Pleasant St',
        city: 'Wolfville',
        postal: 'B4P2B9',
        province: 'NS',
        date: '2025-01-17T23:54:26.305Z',
        summary: "Hiker hasn't been seen in 24 hours",
        objectives: 'Dertime search area',
    };

    const tempIncidents = {
        1: tempIncident1,
        2: tempIncident2,
        3: tempIncident3,
    };

    function loadIncident() {
        const incidentId = appRouter.pathname.split('/')[3];
        setActiveIncidentId(incidentId);
        if (tempIncidents[incidentId]) {
            const data = tempIncidents[incidentId];
            setIncidentName(data.incidentName);
            setIncidentCommander(data.incidentCommander);
            setAddress(data.address);
            setAgency(data.agency);
            setIncidentTypeChoice(data.incidentType);
            setOp(data.operationPeriod);
            setCity(data.city);
            setPostal(data.postal);
            setProvinceChoice(data.province);
            setSummary(data.summary);
            setObjectives(data.objectives);
        }
    }

    useEffect(() => {
        getCookie();
        if (/incident\/pastIncident\/./.test(appRouter.pathname)) {
            console.log(appRouter.pathname);
            loadIncident();
        }
    }, []);

    return (
        <>
            <Box maxWidth component="form" onSubmit={handleSubmit}>
                <Typography sx={{ ml: '1vh' }} variant="h6">
                    Incident Information
                </Typography>
                <FormControl>
                    <TextField
                        name="incidentName"
                        value={incidentName}
                        label="Incident Name"
                        disabled
                        onChange={(event) =>
                            setIncidentName(event.target.value)
                        }
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        name="commander"
                        label="Incident Commander"
                        disabled
                        value={incidentCommander}
                        onChange={(event) =>
                            setIncidentCommander(event.target.value)
                        }
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        select
                        key={agency}
                        name="agency"
                        label="Agency"
                        disabled
                        value={agency}
                        onChange={(event) => setAgency(event.target.value)}
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                    >
                        {agencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                <FormControl>
                    <TextField
                        key={incidentTypeChoice}
                        name="incidentType"
                        disabled
                        select
                        value={incidentTypeChoice}
                        label="Incident Type"
                        onChange={(event) =>
                            setIncidentTypeChoice(event.target.value)
                        }
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            minWidth: '10vh',
                            margin: '1vh',
                        }}
                    >
                        {incidentType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                <FormControl>
                    <TextField
                        name="op"
                        label="Operational Period"
                        type="number"
                        disabled
                        value={op}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            margin: '1vh',
                        }}
                        onChange={(event) => setOp(event.target.value)}
                    />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormControl>
                        <DatePicker
                            name="date"
                            disabled
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
                            disabled
                            value={startTime}
                            onChange={(newValue) => setStartTime(newValue)}
                        />
                    </FormControl>
                </LocalizationProvider>

                <FormControl>
                    <TextField
                        name="address"
                        label="Address"
                        disabled
                        value={address}
                        sx={{
                            width: {
                                md: '27vw',
                                lg: '27vw',
                                xl: '27vw',
                            },
                            margin: '1vh',
                        }}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        name="province"
                        value={provinceChoice}
                        select
                        disabled
                        label="Province"
                        onChange={(event) =>
                            setProvinceChoice(event.target.value)
                        }
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            minWidth: '10vh',
                            margin: '1vh',
                        }}
                    >
                        {province.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>

                <FormControl>
                    <TextField
                        name="city"
                        label="City"
                        value={city}
                        disabled
                        sx={{
                            width: {
                                md: '27vw',
                                lg: '27vw',
                                xl: '27vw',
                            },
                            margin: '1vh',
                        }}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        name="postal"
                        label="Postal Code"
                        disabled
                        value={postal}
                        sx={{
                            width: {
                                md: '13vw',
                                lg: '13vw',
                                xl: '13vw',
                            },
                            minWidth: '10vh',
                            margin: '1vh',
                        }}
                        onChange={(event) => setPostal(event.target.value)}
                    />
                </FormControl>

                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        name="summary"
                        disabled
                        value={summary}
                        sx={{
                            width: { md: '97%', lg: '97%', xl: '97%' },
                            margin: '1vh',
                        }}
                        label="Summary"
                        multiline
                        onChange={(event) => setSummary(event.target.value)}
                        maxRows={1000}
                        minRows={8}
                    />
                </FormControl>

                <FormControl sx={{ width: '100%' }}>
                    <TextField
                        disabled
                        value={objectives}
                        name="objectives"
                        sx={{
                            width: { md: '97%', lg: '97%', xl: '97%' },
                            margin: '1vh',
                        }}
                        label="Objectives"
                        multiline
                        maxRows={1000}
                        minRows={8}
                        onChange={(event) => setObjectives(event.target.value)}
                    />
                </FormControl>
            </Box>
        </>
    );
}
