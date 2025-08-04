import { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

export default function Row(props) {
    const { row, setSelectedRow, selectedRows, setRoles, roles } = props;
    const [open, setOpen] = useState(false);
    const [responderRole, setResponderRole] = useState([]);
    let isSelected = selectedRows.includes(row.id);
    const handleSelect = () => {
        if (isSelected) {
            setSelectedRow(selectedRows.filter((item) => item != row.id));
        } else {
            setSelectedRow([...selectedRows, row.id]);
        }
    };

    const handRoleUpdate = (resRole) => {
        const newResponderRole = {
            responderId: row.id,
            role: resRole,
        };

        setResponderRole(newResponderRole);
        setRoles((roles) => {
            const existingIndex = roles.findIndex(
                (role) => role.responderId === row.id
            );
            if (existingIndex !== -1) {
                const updatedRoles = [...roles];
                updatedRoles[existingIndex] = newResponderRole;
                return updatedRoles;
            } else {
                return [...roles, newResponderRole];
            }
        });
    };

    useEffect(() => {}, [selectedRows]);
    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center" padding="checkbox">
                    <Checkbox
                        disabled={row.endDate != undefined && true}
                        checked={isSelected}
                        onClick={handleSelect}
                        color="primary"
                        inputProps={{
                            'aria-labelledby': 'row',
                        }}
                    />
                </TableCell>
                <TableCell align="center">
                    {row.checkedStatus == false ? 'No' : 'Yes'}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                {/* Time in and out */}
                <TableCell component="th" scope="row">
                    {row.startDate
                        ? dayjs(row.startDate).format('YYYY-MM-DD HH:mm:ss')
                        : 'N/A'}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.endDate
                        ? dayjs(row.endDate).format('YYYY-MM-DD HH:mm:ss')
                        : 'N/A'}
                </TableCell>
                <TableCell>
                    <TextField
                        id="role"
                        variant="outlined"
                        onChange={(event) => handRoleUpdate(event.target.value)}
                    />
                </TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                {/* Certification drop down section */}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Certifications
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Expiry Date</TableCell>
                                        <TableCell align="right">
                                            Certificate
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.certificateInfo.map((cert) => (
                                        <TableRow
                                            key={Date.toString(cert.expiryDate)}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {cert.name}
                                            </TableCell>
                                            <TableCell>
                                                {cert.expiryDate}
                                            </TableCell>
                                            <TableCell align="right">
                                                {cert.certificate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}
