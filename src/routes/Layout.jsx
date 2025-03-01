import Dashboard from '../Components/Dashboard';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
export default function Layout() {
    let currentPath = window.location.pathname;
    return (
        <>
            <ResponsiveAppBar />
        </>
    );
}
