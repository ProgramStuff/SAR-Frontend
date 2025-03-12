import { CssBaseline } from '@mui/material';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';


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

export default function CreateIncident() {
    return (
        <>
            <CssBaseline enableColorScheme/>
            <Container>
                <TextField label="Incident Name" sx={{width: '25vh', margin: '1vh'}} />
                <TextField label="Incident Commander" sx={{idth: '25vh', margin: '1vh'}} />
                <TextField
                id="outlined-select-currency"
                select
                label="Agency"
                defaultValue="EUR"
                sx={{width: '25vh', margin: '1vh'}}
                >
                {agencies.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>

                <TextField
                id="outlined-select-currency"
                select
                label="incidentType"
                defaultValue="EUR"
                sx={{width: '25vh', margin: '1vh'}}
                >
                {incidentType.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
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
                    sx={{width: '25vh', margin: '1vh'}}
                />

            </Container>

            <Container>
                <TextField label="Address" sx={{width: '55vh', margin: '1vh'}} />
                <TextField label="City" sx={{width: '52vh', margin: '1vh'}} />

                <TextField
                id="outlined-select-currency"
                select
                label="Province"
                defaultValue="EUR"
                sx={{width: '25vh', margin: '1vh'}}
                >
                {province.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>

            </Container>

            <Container>
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