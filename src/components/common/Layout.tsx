import { Outlet } from "react-router-dom";
import FooterComp from './FooterComp';
import { Box } from "@mantine/core";

function Layout() {
    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Box style={{ flex: 1 }}>
                <Outlet />
            </Box>
            <FooterComp />
        </Box>
    );
}

export default Layout
