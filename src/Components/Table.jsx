import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import dayjs from 'dayjs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';

function createData(
    id,
    name,
    phoneNumber,
    checkedStatus,
    startDate,
    endDate,
    certInfo
) {
    return {
        id,
        name,
        phoneNumber,
        checkedStatus,
        startDate,
        endDate,
        certificateInfo: [certInfo],
    };
}

function EnhancedTableToolbar(props) {
    const { numSelected, selected, changeResponderInfo, setSelected } = props;

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Responder Information
                </Typography>
            )}
            {/* {numSelected > 0 && (
                <Button onClick={handleCheckIn}>Check In</Button>
            )} */}
        </Toolbar>
    );
}

export default function ResponderTable({
    setRoles,
    roles,
    responderInfo,
    setResponderInfo,
    selected,
    setSelected,
}) {
    const rows = responderInfo.map((info) =>
        createData(
            info.id,
            info.name,
            info.phone,
            info.checkedStatus,
            info.startDate,
            info.endDate,
            info.cert
        )
    );

    return (
        <Paper sx={{ width: '100%', mb: 2, ml: 0, mt: '1vh' }}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                selected={selected}
                changeResponderInfo={setResponderInfo}
                setSelected={setSelected}
            />
            <TableContainer component={Paper} variant="outlined">
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Checkin/out</TableCell>
                            <TableCell align="center">Checked In</TableCell>
                            <TableCell>Responder Name</TableCell>
                            <TableCell>Start Date time</TableCell>
                            <TableCell>End Date time</TableCell>
                            <TableCell>Responder Role</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell>Certificates</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                setSelectedRow={setSelected}
                                selectedRows={selected}
                                setRoles={setRoles}
                                roles={roles}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
