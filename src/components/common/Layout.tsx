import { Outlet } from "react-router-dom";
import FooterComp from './FooterComp';
import { Space } from "@mantine/core";

function Layout() {
    return (
        <>
        <Outlet />
        <Space h="lg" />
        <FooterComp />
        </>
    );
}

export default Layout
