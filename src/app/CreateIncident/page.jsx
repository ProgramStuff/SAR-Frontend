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



export default function CreateIncident() {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getCookie();
    }, []);

    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());

    function getCookie() {
        let name = "user=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
          }
          if (c.indexOf(name) == 0) {
            const userInfo = JSON.parse((c.substring(name.length, c.length)))
            setCurrentUser(userInfo);
          }
        }
        return;
      }

      async function handleSubmit(e) {
        e.preventDefault();

        const fromData = new FormData(e.currentTarget);
        console.log({
                "incidentName" : fromData.get('incidentName'),
                "incidentCommander": fromData.get('commander'),
                "agency": fromData.get('agency'),
                "incidentType": fromData.get('incidentType'),
                "operationPeriod": fromData.get('op'),
                "address": fromData.get('address'),
                "city": fromData.get('city'),
                "postal": fromData.get('postal'),
                "province": fromData.get('province'),
                "date": fromData.get('date'),
                "summary": fromData.get('summary'),
                "objectives": fromData.get('objectives')
        });

        const payload = {
            "incidentName" : fromData.get('incidentName'),
            "incidentCommander": fromData.get('commander'),
            "agency": fromData.get('agency'),
            "incidentType": fromData.get('incidentType'),
            "operationPeriod": fromData.get('op'),
            "address": fromData.get('address'),
            "city": fromData.get('city'),
            "postal": fromData.get('postal'),
            "province": fromData.get('province'),
            "date": fromData.get('date'),
            "summary": fromData.get('summary'),
            "objectives": fromData.get('objectives')
        }

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


    return (
        <>
            <CssBaseline enableColorScheme />
            <Box maxWidth component="form" onSubmit={handleSubmit}>
                <FormControl>
                    <TextField
                    name="incidentName"
                        label="Incident Name"
                        sx={{
                            width: { md: '13vw', lg: '13vw', xl: '13vw' },
                            margin: '1vh',
                        }}
                    />
                </FormControl>

                <FormControl>
                <TextField
                name='commander'
                    label="Incident Commander"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
                        margin: '1vh',
                    }}
                />
                </FormControl>

            
            <FormControl>
                <TextField
                    select
                    name='agency'
                    label="Agency"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
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
                name='incidentType'
                    select
                    label="Incident Type"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
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
                name='op'
                    label="Operational Period"
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
                        margin: '1vh',
                    }}
                />
                </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <FormControl>
                    <DatePicker
                    name='date'
                        sx={{
                            width: { md: '13vw', lg: '13vw', xl: '13vw' },
                            margin: '1vh',
                        }}
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                </FormControl>

                <FormControl>
                    <TimePicker
                    name='startTime'
                        sx={{
                            width: { md: '13vw', lg: '13vw', xl: '13vw' },
                            margin: '1vh',
                        }}
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                    />
                    </FormControl>
                </LocalizationProvider>



                <FormControl>        
                <TextField
                name='address'
                    label="Address"
                    sx={{
                        width: { md: '27vw', lg: '27vw', xl: '27vw' },
                        margin: '1vh',
                    }}
                />
                </FormControl>

                
            <FormControl>
                <TextField
                name='province'
                    select
                    label="Province"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
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
                name='city'
                    label="City"
                    sx={{
                        width: { md: '27vw', lg: '27vw', xl: '27vw' },
                        margin: '1vh',
                    }}
                />
                </FormControl>

                <FormControl>
                <TextField
                name='postal'
                    label="Postal Code"
                    sx={{
                        width: { md: '13vw', lg: '13vw', xl: '13vw' },
                        minWidth: '10vh',
                        margin: '1vh',
                    }}
                />
                </FormControl>


                <FormControl sx={{width: '100%'}}>
                <TextField
                name='summary'
                sx={{
                    width: { md: '100%', lg: '100%', xl: '100%' },
                    margin: '1vh',
                }}
                label="Summary"
                multiline
                maxRows={1000}
            />
                </FormControl>



                <FormControl sx={{width: '100%'}}>
                <TextField
                name='objectives'
                sx={{
                    width: { md: '100%', lg: '100%', xl: '100%' },
                    margin: '1vh',
                }}
                label="Objectives"
                multiline
                maxRows={1000}
            />
            </FormControl>
            <Stack spacing={3} direction="row" sx={{marginTop: '3vh'}}>
                <Button sx={{width: '10vw'}} size='large' variant="contained" type='submit'>Submit</Button>
                <Button sx={{width: '10vw'}} size='large' color='error' variant="contained">Cancel</Button>
            </Stack>
            </Box>
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
