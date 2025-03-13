import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/joy/Input';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const agencies = [
    {
        value: 'SAR',
        label: 'Search and Rescue',
    },
    {
        value: 'Fire',
        label: 'Fire',
    },
    {
        value: 'Police',
        label: 'Police',
    },
    {
        value: 'EMO',
        label: 'EMO',
    },
    {
        value: 'Other',
        label: 'Other',
    },
];

const incidentType = [
    {
        value: 'MIP',
        label: 'Missing Person',
    },
    {
        value: 'ENT',
        label: 'Entrapment',
    },
    {
        value: 'STF',
        label: 'Structure Fire',
    },
    {
        value: 'LAS',
        label: 'Last at Sea',
    },
    {
        value: 'Other',
        label: 'Other',
    },
];

const province = [
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

// TODO: Add a time picker with default value set to the current users local time

export default function CreateIncident() {
    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());

    return (
        <>
            <CssBaseline enableColorScheme />
            <Container maxWidth>
                <TextField
                    label="Incident Name"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                />
                <TextField
                    label="Incident Commander"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                />
                <TextField
                    select
                    label="Agency"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                >
                    {agencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="incidentType"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                >
                    {incidentType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Operational Period"
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                />
            </Container>

            <Container>
                <TextField
                    label="Address"
                    sx={{
                        width: { md: '28.5vw', lg: '28.5vw', xl: '21vw' },
                        margin: '1vh',
                    }}
                />
                <TextField
                    label="City"
                    sx={{
                        width: { md: '27vw', lg: '27vw', xl: '21vw' },
                        margin: '1vh',
                    }}
                />

                <TextField
                    select
                    label="Province"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                >
                    {province.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Container>
            <Container>
                <TextField
                    label="Postal Code"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '10vw' },
                        margin: '1vh',
                    }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{
                            width: { md: '13vw', lg: '13vw', xl: '10vw' },
                            margin: '1vh',
                        }}
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                    <TimePicker
                        sx={{
                            width: { md: '13vw', lg: '13vw', xl: '10vw' },
                            margin: '1vh',
                        }}
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                    />
                </LocalizationProvider>
            </Container>
        </>
    );
}

// * Strcuture of endpoint request

/**
 *  {
"incidentName" : string,
"incidentCommander": Guid or string,
"agency": Guid or string,
"incidentType": Guid or string,
""operationPeriod: integer,
"address": string,
"city": string,
"postal": string,
"province": string,
"date": datetime,
summary: string,
objectives: string
} 
 * 
 */
