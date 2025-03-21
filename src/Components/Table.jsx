import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) =>
            `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'age',
        headerName: 'Certifications',
        type: 'number',
        width: 90,
    },
];

const rows = [
    { id: 1, lastName: 'Kelsey', firstName: 'Jordan', age: 29 },
    { id: 2, lastName: 'Velemirovich', firstName: 'Blake', age: 30 },
    { id: 3, lastName: 'Parks', firstName: 'Alfred', age: 45 },
    //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Table() {
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            ></DataGrid>
        </Paper>
    );
}
