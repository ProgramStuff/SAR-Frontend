import { useState, useEffect } from 'react';
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
import axios from 'axios';

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

export default function ResponderTable({
    setRoles,
    roles,
    responderInfo,
    setResponderInfo,
    selected,
    setSelected,
    taskID,
    tempTasks,
}) {
    const tempCert3 = {
        id: 3,
        name: 'Drone Operation',
        expiryDate: dayjs('2026-03-15T23:54:26.305Z').format(
            'YYYY-MM-DD HH:mm:ss'
        ),
        certificate: 'Cert',
    };

    const rows = !taskID
        ? responderInfo.map((responder) =>
              createData(
                  responder.responderId,
                  responder.responderName,
                  responder.phone,
                  responder.checkedIn,
                  responder.startDate,
                  responder.endDate,
                  {
                      id: 3,
                      name: 'Drone Operation',
                      expiryDate: dayjs('2026-03-15T23:54:26.305Z').format(
                          'YYYY-MM-DD HH:mm:ss'
                      ),
                      certificate: 'Cert',
                  }
              )
          )
        : tempTasks[taskID].team.map((info) =>
              createData(
                  info.responderId,
                  info.name,
                  info.phone,
                  info.checkedStatus,
                  info.startDate,
                  info.endDate,
                  info.cert
              )
          );

    async function getAllResponders() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_ENDPOINT}/get-allResponders`
            );
            if (response.status == 200) {
                console.log('Responders retrieved: ', response.data);
                setResponderInfo(response.data);
            }
        } catch (error) {
            consoel.log('Error: ', error.message);
        }
    }

    useEffect(() => {
        if (responderInfo.length === 0) {
            getAllResponders();
        }    }, []);

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
