import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import CreateIncident from '../app/CreateIncident/page';
import PersonnelInfo from '../app/PersonnelInfo/page';
import PastIncident from '../app/PastIncident/page';
import MyCerts from '../app/MyCerts/page';
import Profile from '../app/Profile/page';

import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useOutletContext } from 'react-router-dom';
import ActiveIncident from '../app/ActiveIncident/page';
import { Typography } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Register from '../app/Regsiter/page';
import { Widgets } from '@mui/icons-material';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'incident',
        title: 'Incident',
        icon: <HomeIcon />,
        children: [
            {
                segment: 'activeIncident',
                title: 'Active Incidents',
                icon: <NotificationsActiveIcon />,
            },
            {
                segment: 'newIncident',
                title: 'New Incident',
                icon: <AddBoxIcon />,
            },
            {
                segment: 'pastIncident',
                title: 'Past Incidents',
                icon: <VisibilityIcon />,
            },
        ],
    },
    {
        segment: 'personnelInfo',
        title: 'Personnel Info',
        icon: <DonutLargeIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'User Items',
    },
    {
        segment: 'register',
        title: 'Register Personnel',
        icon: <PersonAddIcon />,
    },
    {
        segment: 'myCertifications',
        title: 'My Certifications',
        icon: <WorkspacePremiumIcon />,
    },
    {
        segment: 'settings',
        title: 'Settings',
        icon: <SettingsIcon />,
        children: [
            {
                segment: 'profile',
                title: 'Profile',
                icon: <DescriptionIcon />,
            },
        ],
    },
    //* Clean this up **
    {
        icon: <></>,
    },
    {
        icon: <></>,
    },
    {
        icon: <></>,
    },
    {
        icon: <></>,
    },
    {
        icon: <></>,
    },
    {
        icon: <></>,
    },
    {
        icon: <></>,
    },

    {
        segment: 'myCertifications',
        title: 'Alfreds Parks',
        icon: <AccountCircleIcon color="#037AFF" />,
    },
];

const lightDarkTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function dashboardRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);
    const context = useOutletContext();

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);
    return router;
}

// const Skeleton = styled('div')(({ theme, height }) => ({
//     backgroundColor: theme.palette.action.hover,
//     borderRadius: theme.shape.borderRadius,
//     height,
//     content: '" "',
// }));

export default function Dashboard(props) {
    const router = dashboardRouter('/dashboard');

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={lightDarkTheme}
            branding={{
                title: (
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            fontWeight: 700,
                            color: '#037AFF',
                            textDecoration: 'none',
                        }}
                    >
                        SAR FORGE
                    </Typography>
                ),
                logo: (
                    <TroubleshootIcon
                        sx={{ margin: '0.8vh', color: '#037AFF' }}
                    />
                ),
            }}
        >
            <DashboardLayout>
                <PageContainer
                    style={{ padding: '0' }}
                    title=""
                    breadcrumbs={[]}
                >
                    {router.pathname == '/incident/activeIncident' && (
                        <ActiveIncident />
                    )}
                    {router.pathname == '/incident/newIncident' && (
                        <CreateIncident />
                    )}
                    {router.pathname == '/incident/pastIncident' && (
                        <PastIncident />
                    )}
                    {router.pathname == '/personnelInfo' && <PersonnelInfo />}

                    {router.pathname == '/register' && <Register />}
                    {router.pathname == '/myCertifications' && <MyCerts />}
                    {router.pathname == '/settings/profile' && <Profile />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
