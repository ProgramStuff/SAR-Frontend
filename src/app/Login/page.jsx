import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
// import AppTheme from './theme/AppTheme';
// import ColorModeSelect from './theme/ColorModeSelect';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function Login() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const context = useOutletContext();

    const navigate = useNavigate();

    const validateInputs = () => {
        let isValid = true;

        // if (!email || !/\S+@\S+\.\S+/.test(email)) {
        //   setEmailError(true);
        //   setEmailErrorMessage('Please enter a valid email address.');
        //   isValid = false;
        // } else {
        //   setEmailError(false);
        //   setEmailErrorMessage('');
        // }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Password must be at least 6 characters long.'
            );
            isValid = false;
        }
        if (!/[^\w]/.test(password)) {
            setPasswordError(true);
            setPasswordErrorMessage(
                'Passwords must have at least one non-alphanumeric character.'
            );
            isValid = false;
        }
        if (!/\d/.test(password)) {
            setPasswordError(true);
            setPasswordErrorMessage(
                "Passwords must have at least one digit ('0'-'9')."
            );
            isValid = false;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError(true);
            setPasswordErrorMessage(
                "Passwords must have at least one lowercase ('a'-'z')."
            );
            isValid = false;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError(true);
            passwordValidations.push(
                "Passwords must have at least one uppercase ('A'-'Z')."
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        // if (!name.value || name.value.length < 1) {
        //   setNameError(true);
        //   setNameErrorMessage('Name is required.');
        //   isValid = false;
        // } else {
        //   setNameError(false);
        //   setNameErrorMessage('');
        // }

        return isValid;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        //! Test for private routes -- remove later
        context.loginUser();
        navigate('/Dashboard');
        if (emailError || passwordError) {
            return;
        }
        const data = new FormData(e.currentTarget);
        console.log({
            name: data.get('name'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });

        // Validate email
        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // if (!emailRegex.test(email)) {
        //   setMessage("Please enter a valid email address.");
        //   return;
        // }

        // Data to send in the POST request
        const payload = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5185/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            console.log('Login');
            const data = await response.json();

            if (response.ok) {
                // If registration is successful
                console.log('Login Successful');
            } else {
                // If registration fails
                setMessage('Email or password is incorrect.');
            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        Sign In
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {/* <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            placeholder="Jon Snow"
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? 'error' : 'primary'}
          />
        </FormControl> */}
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                onChange={(e) => setPassword(e.target.value)}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>
                            or
                        </Typography>
                    </Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/material-ui/getting-started/templates/sign-in/"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}
