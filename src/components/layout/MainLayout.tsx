import Footer from "@/pages/Shared/Footer";
import NavBar from "@/pages/Shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Container from "./Container";
import ScrollToTopButton from "@/utils/ScrollToTop";
import useBookingWarning from "@/hooks/useBookings";

const MainLayout = () => {
    useBookingWarning(); // global bookings warning
    
    const location = useLocation();
    const isAdminDashboard = location.pathname.startsWith('/admin');

    return (
        <main className="font-Nunito">
            <div data-theme="light">
                <ScrollToTopButton />
                {isAdminDashboard ? (
                    <>
                        <Outlet />
                    </>
                ) : (
                    <Container className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
                        <NavBar />
                        <Outlet />
                    </Container>
                )}
                {!isAdminDashboard && <Footer />}
            </div>
        </main>
    );
};

export default MainLayout;
