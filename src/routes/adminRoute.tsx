import { HomeOutlined, ClockCircleOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import BookingManagement from "@/pages/admin/BookingManagement";
import Dashboard from "@/pages/admin/Dashboard";
import RoomManagement from "@/pages/admin/RoomManagement";
import SlotManagement from "@/pages/admin/SlotManagement";

export const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <Dashboard />,
        icon: <ProductOutlined />,
    },
    {
        name: 'Booking Management',
        path: 'booking-management',
        element: <BookingManagement />,
        icon: <UserOutlined />,
    },
    {
        name: 'Room Management',
        path: 'room-management',
        element: <RoomManagement />,
        icon: <HomeOutlined />,
    },
    {
        name: 'Slot Management',
        path: 'slot-management',
        element: <SlotManagement />,
        icon: <ClockCircleOutlined />,
    },
];
