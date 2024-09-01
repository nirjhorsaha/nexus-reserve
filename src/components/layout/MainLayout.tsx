// import useCartWarning from "@/hooks/useCartWarning";
import Footer from "@/pages/Shared/Footer";
import NavBar from "@/pages/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Container from "./Container";
import ScrollToTopButton from "@/utils/ScrollToTop";

const MainLayout = () => {
    // useCartWarning(); // global cart warning

    return (
        <main className="font-Nunito"  >
            <div data-theme="light">
                <ScrollToTopButton />
                <Container className="min-h-screen">
                    <NavBar />
                    <Outlet />
                </Container>
                <Footer />
            </div>
        </main>
    );
};

export default MainLayout;